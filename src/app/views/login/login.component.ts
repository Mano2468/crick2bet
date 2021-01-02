import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import * as sha512 from 'js-sha512';
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
  randomStr:string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/dashboard']);
    }
    this.randomStr = this.randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    console.log(this.randomStr)
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
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.randomStr+this.f.password.value);
    let encPass = sha512.sha512(this.randomStr+this.f.password.value);
    console.log(encPass);
    this.authenticationService.login(this.f.username.value, encPass)
      .subscribe(
        data => {
          if(data.status == "success"){
            this.router.navigate(['/dashboard']);
          }this.router.navigate([this.returnUrl]);this.loading = false; this.error = data.message;
          
        },
        error => {
          this.error = error;
          this.loading = false;
        });
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