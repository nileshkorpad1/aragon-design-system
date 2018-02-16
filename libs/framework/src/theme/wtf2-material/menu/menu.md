`<wtf2-menu>` is a floating panel containing list of options.

<!-- example(menu-overview) -->

By itself, the `<wtf2-menu>` element does not render anything. The menu is attached to and opened
via application of the `wtf2MenuTriggerFor` directive:
```html
<wtf2-menu #appMenu="wtf2Menu">
  <button wtf2-menu-item>Settings</button>
  <button wtf2-menu-item>Help</button>
</wtf2-menu>

<button wtf2-icon-button [wtf2MenuTriggerFor]="appMenu">
  <wtf2-icon>more_vert</wtf2-icon>
</button>
```

### Toggling the menu programwtf2ically
The menu exposes an API to open/close programwtf2ically. Please note that in this case, an
`wtf2MenuTriggerFor` directive is still necessary to attach the menu to a trigger element in the DOM.

```ts
class MyComponent {
  @ViewChild(Wtf2MenuTrigger) trigger: Wtf2MenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
```

### Icons
Menus support displaying `wtf2-icon` elements before the menu item text.

*my-comp.html*
```html
<wtf2-menu #menu="wtf2Menu">
  <button wtf2-menu-item>
    <wtf2-icon>dialpad</wtf2-icon>
    <span>Redial</span>
  </button>
  <button wtf2-menu-item disabled>
    <wtf2-icon>voicemail</wtf2-icon>
    <span>Check voicemail</span>
  </button>
  <button wtf2-menu-item>
    <wtf2-icon>notifications_off</wtf2-icon>
    <span>Disable alerts</span>
  </button>
</wtf2-menu>
```

### Customizing menu position

By default, the menu will display below (y-axis), after (x-axis), without overlapping
its trigger. The position can be changed using the `xPosition` (`before | after`) and `yPosition`
(`above | below`) attributes. The menu can be forced to overlap the trigger using the
`overlapTrigger` attribute.

```html
<wtf2-menu #appMenu="wtf2Menu" yPosition="above">
  <button wtf2-menu-item>Settings</button>
  <button wtf2-menu-item>Help</button>
</wtf2-menu>

<button wtf2-icon-button [wtf2MenuTriggerFor]="appMenu">
  <wtf2-icon>more_vert</wtf2-icon>
</button>
```

<!-- example(menu-position) -->

### Nested menu

Material supports the ability for an `wtf2-menu-item` to open a sub-menu. To do so, you have to define
your root menu and sub-menus, in addition to setting the `[wtf2MenuTriggerFor]` on the `wtf2-menu-item`
that should trigger the sub-menu:

```html
<wtf2-menu #rootMenu="wtf2Menu">
  <button wtf2-menu-item [wtf2MenuTriggerFor]="subMenu">Power</button>
  <button wtf2-menu-item>System settings</button>
</wtf2-menu>

<wtf2-menu #subMenu="wtf2Menu">
  <button wtf2-menu-item>Shut down</button>
  <button wtf2-menu-item>Restart</button>
  <button wtf2-menu-item>Hibernate</button>
</wtf2-menu>

<button wtf2-icon-button [wtf2MenuTriggerFor]="rootMenu">
  <wtf2-icon>more_vert</wtf2-icon>
</button>
```

<!-- example(nested-menu) -->

### Lazy rendering
By default, the menu content will be initialized even when the panel is closed. To defer
initialization until the menu is open, the content can be provided as an `ng-template`
with the `wtf2MenuContent` attribute:

```html
<wtf2-menu #appMenu="wtf2Menu">
  <ng-template wtf2MenuContent>
    <button wtf2-menu-item>Settings</button>
    <button wtf2-menu-item>Help</button>
  </ng-template>
</wtf2-menu>

<button wtf2-icon-button [wtf2MenuTriggerFor]="appMenu">
  <wtf2-icon>more_vert</wtf2-icon>
</button>
```

### Passing in data to a menu
When using lazy rendering, additional context data can be passed to the menu panel via
the `wtf2MenuTriggerData` input. This allows for a single menu instance to be rendered
with a different set of data, depending on the trigger that opened it:

```html
<wtf2-menu #appMenu="wtf2Menu">
  <ng-template wtf2MenuContent let-name="name">
    <button wtf2-menu-item>Settings</button>
    <button wtf2-menu-item>Log off {{name}}</button>
  </ng-template>
</wtf2-menu>

<button wtf2-icon-button [wtf2MenuTriggerFor]="appMenu" [wtf2MenuTriggerData]="{name: 'Sally'}">
  <wtf2-icon>more_vert</wtf2-icon>
</button>

<button wtf2-icon-button [wtf2MenuTriggerFor]="appMenu" [wtf2MenuTriggerData]="{name: 'Bob'}">
  <wtf2-icon>more_vert</wtf2-icon>
</button>
```

### Keyboard interaction
- <kbd>DOWN_ARROW</kbd>: Focuses the next menu item
- <kbd>UP_ARROW</kbd>: Focuses previous menu item
- <kbd>RIGHT_ARROW</kbd>: Opens the menu item's sub-menu
- <kbd>LEFT_ARROW</kbd>: Closes the current menu, if it is a sub-menu
- <kbd>ENTER</kbd>: Activates the focused menu item
- <kbd>ESCAPE</kbd>: Closes the menu

### Accessibility
Menu triggers or menu items without text or labels should be given a meaningful label via
`aria-label` or `aria-labelledby`.
