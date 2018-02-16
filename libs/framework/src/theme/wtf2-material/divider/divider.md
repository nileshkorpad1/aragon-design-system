`<wtf2-divider>` is a component that allows for Material styling of a line separator with various orientation options.

<!-- example(divider-overview) -->


### Simple divider

A `<wtf2-divider>` element can be used on its own to create a horizontal or vertical line styled with a Material theme

```html
<wtf2-divider></wtf2-divider>
```

### Inset divider

Add the `inset` attribute in order to set whether or not the divider is an inset divider.

```html
<wtf2-divider [inset]="true"></wtf2-divider>
```

### Vertical divider

Add the `vertical` attribute in order to set whether or not the divider is vertically-oriented.

```html
<wtf2-divider [vertical]="true"></wtf2-divider>
```


### Lists with inset dividers

Dividers can be added to lists as a means of separating content into distinct sections.
Inset dividers can also be added to provide the appearance of distinct elements in a list without cluttering content
like avatar images or icons. Make sure to avoid adding an inset divider to the last element
in a list, because it will overlap with the section divider.

```html
<wtf2-list>
   <h3 wtf2-subheader>Folders</h3>
   <wtf2-list-item *ngFor="let folder of folders; last as last">
      <wtf2-icon wtf2-list-icon>folder</wtf2-icon>
      <h4 wtf2-line>{{folder.name}}</h4>
      <p wtf2-line class="demo-2"> {{folder.updated}} </p>
      <wtf2-divider [inset]="true" *ngIf="!last"></wtf2-divider>
   </wtf2-list-item>
   <wtf2-divider></wtf2-divider>
   <h3 wtf2-subheader>Notes</h3>
   <wtf2-list-item *ngFor="let note of notes">
      <wtf2-icon wtf2-list-icon>note</wtf2-icon>
      <h4 wtf2-line>{{note.name}}</h4>
      <p wtf2-line class="demo-2"> {{note.updated}} </p>
   </wtf2-list-item>
</wtf2-list>
```
