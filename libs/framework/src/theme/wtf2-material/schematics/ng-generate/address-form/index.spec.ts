import {Schewtf2icTestRunner} from '@angular-devkit/schewtf2ics/testing';
import {createTestApp, getFileContent} from '@angular/cdk/schewtf2ics/testing';
import {Schema} from './schema';

describe('Material address-form schewtf2ic', () => {
  let runner: Schewtf2icTestRunner;

  const baseOptions: Schema = {
    name: 'foo',
    project: 'material',
  };

  beforeEach(() => {
    runner = new Schewtf2icTestRunner('schewtf2ics', require.resolve('../../collection.json'));
  });

  it('should create address-form files and add them to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchewtf2icAsync('address-form', baseOptions, app).toPromise();
    const files = tree.files;

    expect(files).toContain('/projects/material/src/app/foo/foo.component.css');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.html');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.ts');

    const moduleContent = getFileContent(tree, '/projects/material/src/app/app.module.ts');
    expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
  });

  it('should add address-form imports to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchewtf2icAsync('address-form', baseOptions, app).toPromise();
    const moduleContent = getFileContent(tree, '/projects/material/src/app/app.module.ts');

    expect(moduleContent).toContain('Wtf2InputModule');
    expect(moduleContent).toContain('Wtf2ButtonModule');
    expect(moduleContent).toContain('Wtf2SelectModule');
    expect(moduleContent).toContain('Wtf2RadioModule');
    expect(moduleContent).toContain('ReactiveFormsModule');
  });

  it('should throw if no name has been specified', async () => {
    const appTree = await createTestApp(runner);
    let message: string|null = null;

    try {
      await runner.runSchewtf2icAsync('address-form', {project: 'material'}, appTree).toPromise();
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
                  'address-form', {style: 'scss', ...baseOptions}, await createTestApp(runner))
              .toPromise();

      expect(tree.files).toContain('/projects/material/src/app/foo/foo.component.scss');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync(
                  'address-form', baseOptions, await createTestApp(runner, {style: 'less'}))
              .toPromise();

      expect(tree.files).toContain('/projects/material/src/app/foo/foo.component.less');
    });
  });

  describe('inlineStyle option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner);
      const tree =
          await runner.runSchewtf2icAsync('address-form', {inlineStyle: true, ...baseOptions}, app)
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.css');
      expect(tree.readContent('/projects/material/src/app/foo/foo.component.ts'))
          .toContain('styles: [`');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const app = await createTestApp(runner, {inlineStyle: true});
      const tree = await runner.runSchewtf2icAsync('address-form', baseOptions, app).toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.css');
    });
  });

  describe('inlineTemplate option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner);
      const tree =
          await runner
              .runSchewtf2icAsync('address-form', {inlineTemplate: true, ...baseOptions}, app)
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.html');
      expect(tree.readContent('/projects/material/src/app/foo/foo.component.ts'))
          .toContain('template: `');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const app = await createTestApp(runner, {inlineTemplate: true});
      const tree = await runner.runSchewtf2icAsync('address-form', baseOptions, app).toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.html');
    });
  });

  describe('skipTests option', () => {
    it('should respect the option value', async () => {
      const app = await createTestApp(runner);
      const tree =
          await runner.runSchewtf2icAsync('address-form', {skipTests: true, ...baseOptions}, app)
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync(
                  'address-form', baseOptions, await createTestApp(runner, {skipTests: true}))
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    });
  });
});
