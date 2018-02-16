The `wtf2-tree` provides a Material Design styled tree that can be used to display hierarchy
data.

This tree builds on the foundation of the CDK tree and uses a similar interface for its
data source input and template, except that its element and attribute selectors will be prefixed
with `wtf2-` instead of `cdk-`.

There are two types of trees: Flat tree and nested tree. The DOM structures are different for these
two types of trees.

#### Flat tree
In a flat tree, the hierarchy is flattened; nodes are not rendered inside of each other,
but instead are rendered as siblings in sequence. An instance of `TreeFlattener` is
used to generate the flat list of items from hierarchical data. The "level" of each tree
node is read through the `getLevel` method of the `TreeControl`; this level can be
used to style the node such that it is indented to the appropriate level.


```html
<wtf2-tree>
  <wtf2-tree-node> parent node </wtf2-tree-node>
  <wtf2-tree-node> -- child node1 </wtf2-tree-node>
  <wtf2-tree-node> -- child node2 </wtf2-tree-node>
</wtf2-tree>
```

<!-- example(tree-flat-overview) -->

Flat trees are generally easier to style and inspect. They are also more friendly to
scrolling variations, such as infinite or virtual scrolling

<!--TODO(tinayuangao): Add a flat tree example here -->

#### Nested tree
In Nested tree, children nodes are placed inside their parent node in DOM. The parent node has an
outlet to keep all the children nodes.

```html
<wtf2-tree>
   <wtf2-nested-tree-node>
     parent node
     <wtf2-nested-tree-node> -- child node1 </wtf2-nested-tree-node>
     <wtf2-nested-tree-node> -- child node2 </wtf2-nested-tree-node>
   </wtf2-nested-tree-node>
</wtf2-tree>
```

<!-- example(tree-nested-overview) -->

Nested trees are easier to work with when hierarchical relationships are visually
represented in ways that would be difficult to accomplish with flat nodes.

<!--TODO(tinayuangao): Add a nested tree example here -->

### Features

The `<wtf2-tree>` itself only deals with the rendering of a tree structure.
Additional features can be built on top of the tree by adding behavior inside node templates
(e.g., padding and toggle). Interactions that affect the
rendered data (such as expand/collapse) should be propagated through the table's data source.

### TreeControl

The `TreeControl` controls the expand/collapse state of tree nodes. Users can expand/collapse a tree
node recursively through tree control. For nested tree node, `getChildren` function need to pass to
the `NestedTreeControl` to make it work recursively. The `getChildren` function may return an
observable of children for a given node, or an array of children.
For flattened tree node, `getLevel` and `isExpandable` functions need to pass to the
`FlatTreeControl` to make it work recursively.

### Toggle

A `wtf2TreeNodeToggle` can be added in the tree node template to expand/collapse the tree node. The
toggle toggles the expand/collapse functions in `TreeControl` and is able to expand/collapse a
tree node recursively by setting `[wtf2TreeNodeToggleRecursive]` to `true`.

The toggle can be placed anywhere in the tree node, and is only toggled by `click` action.


### Padding (Flat tree only)

The `wtf2TreeNodePadding` can be placed in a flat tree's node template to display the `level`
inFormation of a flat tree node.

Nested tree does not need this padding since padding can be easily added to the hierarchy
structure in DOM.


### Accessibility
Trees without text or labels should be given a meaningful label via `aria-label` or
`aria-labelledby`. The `aria-readonly` defaults to `true` if it's not set.

Tree's role is `tree`.
Parent nodes are given `role="group"`, while leaf nodes are given `role="treeitem"`

`wtf2-tree` does not manage any focus/keyboard interaction on its own. Users can add desired
focus/keyboard interactions in their application.
