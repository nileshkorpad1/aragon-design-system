import {createTestCaseSetup} from '@angular/cdk/schewtf2ics/testing';
import {migrationCollection} from '../index.spec';

describe('class inheritance misc checks', () => {

  describe('v6 class which extends Wtf2FormFieldControl', () => {

    it('should report if class does not declare "shouldLabelFloat"', async () => {
      const {removeTempDir, runFixers} = await createTestCaseSetup('migration-v6',
        migrationCollection, [require.resolve('./class-inheritance_input.ts')]);

      const {logOutput} = await runFixers();

      expect(logOutput).toMatch(/Found class "WithoutLabelProp".*extends "Wtf2FormFieldControl.*must define "shouldLabelFloat"/);
      expect(logOutput).not.toMatch(/Found class "WithLabelProp".*extends "Wtf2FormFieldControl".*must define "shouldLabelFloat"/);

      removeTempDir();
    });
  });
});
