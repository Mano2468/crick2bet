import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  message:string;
  constructor(private apiFactory:ApiFactory,private authenticationService:AuthenticationService,private toastr:ToastrService) { 
    this.getMessage();
  }

  ngOnInit(): void {
  }
  submitMsg(){
    console.log(this.message);
    if(!this.message){
     return false;
    }
    
    const formData = new FormData();
    formData.append('setmessage', this.message);
    formData.append('msgid', '1');
        console.log(formData)
    this.apiFactory.setMessage(formData).subscribe(
      res => {
        console.log(res);
       if(res.status=="success"){
        this.toastr.success(res.message, 'success');
        this.getMessage();
       }else{
        this.toastr.error(res.message, 'failed');
       }
      },
      err => {
        console.log(err);
      }
    );
  }
  getMessage(){
    this.apiFactory.getMessage()
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('message', JSON.stringify(res.nbdata[0]));
        this.message = res.nbdata[0].name;
        this.authenticationService.raiseEvent(this.message);
      },
      err => {
        console.log(err);
      }
    );
  }
}
