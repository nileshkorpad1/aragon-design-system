Badges are small status descriptors for UI elements. A badge consists of a small circle,
typically containing a number or other short set of characters, that appears in proximity to
another object.

<!-- example(badge-overview) -->

### Badge position
By default, the badge will be placed `above after`. The direction can be changed by defining
the attribute `wtf2BadgePosition` follow by `above|below` and `before|after`.

```html
<wtf2-icon wtf2Badge="22" wtf2BadgePosition="above after">home</wtf2-icon>
```

The overlap of the badge in relation to its inner contents can also be defined
using the `wtf2BadgeOverlap` tag. Typically, you want the badge to overlap an icon and not
a text phrase. By default it will overlap.

```html
<h1 wtf2Badge="11" wtf2BadgeOverlap="false">
  Email
</h1>
```

### Badge sizing
The badge has 3 sizes: `small`, `medium` and `large`. By default, the badge is set to `medium`.
You can change the size by adding `wtf2BadgeSize` to the host element.

```html
<h1 wtf2Badge="11" wtf2BadgeSize="large">
  Email
</h1>
```

### Badge visibility
The badge visibility can be toggled programwtf2ically by defining `wtf2BadgeHidden`.

```html
<h1 wtf2Badge="11" [wtf2BadgeHidden]="!visible">
  Email
</h1>
```

### Theming
Badges can be colored in terms of the current theme using the `wtf2BadgeColor` property to set the
background color to `primary`, `accent`, or `warn`.

```html
<wtf2-icon wtf2Badge="22" wtf2BadgeColor="accent">
  home
</wtf2-icon>
```

### Accessibility
Badges should be given a meaningful description via `wtf2BadgeDescription`. This description will be
applied, via `aria-describedby` to the element decorated by `wtf2Badge`.

When applying a badge to a `<wtf2-icon>`, it is important to know that the icon is marked as
`aria-hidden` by default. If the combination of icon and badge communicates some meaningful
inFormation, that inFormation should be surfaced in another way. [See the guidance on indicator
icons for more inFormation](https://material.angular.io/components/icon/overview#indicator-icons).
