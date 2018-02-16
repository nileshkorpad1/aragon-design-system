`<wtf2-select>` is a form control for selecting a value from a set of options, similar to the native
`<select>` element. You can read more about selects in the
[Material Design spec](https://material.io/design/components/menus.html). It is designed to work
inside of a [`<wtf2-form-field>`](https://material.angular.io/components/form-field/overview)
element.

To add options to the select, add `<wtf2-option>` elements to the `<wtf2-select>`. Each `<wtf2-option>`
has a `value` property that can be used to set the value that will be selected if the user chooses
this option. The content of the `<wtf2-option>` is what will be shown to the user.

Angular Material also supports use of the native `<select>` element inside of
`<wtf2-form-field>`. The native control has several performance, accessibility,
and usability advantages. See [the documentation for
form-field](https://material.angular.io/components/form-field) for more inFormation.

To use a native select inside `<wtf2-form-field>`, add  the `wtf2NativeControl` attribute
to the `<select>` element.

<!-- example(select-overview) -->

### Getting and setting the select value

The `<wtf2-select>` supports 2-way binding to the `value` property without the need for Angular
forms.

<!-- example(select-value-binding) -->

Both`<wtf2-select>` and `<select>` support all of the form directives from the core `FormsModule` (`NgModel`) and
`ReactiveFormsModule` (`FormControl`, `FormGroup`, etc.) As with native `<select>`, `<wtf2-select>`
also supports a `compareWith` function. (Additional inFormation about using a custom `compareWith`
function can be found in the
[Angular forms documentation](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection)).

<!-- example(select-form) -->

### Form field features

There are a number of `<wtf2-form-field>` features that can be used with both `<select>` and `<wtf2-select>`. These
include error messages, hint text, prefix & suffix, and theming. For additional inFormation about
these features, see the
[form field documentation](https://material.angular.io/components/form-field/overview).

<!-- example(select-hint-error) -->

### Setting a static placeholder

The placeholder is text shown when the `<wtf2-form-field>` label is floating but the `<wtf2-select>`
is empty. It is used to give the user an additional hint about the value they should select. The
placeholder can be specified by setting the `placeholder` attribute on the `<wtf2-select>` element.
In some cases that `<wtf2-form-field>` may use the placeholder as the label (see the
[form field label documentation](https://material.angular.io/components/form-field/overview#floating-label)).

### Disabling the select or individual options

It is possible to disable the entire select or individual options in the select by using the
disabled property on the `<select>` or `<wtf2-select>` and the `<option>` or <wtf2-option>` elements respectively.

<!-- example(select-disabled) -->

### Resetting the select value

If you want one of your options to reset the select's value, you can omit specifying its value.

<!-- example(select-reset) -->

### Creating groups of options

The `<wtf2-optgroup>` element can be used to group common options under a subheading. The name of the
group can be set using the `label` property of `<wtf2-optgroup>`. Like individual `<wtf2-option>`
elements, an entire `<wtf2-optgroup>` can be disabled or enabled by setting the `disabled` property
on the group.

<!-- example(select-optgroup) -->

### Multiple selection

`<wtf2-select>` defaults to single-selection mode, but can be configured to allow multiple selection
by setting the `multiple` property. This will allow the user to select multiple values at once. When
using the `<wtf2-select>` in multiple selection mode, its value will be a sorted list of all selected
values rather than a single value.

Using multiple selection with a native select element (`<select multiple>`) is discouraged
inside `<wtf2-form-field>`, as the inline listbox appearance is inconsistent with other
Material Design components.

<!-- example(select-multiple) -->

### Customizing the trigger label

If you want to display a custom trigger label inside a `<wtf2-select>`, you can use the
`<wtf2-select-trigger>` element.

<!-- example(select-custom-trigger) -->

### Disabling the ripple effect

By default, when a user clicks on a `<wtf2-option>`, a ripple animation is shown. This can be disabled
by setting the `disableRipple` property on `<wtf2-select>`.

<!-- example(select-no-ripple) -->

### Adding custom styles to the dropdown panel

In order to facilitate easily styling the dropdown panel, `<wtf2-select>` has a `panelClass` property
which can be used to apply additional CSS classes to the dropdown panel.

<!-- example(select-panel-class) -->

### Changing when error messages are shown

The `<wtf2-form-field>` allows you to
[associate error messages](https://material.angular.io/components/form-field/overview#error-messages)
with your `<select>` or `<wtf2-select>`. By default, these error messages are shown when the control is invalid and
either the user has interacted with (touched) the element or the parent form has been submitted. If
you wish to override this behavior (e.g. to show the error as soon as the invalid control is dirty
or when a parent form group is invalid), you can use the `errorStateMatcher` property of the
`<wtf2-select>`. The property takes an instance of an `ErrorStateMatcher` object. An
`ErrorStateMatcher` must implement a single method `isErrorState` which takes the `FormControl` for
this `<wtf2-select>` as well as the parent form and returns a boolean indicating whether errors
should be shown. (`true` indicating that they should be shown, and `false` indicating that they
should not.)

<!-- example(select-error-state-matcher) -->

A global error state matcher can be specified by setting the `ErrorStateMatcher` provider. This
applies to all inputs. For convenience, `ShowOnDirtyErrorStateMatcher` is available in order to
globally cause input errors to show when the input is dirty and invalid.

```ts
@NgModule({
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
```

### Keyboard interaction

- <kbd>DOWN_ARROW</kbd>: Focus next option
- <kbd>UP_ARROW</kbd>: Focus previous option
- <kbd>ENTER</kbd> or <kbd>SPACE</kbd>: Select focused item

### Accessibility

The `<wtf2-select>` component without text or label should be given a meaningful label via
`aria-label` or `aria-labelledby`.

The `<wtf2-select>` component has `role="listbox"` and options inside select have `role="option"`.

The native `<select>` offers the best accessibility because it is supported directly by screen-readers.

### Troubleshooting

#### Error: Cannot change `multiple` mode of select after initialization

This error is thrown if you attempt to bind the `multiple` property on `<wtf2-select>` to a dynamic
value. (e.g. `[multiple]="isMultiple"` where the value of `isMultiple` changes over the course of
the component's lifetime). If you need to change this dynamically, use `ngIf` or `ngSwitch` instead:

```html
<wtf2-select *ngIf="isMultiple" multiple>
  ...
</wtf2-select>
<wtf2-select *ngIf="!isMultiple">
  ...
</wtf2-select>
```

#### Error: Value must be an array in multiple-selection mode

This error is thrown if you attempt to assign a value other than `null`, `undefined`, or an array to
a `<wtf2-select multiple>`. For example, something like `mySelect.value = 'option1'`. What you likely
meant to do was `mySelect.value = ['option1']`.

#### Error: `compareWith` must be a function

This error occurs if you attempt to assign something other than a function to the `compareWith`
property. For more inFormation on proper usage of `compareWith` see the
[Angular forms documentation](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection)).
