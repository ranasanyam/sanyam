import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginMode: boolean = true;
  text: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("userID") !== null) {
      this.loginMode = false;
    }

    if(this.loginMode) {
      this.text = "Login";
    } else {
      this.text = "Logout";
    }
  }

  mode() {
    localStorage.removeItem("userID");
    this.router.navigate(['/login']);
  }
}
