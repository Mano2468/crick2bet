import { Component, OnInit } from '@angular/core';
import { ModalContentComponent } from '@app/modal/modal-popup';
import { UsercreateComponent } from '@app/modal/usercreate/usercreate.component';
import { Role } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
import { AppData } from '@app/_services/app-data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  modalRef: BsModalRef | null;
  userType:any = [];
  createUserForm:any;
  user;
  userList:any;
  constructor(private modalService: BsModalService,private authenticationService:AuthenticationService,private apiFactory:ApiFactory) {
      this.userType = JSON.parse(localStorage.getItem('masterData'));
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getUserList();
   }
 
  createUser() {
    if(Role.Admin == this.user.usertype.trim()){
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Admin');
    }else if(Role.SuperAdmin== this.user.usertype.trim()){
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Admin');
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Super Admin');
    }else if(Role.Master== this.user.usertype.trim()){
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Admin');
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Super Admin');
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Master');
    }else if(Role.Dealer== this.user.usertype.trim()){
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Admin');
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Super Admin');
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Master');
      this.userType =this.userType.filter((item) => item.name.trim() !== 'Dealer');
    }
    console.log(this.userType)
    const initialState = {
      user_type:this.userType,
      title: 'Create Super Master for Admin',
      closeBtnName: 'Close',
    };
    this.modalRef = this.modalService.show(UsercreateComponent, {initialState,backdrop: "static",
    keyboard: false,class:'modal-dialog-centered',},);
    this.modalRef.content.onClose.subscribe(result => {
      this.createUserForm = result;
    
      // this.createUserForm['user_login_id'] =  "dfgh";
      this.createUserForm['createdby'] = this.user.type;
      console.log(this.createUserForm);
      

      this.apiFactory.createUser(this.createUserForm).subscribe(
        res => {
          console.log(res);
         
        },
        err => {
          console.log(err);
        }
      );
      this.getUserList();
      console.log('results', result);
  })
    // this.modalRef.setClass('modal-sm');
    console.log(this.authenticationService.userValue);
  }
  getUserList(){
    this.userList = [];
    this.apiFactory.getUser(this.user.type).subscribe(
      res => {
        console.log(res);
        this.userList = res.nbdata;
      },
      err => {
        console.log(err);
      }
    );
  }
   
  getUserType(id):string{
    for(var i in this.userType){
      if(this.userType[i].id == id)return this.userType[i].name;
    }
  }
  ngOnInit(): void {
  }

}
