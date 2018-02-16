import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Wtf2PermissionsRestrictStubDirective } from './permissions-restrict.directive.stub';
import { Wtf2PermissionsAllowStubDirective } from './permissions-allow.directive.stub';

describe('Permissions restrict stub testing only original template', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template [wtf2PermissionsOnly]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, Wtf2PermissionsRestrictStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it('Should not show component', fakeAsync(() => {
        detectChanges(fixture);
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));
});



describe('Permissions stub testing only then template', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock">
            </div>
            <ng-template #elseBlock>
                <div>123</div>
            </ng-template>
            <ng-template #thenBlock>
                then block
            </ng-template>
        `})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, Wtf2PermissionsRestrictStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show else component', fakeAsync(() => {
        detectChanges(fixture);
        const content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});


describe('Permission stub directive should not show when providing authorised strategy functions', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *wtf2PermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock; authorisedStrategy: 'disable'; unauthorisedStrategy: 'enable'">
            </div>
            <ng-template #elseBlock>
                <div>123</div>
            </ng-template>
            <ng-template #thenBlock>
                then block
            </ng-template>
        `})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, Wtf2PermissionsRestrictStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show else component', fakeAsync(() => {
        detectChanges(fixture);
        const content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});


function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
}
