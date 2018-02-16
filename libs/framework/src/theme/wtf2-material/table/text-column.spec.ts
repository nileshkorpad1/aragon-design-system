import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Wtf2TableModule} from './table-module';
import {expectTableToMatchContent} from './table.spec';

describe('Wtf2TextColumn', () => {
  let fixture: ComponentFixture<BasicTextColumnApp>;
  let tableElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2TableModule],
      declarations: [
        BasicTextColumnApp,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTextColumnApp);
    fixture.detectChanges();

    tableElement = fixture.nativeElement.querySelector('.wtf2-table');
  });

  it('should be able to render the basic columns', () => {
    expectTableToMatchContent(tableElement, [
      ['PropertyA', 'PropertyB', 'PropertyC'],
      ['a_1', 'b_1', 'c_1'],
      ['a_2', 'b_2', 'c_2'],
    ]);
  });
});

interface TestData {
  propertyA: string;
  propertyB: string;
  propertyC: string;
}

@Component({
  template: `
    <wtf2-table [dataSource]="data">
      <wtf2-text-column name="propertyA"></wtf2-text-column>
      <wtf2-text-column name="propertyB"></wtf2-text-column>
      <wtf2-text-column name="propertyC"></wtf2-text-column>

      <wtf2-header-row *wtf2HeaderRowDef="displayedColumns"></wtf2-header-row>
      <wtf2-row *wtf2RowDef="let row; columns: displayedColumns"></wtf2-row>
    </wtf2-table>
  `
})
class BasicTextColumnApp {
  displayedColumns = ['propertyA', 'propertyB', 'propertyC'];

  data: TestData[] = [
    {propertyA: 'a_1', propertyB: 'b_1', propertyC: 'c_1'},
    {propertyA: 'a_2', propertyB: 'b_2', propertyC: 'c_2'},
  ];
}
