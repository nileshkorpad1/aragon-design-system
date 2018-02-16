import { Component, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ToastrService } from '@wtf2/theme/wtf2-components/wtf2-toastr/toastr/toastr.service';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  asyncTabs: Observable<ExampleTab[]>;
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  msg: string;
  constructor(private toastr: ToastrService) {
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam officia minima, labore illum aliquid sit! Odit placeat magni sint provident suscipit porro. Explicabo totam cupiditate eaque, reiciendis repellendus assumenda fuga odio quasi vitae est nobis voluptas ut, qui exercitationem voluptatum ab officiis eius tempore sequi magni! Esse, assumenda voluptatum! Perspiciatis.' },
          { label: 'Second', content: 'lLorem, ipsum dolor sit amet consectetur adipisicing elit. Nam officia minima, labore illum aliquid sit! Odit placeat magni sint provident suscipit porro. Explicabo totam cupiditate eaque, reiciendis repellendus assumenda fuga odio quasi vitae est nobis voluptas ut, qui exercitationem voluptatum ab officiis eius tempore sequi magni! Esse, assumenda voluptatum! Perspiciatis.' },
          { label: 'Third', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam officia minima, labore illum aliquid sit! Odit placeat magni sint provident suscipit porro. Explicabo totam cupiditate eaque, reiciendis repellendus assumenda fuga odio quasi vitae est nobis voluptas ut, qui exercitationem voluptatum ab officiis eius tempore sequi magni! Esse, assumenda voluptatum! Perspiciatis.' },
        ]);
      }, 1000);
    });
  }

  ngOnInit() {
  }
  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  submitData(addTabFlag: boolean) {
    this.msg = "Tab added successfully";
    if (!addTabFlag) {
      this.msg = "Tab deleted successfully";
    }
    this.toastr.success('', this.msg);
  }

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
    this.submitData(true);
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.submitData(false);
  }
}
