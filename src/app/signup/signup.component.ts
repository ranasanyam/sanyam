import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: [''],
      Password: [''],
      Phone: [''],
      Email: [''],
      UserType: "Customer",
      WishList: [[]],
      Completed: [[]]
    });
  }
  
  signup() {
    this.http.post<any>("http://localhost:3000/Users", this.signupForm.value)
    .subscribe(res => {
      alert("Signup Successfull, Now, Login please");
      this.signupForm.reset();
      this.router.navigate(["/login"]);
    },err => {
      alert("Something went wrong");
    })
  }

  
}
