import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[wtf2-datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) { }
}
