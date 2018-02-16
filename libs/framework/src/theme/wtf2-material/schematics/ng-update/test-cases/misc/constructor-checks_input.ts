/*
 * Fake definitions because the property name rules can only determine the host type
 * properly by using type checking.
 */

class Platform {
  IOS: boolean;
}

interface Document {}

class NativeDateAdapter {
  constructor(_locale: string, _platform: Platform) {}
}

class Wtf2Autocomplete {
  constructor(_changeDetector: any, _elementRef: any, _defaults: string[]) {}
}

class NonMaterialClass {}

const _t1 = new NativeDateAdapter('b', 'invalid-argument');

const _t2 = new NativeDateAdapter('a', {IOS: true});

const _t3 = new NonMaterialClass('invalid-argument');

class Wtf2Tooltip {
  constructor(
    private _overlay: any,
    private _elementRef: any,
    private _scrollDispatcher: any,
    private _viewContainerRef: any,
    private _ngZone: any,
    private _platform: any,
    private _ariaDescriber: any,
    private _focusMonitor: any,
    private _scrollStrategy: any,
    private _dir: any,
    private _defaultOptions: {opt1: string}) {}
}

class Wtf2IconRegistry {
  constructor(_httpClient: any, _sanitizer: any, _document: Document) {}
}

class Wtf2Calendar {
  constructor(_intl: any, _adapter: any, _Formats: any, _changeDetector: any) {}
}

class Wtf2DrawerContent {
  constructor (_cd: any,
               _container: any,
               _elementRef: any,
               _scrollDispatcher: any,
               _ngZone: any) {}
}

class Wtf2SidenavContent {
  constructor (_cd: any,
               _container: any,
               _elementRef: any,
               _scrollDispatcher: any,
               _ngZone: any) {}
}

class ExtendedDateAdapter extends NativeDateAdapter {}

/* Actual test case using the previously defined definitions. */

class A extends NativeDateAdapter {
  constructor() {
    super('hardCodedLocale');
  }
}

const _A = new NativeDateAdapter('myLocale');

class B extends Wtf2Autocomplete {
  constructor(cd: any, elementRef: any) {
    super(cd, elementRef);
  }
}

const _B = new Wtf2Autocomplete({}, {});

class C extends Wtf2Tooltip {
  constructor(a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any) {
    super(a, b, c, d, e, f, g, h, i, j);
  }
}

const _C = new Wtf2Tooltip({}, {}, {}, {}, {}, {}, {}, {}, {}, {});

class D extends Wtf2IconRegistry {
  constructor(httpClient: any, sanitizer: any) {
    super(httpClient, sanitizer);
  }
}

const _D = new Wtf2IconRegistry({}, {});

class E extends Wtf2Calendar {
  constructor(elementRef: any,
              intl: any,
              zone: any,
              adapter: any,
              Formats: any,
              cd: any,
              dir: any) {
    super(elementRef, intl, zone, adapter, Formats, cd, dir);
  }
}

const _E = new Wtf2Calendar({}, {}, {}, {}, {}, {}, {});

class F extends Wtf2DrawerContent {
  constructor(changeDetectorRef: any, container: any) {
    super(changeDetectorRef, container);
  }
}

const _F = new Wtf2DrawerContent({}, 'container');

class G extends Wtf2SidenavContent {
  constructor(changeDetectorRef: any, container: any) {
    super(changeDetectorRef, container);
  }
}

const _G = new Wtf2SidenavContent({}, 'container');

class H extends ExtendedDateAdapter {
  constructor() {
    super('myLocale');
  }
}

const _H = new ExtendedDateAdapter('myLocale');
