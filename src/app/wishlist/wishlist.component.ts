import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../model';
import { ApiService } from '../service/api.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Books[] = [];
  userID = localStorage.getItem('userID');
  fetchedId: any[] = [];
  books: any[] = [];
  private jsonURL = 'assets/data.json';

  constructor(
    private wishlistService: WishlistService,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if(this.userID === null) {
      alert("Login first to watch wishlist!");
      this.router.navigate(['/home']);
    }

    this.books = this.apiService.booksData;
    this.http.get<any>(this.jsonURL).subscribe(
      (res) => {
        const user = res.Users.find((a: any) => {
          return a.id == this.userID;
        });
        this.fetchedId = user.WishList;
        for(let i=0;i<this.fetchedId.length;i++){
          let id = this.fetchedId[i];
          this.books.filter((x) => {
            if(x.id == id){
              this.wishlist.push(x);
            }
          })
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
    
    this.wishlist = this.wishlistService.wishlistItem;
  };
  // }

  onClick() {
    this.router.navigate(['/home']);
  }
}
