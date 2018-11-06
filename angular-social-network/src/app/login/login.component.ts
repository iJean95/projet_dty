import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: any;
  submitted = false;
  loading = false;
  result = 'not logged in';
  user = '';
  currentUser;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router)
{
  }



  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required]],
    });

    this.authenticationService.logout();

  }
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.result = 'trying';

    // if (this.userForm.invalid){
    //   return;
    // }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
            //this.router.navigate([this.returnUrl]);
            this.result = 'logged in lol'+' '+this.f.username.value+' '+this.f.password.value;
            this.router.navigate(['/timeline']);


          },
        error => {
            this.loading = false;    
            this.result = 'failed lol';

        });

  }

}
