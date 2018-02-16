/*
 * Fake definitions because the property name rules can only determine the host type
 * properly by using type checking.
 */

class Wtf2Select {
  change: any;
  onOpen: any;
  onClose: any;
}

class Wtf2RadioGroup {
  align: any;
}

class Wtf2SnackBarConfig {
  extraClasses: any;
}

class Wtf2Drawer {
  align: any;
  onAlignChanged: any;
  onOpen: any;
  onClose: any;
}

/* Actual test case using the previously defined definitions. */

class A {
  self = {me: this};
  b: Wtf2RadioGroup;

  constructor(private a: Wtf2Select,
              public c: Wtf2SnackBarConfig,
              private e: Wtf2Drawer) {}

  onClick() {
    this.a.selectionChange.subscribe(() => console.log('On Change'));
    this.a.openedChange.pipe(filter(isOpen => isOpen)).subscribe(() => console.log('On Open'));
    this.a.openedChange.pipe(filter(isOpen => !isOpen)).subscribe(() => console.log('On Close'));

    this.b.labelPosition = 'end';
    this.c.panelClass = ['x', 'y', 'z'];

    this.e.position = 'end';
    this.e.onPositionChanged.subscribe(() => console.log('Align Changed'));
    this.e.openedChange.pipe(filter(isOpen => isOpen)).subscribe(() => console.log('Open'));
    this.e.openedChange.pipe(filter(isOpen => !isOpen)).subscribe(() => console.log('Close'));
  }
}
