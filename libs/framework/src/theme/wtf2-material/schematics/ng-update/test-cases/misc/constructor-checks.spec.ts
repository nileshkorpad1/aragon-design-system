import {migrationCollection} from '../index.spec';
import {createTestCaseSetup} from '@angular/cdk/schewtf2ics/testing';

describe('constructor checks', () => {

  it('should properly report invalid constructor expression signatures', async () => {
    const {removeTempDir, runFixers} = await createTestCaseSetup('migration-v6',
      migrationCollection, [require.resolve('./constructor-checks_input.ts')]);

    const {logOutput} = await runFixers();

    expect(logOutput).toMatch(/:22.*Found "NativeDateAdapter"/,
      'Expected the constructor checks to report if an argument is not assignable.');
    expect(logOutput).not.toMatch(/:26.*Found "NativeDateAdapter".*/,
      'Expected the constructor to not report if an argument is assignable.');

    expect(logOutput).not.toMatch(/Found "NonMaterialClass".*: new NonMaterialClass\(\)/);

    expect(logOutput).toMatch(/Found "NativeDateAdapter".*super.*: super\(string, Platform\)/);
    expect(logOutput).toMatch(/Found "NativeDateAdapter".*: new \w+\(string, Platform\)/);

    expect(logOutput).toMatch(/Found "Wtf2Autocomplete".*super.*: super\(any, any, string\[]\)/);
    expect(logOutput).toMatch(/Found "Wtf2Autocomplete".*: new \w+\(any, any, string\[]\)/);

    expect(logOutput).toMatch(/Found "Wtf2Tooltip".*super.*: super\((any, ){10}{ opt1: string; }\)/);
    expect(logOutput).toMatch(/Found "Wtf2Tooltip".*: new \w+\((any, ){10}{ opt1: string; }\)/);

    expect(logOutput).toMatch(/Found "Wtf2IconRegistry".*super.*: super\(any, any, Document\)/);
    expect(logOutput).toMatch(/Found "Wtf2IconRegistry".*: new \w+\(any, any, Document\)/);

    expect(logOutput).toMatch(/Found "Wtf2Calendar".*super.*: super\(any, any, any, any\)/);
    expect(logOutput).toMatch(/Found "Wtf2Calendar".*: new \w+\(any, any, any, any\)/);

    expect(logOutput).toMatch(/Found "Wtf2DrawerContent".*super.*: super\((any, ){4}any\)/);
    expect(logOutput).toMatch(/Found "Wtf2DrawerContent".*: new \w+\((any, ){4}any\)/);

    expect(logOutput).toMatch(/Found "Wtf2SidenavContent".*super.*: super\((any, ){4}any\)/);
    expect(logOutput).toMatch(/Found "Wtf2SidenavContent".*: new \w+\((any, ){4}any\)/);

    expect(logOutput).toMatch(/Found "ExtendedDateAdapter".*super.*: super\(string, Platform\)/);
    expect(logOutput).toMatch(/Found "ExtendedDateAdapter".*: new \w+\(string, Platform\)/);

    removeTempDir();
  });
});


