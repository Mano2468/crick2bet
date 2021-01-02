import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import * as sha512 from 'js-sha512';
import { AppData } from '@app/_services/app-data';
import { ApiFactory } from '@app/_services/api-factory';
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  randomStr: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiFactory: ApiFactory) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/dashboard']);
    }

  }

  ngOnInit() {
    console.log("login");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = null;
    this.randomStr = this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    console.log(this.randomStr)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.randomStr + this.f.password.value);
    let encPass = sha512.sha512(this.f.password.value);
    console.log(encPass);
    this.authenticationService.login(this.f.username.value, this.randomStr + encPass)
      .subscribe(
        data => {
          if (data.status == "success") {
            this.router.navigate(['/dashboard']);
            this.getMasterData();
          } else{this.router.navigate([this.returnUrl]); this.loading = false; this.error = data.message;}

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
  getMasterData() {
    this.apiFactory.getMasterData()
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('masterData', JSON.stringify(res.nbdata));
        },
        err => {
          console.log(err);
        }
      );
  }
  dashBoard() {
    this.router.navigate(['/dashboard']);
  }
  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

}