import { ElementRef, HostListener, Directive, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { Component, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { InputBase } from './input-base';
import { InlineTextareaConfig, InlineSelectConfig } from '../types/inline-configs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WTF2_DIALOG_DATA, Wtf2DialogConfig, Wtf2Dialog, Wtf2DialogRef } from '@wtf2/theme/wtf2-material';
import { FieldConfig } from '../../field.interface';
import { DynamicFormComponent } from '../../wtf2-dynamic-forms/dynamic-form.component';
import { UserService } from '@wtf2/services/user.service';

@Component({
  selector: 'inline-editor-textarea',
  styleUrls: ['./input.textarea.component.scss'],
  template: `
    <wtf2-form-field class="inline-editor-textarea">
      <textarea
        wtf2Input
        #inputRef
        type="textarea"
        class="form-control"
        (keyup.enter)="onEnter($event)"
        (keyup.escape)="onEscape($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (click)="onClick($event)"
        (keypress)="onKeyPress($event)"
        (change)="onChange($event)"
        [required]="config.required"
        [rows]="config.rows"
        [cols]="config.cols"
        [disabled]="state.isDisabled()"
        [name]="config.name"
        autosize
      ></textarea>
    </wtf2-form-field>
    <button wtf2-icon-button [wtf2MenuTriggerFor]="menu" class="test">
      <wtf2-icon aria-label="" [wtf2MenuTriggerFor]="menu"
        >keyboard_arrow_down</wtf2-icon
      >
    </button>

    <wtf2-menu #menu="wtf2Menu" class="inline-textarea-menu">
      <ng-template ngFor let-option [ngForOf]="config.options.data">
        <button
          wtf2-menu-item
          class="wtf2-menu-item"
          (click)="setTextToTextArea($event, option)"
        >
          <wtf2-card class="breakline wtf2-elevation-z">
            <wtf2-card-content>
              {{ option.text }}
            </wtf2-card-content>
          </wtf2-card>
        </button>
      </ng-template>
      <button wtf2-menu-item (click)="openAddnewDialogue()">
        <wtf2-icon>add</wtf2-icon> Add new
      </button>
    </wtf2-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class InputTextareaComponent extends InputBase implements OnInit {
  // public config: InlineTextareaConfig;
  // onSaveDialog
  public config: InlineTextareaConfig;
  options: any;

  @ViewChild('inputRef', { static: false }) textareaInputRef: ElementRef;

  formConfig = this.config.dynamicformfields;

  constructor(public dailog: Wtf2Dialog, injector: Injector) {
    super(injector);
    this.isRegexTestable = true;
    this.isLengthTestable = true;
    this.options = this.config.options;
  }

  onUpdateConfig(config: InlineSelectConfig) {
    super.onUpdateConfig(config);

    const { options } = this.config;
    this.config.options =
      options instanceof Array
        ? {
            data: options,
            value: 'value',
            text: 'text'
          }
        : options;

    this.options = this.config.options;

    this.config = { ...this.config };
  }

  ngOnInit() {}

  onClick($event) {
    this.textareaInputRef.nativeElement.innerHTML = this.value.text;
    console.log('onClick' + this.value);
  }
  onFocus($event) {
    this.textareaInputRef.nativeElement.innerHTML = this.value.text;
    console.log('onFocus' + this.value.text);
  }
  onBlur($event) {
    this.textareaInputRef.nativeElement.innerHTML = this.value.text;
    console.log('onBlur' + this.value);
  }
  onChange($event) {
    this.textareaInputRef.nativeElement.innerHTML = $event.target.value;
    this.value.text = $event.target.value;
    console.log('onChange' + this.value);
  }

  setTextToTextArea($event, option) {
    // console.log($event.srcElement);
    this.textareaInputRef.nativeElement.innerHTML = option.text;
    this.textareaInputRef.nativeElement.value = option.text;
    this.value = option;
    // console.log();
  }

  // onKeyPress($event) {
  //     console.log($event);
  // }

  // openAddnewDialogue($event) {
  //     console.log('opened add new dialogue');
  // }

  openAddnewDialogue() {
    const dialogConfig = new Wtf2DialogConfig();
    dialogConfig.data = {
      id: 1,
      title: this.config.dynamicformfields
    };
    dialogConfig.disableClose = true;
    dialogConfig.height = '100vh';
    dialogConfig.width = '400px';
    dialogConfig.position = { right: '0%' };
    const dialogref = this.dailog.open(DialogDataExampleDialog, dialogConfig);
    dialogref.afterClosed().subscribe($event => {
      const value = dialogref.componentInstance.data;

      var text = '';
      var jsonObj = [];
      var item = {};
      var myObj = {};

      if (value != '') {
        myObj = JSON.parse(JSON.stringify(value));
        for (var x in myObj) {
          if (myObj.hasOwnProperty(x) && myObj[x] != null) {
            text += myObj[x] + ' ';
          }
        }
      }
      item['text'] = text;
      item['id'] = '6';
      item['json'] = JSON.stringify(value);
      jsonObj.push(item);
      this.value = item;
      this.textareaInputRef.nativeElement.innerHTML = text;
      this.textareaInputRef.nativeElement.value = text;
    });
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  styles: [
    `
      wtf2-form-field {
        width: 100%;
      }
      .dialog-form {
        width: 100%;
      }
    `
  ]
})
export class DialogDataExampleDialog implements OnInit {
  formConfig: FieldConfig[] = [];
  options: any;

  @ViewChild('inputRef', { static: false }) textareaInputRef: ElementRef;
  @ViewChild(DynamicFormComponent, { static: false }) form: DynamicFormComponent;
  // formConfig = this.config.dynamicformfields;

  constructor(
    private dialog: Wtf2Dialog,
    public dialogRef: Wtf2DialogRef<any>,
    private fb: FormBuilder,
    @Inject(WTF2_DIALOG_DATA) public data,
    private userServices: UserService
  ) {
    this.formConfig = data.title;
  }
  formGroup: FormGroup;

  test($event) {
    this.dialogRef.close(this.formGroup);

    // console.log();
  }
  submit(value: any) {
    console.log(value);
    this.dialogRef.componentInstance.data = value;
  }
  close(value: any) {
    this.dialogRef.componentInstance.data = '';
    this.dialogRef.close();
  }

  ngOnInit() {
    // // this.formGroup = this.fb.group({
    // //     name: ['', Validators.required],
    // //     age: ['', Validators.required]
    // // });
    // this.formGroup = new FormGroup({
    //     firstName: new FormControl(),
    //     addressline1: new FormControl(),
    //     addressline2: new FormControl(),
    //     city: new FormControl(),
    //     state: new FormControl(),
    //     country: new FormControl(),
    //     postal: new FormControl(),
    // });
  }
}




