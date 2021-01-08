import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: FormGroup;
  loading = false;
  submitted = false;
  title: string;
  closeBtnName: string;
  user_id: string;
  constructor(public bsModalRef: BsModalRef,private formBuilder: FormBuilder,private authenticationService: AuthenticationService,private toastr: ToastrService,
    private apiFactory: ApiFactory) {
    console.log(this.user_id);
    console.log(this.closeBtnName);
  }

  ngOnInit(): void {
    this.changePassword = this.formBuilder.group({
      actualpassword: ['', Validators.required],
      newpassword: ['',Validators.required],
      confirmNewPassword:['',Validators.required]
    });
  }
  get f() { return this.changePassword.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.changePassword.invalid) {
      return;
    }
    this.loading = true;
    this.bsModalRef.hide();
    let obj = {
      "actualpassword":this.changePassword.value.actualpassword,
      "newpassword":this.changePassword.value.newpassword,
      "userid":this.user_id
    }
    this.apiFactory.changePassword(obj).subscribe(
      res => {
        console.log(res);
       if(res.status=="success"){
        this.toastr.success(res.message, 'success');
        this.authenticationService.logout();
       }else{
        this.toastr.error(res.message, 'failed');
       }
      },
      err => {
        console.log(err);
      }
    );
  }

}
