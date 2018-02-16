/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AnimationEvent} from '@angular/animations';
import {CdkAccordionItem} from '@angular/cdk/accordion';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {UniqueSelectionDispatcher} from '@angular/cdk/collections';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  ElementRef,
  Input,
  Inject,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf,
  ViewContainerRef,
  ViewEncapsulation,
  ViewChild,
  InjectionToken,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';
import {Subject} from 'rxjs';
import {filter, startWith, take, distinctUntilChanged} from 'rxjs/operators';
import {wtf2ExpansionAnimations} from './expansion-animations';
import {Wtf2ExpansionPanelContent} from './expansion-panel-content';
import {WTF2_ACCORDION, Wtf2AccordionBase} from './accordion-base';

/** Wtf2ExpansionPanel's states. */
export type Wtf2ExpansionPanelState = 'expanded' | 'collapsed';

/** Counter for generating unique element ids. */
let uniqueId = 0;

/**
 * Object that can be used to override the default options
 * for all of the expansion panels in a module.
 */
export interface Wtf2ExpansionPanelDefaultOptions {
  /** Height of the header while the panel is expanded. */
  expandedHeight: string;

  /** Height of the header while the panel is collapsed. */
  collapsedHeight: string;

  /** Whether the toggle indicator should be hidden. */
  hideToggle: boolean;
}

/**
 * Injection token that can be used to configure the defalt
 * options for the expansion panel component.
 */
export const WTF2_EXPANSION_PANEL_DEFAULT_OPTIONS =
    new InjectionToken<Wtf2ExpansionPanelDefaultOptions>('WTF2_EXPANSION_PANEL_DEFAULT_OPTIONS');

/**
 * `<wtf2-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the Wtf2Accordion directive attached.
 */
@Component({
  moduleId: module.id,
  styleUrls: ['./expansion-panel.scss'],
  selector: 'wtf2-expansion-panel',
  exportAs: 'wtf2ExpansionPanel',
  templateUrl: './expansion-panel.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['disabled', 'expanded'],
  outputs: ['opened', 'closed', 'expandedChange'],
  animations: [wtf2ExpansionAnimations.bodyExpansion],
  providers: [
    // Provide Wtf2Accordion as undefined to prevent nested expansion panels from registering
    // to the same accordion.
    {provide: WTF2_ACCORDION, useValue: undefined},
  ],
  host: {
    'class': 'wtf2-expansion-panel',
    '[class.wtf2-expanded]': 'expanded',
    '[class._wtf2-animation-noopable]': '_animationMode === "NoopAnimations"',
    '[class.wtf2-expansion-panel-spacing]': '_hasSpacing()',
  }
})
export class Wtf2ExpansionPanel extends CdkAccordionItem implements AfterContentInit, OnChanges,
  OnDestroy {

  private _document: Document;

  /** Whether the toggle indicator should be hidden. */
  @Input()
  get hideToggle(): boolean {
    return this._hideToggle || (this.accordion && this.accordion.hideToggle);
  }
  set hideToggle(value: boolean) {
    this._hideToggle = coerceBooleanProperty(value);
  }
  private _hideToggle = false;

  @Input() displayPosition = 1;
  /** An event emitted after the body's expansion animation happens. */
  @Output() afterExpand = new EventEmitter<void>();

  /** An event emitted after the body's collapse animation happens. */
  @Output() afterCollapse = new EventEmitter<void>();

  /** Stream that emits for changes in `@Input` properties. */
  readonly _inputChanges = new Subject<SimpleChanges>();

  /** Optionally defined accordion the expansion panel belongs to. */
  accordion: Wtf2AccordionBase;

  /** Content that will be rendered lazily. */
  @ContentChild(Wtf2ExpansionPanelContent, {static: false}) _lazyContent: Wtf2ExpansionPanelContent;

  /** Element containing the panel's user-provided content. */
  @ViewChild('body', {static: false}) _body: ElementRef<HTMLElement>;

  /** Portal holding the user's content. */
  _portal: TemplatePortal;

  /** ID for the associated header element. Used for a11y labelling. */
  _headerId = `wtf2-expansion-panel-header-${uniqueId++}`;

  /** Stream of body animation done events. */
  _bodyAnimationDone = new Subject<AnimationEvent>();

  constructor(@Optional() @SkipSelf() @Inject(WTF2_ACCORDION) accordion: Wtf2AccordionBase,
              _changeDetectorRef: ChangeDetectorRef,
              _uniqueSelectionDispatcher: UniqueSelectionDispatcher,
              private _viewContainerRef: ViewContainerRef,
              @Inject(DOCUMENT) _document: any,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode: string,
              @Inject(WTF2_EXPANSION_PANEL_DEFAULT_OPTIONS) @Optional()
                  defaultOptions?: Wtf2ExpansionPanelDefaultOptions) {
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
    this.accordion = accordion;
    this._document = _document;

    // We need a Subject with distinctUntilChanged, because the `done` event
    // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
    this._bodyAnimationDone.pipe(distinctUntilChanged((x, y) => {
      return x.fromState === y.fromState && x.toState === y.toState;
    })).subscribe(event => {
      if (event.fromState !== 'void') {
        if (event.toState === 'expanded') {
          this.afterExpand.emit();
        } else if (event.toState === 'collapsed') {
          this.afterCollapse.emit();
        }
      }
    });

    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }

  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing(): boolean {
    if (this.accordion) {
      // We don't need to subscribe to the `stateChanges` of the parent accordion because each time
      // the [displayMode] input changes, the change detection will also cover the host bindings
      // of this expansion panel.
      return (this.expanded ? this.accordion.displayMode : this._getExpandedState()) === 'default';
    }
    return false;
  }

  /** Gets the expanded state string. */
  _getExpandedState(): Wtf2ExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  ngAfterContentInit() {
    if (this._lazyContent) {
      // Render the content as soon as the panel becomes open.
      this.opened.pipe(
        startWith(null!),
        filter(() => this.expanded && !this._portal),
        take(1)
      ).subscribe(() => {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._inputChanges.next(changes);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this._bodyAnimationDone.complete();
    this._inputChanges.complete();
  }

  /** Checks whether the expansion panel's content contains the currently-focused element. */
  _containsFocus(): boolean {
    if (this._body) {
      const focusedElement = this._document.activeElement;
      const bodyElement = this._body.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }

    return false;
  }
}

@Directive({
  selector: 'wtf2-action-row',
  host: {
    class: 'wtf2-action-row'
  }
})
export class Wtf2ExpansionPanelActionRow {}
