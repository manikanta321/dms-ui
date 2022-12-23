import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import tippy, { hideAll } from 'tippy.js';

@Component({
  selector: 'app-geographic-list-action',
  templateUrl: './geographic-list-action.component.html',
  styleUrls: ['./geographic-list-action.component.css']
})
export class GeographicListActionComponent implements OnInit {

 

  private params;
  public isOpen = false;
  private tippyInstance;
  selected:boolean=false;

  @ViewChild('content') container;

  @ViewChild('trigger') button
  constructor(private changeDetector: ChangeDetectorRef,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params) {
    this.params = params;
  }

  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();

    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'left',
      theme: 'user-tippy',
      arrow: false,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      offset: [-100, 200],
      onShow: (instance) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance, event) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
  }

  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }

  orderedit(){
   
      
    this.isOpen=false;
  }
 

}
