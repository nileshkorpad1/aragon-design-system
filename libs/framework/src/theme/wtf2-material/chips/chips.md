`<wtf2-chip-list>` displays a list of values as individual, keyboard accessible, chips.

<!-- example(chips-overview) -->

```html
<wtf2-chip-list>
  <wtf2-chip>Papadum</wtf2-chip>
  <wtf2-chip>Naan</wtf2-chip>
  <wtf2-chip>Dal</wtf2-chip>
</wtf2-chip-list>
```

### Unstyled chips
By default, `<wtf2-chip>` has Material Design styles applied. For a chip with no styles applied,
use `<wtf2-basic-chip>`. You can then customize the chip appearance by adding your own CSS.

_Hint: `<wtf2-basic-chip>` receives the `wtf2-basic-chip` CSS class in addition to the `wtf2-chip` class._

### Selection
Chips can be selected via the `selected` property. Selection can be disabled by setting
`selectable` to `false` on the `<wtf2-chip-list>`.

Whenever the selection state changes, a `ChipSelectionChange` event will be emitted via
`(selectionChange)`.

### Disabled chips
Individual chips may be disabled by applying the `disabled` attribute to the chip. When disabled,
chips are neither selectable nor focusable.

### Chip input
The `Wtf2ChipInput` directive can be used together with a chip-list to streamline the interaction
between the two components. This directive adds chip-specific behaviors to the input element
within `<wtf2-form-field>` for adding and removing chips. The `<input>` with `Wtf2ChipInput` can
be placed inside or outside the chip-list element.

An example of chip input placed inside the chip-list element.
<!-- example(chips-input) -->

An example of chip input placed outside the chip-list element.

```html
<wtf2-form-field>
  <wtf2-chip-list #chipList>
    <wtf2-chip>Chip 1</wtf2-chip>
    <wtf2-chip>Chip 2</wtf2-chip>
  </wtf2-chip-list>
  <input [wtf2ChipInputFor]="chipList">
</wtf2-form-field>
```

An example of chip input with an autocomplete placed inside the chip-list element.
<!-- example(chips-autocomplete) -->

### Keyboard interaction
Users can move through the chips using the arrow keys and select/deselect them with the space. Chips
also gain focus when clicked, ensuring keyboard navigation starts at the appropriate chip.

### Orientation
If you want the chips in the list to be stacked vertically, instead of horizontally, you can apply
the `wtf2-chip-list-stacked` class, as well as the `aria-orientation="vertical"` attribute:

```html
<wtf2-chip-list class="wtf2-chip-list-stacked" aria-orientation="vertical">
  <wtf2-chip>Papadum</wtf2-chip>
  <wtf2-chip>Naan</wtf2-chip>
  <wtf2-chip>Dal</wtf2-chip>
</wtf2-chip-list>
```

### Specifying global configuration defaults
Default options for the chips module can be specified using the `WTF2_CHIPS_DEFAULT_OPTIONS`
injection token.

```ts
@NgModule({
  providers: [
    {
      provide: WTF2_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ]
})
```

### Theming
The selected color of an `<wtf2-chip>` can be changed by using the `color` property. By default, chips
use a neutral background color based on the current theme (light or dark). This can be changed to
`'primary'`, `'accent'`, or `'warn'`.

### Accessibility
A chip-list behaves as a `role="listbox"`, with each chip being a `role="option"`. The chip input
should have a placeholder or be given a meaningful label via `aria-label` or `aria-labelledby`.
