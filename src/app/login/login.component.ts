import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private jsonURL = 'assets/data.json';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: [''],
      Password: [''],
    });
  }

  login() {
    this.http.get<any>(this.jsonURL).subscribe((res) => {
      const user = res.Users.find((a: any) => {
        return a.Email === this.loginForm.value.Email && a.Password === this.loginForm.value.Password
      });
      if(user) {
        localStorage.setItem("userID", user.id);
        this.loginForm.reset();
        this.router.navigate(['/home']);
      }else {
        alert("User not found!");
      }
    }, err => {
      alert("Something went wrong!");
    });
  }
}
