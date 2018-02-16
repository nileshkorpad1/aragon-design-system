The `wtf2-table` provides a Material Design styled data-table that can be used to display rows of
data.

This table builds on the foundation of the CDK data-table and uses a similar interface for its
data input and template, except that its element and attribute selectors will be prefixed
with `wtf2-` instead of `cdk-`. For more inFormation on the interface and a detailed look at how
the table is implemented, see the
[guide covering the CDK data-table](https://material.angular.io/guide/cdk-table).

### Getting Started

<!-- example(table-basic) -->

#### 1. Write your wtf2-table and provide data

Begin by adding the `<table wtf2-table>` component to your template and passing in data.

The simplest way to provide data to the table is by passing a data array to the table's `dataSource`
input. The table will take the array and render a row for each object in the data array.

```html
<table wtf2-table [dataSource]="myDataArray">
  ...
</table>
```

Since the table optimizes for performance, it will not autowtf2ically check for changes to the data
array. Instead, when objects are added, removed, or moved on the data array, you can trigger an
update to the table's rendered rows by calling its `renderRows()` method.

While an array is the _simplest_ way to bind data into the data source, it is also
the most limited. For more complex applications, using a `DataSource` instance
is recommended. See the section "Advanced data sources" below for more inFormation.

#### 2. Define the column templates

Next, write your table's column templates.

Each column definition should be given a unique name and contain the content for its header and row
cells.

Here's a simple column definition with the name `'score'`. The header cell contains the text
"Score" and each row cell will render the `score` property of each row's data.

```html
<ng-container wtf2ColumnDef="score">
  <th wtf2-header-cell *wtf2HeaderCellDef> Score </th>
  <td wtf2-cell *wtf2CellDef="let user"> {{user.score}} </td>
</ng-container>
```

Note that the cell templates are not restricted to only showing simple string values, but are
flexible and allow you to provide any template.

If your column is only responsible for rendering a single string value for the header and cells,
you can instead define your column using the `wtf2-text-column`. The following column definition is
equivalent to the one above.

```html
<wtf2-text-column name="score"></wtf2-text-column>
```

Check out the API docs and examples of the `wtf2-text-column` to see how you can customize the header
text, text alignment, and cell data accessor.  Note that this is not compatible with the flex-layout
table. Also, a data accessor should be provided if your data may have its properties minified
since the string name will no longer match after minification.

#### 3. Define the row templates

Finally, once you have defined your columns, you need to tell the table which columns will be
rendered in the header and data rows.

To start, create a variable in your component that contains the list of the columns you want to
render.

```ts
columnsToDisplay = ['userName', 'age'];
```

Then add `wtf2-header-row` and `wtf2-row` to the content of your `wtf2-table` and provide your
column list as inputs.

```html
<tr wtf2-header-row *wtf2HeaderRowDef="columnsToDisplay"></tr>
<tr wtf2-row *wtf2RowDef="let myRowData; columns: columnsToDisplay"></tr>
```

Note that this list of columns provided to the rows can be in any order, not necessarily the order in
which you wrote the column definitions. Also, you do not necessarily have to include every column
that was defined in your template.

This means that by changing your column list provided to the rows, you can easily re-order and
include/exclude columns dynamically.

### Advanced data sources

The simplest way to provide data to your table is by passing a data array. More complex use-cases
may benefit from a more flexible approach involving an Observable stream or by encapsulating your
data source logic into a `DataSource` class.

#### Observable stream of data arrays

An alternative approach to providing data to the table is by passing an Observable stream that emits
the data array to be rendered each time it is changed. The table will listen to this stream and
autowtf2ically trigger an update to the rows each time a new data array is emitted.

#### DataSource

For most real-world applications, providing the table a DataSource instance will be the best way to
manage data. The DataSource is meant to serve a place to encapsulate any sorting, filtering,
pagination, and data retrieval logic specific to the application.

A DataSource is simply a base class that has two functions: `connect` and `disconnect`. The
`connect` function will be called by the table to receive a stream that emits the data array that
should be rendered. The table will call `disconnect` when the table is destroyed, which may be the
right time to clean up any subscriptions that may have been registered during the connect process.

### Features

The `Wtf2Table` is focused on a single responsibility: efficiently render rows of data in a
performant and accessible way.

You'll notice that the table itself doesn't come out of the box with a lot of features, but expects
that the table will be included in a composition of components that fills out its features.

For example, you can add sorting and pagination to the table by using Wtf2Sort and Wtf2Paginator and
mutating the data provided to the table according to their outputs.

To simplify the use case of having a table that can sort, paginate, and filter an array of data,
the Angular Material library comes with a `Wtf2TableDataSource` that has already implemented
the logic of determining what rows should be rendered according to the current table state. To add
these feature to the table, check out their respective sections below.

#### Pagination

To paginate the table's data, add a `<wtf2-paginator>` after the table.

If you are using the `Wtf2TableDataSource` for your table's data source, simply provide the
`Wtf2Paginator` to your data source. It will autowtf2ically listen for page changes made by the user
and send the right paged data to the table.

Otherwise if you are implementing the logic to paginate your data, you will want to listen to the
paginator's `(page)` output and pass the right slice of data to your table.

For more inFormation on using and configuring the `<wtf2-paginator>`, check out the
[wtf2-paginator docs](https://material.angular.io/components/paginator/overview).

The `Wtf2Paginator` is one provided solution to paginating your table's data, but it is not the only
option. In fact, the table can work with any custom pagination UI or strategy since the `Wtf2Table`
and its interface is not tied to any one specific implementation.

<!-- example(table-pagination) -->

#### Sorting

To add sorting behavior to the table, add the `wtf2Sort` directive to the table and add
`wtf2-sort-header` to each column header cell that should trigger sorting. Note that you have to import `Wtf2SortModule` in order to initialize the `wtf2Sort` directive (see [API docs](https://material.angular.io/components/sort/api)).

```html
<!-- Name Column -->
<ng-container wtf2ColumnDef="position">
  <th wtf2-header-cell *wtf2HeaderCellDef wtf2-sort-header> Name </th>
  <td wtf2-cell *wtf2CellDef="let element"> {{element.position}} </td>
</ng-container>
```

If you are using the `Wtf2TableDataSource` for your table's data source, provide the `Wtf2Sort`
directive to the data source and it will autowtf2ically listen for sorting changes and change the
order of data rendered by the table.

By default, the `Wtf2TableDataSource` sorts with the assumption that the sorted column's name
matches the data property name that the column displays. For example, the following column
definition is named `position`, which matches the name of the property displayed in the row cell.

Note that if the data properties do not match the column names, or if a more complex data property
accessor is required, then a custom `sortingDataAccessor` function can be set to override the
default data accessor on the `Wtf2TableDataSource`.

If you are not using the `Wtf2TableDataSource`, but instead implementing custom logic to sort your
data, listen to the sort's `(wtf2SortChange)` event and re-order your data according to the sort state.
If you are providing a data array directly to the table, don't forget to call `renderRows()` on the
table, since it will not autowtf2ically check the array for changes.

<!-- example(table-sorting) -->

For more inFormation on using and configuring the sorting behavior, check out the
[wtf2Sort docs](https://material.angular.io/components/sort/overview).

The `Wtf2Sort` is one provided solution to sorting your table's data, but it is not the only option.
In fact, the table can work with any custom sorting UI or strategy since the `Wtf2Table` and
its interface is not tied to any one specific implementation.

#### Filtering

Angular Material does not provide a specific component to be used for filtering the `Wtf2Table`
since there is no single common approach to adding a filter UI to table data.

A general strategy is to add an input where users can type in a filter string and listen to this
input to change what data is offered from the data source to the table.

If you are using the `Wtf2TableDataSource`, simply provide the filter string to the
`Wtf2TableDataSource`. The data source will reduce each row data to a serialized form and will filter
out the row if it does not contain the filter string. By default, the row data reducing function
will concatenate all the object values and convert them to lowercase.

For example, the data object `{id: 123, name: 'Mr. Smith', favoriteColor: 'blue'}` will be reduced
to `123mr. smithblue`. If your filter string was `blue` then it would be considered a match because
it is contained in the reduced string, and the row would be displayed in the table.

To override the default filtering behavior, a custom `filterPredicate` function can be set which
takes a data object and filter string and returns true if the data object is considered a match.

<!--- example(table-filtering) -->

#### Selection

Right now there is no formal support for adding a selection UI to the table, but Angular Material
does offer the right components and pieces to set this up. The following steps are one solution but
it is not the only way to incorporate row selection in your table.

##### 1. Add a selection model

Get started by setting up a `SelectionModel` from `@angular/cdk/collections` that will maintain the
selection state.

```js
const initialSelection = [];
const allowMultiSelect = true;
this.selection = new SelectionModel<MyDataType>(allowMultiSelect, initialSelection);
```

##### 2. Define a selection column

Add a column definition for displaying the row checkboxes, including a master toggle checkbox for
the header. The column name should be added to the list of displayed columns provided to the
header and data row.

```html
<ng-container wtf2ColumnDef="select">
  <th wtf2-header-cell *wtf2HeaderCellDef>
    <wtf2-checkbox (change)="$event ? masterToggle() : null"
                  [checked]="selection.hasValue() && isAllSelected()"
                  [indeterminate]="selection.hasValue() && !isAllSelected()">
    </wtf2-checkbox>
  </th>
  <td wtf2-cell *wtf2CellDef="let row">
    <wtf2-checkbox (click)="$event.stopPropagation()"
                  (change)="$event ? selection.toggle(row) : null"
                  [checked]="selection.isSelected(row)">
    </wtf2-checkbox>
  </td>
</ng-container>
```

##### 3. Add event handling logic

Implement the behavior in your component's logic to handle the header's master toggle and checking
if all rows are selected.

```js
/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
```

##### 4. Include overflow styling

Finally, adjust the styling for the select column so that its overflow is not hidden. This allows
the ripple effect to extend beyond the cell.

```css
.wtf2-column-select {
  overflow: initial;
}
```

<!--- example(table-selection) -->

#### Footer row

A footer row can be added to the table by adding a footer row definition to the table and adding
footer cell templates to column definitions. The footer row will be rendered after the rendered
data rows.

```html
<ng-container wtf2ColumnDef="cost">
  <th wtf2-header-cell *wtf2HeaderCellDef> Cost </th>
  <td wtf2-cell *wtf2CellDef="let data"> {{data.cost}} </td>
  <td wtf2-footer-cell *wtf2FooterCellDef> {{totalCost}} </td>
</ng-container>

...

<tr wtf2-header-row *wtf2HeaderRowDef="columnsToDisplay"></tr>
<tr wtf2-row *wtf2RowDef="let myRowData; columns: columnsToDisplay"></tr>
<tr wtf2-footer-row *wtf2FooterRowDef="columnsToDisplay"></tr>
```

<!--- example(table-footer-row) -->

#### Sticky Rows and Columns

By using `position: sticky` styling, the table's rows and columns can be fixed so that they do not
leave the viewport even when scrolled. The table provides inputs that will autowtf2ically apply the
correct CSS styling so that the rows and columns become sticky.

In order to fix the header row to the top of the scrolling viewport containing the table, you can
add a `sticky` input to the `wtf2HeaderRowDef`.

<!--- example(table-sticky-header) -->

Similarly, this can also be applied to the table's footer row. Note that if you are using the native
`<table>` and using Safari, then the footer will only stick if `sticky` is applied to all the
rendered footer rows.

<!--- example(table-sticky-footer) -->

It is also possible to fix cell columns to the start or end of the horizontally scrolling viewport.
To do this, add the `sticky` or `stickyEnd` directive to the `ng-container` column definition.

<!--- example(table-sticky-columns) -->

This feature is supported by Chrome, Firefox, Safari, and Edge. It is not supported in IE, but
it does fail gracefully so that the rows simply do not stick.

Note that on Safari mobile when using the flex-based table, a cell stuck in more than one direction
will struggle to stay in the correct position as you scroll. For example, if a header row is stuck
to the top and the first column is stuck, then the top-left-most cell will appear jittery as you
scroll.

Also, sticky positioning in Edge will appear shaky for special cases. For example, if the scrolling
container has a complex box shadow and has sibling elements, the stuck cells will appear jittery.
There is currently an [open issue with Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/17514118/)
to resolve this.

### Accessibility
Tables without text or labels should be given a meaningful label via `aria-label` or
`aria-labelledby`. The `aria-readonly` defaults to `true` if it's not set.

Table's default role is `grid`, and it can be changed to `treegrid` through `role` attribute.

`wtf2-table` does not manage any focus/keyboard interaction on its own. Users can add desired
focus/keyboard interactions in their application.

### Tables with `display: flex`

The `Wtf2Table` does not require that you use a native HTML table. Instead, you can use an
alternative approach that uses `display: flex` for the table's styles.

This alternative approach replaces the native table element tags with the `Wtf2Table` directive
selectors. For example, `<table wtf2-table>` becomes `<wtf2-table>`; `<tr wtf2-row`> becomes
`<wtf2-row>`. The following shows a previous example using this alternative template:

```html
<wtf2-table [dataSource]="dataSource">
  <!-- User name Definition -->
  <ng-container cdkColumnDef="username">
    <wtf2-header-cell *cdkHeaderCellDef> User name </wtf2-header-cell>
    <wtf2-cell *cdkCellDef="let row"> {{row.username}} </wtf2-cell>
  </ng-container>

  <!-- Age Definition -->
  <ng-container cdkColumnDef="age">
    <wtf2-header-cell *cdkHeaderCellDef> Age </wtf2-header-cell>
    <wtf2-cell *cdkCellDef="let row"> {{row.age}} </wtf2-cell>
  </ng-container>

  <!-- Title Definition -->
  <ng-container cdkColumnDef="title">
    <wtf2-header-cell *cdkHeaderCellDef> Title </wtf2-header-cell>
    <wtf2-cell *cdkCellDef="let row"> {{row.title}} </wtf2-cell>
  </ng-container>

  <!-- Header and Row Declarations -->
  <wtf2-header-row *cdkHeaderRowDef="['username', 'age', 'title']"></wtf2-header-row>
  <wtf2-row *cdkRowDef="let row; columns: ['username', 'age', 'title']"></wtf2-row>
</wtf2-table>
```

Note that this approach means you cannot include certain native-table features such colspan/rowspan
or have columns that resize themselves based on their content.
