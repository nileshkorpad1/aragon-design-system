import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ButtonConfig } from '@wtf2/theme/wtf2-components/field.interface';
import {
    PerfectScrollbarDirective,
    PerfectScrollbarConfig,
} from '@wtf2/theme/wtf2-components/wtf2-scrollbar';


export const buttonData1: ButtonConfig[] = [
           {
               icon: 'add',
               label: 'ADD',
               selected: false,
               type: 'button',
           },
           {
               icon: 'delete',
               label: 'DELETE',
               selected: false,
               type: 'button',
           },
       ];

@Component({
  selector: 'app-settingsdemo',
  templateUrl: './settingsdemo.component.html',
  styleUrls: ['./settingsdemo.component.scss']
})
export class SettingsdemoComponent {
  buttonData: ButtonConfig[] = buttonData1;
  currentSection = 'company';
  @ViewChild(PerfectScrollbarDirective, { static: false })
  directiveRef?: PerfectScrollbarDirective;
  public config: PerfectScrollbarConfig;

  currentSectionPid = {
    id: 'company',
    pid: 'company'
  };
  isactive = 1;
  items = [
    {
      name: 'Company',
      id: 'company',
      activeid: 1,
      pid: 'company',
      subItems: [
        {
          name: 'Company Details',
          id: 'companyDetails',
          pid: 'company'
        },
        {
          name: 'Billing Address',
          id: 'billingAddress',
          pid: 'company'
        },
        {
          name: 'Shipping Address',
          id: 'shippingAddress',
          pid: 'company'
        },
        {
          name: 'Remit Payment',
          id: 'remitpayment',
          pid: 'company'
        },
        {
          name: 'IBG Collection Details',
          id: 'IBGCollectionDetails',
          pid: 'company'
        },
        {
          name: 'Company Gst Details',
          id: 'companyGstDetails',
          pid: 'company'
        }
      ]
    },
    {
      name: 'Users',
      id: 'users',
      activeid: 2,
      pid: 'users',
      subItems: []
    },
    {
      name: 'Financial',
      id: 'financial',
      pid: 'financial',
      subItems: [
        {
          name: 'Inventory Valuation Method',
          id: 'inventoryValuationMethod',
          pid: 'financial'
        }
      ]
    },
    {
      name: 'Inventory',
      id: 'inventory',
      pid: 'inventory',
      subItems: []
    },
    {
      name: 'Asset',
      id: 'asset',
      pid: 'asset',
      subItems: []
    },
    {
      name: 'Design Template',
      id: 'designTemplate',
      pid: 'designTemplate',
      subItems: []
    },
    {
      name: 'Others',
      id: 'others',
      pid: 'others',
      subItems: []
    }
  ];

  constructor() {}
  onSectionChange(sectionId: string) {
    if (sectionId !== '' || sectionId === undefined) {
      this.currentSection = sectionId;
      this.currentSectionPid = this.items.find(item => item.id === sectionId);
      if (this.currentSectionPid === undefined && sectionId !== '') {
        for (var I = 0; I < this.items.length; I++) {
          const Obj = this.items[I];
          if (Obj.subItems !== undefined) {
            this.currentSectionPid = Obj.subItems.find(
              item => item.id === sectionId
            );
            if (this.currentSectionPid !== undefined) {
              break;
            }
            if (this.currentSectionPid === undefined) {
              this.currentSectionPid = {
                id: 'company',
                pid: 'company'
              };
            }
          }
        }
      }
    }
  }
  public scrollToElement(
    section: string,
    offset?: number,
    speed?: number
  ): void {
    this.directiveRef.scrollToElement('#' + section, 0, 1000);
    // document.querySelector('#' + section).scrollIntoView();
  }
  public onScrollEvent(event: any): void {
    console.log(event);
  }
}
