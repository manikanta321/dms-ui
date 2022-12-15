import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[userRoleDirective]'
})
export class UserroledirectiveDirective implements OnInit {
  @Input() pageName = '';
  @Input() userRoleDirective;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    console.log(this.userRoleDirective, this.pageName);
    if (localStorage.getItem('userroles')) {
      let userRolesData = JSON.parse(localStorage.getItem('userroles') ?? '[]');
      userRolesData.forEach(element => {
        if (element.key == this.pageName) {
          let currentMenu = element.permissions.find(x => x.action == this.userRoleDirective);
          if (!currentMenu.status) {
            this.elementRef.nativeElement.remove();
          }
        }
      })
    }
  }
}
