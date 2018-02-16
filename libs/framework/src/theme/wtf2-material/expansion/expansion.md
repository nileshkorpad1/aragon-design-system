`<wtf2-expansion-panel>` provides an expandable details-summary view.

<!-- example(expansion-overview) -->

### Expansion-panel content

Each expansion-panel must include a header and may optionally include an action bar.

#### Header

The `<wtf2-expansion-panel-header>` shows a summary of the panel content and acts
as the control for expanding and collapsing. This header may optionally contain an
`<wtf2-panel-title>` and an `<wtf2-panel-description>`, which Format the content of the
header to align with Material Design specifications.

By default, the expansion-panel header includes a toggle icon at the end of the
header to indicate the expansion state. This icon can be hidden via the
`hideToggle` property.

```html
<wtf2-expansion-panel>
  <wtf2-expansion-panel-header>
    <wtf2-panel-title>
      This is the expansion title
    </wtf2-panel-title>
    <wtf2-panel-description>
      This is a summary of the content
    </wtf2-panel-description>
  </wtf2-expansion-panel-header>

  <p>This is the primary content of the panel.</p>

</wtf2-expansion-panel>
```

#### Action bar

Actions may optionally be included at the bottom of the panel, visible only when the expansion
is in its expanded state.

```html
<wtf2-expansion-panel>
  <wtf2-expansion-panel-header>
    This is the expansion title
  </wtf2-expansion-panel-header>

  <p>This is the primary content of the panel.</p>

  <wtf2-action-row>
    <button wtf2-button>Click me</button>
  </wtf2-action-row>
</wtf2-expansion-panel>
```

#### Disabling a panel

Expansion panels can be disabled using the `disabled` attribute. A disabled expansion panel can't
be toggled by the user, but can still be manipulated programwtf2ically.

```html
<wtf2-expansion-panel [disabled]="isDisabled">
  <wtf2-expansion-panel-header>
    This is the expansion title
  </wtf2-expansion-panel-header>
  <wtf2-panel-description>
    This is a summary of the content
  </wtf2-panel-description>
</wtf2-expansion-panel>
```


### Accordion

Multiple expansion-panels can be combined into an accordion. The `multi="true"` input allows the
expansions state to be set independently of each other. When `multi="false"` (default) just one
panel can be expanded at a given time:

```html
<wtf2-accordion>

  <wtf2-expansion-panel>
    <wtf2-expansion-panel-header>
      This is the expansion 1 title
    </wtf2-expansion-panel-header>

    This the expansion 1 content

  </wtf2-expansion-panel>

  <wtf2-expansion-panel>
    <wtf2-expansion-panel-header>
      This is the expansion 2 title
    </wtf2-expansion-panel-header>

    This the expansion 2 content

  </wtf2-expansion-panel>

</wtf2-accordion>
```

### Lazy rendering
By default, the expansion panel content will be initialized even when the panel is closed.
To instead defer initialization until the panel is open, the content should be provided as
an `ng-template`:
```html
<wtf2-expansion-panel>
  <wtf2-expansion-panel-header>
    This is the expansion title
  </wtf2-expansion-panel-header>

  <ng-template wtf2ExpansionPanelContent>
    Some deferred content
  </ng-template>
</wtf2-expansion-panel>
```

### Accessibility
The expansion-panel aims to mimic the experience of the native `<details>` and `<summary>` elements.
The expansion panel header has `role="button"` and also the attribute `aria-controls` with the
expansion panel's id as value.

The expansion panel headers are buttons. Users can use the keyboard to activate the expansion panel
header to switch between expanded state and collapsed state. Because the header acts as a button,
additional interactive elements should not be put inside of the header.
