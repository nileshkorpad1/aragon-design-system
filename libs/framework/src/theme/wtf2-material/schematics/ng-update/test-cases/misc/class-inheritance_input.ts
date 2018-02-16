import {HostBinding} from '@angular/core';
import {Wtf2FormFieldControl} from '../form-field';

class WithoutLabelProp extends Wtf2FormFieldControl<any> {
}

class WithLabelProp extends Wtf2FormFieldControl<any> {
  @HostBinding('class.floating')
  get shouldLabelFloat() {return true;}
}
