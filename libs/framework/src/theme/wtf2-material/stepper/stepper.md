Angular Material's stepper provides a wizard-like workflow by dividing content into logical steps.

<!-- example(stepper-overview) -->

Material stepper builds on the foundation of the CDK stepper that is responsible for the logic
that drives a stepped workflow. Material stepper extends the CDK stepper and has Material Design
styling.

### Stepper variants
There are two stepper components: `wtf2-horizontal-stepper` and `wtf2-vertical-stepper`. They
can be used the same way. The only difference is the orientation of stepper.

<!-- example(stepper-vertical) -->

`wtf2-horizontal-stepper` selector can be used to create a horizontal stepper, and
`wtf2-vertical-stepper` can be used to create a vertical stepper. `wtf2-step` components need to be
placed inside either one of the two stepper components.

### Labels
If a step's label is only text, then the `label` attribute can be used.
```html
<wtf2-vertical-stepper>
  <wtf2-step label="Step 1">
    Content 1
  </wtf2-step>
  <wtf2-step label="Step 1">
    Content 2
  </wtf2-step>
</wtf2-vertical-stepper>
```

For more complex labels, add a template with the `wtf2StepLabel` directive inside the
`wtf2-step`.
```html
<wtf2-vertical-stepper>
  <wtf2-step>
    <ng-template wtf2StepLabel>...</ng-template>
    ...
  </wtf2-step>
</wtf2-vertical-stepper>
```

#### Label position
For `wtf2-horizontal-stepper` it's possible to define the position of the label. `end` is the
default value, while `bottom` will place it under the step icon instead of at its side.
This behaviour is controlled by `labelPosition` property.

<!-- example(stepper-label-position-bottom) -->

### Stepper buttons
There are two button directives to support navigation between different steps:
`wtf2StepperPrevious` and `wtf2StepperNext`.
```html
<wtf2-horizontal-stepper>
  <wtf2-step>
    ...
    <div>
      <button wtf2-button wtf2StepperPrevious>Back</button>
      <button wtf2-button wtf2StepperNext>Next</button>
    </div>
  </wtf2-step>
</wtf2-horizontal-stepper>
```

### Linear stepper
The `linear` attribute can be set on `wtf2-horizontal-stepper` and `wtf2-vertical-stepper` to create
a linear stepper that requires the user to complete previous steps before proceeding to following
steps. For each `wtf2-step`, the `stepControl` attribute can be set to the top level
`AbstractControl` that is used to check the validity of the step.

There are two possible approaches. One is using a single form for stepper, and the other is
using a different form for each step.

Alternatively, if you don't want to use the Angular forms, you can pass in the `completed` property
to each of the steps which won't allow the user to continue until it becomes `true`. Note that if
both `completed` and `stepControl` are set, the `stepControl` will take precedence.

#### Using a single form
When using a single form for the stepper, `wtf2StepperPrevious` and `wtf2StepperNext` have to be
set to `type="button"` in order to prevent submission of the form before all steps
are completed.

```html
<form [formGroup]="formGroup">
  <wtf2-horizontal-stepper formArrayName="formArray" linear>
    <wtf2-step formGroupName="0" [stepControl]="formArray.get([0])">
      ...
      <div>
        <button wtf2-button wtf2StepperNext type="button">Next</button>
      </div>
    </wtf2-step>
    <wtf2-step formGroupName="1" [stepControl]="formArray.get([1])">
      ...
      <div>
        <button wtf2-button wtf2StepperPrevious type="button">Back</button>
        <button wtf2-button wtf2StepperNext type="button">Next</button>
      </div>
    </wtf2-step>
    ...
  </wtf2-horizontal-stepper>
</form>
```

#### Using a different form for each step
```html
<wtf2-vertical-stepper linear>
  <wtf2-step [stepControl]="formGroup1">
    <form [formGroup]="formGroup1">
      ...
    </form>
  </wtf2-step>
  <wtf2-step [stepControl]="formGroup2">
    <form [formGroup]="formGroup2">
      ...
    </form>
  </wtf2-step>
</wtf2-vertical-stepper>
```
### Types of steps

#### Optional step
If completion of a step in linear stepper is not required, then the `optional` attribute can be set
on `wtf2-step`.

<!-- example(stepper-optional) -->


