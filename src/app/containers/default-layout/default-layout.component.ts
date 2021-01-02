import {Component} from '@angular/core';
import { Role } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  user;
  constructor(private authenticationService: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.usertype.trim()==Role.User){
      for(let n in navItems){
        console.log(n);
        console.log(navItems[n]);
        if(navItems[n].name == 'Users'){
          navItems.splice(parseInt(n),1);
        }
      }
     
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.authenticationService.logout();
}
}
