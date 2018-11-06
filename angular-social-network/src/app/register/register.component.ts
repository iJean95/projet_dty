import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    user = '';
    currentUser;
    selectedFile: File;
    //selectedFile: File = null;
    fd = new FormData();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private http: HttpClient,
    ) { }

    createFormData(event) {
        console.log("hello there")
        this.selectedFile = <File>event.target.files[0];
        this.fd.append('file', this.selectedFile, this.selectedFile.name);
    }

    upload(idd) {
        console.log("upload function")

        var info = {
            "caption": "additional info"
        };
        this.fd.append('data', "donnnnnnnnneees");
        console.log("log = ")
        console.log(this.fd.get("file"))
        const formData: FormData = new FormData(); //?
        var extn = this.selectedFile.name.split(".").pop();
        // const name = "5b90469275f81017b5c63c54"+"."+extn;
        const name = idd;
        console.log("name = "+ name);
        formData.append('file', this.selectedFile,name+'.'+extn );
        //formData.append('idd', this.currentUser.id);



        this.http.post('http://localhost:4000/upload/',
            formData).subscribe(result => {
                console.log(result)
            });



        console.log('posted')
    }

    ngOnInit() {
        console.log("ngonint")

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            //            id: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]

        });
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.user = this.currentUser.username;
        }
        else {
            this.user = '';
        }


    }

    //loading image
    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log('submitting new user')
        // stop here if form is invalid
        this.loading = true;
        
        this.userService.register({ ...this.registerForm.value })
            .pipe(first())
            .subscribe(
                data => {
                    console.log('data new user : ' + data.id)
                    this.upload(data.id);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
