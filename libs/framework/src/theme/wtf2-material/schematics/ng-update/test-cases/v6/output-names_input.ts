import {Component} from '@angular/core';

@Component({
  template: `
    <wtf2-select (change)="onChange($event)"></wtf2-select>
    <wtf2-select (onClose)="onClose($event)"></wtf2-select>
    <wtf2-select (onOpen)="onOpen($event)"></wtf2-select>
  `
})
class A {}

@Component({
  template: `
    <wtf2-drawer (align-changed)="onAlignChanged()"></wtf2-drawer>
    <wtf2-drawer (close)="onClose()" (open)="onOpen()"></wtf2-drawer>
    <wtf2-tab-group (selectChange)="onSelectionChange()"></wtf2-tab-group>
  `
})
class B {}

@Component({
  template: `
    <wtf2-chip (remove)="removeFromList()"></wtf2-chip>
    <wtf2-basic-chip (remove)="removeFromList()"></wtf2-basic-chip>
    <wtf2-chip (destroy)="onDestroy()"></wtf2-chip>
    <wtf2-basic-chip (destroy)="onDestroy()"></wtf2-basic-chip>
  `
})
class C {}
