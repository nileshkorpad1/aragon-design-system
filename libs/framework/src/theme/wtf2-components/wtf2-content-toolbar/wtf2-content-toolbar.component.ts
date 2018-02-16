import { Component, Input } from '@angular/core';

@Component({
    selector   : 'wtf2-content-toolbar-action-panel',
    templateUrl: './wtf2-content-toolbar-action-panel.html',
    styleUrls: ['./wtf2-content-toolbar.component.scss'],
})
export class Wtf2ContentToolbarActionPanel {
    // expand = false;
    @Input() expanded = false;
    constructor() {
    }
    expand()    {
        console.log('framework expand');
    }
}

@Component({
    selector   : 'wtf2-content-toolbar-button-group',
    templateUrl: './wtf2-content-toolbar-button-group.html',
    styleUrls: ['./wtf2-content-toolbar.component.scss'],
})
export class Wtf2ContentToolbarButtonGroup {
    constructor() {
    }

}

@Component({
    selector   : 'wtf2-content-toolbar-expansion-panel',
    templateUrl: './wtf2-content-toolbar-expansion-panel.html',
    styleUrls: ['./wtf2-content-toolbar.component.scss'],
})
export class Wtf2ContentToolbarComponent {
    constructor() {
    }

}
