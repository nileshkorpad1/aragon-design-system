The `wtf2Sort` and `wtf2-sort-header` are used, respectively, to add sorting state and display
to tabular data.

<!-- example(sort-overview) -->

### Adding sort to table headers

To add sorting behavior and styling to a set of table headers, add the `<wtf2-sort-header>` component
to each header and provide an `id` that will identify it. These headers should be contained within a
parent element with the `wtf2Sort` directive, which will emit an `wtf2SortChange` event when the user
 triggers sorting on the header.

Users can trigger the sort header through a mouse click or keyboard action. When this happens, the
`wtf2Sort` will emit an `wtf2SortChange` event that contains the ID of the header triggered and the
direction to sort (`asc` or `desc`).

#### Changing the sort order

By default, a sort header starts its sorting at `asc` and then `desc`. Triggering the sort header
after `desc` will remove sorting.

To reverse the sort order for all headers, set the `wtf2SortStart` to `desc` on the `wtf2Sort`
directive. To reverse the order only for a specific header, set the `start` input only on the header
instead.

To prevent the user from clearing the sort sort state from an already sorted column, set
`wtf2SortDisableClear` to `true` on the `wtf2Sort` to affect all headers, or set `disableClear` to
`true` on a specific header.

#### Disabling sorting

If you want to prevent the user from changing the sorting order of any column, you can use the
`wtf2SortDisabled` binding on the `wtf2-sort`, or the `disabled` on an single `wtf2-sort-header`.

#### Using sort with the wtf2-table

When used on an `wtf2-table` header, it is not required to set an `wtf2-sort-header` id on because
by default it will use the id of the column.

<!-- example(table-sorting) -->

### Accessibility
The `aria-label` for the sort button can be set in `Wtf2SortHeaderIntl`.
