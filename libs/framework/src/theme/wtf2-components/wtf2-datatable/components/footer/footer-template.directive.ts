import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[wtf2-datatable-footer-template]' })
export class DataTableFooterTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
