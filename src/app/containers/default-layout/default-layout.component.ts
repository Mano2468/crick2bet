import {Component, OnInit} from '@angular/core';
import { ChangePasswordComponent } from '@app/modal/change-password/change-password.component';
import { Role } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
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
  toggleAside:boolean = false;
  constructor(private modalService: BsModalService,private authenticationService: AuthenticationService,private apiFactory:ApiFactory) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(localStorage.getItem('message')){
      this.message = JSON.parse(localStorage.getItem('message')).name;
      console.log(this.message)
    }else{
      this.getMessage();
    }

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
   

  getMessage(){
    this.apiFactory.getMessage()
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('message', JSON.stringify(res.nbdata[0]));
        this.message = res.nbdata[0].name;
      },
      err => {
        console.log(err);
      }
    );
  }
  toggleAsidrBar(){
    this.toggleAside = !this.toggleAside;
    if(this.toggleAside){
      document.querySelector('body').classList.add('aside-menu-show');
    }else{
      document.querySelector('body').classList.remove('aside-menu-show');
    }
    
  }
}
