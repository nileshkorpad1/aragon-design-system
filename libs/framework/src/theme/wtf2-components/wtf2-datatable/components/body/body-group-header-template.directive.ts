import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wtf2-datatable-group-header-template]',
})
export class DatatableGroupHeaderTemplateDirective {
  constructor(public template: TemplateRef<any>) { }
}
