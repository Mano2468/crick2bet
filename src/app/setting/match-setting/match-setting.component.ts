import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { ApiFactory } from '@app/_services/api-factory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-match-setting',
  templateUrl: './match-setting.component.html',
  styleUrls: ['./match-setting.component.scss']
})
export class MatchSettingComponent implements OnInit {
  gameForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private toastr: ToastrService,
    private apiFactory: ApiFactory) {
  }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      game_type: ['', Validators.required],
      min_stake: ['', [Validators.required, Validators.min(0)]],
      max_stake: ['', [Validators.required, Validators.min(0)]],
      max_profit: ['', [Validators.required, Validators.min(0)]],
      min_profit: ['', [Validators.required, Validators.min(0)]],
      bet_delay: ['', [Validators.required, Validators.min(0)]],
      pre_inply_profit: ['', [Validators.required, Validators.min(0)]],
      pre_inply_stake: ['', [Validators.required, Validators.min(0)]],
      min_odds: ['', [Validators.required, Validators.min(0)]],
      max_odds: ['', [Validators.required, Validators.min(0)]],
      unmatch_bet: ['2', Validators.required],
      minutes_check: ['1', Validators.required]
    });
  }
  get f() { return this.gameForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.gameForm.invalid) {
      return;
    }
    console.log(this.gameForm.value)
    this.loading = true;
    const formData = new FormData();
    formData.append('gametype', this.gameForm.value.game_type);
    formData.append('min_stake_limit', this.gameForm.value.min_stake);
    formData.append('stakelimit', this.gameForm.value.max_stake);
    formData.append('profitLimit', this.gameForm.value.max_profit);
    formData.append('lossLimit', this.gameForm.value.min_profit);
    formData.append('bet_delay', this.gameForm.value.bet_delay);
    formData.append('goinginprofitLimit', this.gameForm.value.pre_inply_profit);
    formData.append('goinginstake', this.gameForm.value.pre_inply_stake);
    formData.append('min_odds', this.gameForm.value.min_odds);
    formData.append('max_odds', this.gameForm.value.max_odds);
    formData.append('is_unmatchbet', this.gameForm.value.unmatch_bet);
    formData.append('goinginplay_bet', this.gameForm.value.minutes_check);
    console.log(formData)
    this.apiFactory.setMatchSetting(formData).subscribe(
      res => {
        console.log(res);
        if (res.status == "success") {
          this.loading = false;
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

  changeGame(e) {
    this.gameForm.get('game_type').setValue(e.target.value, {
      onlySelf: true
    });
    this.getMatchSetting(e.target.value)
  }

  getMatchSetting(id) {
    this.apiFactory.getMatchSetting(id).subscribe(
      res => {
        console.log(res);
        if (res.status == "success") {
          this.toastr.success(res.message, 'success');
          let data = res.nbdata[0];
          this.gameForm.get('game_type').setValue(data.gametype);
          this.gameForm.get('min_stake').setValue(data.minstack);
          this.gameForm.get('max_stake').setValue(data.maxstack);
          this.gameForm.get('max_profit').setValue(data.maxprofit);
          this.gameForm.get('min_profit').setValue(data.maxloss);
          this.gameForm.get('bet_delay').setValue(data.betdelay);
          this.gameForm.get('pre_inply_profit').setValue(data.preinplayprofit);
          this.gameForm.get('pre_inply_stake').setValue(data.preinplaystack);
          this.gameForm.get('min_odds').setValue(data.minodds);
          this.gameForm.get('max_odds').setValue(data.maxodds);
          this.gameForm.get('unmatch_bet').setValue(data.unmatchbet);
          this.gameForm.get('minutes_check').setValue(data.mincheck);

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
