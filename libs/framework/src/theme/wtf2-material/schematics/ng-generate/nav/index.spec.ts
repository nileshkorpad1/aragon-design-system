import {Schewtf2icTestRunner} from '@angular-devkit/schewtf2ics/testing';
import {createTestApp, getFileContent} from '@angular/cdk/schewtf2ics/testing';

import {Schema} from './schema';

describe('material-nav-schewtf2ic', () => {
  let runner: Schewtf2icTestRunner;

  const baseOptions: Schema = {
    name: 'foo',
    project: 'material',
  };

  beforeEach(() => {
    runner = new Schewtf2icTestRunner('schewtf2ics', require.resolve('../../collection.json'));
  });

  it('should create nav files and add them to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchewtf2icAsync('nav', baseOptions, app).toPromise();
    const files = tree.files;

    expect(files).toContain('/projects/material/src/app/foo/foo.component.css');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.html');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    expect(files).toContain('/projects/material/src/app/foo/foo.component.ts');

    const moduleContent = getFileContent(tree, '/projects/material/src/app/app.module.ts');
    expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
    expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
  });

  it('should add nav imports to module', async () => {
    const app = await createTestApp(runner);
    const tree = await runner.runSchewtf2icAsync('nav', baseOptions, app).toPromise();
    const moduleContent = getFileContent(tree, '/projects/material/src/app/app.module.ts');

    expect(moduleContent).toContain('LayoutModule');
    expect(moduleContent).toContain('Wtf2ToolbarModule');
    expect(moduleContent).toContain('Wtf2ButtonModule');
    expect(moduleContent).toContain('Wtf2SidenavModule');
    expect(moduleContent).toContain('Wtf2IconModule');
    expect(moduleContent).toContain('Wtf2ListModule');

    expect(moduleContent).toContain(`import { LayoutModule } from '@angular/cdk/layout';`);
    expect(moduleContent)
        .toContain(
            `import { Wtf2ToolbarModule, Wtf2ButtonModule, Wtf2SidenavModule, Wtf2IconModule, ` +
            `Wtf2ListModule } from '@wtf2/theme/wtf2-material';`);
  });

  it('should throw if no name has been specified', async () => {
    const appTree = await createTestApp(runner);
    let message: string|null = null;

    try {
      await runner.runSchewtf2icAsync('nav', {project: 'material'}, appTree).toPromise();
    } catch (e) {
      message = e.message;
    }

    expect(message).toMatch(/required property 'name'/);
  });

  describe('style option', () => {
    it('should respect the option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'nav', {style: 'scss', ...baseOptions}, await createTestApp(runner))
                       .toPromise();

      expect(tree.files).toContain('/projects/material/src/app/foo/foo.component.scss');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync('nav', baseOptions, await createTestApp(runner, {style: 'less'}))
              .toPromise();

      expect(tree.files).toContain('/projects/material/src/app/foo/foo.component.less');
    });
  });

  describe('inlineStyle option', () => {
    it('should respect the option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'nav', {inlineStyle: true, ...baseOptions}, await createTestApp(runner))
                       .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.css');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'nav', baseOptions, await createTestApp(runner, {inlineStyle: true}))
                       .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.css');
    });
  });

  describe('inlineTemplate option', () => {
    it('should respect the option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync(
                  'nav', {inlineTemplate: true, ...baseOptions}, await createTestApp(runner))
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.html');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'nav', baseOptions, await createTestApp(runner, {inlineTemplate: true}))
                       .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.html');
    });
  });

  describe('skipTests option', () => {
    it('should respect the option value', async () => {
      const tree = await runner
                       .runSchewtf2icAsync(
                           'nav', {skipTests: true, ...baseOptions}, await createTestApp(runner))
                       .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    });

    it('should fall back to the @schewtf2ics/angular:component option value', async () => {
      const tree =
          await runner
              .runSchewtf2icAsync('nav', baseOptions, await createTestApp(runner, {skipTests: true}))
              .toPromise();

      expect(tree.files).not.toContain('/projects/material/src/app/foo/foo.component.spec.ts');
    });
  });
});
