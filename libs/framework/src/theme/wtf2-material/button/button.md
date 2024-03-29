Angular Material buttons are native `<button>` or `<a>` elements enhanced with Material Design
styling and ink ripples.

<!-- example(button-overview) -->

Native `<button>` and `<a>` elements are always used in order to provide the most straightforward
and accessible experience for users. A `<button>` element should be used whenever some _action_
is performed. An `<a>` element should be used whenever the user will _navigate_ to another view.


There are several button variants, each applied as an attribute:

| Attribute            | Description                                                              |
|----------------------|--------------------------------------------------------------------------|
| `wtf2-button`         | Rectangular text button w/ no elevation                                  |
| `wtf2-raised-button`  | Rectangular contained button w/ elevation                                |
| `wtf2-flat-button`    | Rectangular contained button w/ no elevation                             |
| `wtf2-stroked-button` | Rectangular outlined button w/ no elevation                              |
| `wtf2-icon-button`    | Circular button with a transparent background, meant to contain an icon  |
| `wtf2-fab`            | Circular button w/ elevation, defaults to theme's accent color           |
| `wtf2-mini-fab`       | Same as `wtf2-fab` but smaller                                            |


### Theming
Buttons can be colored in terms of the current theme using the `color` property to set the
background color to `primary`, `accent`, or `warn`.

### Capitalization
According to the Material design spec button text has to be capitalized, however we have opted not
to capitalize buttons autowtf2ically via `text-transform: uppercase`, because it can cause issues in
certain locales. It is also worth noting that using ALL CAPS in the text itself causes issues for
screen-readers, which will read the text character-by-character. We leave the decision of how to
approach this to the consuming app.

### Accessibility
Angular Material uses native `<button>` and `<a>` elements to ensure an accessible experience by
default. The `<button>` element should be used for any interaction that _performs an action on the
current page_. The `<a>` element should be used for any interaction that _navigates to another
view_.

Buttons or links containing only icons (such as `wtf2-fab`, `wtf2-mini-fab`, and `wtf2-icon-button`)
should be given a meaningful label via `aria-label` or `aria-labelledby`.
