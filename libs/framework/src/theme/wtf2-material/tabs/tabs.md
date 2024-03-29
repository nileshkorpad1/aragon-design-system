Angular Material tabs organize content into separate views where only one view can be
visible at a time. Each tab's label is shown in the tab header and the active
tab's label is designated with the animated ink bar. When the list of tab labels exceeds the width
of the header, pagination controls appear to let the user scroll left and right across the labels.

The active tab may be set using the `selectedIndex` input or when the user selects one of the
tab labels in the header.

<!-- example(tab-group-basic) -->

### Events

The `selectedTabChange` output event is emitted when the active tab changes.

The `focusChange` output event is emitted when the user puts focus on any of the tab labels in
the header, usually through keyboard navigation.

### Labels

If a tab's label is only text then the simple tab-group API can be used.

```html
<wtf2-tab-group>
  <wtf2-tab label="One">
    <h1>Some tab content</h1>
    <p>...</p>
  </wtf2-tab>
  <wtf2-tab label="Two">
    <h1>Some more tab content</h1>
    <p>...</p>
  </wtf2-tab>
</wtf2-tab-group>
```

For more complex labels, add a template with the `wtf2-tab-label` directive inside the `wtf2-tab`.

```html
<wtf2-tab-group>
  <wtf2-tab>
    <ng-template wtf2-tab-label>
      The <em>best</em> pasta
    </ng-template>
    <h1>Best pasta restaurants</h1>
    <p>...</p>
  </wtf2-tab>
  <wtf2-tab>
    <ng-template wtf2-tab-label>
      <wtf2-icon>thumb_down</wtf2-icon> The worst sushi
    </ng-template>
    <h1>Terrible sushi restaurants</h1>
    <p>...</p>
  </wtf2-tab>
</wtf2-tab-group>
```

### Dynamic Height

By default, the tab group will not change its height to the height of the currently active tab. To
change this, set the `dynamicHeight` input to true. The tab body will animate its height according
 to the height of the active tab.

### Tabs and navigation
While `<wtf2-tab-group>` is used to switch between views within a single route, `<nav wtf2-tab-nav-bar>`
provides a tab-like UI for navigating between routes.
```html
<nav wtf2-tab-nav-bar>
  <a wtf2-tab-link
     *ngFor="let link of navLinks"
     [routerLink]="link.path"
     routerLinkActive #rla="routerLinkActive"
     [active]="rla.isActive">
    {{link.label}}
  </a>
</nav>

<router-outlet></router-outlet>
```

The `tab-nav-bar` is not tied to any particular router; it works with normal `<a>` elements and uses
the `active` property to determine which tab is currently active. The corresponding
`<router-outlet>` can be placed anywhere in the view.

### Lazy Loading
By default, the tab contents are eagerly loaded. Eagerly loaded tabs
will initalize the child components but not inject them into the DOM
until the tab is activated.


If the tab contains several complex child components or the tab's contents
rely on DOM calculations during initialization, it is advised
to lazy load the tab's content.

Tab contents can be lazy loaded by declaring the body in a `ng-template`
with the `wtf2TabContent` attribute.

```html
<wtf2-tab-group>
  <wtf2-tab label="First">
    <ng-template wtf2TabContent>
      The First Content
    </ng-template>
  </wtf2-tab>
  <wtf2-tab label="Second">
    <ng-template wtf2TabContent>
      The Second Content
    </ng-template>
  </wtf2-tab>
</wtf2-tab-group>
```

### Label alignment
If you want to align the tab labels in the center or towards the end of the container, you can
do so using the `[wtf2-align-tabs]` attribute.

<!-- example(tab-group-align) -->

### Controlling the tab animation
You can control the duration of the tabs' animation using the `animationDuration` input. If you
want to disable the animation completely, you can do so by setting the properties to `0ms`. The
duration can be configured globally using the `WTF2_TABS_CONFIG` injection token.

<!-- example(tab-group-animations) -->

### Accessibility
Tabs without text or labels should be given a meaningful label via `aria-label` or
`aria-labelledby`. For `Wtf2TabNav`, the `<nav>` element should have a label as well.


#### Keyboard interaction

| Shortcut             | Action                     |
|----------------------|----------------------------|
| `LEFT_ARROW`         | Move focus to previous tab |
| `RIGHT_ARROW`        | Move focus to next tab     |
| `HOME`               | Move focus to first tab    |
| `END`                | Move focus to last tab     |
| `SPACE` or `ENTER`   | Switch to focused tab      |
