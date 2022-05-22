import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../model';
import { ApiService } from '../service/api.service';
import { CompletedBooksService } from '../service/completed-books.service';

@Component({
  selector: 'app-completed-books',
  templateUrl: './completed-books.component.html',
  styleUrls: ['./completed-books.component.css'],
})
export class CompletedBooksComponent implements OnInit {
  completeBookList: Books[] = [];
  books: any[] = [];
  userID = localStorage.getItem('userID');
  fetchedId: number[] = [];
  user;
  private jsonURL = 'assets/data.json';

  constructor(
    private completeService: CompletedBooksService,
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if(this.userID === null) {
      alert("Login first to watch completed books!");
      this.router.navigate(['/home']);
    }

    this.books = this.apiService.booksData;
    this.http.get<any>(this.jsonURL).subscribe(
      (res) => {
        this.user = res.Users.find((a: any) => {
          return a.id == this.userID;
        });
        this.fetchedId = this.user.Completed;
        for (let i = 0; i < this.fetchedId.length; i++) {
          let id = this.fetchedId[i];
          this.books.filter((x) => {
            if (x.id == id) {
              this.completeBookList.push(x);
            }
          });
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
    
    this.completeBookList = this.completeService.completeBooksList;
  }

  onClick() {
    this.router.navigate(['/home']);
  }
}
