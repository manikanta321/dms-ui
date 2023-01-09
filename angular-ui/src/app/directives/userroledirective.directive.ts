import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[userRoleDirective]'
})
export class UserroledirectiveDirective implements OnInit {
  @Input() pageName = '';
  @Input() userRoleDirective;

  constructor(private elementRef: ElementRef, private vcr: ViewContainerRef) { }

  ngOnInit(): void {
    // console.log(this.userRoleDirective, this.pageName);
    console.log(this.elementRef);
    if (localStorage.getItem('userroles')) {
      let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');
      userRolesData.forEach(element => {
        if (element.title == this.pageName) {
          let currentMenu = element.permission.find(x => x.action.toLowerCase() === this.userRoleDirective.toLowerCase());
          console.log(currentMenu);
          if (currentMenu == undefined || currentMenu == null || !currentMenu.status) {
            // console.log(this.elementRef);
            // this.vcr.clear();
            this.elementRef.nativeElement.remove();
          }
        }
      })
    }
  }
}
