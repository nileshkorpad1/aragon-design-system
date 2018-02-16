import {Component} from '@angular/core';

@Component({
  template: `
    <wtf2-select (selectionChange)="onChange($event)"></wtf2-select>
    <wtf2-select (closed)="onClose($event)"></wtf2-select>
    <wtf2-select (opened)="onOpen($event)"></wtf2-select>
  `
})
class A {}

@Component({
  template: `
    <wtf2-drawer (positionChanged)="onAlignChanged()"></wtf2-drawer>
    <wtf2-drawer (closed)="onClose()" (opened)="onOpen()"></wtf2-drawer>
    <wtf2-tab-group (selectedTabChange)="onSelectionChange()"></wtf2-tab-group>
  `
})
class B {}

@Component({
  template: `
    <wtf2-chip (removed)="removeFromList()"></wtf2-chip>
    <wtf2-basic-chip (removed)="removeFromList()"></wtf2-basic-chip>
    <wtf2-chip (destroyed)="onDestroy()"></wtf2-chip>
    <wtf2-basic-chip (destroyed)="onDestroy()"></wtf2-basic-chip>
  `
})
class C {}
