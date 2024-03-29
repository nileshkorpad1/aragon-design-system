import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnInit,
    ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import { InputComponent } from '../wtf2-input/input.component';
import { ButtonComponent } from '../wtf2-button/button.component';
import { SelectComponent } from '../wtf2-select/select.component';
import { DateComponent } from '../wtf2-datepicker/date.component';
import { RadiobuttonComponent } from '../wtf2-radio/radiobutton.component';
import { CheckboxComponent } from '../wtf2-checkbox/checkbox.component';

const componentMapper = {
    input: InputComponent,
    button: ButtonComponent,
    select: SelectComponent,
    date: DateComponent,
    radiobutton: RadiobuttonComponent,
    checkbox: CheckboxComponent,
};
@Directive({
    selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit {
    @Input() field: FieldConfig;
    @Input() group: FormGroup;
    componentRef: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
    ) { }

    ngOnInit() {
        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.field.type],
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}
