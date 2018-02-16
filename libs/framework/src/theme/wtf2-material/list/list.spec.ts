import {async, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {defaultRippleAnimationConfig} from '../core';
import {dispatchMouseEvent} from '@angular/cdk/testing';
import {By} from '@angular/platform-browser';
import {Wtf2ListItem, Wtf2ListModule} from './index';

describe('Wtf2List', () => {
  // Default ripple durations used for testing.
  const {enterDuration, exitDuration} = defaultRippleAnimationConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2ListModule],
      declarations: [
        ListWithOneAnchorItem, ListWithOneItem, ListWithTwoLineItem, ListWithThreeLineItem,
        ListWithAvatar, ListWithItemWithCssClass, ListWithDynamicNumberOfLines,
        ListWithMultipleItems, ListWithManyLines, NavListWithOneAnchorItem, ActionListWithoutType,
        ActionListWithType, ListWithIndirectDescendantLines
      ],
    });

    TestBed.compileComponents();
  }));

  it('should not apply any additional class to a list without lines', () => {
    const fixture = TestBed.createComponent(ListWithOneItem);
    const listItem = fixture.debugElement.query(By.css('wtf2-list-item'));
    fixture.detectChanges();
    expect(listItem.nativeElement.className).toBe('wtf2-list-item');
  });

  it('should apply wtf2-2-line class to lists with two lines', () => {
    const fixture = TestBed.createComponent(ListWithTwoLineItem);
    fixture.detectChanges();

    const listItems = fixture.debugElement.children[0].queryAll(By.css('wtf2-list-item'));
    expect(listItems[0].nativeElement.className).toContain('wtf2-2-line');
    expect(listItems[1].nativeElement.className).toContain('wtf2-2-line');
  });

  it('should apply wtf2-3-line class to lists with three lines', () => {
    const fixture = TestBed.createComponent(ListWithThreeLineItem);
    fixture.detectChanges();

    const listItems = fixture.debugElement.children[0].queryAll(By.css('wtf2-list-item'));
    expect(listItems[0].nativeElement.className).toContain('wtf2-3-line');
    expect(listItems[1].nativeElement.className).toContain('wtf2-3-line');
  });

  it('should apply wtf2-multi-line class to lists with more than 3 lines', () => {
    const fixture = TestBed.createComponent(ListWithManyLines);
    fixture.detectChanges();

    const listItems = fixture.debugElement.children[0].queryAll(By.css('wtf2-list-item'));
    expect(listItems[0].nativeElement.className).toContain('wtf2-multi-line');
    expect(listItems[1].nativeElement.className).toContain('wtf2-multi-line');
  });

  it('should apply a class to list items with avatars', () => {
    const fixture = TestBed.createComponent(ListWithAvatar);
    fixture.detectChanges();

    const listItems = fixture.debugElement.children[0].queryAll(By.css('wtf2-list-item'));
    expect(listItems[0].nativeElement.className).toContain('wtf2-list-item-with-avatar');
    expect(listItems[1].nativeElement.className).not.toContain('wtf2-list-item-with-avatar');
  });

  it('should not clear custom classes provided by user', () => {
    const fixture = TestBed.createComponent(ListWithItemWithCssClass);
    fixture.detectChanges();

    const listItems = fixture.debugElement.children[0].queryAll(By.css('wtf2-list-item'));
    expect(listItems[0].nativeElement.classList.contains('test-class')).toBe(true);
  });

  it('should update classes if number of lines change', () => {
    const fixture = TestBed.createComponent(ListWithDynamicNumberOfLines);
    fixture.debugElement.componentInstance.showThirdLine = false;
    fixture.detectChanges();

    const listItem = fixture.debugElement.children[0].query(By.css('wtf2-list-item'));
    expect(listItem.nativeElement.classList.length).toBe(2);
    expect(listItem.nativeElement.classList).toContain('wtf2-2-line');
    expect(listItem.nativeElement.classList).toContain('wtf2-list-item');

    fixture.debugElement.componentInstance.showThirdLine = true;
    fixture.detectChanges();
    expect(listItem.nativeElement.className).toContain('wtf2-3-line');
  });

  it('should add aria roles properly', () => {
    const fixture = TestBed.createComponent(ListWithMultipleItems);
    fixture.detectChanges();

    const list = fixture.debugElement.children[0];
    const listItem = fixture.debugElement.children[0].query(By.css('wtf2-list-item'));
    expect(list.nativeElement.getAttribute('role')).toBeNull('Expect wtf2-list no role');
    expect(listItem.nativeElement.getAttribute('role')).toBeNull('Expect wtf2-list-item no role');
  });

  it('should not show ripples for non-nav lists', () => {
    const fixture = TestBed.createComponent(ListWithOneAnchorItem);
    fixture.detectChanges();

    const items: QueryList<Wtf2ListItem> = fixture.debugElement.componentInstance.listItems;
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => expect(item._isRippleDisabled()).toBe(true));
  });

  it('should allow disabling ripples for specific nav-list items', () => {
    const fixture = TestBed.createComponent(NavListWithOneAnchorItem);
    fixture.detectChanges();

    const items = fixture.componentInstance.listItems;
    expect(items.length).toBeGreaterThan(0);

    // Ripples should be enabled by default, and can be disabled with a binding.
    items.forEach(item => expect(item._isRippleDisabled()).toBe(false));

    fixture.componentInstance.disableItemRipple = true;
    fixture.detectChanges();

    items.forEach(item => expect(item._isRippleDisabled()).toBe(true));
  });

  it('should create an action list', () => {
    const fixture = TestBed.createComponent(ActionListWithoutType);
    fixture.detectChanges();

    const items = fixture.componentInstance.listItems;
    expect(items.length).toBeGreaterThan(0);
  });

  it('should set the proper class on the action list host', () => {
    const fixture = TestBed.createComponent(ActionListWithoutType);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('wtf2-action-list');
    expect(host.classList).toContain('wtf2-action-list');
  });

  it('should enable ripples for action lists by default', () => {
    const fixture = TestBed.createComponent(ActionListWithoutType);
    fixture.detectChanges();

    const items = fixture.componentInstance.listItems;
    expect(items.toArray().every(item => !item._isRippleDisabled())).toBe(true);
  });

  it('should allow disabling ripples for specific action list items', () => {
    const fixture = TestBed.createComponent(ActionListWithoutType);
    fixture.detectChanges();

    const items = fixture.componentInstance.listItems.toArray();
    expect(items.length).toBeGreaterThan(0);

    expect(items.every(item => !item._isRippleDisabled())).toBe(true);

    fixture.componentInstance.disableItemRipple = true;
    fixture.detectChanges();

    expect(items.every(item => item._isRippleDisabled())).toBe(true);
  });

  it('should set default type attribute to button for action list', () => {
    const fixture = TestBed.createComponent(ActionListWithoutType);
    fixture.detectChanges();

    const listItemEl = fixture.debugElement.query(By.css('.wtf2-list-item'));
    expect(listItemEl.nativeElement.getAttribute('type')).toBe('button');
  });

  it('should not change type attribute if it is already specified', () => {
    const fixture = TestBed.createComponent(ActionListWithType);
    fixture.detectChanges();

    const listItemEl = fixture.debugElement.query(By.css('.wtf2-list-item'));
    expect(listItemEl.nativeElement.getAttribute('type')).toBe('submit');
  });

  it('should allow disabling ripples for the whole nav-list', () => {
    const fixture = TestBed.createComponent(NavListWithOneAnchorItem);
    fixture.detectChanges();

    const items = fixture.componentInstance.listItems;
    expect(items.length).toBeGreaterThan(0);

    // Ripples should be enabled by default, and can be disabled with a binding.
    items.forEach(item => expect(item._isRippleDisabled()).toBe(false));

    fixture.componentInstance.disableListRipple = true;
    fixture.detectChanges();

    items.forEach(item => expect(item._isRippleDisabled()).toBe(true));
  });

  it('should allow disabling ripples for the entire action list', () => {
    const fixture = TestBed.createComponent(ActionListWithoutType);
    fixture.detectChanges();

    const items = fixture.componentInstance.listItems.toArray();
    expect(items.length).toBeGreaterThan(0);

    expect(items.every(item => !item._isRippleDisabled())).toBe(true);

    fixture.componentInstance.disableListRipple = true;
    fixture.detectChanges();

    expect(items.every(item => item._isRippleDisabled())).toBe(true);
  });

  it('should disable item ripples when list ripples are disabled via the input in nav list',
    fakeAsync(() => {
      const fixture = TestBed.createComponent(NavListWithOneAnchorItem);
      fixture.detectChanges();

      const rippleTarget = fixture.nativeElement.querySelector('.wtf2-list-item-content');

      dispatchMouseEvent(rippleTarget, 'mousedown');
      dispatchMouseEvent(rippleTarget, 'mouseup');

      expect(rippleTarget.querySelectorAll('.wtf2-ripple-element').length)
          .toBe(1, 'Expected ripples to be enabled by default.');

      // Wait for the ripples to go away.
      tick(enterDuration + exitDuration);
      expect(rippleTarget.querySelectorAll('.wtf2-ripple-element').length)
          .toBe(0, 'Expected ripples to go away.');

      fixture.componentInstance.disableListRipple = true;
      fixture.detectChanges();

      dispatchMouseEvent(rippleTarget, 'mousedown');
      dispatchMouseEvent(rippleTarget, 'mouseup');

      expect(rippleTarget.querySelectorAll('.wtf2-ripple-element').length)
          .toBe(0, 'Expected no ripples after list ripples are disabled.');
    }));

  it('should disable item ripples when list ripples are disabled via the input in an action list',
    fakeAsync(() => {
      const fixture = TestBed.createComponent(ActionListWithoutType);
      fixture.detectChanges();

      const rippleTarget = fixture.nativeElement.querySelector('.wtf2-list-item-content');

      dispatchMouseEvent(rippleTarget, 'mousedown');
      dispatchMouseEvent(rippleTarget, 'mouseup');

      expect(rippleTarget.querySelectorAll('.wtf2-ripple-element').length)
          .toBe(1, 'Expected ripples to be enabled by default.');

      // Wait for the ripples to go away.
      tick(enterDuration + exitDuration);
      expect(rippleTarget.querySelectorAll('.wtf2-ripple-element').length)
          .toBe(0, 'Expected ripples to go away.');

      fixture.componentInstance.disableListRipple = true;
      fixture.detectChanges();

      dispatchMouseEvent(rippleTarget, 'mousedown');
      dispatchMouseEvent(rippleTarget, 'mouseup');

      expect(rippleTarget.querySelectorAll('.wtf2-ripple-element').length)
          .toBe(0, 'Expected no ripples after list ripples are disabled.');
    }));


  it('should pick up indirect descendant lines', () => {
    const fixture = TestBed.createComponent(ListWithIndirectDescendantLines);
    fixture.detectChanges();

    const listItems = fixture.debugElement.children[0].queryAll(By.css('wtf2-list-item'));
    expect(listItems[0].nativeElement.className).toContain('wtf2-2-line');
    expect(listItems[1].nativeElement.className).toContain('wtf2-2-line');
  });
});


