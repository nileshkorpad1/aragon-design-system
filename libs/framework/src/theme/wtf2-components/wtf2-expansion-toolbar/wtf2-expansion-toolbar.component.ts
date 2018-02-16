import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewEncapsulation,
    HostBinding,
    OnDestroy,
    // OnChanges,
    // EventEmitter,
    // Output,
} from '@angular/core';

import { ButtonConfig } from '../field.interface';
// import { EventEmitter } from 'events';
// import {Wtf2Dialog} from '@wtf2/theme/wtf2-material';

// @Component({
//     selector: 'message-dialog',
//     template: `<h2 wtf2-dialog-title>Message</h2>
//     <wtf2-dialog-content>
//       <h3>Success</h3>
//       <p>Button clicked!!!</p>

//     </wtf2-dialog-content>
//     <wtf2-dialog-actions>
//       <button wtf2-button wtf2-dialog-close>Close</button>
//     </wtf2-dialog-actions>`
// })
// export class messageDialog { }

@Component({
    selector: 'wtf2-expansion-toolbar',
    templateUrl: './wtf2-expansion-toolbar.component.html',
    styleUrls: ['./wtf2-expansion-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Wtf2ExpansionToolbarComponent implements OnInit, OnDestroy {
    //    constructor(public dialog: Wtf2Dialog) {}

    @Input() buttonData: ButtonConfig[] = [];

     @Input() panelClass = '';
    @Output() cardClick: EventEmitter<any> = new EventEmitter();
    @Output() searchClick: EventEmitter<any> = new EventEmitter();
    @Output() searchInput: EventEmitter<any> = new EventEmitter();
    @Output() splitInputClick: EventEmitter<any> = new EventEmitter();
    tempIndex;

    searchButtonFlag: boolean;
    @HostBinding('class')
    elementClass = 'row';
    expandButtonClick(btn, i) {
        if (this.tempIndex == null || this.tempIndex == 'undefined') {
            btn.selected = true;
        } else if (this.tempIndex === i) {
            if (this.buttonData[i].selected) {
                this.buttonData[this.tempIndex].selected = false;
            } else {
                this.buttonData[this.tempIndex].selected = true;
            }
        } else {
            this.buttonData[this.tempIndex].selected = false;
            btn.selected = true;
        }
        this.tempIndex = i;
    }

    buttonClick(btn, i) {
        this.cardClick.emit(btn);
        // console.log("Button cliked!!!");
        // const dialogRef = this.dialog.open(messageDialog, {
        //     height: '100px',
        //     width: '100px',
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }

    menuButtonClick(btn, i, j) {
        console.log('Menu Button cliked!!!');
    }

    close() {
        this.buttonData[0].selected = false;
        this.buttonData[1].selected = false;
    }
    say() {
        console.log('say');
    }
    shout(card, i, j) {
        console.log(card);
        console.log(i);
        switch (i) {
            case 0:
                console.log('From add button');
                break;
            case 1:
                console.log('From Import button');
                break;
            default:
                console.log('nothing clicked');
        }

        switch (j) {
            case 0:
                console.log('Add users clicked');
                break;
            case 1:
                console.log('Import users clicked');
                break;
            default:
                console.log('nothing clicked');
        }
    }

    cardClickAction(parameD, paramCard) {
        this.cardClick.emit(paramCard);
    }
    ngOnInit() {
        this.searchButtonFlag = false;
        this.buttonData.forEach(element => {
            if(element.search){

                this.searchButtonFlag = true;
            }
        });
    }
    ngOnDestroy() {
        this.buttonData.forEach(event => {
            if (event.selected) {
                event.selected = false;
            }
        });
    }


    searchBarClickAction() {
        console.log('clicked search');
        // this.searchClick.emit();
    }
    splitClick(event,i) {
        //emit split button event
        this.cardClick.emit(event);
    }

}
