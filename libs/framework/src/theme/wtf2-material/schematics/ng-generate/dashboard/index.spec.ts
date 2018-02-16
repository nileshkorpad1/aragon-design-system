import {Schewtf2icTestRunner} from '@angular-devkit/schewtf2ics/testing';
import {createTestApp, getFileContent} from '@angular/cdk/schewtf2ics/testing';
import {Schema} from './schema';

describe('material-dashboard-schewtf2ic', () => {
  let runner: Schewtf2icTestRunner;

  const baseOptions: Schema = {
    name: 'foo',
    project: 'material',
  };

  beforeEach(() => {
    runner = new Schewtf2icTestRunner('schewtf2ics', require.resolve('../../collection.json'));
  });

  it('should create dashboard files and add them to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchewtf2icAsync('dashboard', baseOptions, app).toPromise();
    const files = tree.files;

    expect(files).toContain('/projects/material/src/app/foo/foo.component.css');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.html');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.ts');

    const moduleContent = getFileContent(tree, '/projects/material/src/app/app.module.ts');
    expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
  });

  it('should add dashboard imports to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchewtf2icAsync('dashboard', baseOptions, app).toPromise();
    const moduleContent = getFileContent(tree, '/projects/material/src/app/app.module.ts');

    expect(moduleContent).toContain('Wtf2GridListModule');
    expect(moduleContent).toContain('Wtf2CardModule');
    expect(moduleContent).toContain('Wtf2MenuModule');
    expect(moduleContent).toContain('Wtf2IconModule');
    expect(moduleContent).toContain('Wtf2ButtonModule');

    expect(moduleContent).toContain(
      `import { Wtf2GridListModule, Wtf2CardModule, Wtf2MenuModule, Wtf2IconModule, Wtf2ButtonModule }` +
      ` from '@wtf2/theme/wtf2-material';`);
  });

  it('should throw if no name has been specified', async () => {
    const appTree = await createTestApp(runner);
    let message: string|null = null;

    try {
      await runner.runSchewtf2icAsync('dashboard', {project: 'material'}, appTree).toPromise();
    } catch (e) {
      message = e.message;
    }

    expect(message).toMatch(/required property 'name'/);
  });

  describe('style option', () => {
    it('should respect the option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync(
                  'dashboard', {style: 'scss', ...baseOptions}, await createTestApp(runner))
              .toPromise();

      expect(tree.files).toContain('/projects/material/src/app/foo/foo.component.scss');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'dashboard', baseOptions, await createTestApp(runner, {style: 'less'}))
                       .toPromise();

      expect(tree.files).toContain('/projects/material/src/app/foo/foo.component.less');
    });
  });

  describe('inlineStyle option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner);
      const tree =
          await runner.runSchewtf2icAsync('dashboard', {inlineStyle: true, ...baseOptions}, app)
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.css');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync(
                  'dashboard', baseOptions, await createTestApp(runner, {inlineStyle: true}))
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.css');
    });
  });

  describe('inlineTemplate option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner);
      const tree =
          await runner.runSchewtf2icAsync('dashboard', {inlineTemplate: true, ...baseOptions}, app)
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.html');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const app = await createTestApp(runner, {inlineTemplate: true});
      const tree = await runner.runSchewtf2icAsync('dashboard', baseOptions, app).toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.html');
    });
  });

  describe('skipTests option', () => {
    it('should respect the option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync(
                  'dashboard', {skipTests: true, ...baseOptions}, await createTestApp(runner))
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'dashboard', baseOptions, await createTestApp(runner, {skipTests: true}))
                       .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    });
  });
});
