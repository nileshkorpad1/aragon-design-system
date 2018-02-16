import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Wtf2PermissionsModule } from '../index';
import { Wtf2RolesService } from '../service/roles.service';
import { Wtf2PermissionsService } from '../service/permissions.service';
import { Wtf2PermissionsConfigurationService } from '../service/configuration.service';

describe('Wtf2 permissions Except with default strategy and with else block then block ', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsExcept="['FAIL_BLOCK']; else elseBlock; then thenBlock">
                FAILED
            </div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `,

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`elseBlock`);
        }));
    });

});

describe('Wtf2 permissions Except with default strategy without any blocks', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsExcept="['FAIL_BLOCK'];">
                FAILED
            </div>
        `,

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`FAILED`);
        }));
    });
});


describe('Wtf2 permissions Except with default strategy and with else block then block ', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsExcept="['FAIL_BLOCK']; else elseBlock; then thenBlock">
                FAILED
            </div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `,

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should  show else block instead of applying default strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`elseBlock`);
        }));
    });

});

describe('Simple wtf2PermissionsExcept directive', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsOnly="['ONLY_PERMISSION'];" (permissionsUnauthorized)="permissionsUnauthorized()">

            </div>
        `,

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        comp.permissionsUnauthorized = () => {};

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user does NOT have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should not rerender directive', fakeAsync(() => {
            spyOn(comp, 'permissionsUnauthorized');
            detectChanges(fixture);
            permissionsService.addPermission('FAIL_ANOTHER_BLOCK');
            detectChanges(fixture);
            expect(comp.permissionsUnauthorized).toHaveBeenCalledTimes(0);
        }));
    });
});

describe('Wtf2 permissions Except with default strategy and with else block then block ', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsExcept="['FAIL_BLOCK']; else elseBlock; then thenBlock">
                FAILED
            </div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `,

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('ALLOW');
        });
        it('should  show then block instead of applying default strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`thenBlock`);
        }));
    });

});

describe('Wtf2 permissions Except when passing permissions as variable should rerender the page on permissionChange ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *wtf2PermissionsExcept="permissions">
                <div>123</div>
            </ng-container>
        `,

    })
    class TestComp {
        data: any;
        permissions = 'EXCEPT';
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('EXCEPT');
        });
        it('should  show then block instead of applying default strategy', fakeAsync(() => {
            detectChanges(fixture);

            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = 'ALLOW';
            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

        }));
    });

});


describe('Wtf2 permissions when chaning variable to undefined  ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *wtf2PermissionsExcept="permissions">
                <div>123</div>
            </ng-container>
        `,

    })
    class TestComp {
        data: any;
        permissions = 'EXCEPT';
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('EXCEPT');
        });
        it('should  show the component', fakeAsync(() => {
            detectChanges(fixture);

            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = undefined;
            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

        }));
    });

});

describe('Wtf2 permissions Only when passing permissions as variable should rerender the page ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *wtf2PermissionsOnly="permissions">
                <div>123</div>
            </ng-container>
        `,

    })
    class TestComp {
        data: any;
        permissions = 'ALLOW';
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('ALLOW');
        });
        it('show and then hide content', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

            comp.permissions = 'DONT_ALLOW';
            detectChanges(fixture);
            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);
        }));
    });

});

describe('Wtf2 permissions Only when passing undefined it should show the component ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *wtf2PermissionsOnly="permissions">
                <div>123</div>
            </ng-container>
        `,

    })
    class TestComp {
        data: any;
        permissions = 'ALLOW';
    }

    let rolesService;
    let permissionsService;
    let configurationService: Wtf2PermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [Wtf2PermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(Wtf2RolesService);
        permissionsService = fixture.debugElement.injector.get(Wtf2PermissionsService);
        configurationService = fixture.debugElement.injector.get(Wtf2PermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('DONT_ALLOW');
        });
        it('show and then hide content', fakeAsync(() => {
            detectChanges(fixture);
            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = undefined;
            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);
        }));
    });

});





function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
}
