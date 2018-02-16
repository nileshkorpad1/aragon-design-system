import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[wtf2-datatable-tree-toggle]' })
export class DataTableColumnCellTreeToggleDirective {
  constructor(public template: TemplateRef<any>) { }
}
