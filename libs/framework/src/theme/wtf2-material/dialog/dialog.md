The `Wtf2Dialog` service can be used to open modal dialogs with Material Design styling and
animations.

<!-- example(dialog-overview) -->

A dialog is opened by calling the `open` method with a component to be loaded and an optional
config object. The `open` method will return an instance of `Wtf2DialogRef`:

```ts
let dialogRef = dialog.open(UserProfileComponent, {
  height: '400px',
  width: '600px',
});
```

The `Wtf2DialogRef` provides a handle on the opened dialog. It can be used to close the dialog and to
receive notification when the dialog has been closed.

```ts
dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`); // Pizza!
});

dialogRef.close('Pizza!');
```

Components created via `Wtf2Dialog` can _inject_ `Wtf2DialogRef` and use it to close the dialog
in which they are contained. When closing, an optional result value can be provided. This result
value is forwarded as the result of the `afterClosed` promise.

```ts
@Component({/* ... */})
export class YourDialog {
  constructor(public dialogRef: Wtf2DialogRef<YourDialog>) { }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
```

### Specifying global configuration defaults
Default dialog options can be specified by providing an instance of `Wtf2DialogConfig` for
WTF2_DIALOG_DEFAULT_OPTIONS in your application's root module.

```ts
@NgModule({
  providers: [
    {provide: WTF2_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
```

### Sharing data with the Dialog component.
If you want to share data with your dialog, you can use the `data`
option to pass inFormation to the dialog component.

```ts
let dialogRef = dialog.open(YourDialog, {
  data: { name: 'austin' },
});
```

To access the data in your dialog component, you have to use the WTF2_DIALOG_DATA injection token:

```ts
import {Component, Inject} from '@angular/core';
import {WTF2_DIALOG_DATA} from '@wtf2/theme/wtf2-material';

@Component({
  selector: 'your-dialog',
  template: 'passed in {{ data.name }}',
})
export class YourDialog {
  constructor(@Inject(WTF2_DIALOG_DATA) public data: any) { }
}
```

<!-- example(dialog-data) -->

### Dialog content
Several directives are available to make it easier to structure your dialog content:

| Name                   | Description                                                                                                   |
|------------------------|---------------------------------------------------------------------------------------------------------------|
| `wtf2-dialog-title`     | \[Attr] Dialog title, applied to a heading element (e.g., `<h1>`, `<h2>`)                                     |
| `<wtf2-dialog-content>` | Primary scrollable content of the dialog.                                                                     |
| `<wtf2-dialog-actions>` | Container for action buttons at the bottom of the dialog. Button alignment can be controlled via the `align` attribute which can be set to `end` and `center`.                                                      |
| `wtf2-dialog-close`     | \[Attr] Added to a `<button>`, makes the button close the dialog with an optional result from the bound value.|

For example:
```html
<h2 wtf2-dialog-title>Delete all</h2>
<wtf2-dialog-content>Are you sure?</wtf2-dialog-content>
<wtf2-dialog-actions>
  <button wtf2-button wtf2-dialog-close>No</button>
  <!-- The wtf2-dialog-close directive optionally accepts a value as a result for the dialog. -->
  <button wtf2-button [wtf2-dialog-close]="true">Yes</button>
</wtf2-dialog-actions>
```

Once a dialog opens, the dialog will autowtf2ically focus the first tabbable element.

You can control which elements are tab stops with the `tabindex` attribute

```html
<button wtf2-button tabindex="-1">Not Tabbable</button>
```

<!-- example(dialog-content) -->

### Configuring dialog content via `entryComponents`

Because `Wtf2Dialog` instantiates components at run-time, the Angular compiler needs extra
inFormation to create the necessary `ComponentFactory` for your dialog content component.

For any component loaded into a dialog, you must include your component class in the list of
`entryComponents` in your NgModule definition so that the Angular compiler knows to create
the `ComponentFactory` for it.

```ts
@NgModule({
  imports: [
    // ...
    Wtf2DialogModule
  ],

  declarations: [
    AppComponent,
    ExampleDialogComponent
  ],

  entryComponents: [
    ExampleDialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Accessibility
By default, each dialog has `role="dialog"` on the root element. The role can be changed to
`alertdialog` via the `Wtf2DialogConfig` when opening.

The `aria-label`, `aria-labelledby`, and `aria-describedby` attributes can all be set to the
dialog element via the `Wtf2DialogConfig` as well. Each dialog should typically have a label
set via `aria-label` or `aria-labelledby`.

When a dialog is opened, it will move focus to the first focusable element that it can find. In
order to prevent users from tabbing into elements in the background, the Material dialog uses
a [focus trap](https://material.angular.io/cdk/a11y/overview#focustrap) to contain focus
within itself. Once a dialog is closed, it will return focus to the element that was focused
before the dialog was opened.

If you're adding a close button that doesn't have text (e.g. a purely icon-based button), make sure
that it has a meaningful `aria-label` so that users with assistive technology know what it is used
for.

#### Focus management
By default, the first tabbable element within the dialog will receive focus upon open. This can
be configured by setting the `cdkFocusInitial` attribute on another focusable element.

Tabbing through the elements of the dialog will keep focus inside of the dialog element,
wrapping back to the first tabbable element when reaching the end of the tab sequence.

#### Keyboard interaction
By default pressing the escape key will close the dialog. While this behavior can
be turned off via the `disableClose` option, users should generally avoid doing so
as it breaks the expected interaction pattern for screen-reader users.
