import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { Wtf2Dialog } from '@wtf2/theme/wtf2-material';
import { NgForm } from '@angular/forms';
import { Wtf2PerfectScrollbarDirective } from '@wtf2/theme/directives/wtf2-perfect-scrollbar/wtf2-perfect-scrollbar.directive';
import { ChatPanelService } from '@wtf2/theme/wtf2-components/wtf2-chat-panel/chat-panel.service';
import { GroupDemoService } from './group-demo.service';

@Component({
  selector: 'wtf2-group-demo-html',
  templateUrl: './group-demo.component.html',
  styleUrls: ['./group-demo.component.scss']
})
export class GroupDemoComponent implements OnInit, AfterViewInit {
  chat: any;
  chatId: any;
  contacts: any[];
  user: any;
  selectedContact: any;

  @ViewChild('replyInput', { static: false })
  set replyInput(content: ElementRef) {
    this._replyInput = content;
  }

  @ViewChild('replyForm', { static: false })
  set replyForm(content: NgForm) {
    this._replyForm = content;
  }

  @ViewChildren(Wtf2PerfectScrollbarDirective)
  private _wtf2PerfectScrollbarDirectives: QueryList<
    Wtf2PerfectScrollbarDirective
  >;
  private _replyInput: ElementRef;
  private _replyForm: NgForm;
  private _chatViewScrollbar: Wtf2PerfectScrollbarDirective;
  constructor(
    public dailogWindow: Wtf2Dialog,
    private _chatPanelService: ChatPanelService,
    private _GroupDemoService: GroupDemoService
  ) {
    const ContactString = '5725a680b3249760ea21de52';
    // const ContactString = '5725a68009e20d0a9e9acf2a';
    // const ContactString = '5725a68007920cf75051da64';

    this._GroupDemoService.getContacts(ContactString).then(contact => {
      this.selectedContact = contact;
    });
  }
  showDialog() {
    const DialogRef = this.dailogWindow.open(GroupCreateDialogComponent, {});
    DialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this._chatPanelService.loadContacts().then(() => {
      this.contacts = this._chatPanelService.contacts;
      this.user = this._chatPanelService.user;
      this._chatPanelService.getChat(this.selectedContact.id).then(chat => {
        this.chat = chat;
        // Prepare the chat for the replies
        this._prepareChatForReplies();
      });
    });
  }
  ngAfterViewInit(): void {
    this._chatViewScrollbar = this._wtf2PerfectScrollbarDirectives.find(
      directive => {
        return directive.elementRef.nativeElement.id === 'messages';
      }
    );
  }
  private _prepareChatForReplies(): void {
    setTimeout(() => {
      // Reset the reply form
      this._replyForm.reset();
      // Focus to the reply input
      this._replyInput.nativeElement.focus();
      // Scroll to the bottom of the messages list
      if (this._chatViewScrollbar) {
        this._chatViewScrollbar.update();
        setTimeout(() => {
          this._chatViewScrollbar.scrollToBottom(0);
        });
      }
    });
  }
  isFirstMessageOfGroup(message, i): boolean {
    return (
      i === 0 ||
      (this.chat.dialog[i - 1] && this.chat.dialog[i - 1].who !== message.who)
    );
  }
  isLastMessageOfGroup(message, i): boolean {
    return (
      i === this.chat.dialog.length - 1 ||
      (this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== message.who)
    );
  }
  shouldShowContactAvatar(message, i): boolean {
    return (
      message.who === this.selectedContact.id &&
      ((this.chat.dialog[i + 1] &&
        this.chat.dialog[i + 1].who !== this.selectedContact.id) ||
        !this.chat.dialog[i + 1])
    );
  }
  reply(event): void {
    event.preventDefault();
    if (!this._replyForm.form.value.message) {
      return;
    }
    // Message
    const Message = {
      who: this.user.id,
      message: this._replyForm.form.value.message,
      time: new Date().toISOString()
    };
    // Add the message to the chat
    this.chat.dialog.push(Message);
    // Update the server
    this._chatPanelService
      .updateChat(this.chat.id, this.chat.dialog)
      .then(response => {
        // Prepare the chat for the replies
        this._prepareChatForReplies();
      });
  }
  onFileSelectEvent(event) {
    if (event.target.files.length != 0) {
    }
  }
}

@Component({
    selector: 'wtf2-group-create-demo-html',
    templateUrl: './group-create-demo.html',
    styleUrls: ['./group-create-demo.scss'],
})
export class GroupCreateDialogComponent {
    FiletypesList: string[] = ['CSV', 'Excel', 'PDF', 'Image'];
}
