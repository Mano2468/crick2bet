import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss']
})
export class UsercreateComponent implements OnInit {
  createUser: FormGroup;
  loading = false;
  submitted = false;
  title: string;
  closeBtnName: string;
  user_type: string[];
  public onClose: Subject<any>;
  constructor(public bsModalRef: BsModalRef,private formBuilder: FormBuilder,private authenticationService: AuthenticationService,
    private apiFactory: ApiFactory) {
    console.log(this.user_type);
    console.log(this.closeBtnName);
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.createUser = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_phone: ['',Validators.required],
      user_password : ['', Validators.required],
      user_type :['',Validators.required],
      address:['',Validators.required],
      user_login_id:['',Validators.required]
    });
  }
  get f() { return this.createUser.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.createUser.invalid) {
      return;
    }
    this.loading = true;
    this.onClose.next(this.createUser.value);
    this.bsModalRef.hide();
  }
}
