`<wtf2-list>` is a container component that wraps and Formats a series of line items. As the base
list component, it provides Material Design styling, but no behavior of its own.

<!-- example(list-overview) -->


### Simple lists

An `<wtf2-list>` element contains a number of `<wtf2-list-item>` elements.

```html
<wtf2-list>
 <wtf2-list-item> Pepper </wtf2-list-item>
 <wtf2-list-item> Salt </wtf2-list-item>
 <wtf2-list-item> Paprika </wtf2-list-item>
</wtf2-list>
```

### Navigation lists

Use `wtf2-nav-list` tags for navigation lists (i.e. lists that have anchor tags).

Simple navigation lists can use the `wtf2-list-item` attribute on anchor tag elements directly:

```html
<wtf2-nav-list>
   <a wtf2-list-item href="..." *ngFor="let link of links"> {{ link }} </a>
</wtf2-nav-list>
```

For more complex navigation lists (e.g. with more than one target per item), wrap the anchor
element in an `<wtf2-list-item>`.

```html
<wtf2-nav-list>
  <wtf2-list-item *ngFor="let link of links">
     <a wtf2Line href="...">{{ link }}</a>
     <button wtf2-icon-button (click)="showInfo(link)">
        <wtf2-icon>info</wtf2-icon>
     </button>
  </wtf2-list-item>
</wtf2-nav-list>
```

### Action lists

Use the `<wtf2-action-list>` element when each item in the list performs some _action_. Each item
in an action list is a `<button>` element.

Simple action lists can use the `wtf2-list-item` attribute on button tag elements directly:

```html
<wtf2-action-list>
  <button wtf2-list-item (click)="save()"> Save </button>
  <button wtf2-list-item (click)="undo()"> Undo </button>
</wtf2-action-list>
```

### Selection lists
A selection list provides an interface for selecting values, where each list item is an option.

<!-- example(list-selection) -->

The options within a selection-list should not contain further interactive controls, such
as buttons and anchors.


### Multi-line lists
For lists that require multiple lines per item, annotate each line with an `wtf2Line` attribute.
Whichever heading tag is appropriate for your DOM hierarchy should be used (not necessarily `<h3>`
as shown in the example).

```html
<!-- two line list -->
<wtf2-list>
  <wtf2-list-item *ngFor="let message of messages">
    <h3 wtf2Line> {{message.from}} </h3>
    <p wtf2Line>
      <span> {{message.subject}} </span>
      <span class="demo-2"> -- {{message.content}} </span>
    </p>
  </wtf2-list-item>
</wtf2-list>

<!-- three line list -->
<wtf2-list>
  <wtf2-list-item *ngFor="let message of messages">
    <h3 wtf2Line> {{message.from}} </h3>
    <p wtf2Line> {{message.subject}} </p>
    <p wtf2Line class="demo-2"> {{message.content}} </p>
  </wtf2-list-item>
</wtf2-list>
```

### Lists with icons

To add an icon to your list item, use the `wtf2ListIcon` attribute.


```html
<wtf2-list>
  <wtf2-list-item *ngFor="let message of messages">
    <wtf2-icon wtf2ListIcon>folder</wtf2-icon>
    <h3 wtf2Line> {{message.from}} </h3>
    <p wtf2Line>
      <span> {{message.subject}} </span>
      <span class="demo-2"> -- {{message.content}} </span>
    </p>
  </wtf2-list-item>
</wtf2-list>
```

### Lists with avatars

To include an avatar image, add an image tag with an `wtf2ListAvatar` attribute.

```html
<wtf2-list>
  <wtf2-list-item *ngFor="let message of messages">
    <img wtf2ListAvatar src="..." alt="...">
    <h3 wtf2Line> {{message.from}} </h3>
    <p wtf2Line>
      <span> {{message.subject}} </span>
      <span class="demo-2"> -- {{message.content}} </span>
    </p>
  </wtf2-list-item>
</wtf2-list>
```

### Dense lists
Lists are also available in "dense layout" mode, which shrinks the font size and height of the list
to suit UIs that may need to display more inFormation. To enable this mode, add a `dense` attribute
to the main `wtf2-list` tag.


```html
<wtf2-list dense>
 <wtf2-list-item> Pepper </wtf2-list-item>
 <wtf2-list-item> Salt </wtf2-list-item>
 <wtf2-list-item> Paprika </wtf2-list-item>
</wtf2-list>
```


### Lists with multiple sections

Subheader can be added to a list by annotating a heading tag with an `wtf2Subheader` attribute.
To add a divider, use `<wtf2-divider>`.

```html
<wtf2-list>
   <h3 wtf2Subheader>Folders</h3>
   <wtf2-list-item *ngFor="let folder of folders">
      <wtf2-icon wtf2ListIcon>folder</wtf2-icon>
      <h4 wtf2Line>{{folder.name}}</h4>
      <p wtf2Line class="demo-2"> {{folder.updated}} </p>
   </wtf2-list-item>
   <wtf2-divider></wtf2-divider>
   <h3 wtf2Subheader>Notes</h3>
   <wtf2-list-item *ngFor="let note of notes">
      <wtf2-icon wtf2ListIcon>note</wtf2-icon>
      <h4 wtf2Line>{{note.name}}</h4>
      <p wtf2Line class="demo-2"> {{note.updated}} </p>
   </wtf2-list-item>
</wtf2-list>
```

### Accessibility
The type of list used in any given situation depends on how the end-user will be interacting with
the it.

#### Navigation
When the list-items navigate somewhere, `<wtf2-nav-list>` should be used with `<a wtf2-list-item>`
elements as the list items. The nav-list will be rendered using `role="navigation"` and can be
given an `aria-label` to give context on the set of navigation options presented. Additional
interactive content, such as buttons, should _not_ be added inside the anchors.

#### Selection
When the list is primarily used to select one or more values, a `<wtf2-selection-list>` should be
used with `<wtf2-list-option>`, which map to `role="listbox"` and `role="option"`, respectively. The
list should be given an `aria-label` that describes the value or values being selected. Each option
should _not_ contain any additional interactive elements, such as buttons.

#### Custom scenarios
By default, the list assumes that it will be used in a purely decorative fashion and thus sets no
roles, ARIA attributes, or keyboard shortcuts. This is equivalent to having a sequence of `<div>`
elements on the page. Any interactive content within the list should be given an appropriate
accessibility treatment based on the specific workflow of your application.

If the list is used to present a list of non-interactive content items, then the list element should
be given `role="list"` and each list item should be given `role="listitem"`.