class BaseTestList {
  items: any[] = [
    {'name': 'Paprika', 'description': 'A seasoning'},
    {'name': 'Pepper', 'description': 'Another seasoning'}
  ];

  showThirdLine: boolean = false;
}

@Component({template: `
  <wtf2-list>
    <a wtf2-list-item>
      Paprika
    </a>
  </wtf2-list>`})
class ListWithOneAnchorItem extends BaseTestList {
  // This needs to be declared directly on the class; if declared on the BaseTestList superclass,
  // it doesn't get populated.
  @ViewChildren(Wtf2ListItem) listItems: QueryList<Wtf2ListItem>;
}

@Component({template: `
  <wtf2-nav-list [disableRipple]="disableListRipple">
    <a wtf2-list-item [disableRipple]="disableItemRipple">
      Paprika
    </a>
  </wtf2-nav-list>`})
class NavListWithOneAnchorItem extends BaseTestList {
  @ViewChildren(Wtf2ListItem) listItems: QueryList<Wtf2ListItem>;
  disableItemRipple: boolean = false;
  disableListRipple: boolean = false;
}

@Component({template: `
  <wtf2-action-list [disableRipple]="disableListRipple">
    <button wtf2-list-item [disableRipple]="disableItemRipple">
      Paprika
    </button>
  </wtf2-action-list>`})
