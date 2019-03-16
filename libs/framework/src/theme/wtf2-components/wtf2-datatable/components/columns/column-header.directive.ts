import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[wtf2-datatable-header-template]' })
export class DataTableColumnHeaderDirective {
  constructor(public template: TemplateRef<any>) { }
}
