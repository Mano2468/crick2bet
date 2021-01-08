import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-wdc-amount',
  templateUrl: './wdc-amount.component.html',
  styleUrls: ['./wdc-amount.component.scss']
})
export class WdcAmountComponent implements OnInit {

  wdcForm: FormGroup;
  loading = false;
  submitted = false;
  title: string;
  balanceAmout = 0;
  created_by: string;
  user_id: string;
  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private toastr: ToastrService,
    private apiFactory: ApiFactory) { }

  ngOnInit(): void {
    this.balanceAmout = parseInt(this.title);
    this.wdcForm = this.formBuilder.group({
      chip_amount: ['', [Validators.required, Validators.max(parseInt(this.title)), Validators.min(1)]],
      chip_type: ['', Validators.required],
      remarks: ['', Validators.required]
    });
    this.wdcForm.valueChanges.subscribe(val => {
      // console.log(val);
      if (val.chip_type != '') {
        if (val.chip_type == '2') {
          let amount = parseInt(this.title);
          amount = amount - val.chip_amount;
          // console.log(amount);
          this.balanceAmout = amount;
        }else if(val.chip_type =='1'){
          let amount = parseInt(this.title);
          amount = amount + val.chip_amount;
          // console.log(amount);
          this.balanceAmout = amount;
        }else{
          let amount = parseInt(this.title);
          this.balanceAmout = amount;
        }

      }

    });
  }
  get f() { return this.wdcForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.wdcForm.invalid) {
      return;
    }
    this.loading = true;
    this.bsModalRef.hide();
    let obj = {
      "userid": this.user_id,
      "chip_type": this.wdcForm.value.chip_type,
      "chip_amts": this.wdcForm.value.chip_amount,
      "remarks": this.wdcForm.value.remarks,
      "createdby": this.created_by
    }
    this.apiFactory.wdcFromSubmit(obj).subscribe(
      res => {
        console.log(res);
        if (res.status == "success") {
          this.toastr.success(res.message, 'success');
        } else {
          this.toastr.error(res.message, 'failed');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
