import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { first } from 'rxjs/operators';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

  content : String;
  registerForm: FormGroup;
  user = '';
  currentUser;
  selectedFile: File;

  constructor(private postService: PostService,    
              private formBuilder: FormBuilder,
                      private http: HttpClient,

  ) { 
    this.content = "";
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      content: ['', Validators.required],
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
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
}
upload(idd) {
  console.log("upload function")

  var info = {
      "caption": "additional info"
  };
  console.log("log = ")
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

  onSubmit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("logg : " + this.content);
    this.postService.goCreate(currentUser.id,this.content).pipe(first()).subscribe(data => {
    });
    this.registerForm.controls.content.setValue("");
  }
}