#### Editable step
By default, steps are editable, which means users can return to previously completed steps and
edit their responses. `editable="false"` can be set on `wtf2-step` to change the default.

<!-- example(stepper-editable) -->

#### Completed step
By default, the `completed` attribute of a step returns `true` if the step is valid (in case of
linear stepper) and the user has interacted with the step. The user, however, can also override
this default `completed` behavior by setting the `completed` attribute as needed.

#### Overriding icons
By default, the step headers will use the `create` and `done` icons from the Material design icon
set via `<wtf2-icon>` elements. If you want to provide a different set of icons, you can do so
by placing a `wtf2StepperIcon` for each of the icons that you want to override. The `index`,
`active`, and `optional` values of the individual steps are available through template variables:

```html
<wtf2-vertical-stepper>
  <ng-template wtf2StepperIcon="edit">
    <wtf2-icon>insert_drive_file</wtf2-icon>
  </ng-template>

  <ng-template wtf2StepperIcon="done">
    <wtf2-icon>done_all</wtf2-icon>
  </ng-template>

  <!-- Custom icon with a context variable. -->
  <ng-template wtf2StepperIcon="number" let-index="index">
    {{index + 10}}
  </ng-template>

  <!-- Stepper steps go here -->
</wtf2-vertical-stepper>
```

Note that you aren't limited to using the `wtf2-icon` component when providing custom icons.

#### Step States
You can set the state of a step to whatever you want. The given state by default maps to an icon.
However, it can be overridden the same way as mentioned above.

```html
<wtf2-horizontal-stepper>
  <wtf2-step label="Step 1" state="phone">
    <p>Put down your phones.</p>
    <div>
      <button wtf2-button wtf2StepperNext>Next</button>
    </div>
  </wtf2-step>
  <wtf2-step label="Step 2" state="chat">
    <p>Socialize with each other.</p>
    <div>
      <button wtf2-button wtf2StepperPrevious>Back</button>
      <button wtf2-button wtf2StepperNext>Next</button>
    </div>
  </wtf2-step>
  <wtf2-step label="Step 3">
    <p>You're welcome.</p>
  </wtf2-step>

  <!-- Icon overrides. -->
  <ng-template wtf2StepperIcon="phone">
    <wtf2-icon>call_end</wtf2-icon>
  </ng-template>
  <ng-template wtf2StepperIcon="chat">
    <wtf2-icon>forum</wtf2-icon>
  </ng-template>
</wtf2-horizontal-stepper>
```

In order to use the custom step states, you must add the `displayDefaultIndicatorType` option to
the global default stepper options which can be specified by providing a value for
`STEPPER_GLOBAL_OPTIONS` in your application's root module.

```ts
@NgModule({
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
```

<!-- example(stepper-states) -->

### Error State

The stepper can now show error states by simply providing the `showError` option to the
`STEPPER_GLOBAL_OPTIONS` in your application's root module as mentioned above.

```ts
@NgModule({
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
```

<!-- example(stepper-errors) -->

### Keyboard interaction
- <kbd>LEFT_ARROW</kbd>: Focuses the previous step header
- <kbd>RIGHT_ARROW</kbd>: Focuses the next step header
- <kbd>HOME</kbd>: Focuses the first step header
- <kbd>END</kbd>: Focuses the last step header
- <kbd>ENTER</kbd>, <kbd>SPACE</kbd>: Selects the step that the focus is currently on
- <kbd>TAB</kbd>: Focuses the next tabbable element
- <kbd>SHIFT</kbd>+<kbd>TAB</kbd>: Focuses the previous tabbable element

### Localizing labels
Labels used by the stepper are provided through `Wtf2StepperIntl`. Localization of these messages
can be done by providing a subclass with translated values in your application root module.

```ts
@NgModule({
  imports: [Wtf2StepperModule],
  providers: [
    {provide: Wtf2StepperIntl, useClass: MyIntl},
  ],
})
export class MyApp {}
```

### Accessibility
The stepper is treated as a tabbed view for accessibility purposes, so it is given
`role="tablist"` by default. The header of step that can be clicked to select the step
is given `role="tab"`, and the content that can be expanded upon selection is given
`role="tabpanel"`. `aria-selected` attribute of step header and `aria-expanded` attribute of
step content is autowtf2ically set based on step selection change.

The stepper and each step should be given a meaningful label via `aria-label` or `aria-labelledby`.
