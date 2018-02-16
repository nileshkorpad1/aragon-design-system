/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {FlatTreeControl, NestedTreeControl, TreeControl} from '@angular/cdk/tree';
import {Component, ViewChild, Type} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  Wtf2Tree,
  Wtf2TreeFlatDataSource,
  Wtf2TreeFlattener,
  Wtf2TreeModule,
  Wtf2TreeNestedDataSource
} from './index';


describe('Wtf2Tree', () => {
  /** Represents an indent for expectNestedTreeToMatch */
  const _ = {};

  let treeElement: HTMLElement;
  let underlyingDataSource: FakeDataSource;

  function configureWtf2TreeTestingModule(declarations: Type<any>[]) {
    TestBed.configureTestingModule({
      imports: [Wtf2TreeModule],
      declarations: declarations,
    }).compileComponents();
  }

  describe('flat tree', () => {
    describe('should initialize', () => {
      let fixture: ComponentFixture<SimpleWtf2TreeApp>;
      let component: SimpleWtf2TreeApp;


      beforeEach(() => {
        configureWtf2TreeTestingModule([SimpleWtf2TreeApp]);
        fixture = TestBed.createComponent(SimpleWtf2TreeApp);

        component = fixture.componentInstance;
        underlyingDataSource = component.underlyingDataSource;
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('with rendered dataNodes', () => {
        const nodes = getNodes(treeElement);

        expect(nodes).toBeDefined('Expect nodes to be defined');
        expect(nodes[0].classList).toContain('customNodeClass');
      });

      it('with the right accessibility roles', () => {
        expect(treeElement.getAttribute('role')).toBe('tree');

        getNodes(treeElement).forEach(node => {
          expect(node.getAttribute('role')).toBe('treeitem');
        });
      });

      it('with the right data', () => {
        expect(underlyingDataSource.data.length).toBe(3);

        let data = underlyingDataSource.data;
        expectFlatTreeToMatch(treeElement, 28,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`]);

        underlyingDataSource.addChild(data[2]);
        fixture.detectChanges();

        expectFlatTreeToMatch(treeElement, 28,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`],
            [`_, topping_4 - cheese_4 + base_4`]);
      });
    });

    describe('with toggle', () => {
      let fixture: ComponentFixture<Wtf2TreeAppWithToggle>;
      let component: Wtf2TreeAppWithToggle;

      beforeEach(() => {
        configureWtf2TreeTestingModule([Wtf2TreeAppWithToggle]);
        fixture = TestBed.createComponent(Wtf2TreeAppWithToggle);

        component = fixture.componentInstance;
        underlyingDataSource = component.underlyingDataSource;
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('should expand/collapse the node', () => {
        expect(underlyingDataSource.data.length).toBe(3);

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(0, `Expect no expanded node`);

        component.toggleRecursively = false;
        const data = underlyingDataSource.data;
        const child = underlyingDataSource.addChild(data[2]);
        underlyingDataSource.addChild(child);
        fixture.detectChanges();

        expectFlatTreeToMatch(treeElement, 40,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`]);


        (getNodes(treeElement)[2] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(1, `Expect node expanded one level`);
        expectFlatTreeToMatch(treeElement, 40,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`],
            [_, `topping_4 - cheese_4 + base_4`]);

        (getNodes(treeElement)[3] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(2, `Expect node expanded`);
        expectFlatTreeToMatch(treeElement, 40,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`],
            [_, `topping_4 - cheese_4 + base_4`],
            [_, _, `topping_5 - cheese_5 + base_5`]);

        (getNodes(treeElement)[2] as HTMLElement).click();
        fixture.detectChanges();

        expectFlatTreeToMatch(treeElement, 40,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`]);
      });

      it('should expand/collapse the node recursively', () => {
        expect(underlyingDataSource.data.length).toBe(3);

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(0, `Expect no expanded node`);

        const data = underlyingDataSource.data;
        const child = underlyingDataSource.addChild(data[2]);
        underlyingDataSource.addChild(child);
        fixture.detectChanges();

        expectFlatTreeToMatch(treeElement, 40,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`]);

        (getNodes(treeElement)[2] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(3, `Expect nodes expanded`);
        expectFlatTreeToMatch(treeElement, 40,
            [`topping_1 - cheese_1 + base_1`],
            [`topping_2 - cheese_2 + base_2`],
            [`topping_3 - cheese_3 + base_3`],
            [_, `topping_4 - cheese_4 + base_4`],
            [_, _, `topping_5 - cheese_5 + base_5`]);


        (getNodes(treeElement)[2] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(0, `Expect node collapsed`);

        expectFlatTreeToMatch(treeElement, 40,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`]);
      });
    });

    describe('with when node template', () => {
      let fixture: ComponentFixture<WhenNodeWtf2TreeApp>;
      let component: WhenNodeWtf2TreeApp;

      beforeEach(() => {
        configureWtf2TreeTestingModule([WhenNodeWtf2TreeApp]);
        fixture = TestBed.createComponent(WhenNodeWtf2TreeApp);

        component = fixture.componentInstance;
        underlyingDataSource = component.underlyingDataSource;
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('with the right data', () => {
        expectFlatTreeToMatch(treeElement, 28,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`],
          [`>>> topping_4 - cheese_4 + base_4`]);
      });
    });
  });

  describe('flat tree with undefined or null children', () => {
    describe('should initialize', () => {
      let fixture: ComponentFixture<Wtf2TreeWithNullOrUndefinedChild >;

      beforeEach(() => {
        configureWtf2TreeTestingModule([Wtf2TreeWithNullOrUndefinedChild ]);
        fixture = TestBed.createComponent(Wtf2TreeWithNullOrUndefinedChild );
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('with rendered dataNodes', () => {
        const nodes = getNodes(treeElement);

        expect(nodes).toBeDefined('Expect nodes to be defined');
        expect(nodes[0].classList).toContain('customNodeClass');
      });
    });
  });

  describe('nested tree with undefined or null children', () => {
    describe('should initialize', () => {
      let fixture: ComponentFixture<Wtf2NestedTreeWithNullOrUndefinedChild >;

      beforeEach(() => {
        configureWtf2TreeTestingModule([Wtf2NestedTreeWithNullOrUndefinedChild]);
        fixture = TestBed.createComponent(Wtf2NestedTreeWithNullOrUndefinedChild);
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('with rendered dataNodes', () => {
        const nodes = getNodes(treeElement);

        expect(nodes).toBeDefined('Expect nodes to be defined');
        expect(nodes[0].classList).toContain('customNodeClass');
      });
    });
  });
  describe('nested tree', () => {
    describe('should initialize', () => {
      let fixture: ComponentFixture<NestedWtf2TreeApp>;
      let component: NestedWtf2TreeApp;

      beforeEach(() => {
        configureWtf2TreeTestingModule([NestedWtf2TreeApp]);
        fixture = TestBed.createComponent(NestedWtf2TreeApp);

        component = fixture.componentInstance;
        underlyingDataSource = component.underlyingDataSource;
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('with rendered dataNodes', () => {
        const nodes = getNodes(treeElement);

        expect(nodes).toBeDefined('Expect nodes to be defined');
        expect(nodes[0].classList).toContain('customNodeClass');
      });

      it('with the right accessibility roles', () => {
        expect(treeElement.getAttribute('role')).toBe('tree');

        getNodes(treeElement).forEach(node => {
          expect(node.getAttribute('role')).toBe('treeitem');
        });
      });

      it('with the right data', () => {
        expect(underlyingDataSource.data.length).toBe(3);

        let data = underlyingDataSource.data;
        expectNestedTreeToMatch(treeElement,
          [`${data[0].pizzaTopping} - ${data[0].pizzaCheese} + ${data[0].pizzaBase}`],
          [`${data[1].pizzaTopping} - ${data[1].pizzaCheese} + ${data[1].pizzaBase}`],
          [`${data[2].pizzaTopping} - ${data[2].pizzaCheese} + ${data[2].pizzaBase}`]);

        underlyingDataSource.addChild(data[1]);
        fixture.detectChanges();

        treeElement = fixture.nativeElement.querySelector('wtf2-tree');
        data = underlyingDataSource.data;
        expect(data.length).toBe(3);
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [_, `topping_4 - cheese_4 + base_4`],
          [`topping_3 - cheese_3 + base_3`]);
      });

      it('with nested child data', () => {
        expect(underlyingDataSource.data.length).toBe(3);

        let data = underlyingDataSource.data;
        const child = underlyingDataSource.addChild(data[1]);
        underlyingDataSource.addChild(child);
        fixture.detectChanges();

        expect(data.length).toBe(3);
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [_, `topping_4 - cheese_4 + base_4`],
          [_, _, `topping_5 - cheese_5 + base_5`],
          [`topping_3 - cheese_3 + base_3`]);

        underlyingDataSource.addChild(child);
        fixture.detectChanges();

        expect(data.length).toBe(3);
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [_, `topping_4 - cheese_4 + base_4`],
          [_, _, `topping_5 - cheese_5 + base_5`],
          [_, _, `topping_6 - cheese_6 + base_6`],
          [`topping_3 - cheese_3 + base_3`]);
      });
    });

    describe('with when node', () => {
      let fixture: ComponentFixture<WhenNodeNestedWtf2TreeApp>;
      let component: WhenNodeNestedWtf2TreeApp;

      beforeEach(() => {
        configureWtf2TreeTestingModule([WhenNodeNestedWtf2TreeApp]);
        fixture = TestBed.createComponent(WhenNodeNestedWtf2TreeApp);

        component = fixture.componentInstance;
        underlyingDataSource = component.underlyingDataSource;
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('with the right data', () => {
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`],
          [`>>> topping_4 - cheese_4 + base_4`]);
      });
    });

    describe('with toggle', () => {
      let fixture: ComponentFixture<NestedWtf2TreeAppWithToggle>;
      let component: NestedWtf2TreeAppWithToggle;

      beforeEach(() => {
        configureWtf2TreeTestingModule([NestedWtf2TreeAppWithToggle]);
        fixture = TestBed.createComponent(NestedWtf2TreeAppWithToggle);

        component = fixture.componentInstance;
        underlyingDataSource = component.underlyingDataSource;
        treeElement = fixture.nativeElement.querySelector('wtf2-tree');

        fixture.detectChanges();
      });

      it('should expand/collapse the node', () => {
        component.toggleRecursively = false;
        let data = underlyingDataSource.data;
        const child = underlyingDataSource.addChild(data[1]);
        underlyingDataSource.addChild(child);

        fixture.detectChanges();

        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`]);

        fixture.detectChanges();

        (getNodes(treeElement)[1] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(1, `Expect node expanded`);
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [_, `topping_4 - cheese_4 + base_4`],
          [`topping_3 - cheese_3 + base_3`]);

        (getNodes(treeElement)[1] as HTMLElement).click();
        fixture.detectChanges();

        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`]);
        expect(component.treeControl.expansionModel.selected.length)
          .toBe(0, `Expect node collapsed`);
      });

      it('should expand/collapse the node recursively', () => {
        let data = underlyingDataSource.data;
        const child = underlyingDataSource.addChild(data[1]);
        underlyingDataSource.addChild(child);
        fixture.detectChanges();

        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`]);

        (getNodes(treeElement)[1] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(3, `Expect node expanded`);
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [_, `topping_4 - cheese_4 + base_4`],
          [_, _, `topping_5 - cheese_5 + base_5`],
          [`topping_3 - cheese_3 + base_3`]);

        (getNodes(treeElement)[1] as HTMLElement).click();
        fixture.detectChanges();

        expect(component.treeControl.expansionModel.selected.length)
          .toBe(0, `Expect node collapsed`);
        expectNestedTreeToMatch(treeElement,
          [`topping_1 - cheese_1 + base_1`],
          [`topping_2 - cheese_2 + base_2`],
          [`topping_3 - cheese_3 + base_3`]);
      });
    });
  });
});

export class TestData {
  pizzaTopping: string;
  pizzaCheese: string;
  pizzaBase: string;
  level: number;
  children: TestData[];
  observableChildren: BehaviorSubject<TestData[]>;
  isSpecial: boolean;

  constructor(pizzaTopping: string, pizzaCheese: string, pizzaBase: string,
              children: TestData[] = [], isSpecial: boolean = false) {
    this.pizzaTopping = pizzaTopping;
    this.pizzaCheese = pizzaCheese;
    this.pizzaBase = pizzaBase;
    this.isSpecial = isSpecial;
    this.children = children;
    this.observableChildren = new BehaviorSubject<TestData[]>(this.children);
  }
}

class FakeDataSource {
  dataIndex = 0;
  _dataChange = new BehaviorSubject<TestData[]>([]);
  get data() { return this._dataChange.getValue(); }
  set data(data: TestData[]) { this._dataChange.next(data); }

  connect(): Observable<TestData[]> {
    return this._dataChange;
  }

  disconnect() {}

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.addData();
    }
  }

  addChild(parent: TestData, isSpecial: boolean = false) {
    const nextIndex = ++this.dataIndex;
    const child = new TestData(`topping_${nextIndex}`, `cheese_${nextIndex}`, `base_${nextIndex}`);

    const index = this.data.indexOf(parent);
    if (index > -1) {
      parent = new TestData(
          parent.pizzaTopping, parent.pizzaCheese, parent.pizzaBase, parent.children, isSpecial);
    }
    parent.children.push(child);
    parent.observableChildren.next(parent.children);

    let copiedData = this.data.slice();
    if (index > -1) {
      copiedData.splice(index, 1, parent);
    }
    this.data = copiedData;
    return child;
  }

  addData(isSpecial: boolean = false) {
    const nextIndex = ++this.dataIndex;
    let copiedData = this.data.slice();
    copiedData.push(new TestData(
      `topping_${nextIndex}`, `cheese_${nextIndex}`, `base_${nextIndex}`, [], isSpecial));

    this.data = copiedData;
  }
}

function getNodes(treeElement: Element): Element[] {
  return [].slice.call(treeElement.querySelectorAll('.wtf2-tree-node, .wtf2-nested-tree-node'))!;
}

function expectFlatTreeToMatch(treeElement: Element, expectedPaddingIndent: number = 28,
                               ...expectedTree: any[]) {
  const missedExpectations: string[] = [];

  function checkNode(node: Element, expectedNode: any[]) {
    const actualTextContent = node.textContent!.trim();
    const expectedTextContent = expectedNode[expectedNode.length - 1];
    if (actualTextContent !== expectedTextContent) {
      missedExpectations.push(
        `Expected node contents to be ${expectedTextContent} but was ${actualTextContent}`);
    }
  }

  function checkLevel(node: Element, expectedNode: any[]) {

    const actualLevel = (node as HTMLElement).style.paddingLeft;
    if (expectedNode.length === 1) {
      if (actualLevel !== ``) {
        missedExpectations.push(
          `Expected node level to be 0 but was ${actualLevel}`);
      }
    } else {
      const expectedLevel = `${(expectedNode.length - 1) * expectedPaddingIndent}px`;
      if (actualLevel != expectedLevel) {
        missedExpectations.push(
          `Expected node level to be ${expectedLevel} but was ${actualLevel}`);
      }
    }
  }

  getNodes(treeElement).forEach((node, index) => {
    const expected = expectedTree ?
      expectedTree[index] :
      null;

    checkLevel(node, expected);
    checkNode(node, expected);
  });

  if (missedExpectations.length) {
    fail(missedExpectations.join('\n'));
  }
}

function expectNestedTreeToMatch(treeElement: Element, ...expectedTree: any[]) {
  const missedExpectations: string[] = [];
  function checkNodeContent(node: Element, expectedNode: any[]) {
    const expectedTextContent = expectedNode[expectedNode.length - 1];
    const actualTextContent = node.childNodes.item(0).textContent!.trim();
    if (actualTextContent !== expectedTextContent) {
      missedExpectations.push(
        `Expected node contents to be ${expectedTextContent} but was ${actualTextContent}`);
    }
  }

  function checkNodeDescendants(node: Element, expectedNode: any[], currentIndex: number) {
    let expectedDescendant = 0;

    for (let i = currentIndex + 1; i < expectedTree.length; ++i) {
      if (expectedTree[i].length > expectedNode.length) {
        ++expectedDescendant;
      } else if (expectedTree[i].length === expectedNode.length) {
        break;
      }
    }

    const actualDescendant = getNodes(node).length;
    if (actualDescendant !== expectedDescendant) {
      missedExpectations.push(
        `Expected node descendant num to be ${expectedDescendant} but was ${actualDescendant}`);
    }
  }

  getNodes(treeElement).forEach((node, index) => {

    const expected = expectedTree ?
      expectedTree[index] :
      null;

    checkNodeDescendants(node, expected, index);
    checkNodeContent(node, expected);
  });

  if (missedExpectations.length) {
    fail(missedExpectations.join('\n'));
  }
}

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass"
                     wtf2TreeNodePadding [wtf2TreeNodePaddingIndent]="28"
                     wtf2TreeNodeToggle>
                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
      </wtf2-tree-node>
    </wtf2-tree>
  `
})
class SimpleWtf2TreeApp {
  getLevel = (node: TestData) => node.level;
  isExpandable = (node: TestData) => node.children.length > 0;
  getChildren = (node: TestData) => node.observableChildren;
  transformer = (node: TestData, level: number) => {
    node.level = level;
    return node;
  }

  treeFlattener = new Wtf2TreeFlattener<TestData, TestData>(
    this.transformer, this.getLevel, this.isExpandable, this.getChildren);

  treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);

  dataSource = new Wtf2TreeFlatDataSource(this.treeControl, this.treeFlattener);

  underlyingDataSource = new FakeDataSource();

  @ViewChild(Wtf2Tree, {static: false}) tree: Wtf2Tree<TestData>;

  constructor() {
    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

interface FoodNode {
  name: string;
  children?: FoodNode[] | null;
}

/** Flat node with expandable and level inFormation */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops',
       children: null},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass"
                     wtf2TreeNodePadding wtf2TreeNodeToggle>
        {{node.name}}
      </wtf2-tree-node>
    </wtf2-tree>
  `
})
class Wtf2TreeWithNullOrUndefinedChild {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new Wtf2TreeFlattener(
     this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new Wtf2TreeFlatDataSource(this.treeControl, this.treeFlattener, TREE_DATA);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-nested-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass">
        {{node.name}}
        <ng-template wtf2TreeNodeOutlet></ng-template>
      </wtf2-nested-tree-node>
    </wtf2-tree>
  `
})
class Wtf2NestedTreeWithNullOrUndefinedChild {
  treeControl: NestedTreeControl<FoodNode>;
  dataSource: Wtf2TreeNestedDataSource<FoodNode>;

  constructor() {
    this.treeControl = new NestedTreeControl<FoodNode>(this._getChildren);
    this.dataSource = new Wtf2TreeNestedDataSource();
    this.dataSource.data = TREE_DATA;
  }

  private _getChildren = (node: FoodNode) => node.children;
}

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-nested-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass">
                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
         <ng-template wtf2TreeNodeOutlet></ng-template>
      </wtf2-nested-tree-node>
    </wtf2-tree>
  `
})
class NestedWtf2TreeApp {
  getChildren = (node: TestData) => node.observableChildren;

  treeControl = new NestedTreeControl(this.getChildren);

  dataSource = new Wtf2TreeNestedDataSource();
  underlyingDataSource = new FakeDataSource();

  @ViewChild(Wtf2Tree, {static: false}) tree: Wtf2Tree<TestData>;

  constructor() {
    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-nested-tree-node *wtf2TreeNodeDef="let node">
                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
         <ng-template wtf2TreeNodeOutlet></ng-template>
      </wtf2-nested-tree-node>
       <wtf2-nested-tree-node *wtf2TreeNodeDef="let node; when: isSpecial"
                             wtf2TreeNodeToggle>
                     >>> {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
         <div *ngIf="treeControl.isExpanded(node)">
            <ng-template wtf2TreeNodeOutlet></ng-template>
         </div>
      </wtf2-nested-tree-node>
    </wtf2-tree>
  `
})
class WhenNodeNestedWtf2TreeApp {
  isSpecial = (_: number, node: TestData) =>  node.isSpecial;

  getChildren = (node: TestData) => node.observableChildren;

  treeControl: TreeControl<TestData> = new NestedTreeControl(this.getChildren);

  dataSource = new Wtf2TreeNestedDataSource();
  underlyingDataSource = new FakeDataSource();

  @ViewChild(Wtf2Tree, {static: false}) tree: Wtf2Tree<TestData>;

  constructor() {
    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}


@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass"
                     wtf2TreeNodePadding
                     wtf2TreeNodeToggle [wtf2TreeNodeToggleRecursive]="toggleRecursively">
                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
      </wtf2-tree-node>
    </wtf2-tree>
  `
})
class Wtf2TreeAppWithToggle {
  toggleRecursively: boolean = true;

  getLevel = (node: TestData) => node.level;
  isExpandable = (node: TestData) => node.children.length > 0;
  getChildren = (node: TestData) => node.observableChildren;
  transformer = (node: TestData, level: number) => {
    node.level = level;
    return node;
  }

  treeFlattener = new Wtf2TreeFlattener<TestData, TestData>(
    this.transformer, this.getLevel, this.isExpandable, this.getChildren);

  treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);

  dataSource = new Wtf2TreeFlatDataSource(this.treeControl, this.treeFlattener);
  underlyingDataSource = new FakeDataSource();

  @ViewChild(Wtf2Tree, {static: false}) tree: Wtf2Tree<TestData>;

  constructor() {
    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-nested-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass"
                            wtf2TreeNodeToggle [wtf2TreeNodeToggleRecursive]="toggleRecursively">
                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
        <div *ngIf="treeControl.isExpanded(node)">
          <ng-template wtf2TreeNodeOutlet></ng-template>
        </div>
      </wtf2-nested-tree-node>
    </wtf2-tree>
  `
})
class NestedWtf2TreeAppWithToggle {
  toggleRecursively: boolean = true;

  getChildren = (node: TestData) => node.observableChildren;

  treeControl = new NestedTreeControl(this.getChildren);
  dataSource = new Wtf2TreeNestedDataSource();
  underlyingDataSource = new FakeDataSource();

  @ViewChild(Wtf2Tree, {static: false}) tree: Wtf2Tree<TestData>;

  constructor() {
    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}

@Component({
  template: `
    <wtf2-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <wtf2-tree-node *wtf2TreeNodeDef="let node" class="customNodeClass"
                     wtf2TreeNodePadding [wtf2TreeNodePaddingIndent]="28"
                     wtf2TreeNodeToggle>
                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
      </wtf2-tree-node>
       <wtf2-tree-node *wtf2TreeNodeDef="let node; when: isSpecial" class="customNodeClass"
                     wtf2TreeNodePadding [wtf2TreeNodePaddingIndent]="28"
                     wtf2TreeNodeToggle>
                     >>> {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}
      </wtf2-tree-node>
    </wtf2-tree>
  `
})
class WhenNodeWtf2TreeApp {
  isSpecial = (_: number, node: TestData) => node.isSpecial;

  getLevel = (node: TestData) => node.level;
  isExpandable = (node: TestData) => node.children.length > 0;
  getChildren = (node: TestData) => node.observableChildren;
  transformer = (node: TestData, level: number) => {
    node.level = level;
    return node;
  }

  treeFlattener = new Wtf2TreeFlattener<TestData, TestData>(
    this.transformer, this.getLevel, this.isExpandable, this.getChildren);

  treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);

  dataSource = new Wtf2TreeFlatDataSource(this.treeControl, this.treeFlattener);
  underlyingDataSource = new FakeDataSource();

  @ViewChild(Wtf2Tree, {static: false}) tree: Wtf2Tree<TestData>;

  constructor() {
    this.underlyingDataSource.connect().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
