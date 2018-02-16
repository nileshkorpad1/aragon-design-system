import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wtf2-datatable-row-detail-template]',
})
export class DatatableRowDetailTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
