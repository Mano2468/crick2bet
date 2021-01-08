import {Component, OnInit} from '@angular/core';
import { ChangePasswordComponent } from '@app/modal/change-password/change-password.component';
import { Role } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  user;
  modalRef: BsModalRef | null;
  message:any;
  constructor(private modalService: BsModalService,private authenticationService: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.message = JSON.parse(localStorage.getItem('message')).name;
    console.log(this.message)
    if(this.user.usertype.trim()==Role.User){
      for(let n in navItems){
        console.log(n);
        console.log(navItems[n]);
        if(navItems[n].name == 'Users'){
          navItems.splice(parseInt(n),1);
        }
      }
     
    }
    if(this.user.usertype.trim()!==Role.Admin){
      for(let n in navItems){
        console.log(n);
        console.log(navItems[n]);
        if(navItems[n].name == 'Setting'){
          navItems.splice(parseInt(n),1);
        }
      }
     
    }
   
  }
  ngOnInit(): void {
    this.authenticationService.marqueeMsg.subscribe((msg: string) => {
      this.message = msg;
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.authenticationService.logout();
  }

  changePassword(){
    console.log(this.user);
    const initialState = {
      user_id: this.user.id,
      title: 'Change Password',
      closeBtnName: 'Close',
    };
    this.modalRef = this.modalService.show(ChangePasswordComponent, {
      initialState, backdrop: "static",
      keyboard: false, class: 'modal-dialog-centered',
    });
  }
}
