import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[userRoleDirective]'
})
export class UserroledirectiveDirective implements OnInit {
  @Input() pageName = '';
  @Input() userRoleDirective;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    // console.log(this.userRoleDirective, this.pageName);
    if (localStorage.getItem('userroles')) {
      let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');
      userRolesData.forEach(element => {
        if (element.title == this.pageName) {
          let currentMenu = element.permission.find(x => x.action.toLowerCase() === this.userRoleDirective.toLowerCase());
          if (currentMenu == undefined || currentMenu == null || !currentMenu.status) {
            this.elementRef.nativeElement.remove();
          }
        }
      })
    }
  }
}