class ActionListWithoutType extends BaseTestList {
  @ViewChildren(Wtf2ListItem) listItems: QueryList<Wtf2ListItem>;
  disableListRipple = false;
  disableItemRipple = false;
}

@Component({template: `
  <wtf2-action-list>
    <button wtf2-list-item type="submit">
      Paprika
    </button>
  </wtf2-action-list>`})
class ActionListWithType extends BaseTestList {
  @ViewChildren(Wtf2ListItem) listItems: QueryList<Wtf2ListItem>;
}

@Component({template: `
  <wtf2-list>
    <wtf2-list-item>
      Paprika
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithOneItem extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item *ngFor="let item of items">
      <img src="">
      <h3 wtf2-line>{{item.name}}</h3>
      <p wtf2-line>{{item.description}}</p>
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithTwoLineItem extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item *ngFor="let item of items">
      <h3 wtf2-line>{{item.name}}</h3>
      <p wtf2-line>{{item.description}}</p>
      <p wtf2-line>Some other text</p>
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithThreeLineItem extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item *ngFor="let item of items">
      <h3 wtf2-line>Line 1</h3>
      <p wtf2-line>Line 2</p>
      <p wtf2-line>Line 3</p>
      <p wtf2-line>Line 4</p>
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithManyLines extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item>
      <img src="" wtf2-list-avatar>
      Paprika
    </wtf2-list-item>
    <wtf2-list-item>
      Pepper
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithAvatar extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item class="test-class" *ngFor="let item of items">
      <h3 wtf2-line>{{item.name}}</h3>
      <p wtf2-line>{{item.description}}</p>
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithItemWithCssClass extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item *ngFor="let item of items">
      <h3 wtf2-line>{{item.name}}</h3>
      <p wtf2-line>{{item.description}}</p>
      <p wtf2-line *ngIf="showThirdLine">Some other text</p>
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithDynamicNumberOfLines extends BaseTestList { }

@Component({template: `
  <wtf2-list>
    <wtf2-list-item *ngFor="let item of items">
      {{item.name}}
    </wtf2-list-item>
  </wtf2-list>`})
class ListWithMultipleItems extends BaseTestList { }

// Note the blank `ngSwitch` which we need in order to hit the bug that we're testing.
@Component({
  template: `
  <wtf2-list>
    <wtf2-list-item *ngFor="let item of items">
      <ng-container [ngSwitch]="true">
        <h3 wtf2-line>{{item.name}}</h3>
        <p wtf2-line>{{item.description}}</p>
      </ng-container>
    </wtf2-list-item>
  </wtf2-list>`
})
class ListWithIndirectDescendantLines extends BaseTestList {
}
