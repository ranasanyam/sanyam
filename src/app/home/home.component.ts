import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Books } from '../model';
import { WishlistService } from '../service/wishlist.service';
import { CompletedBooksService } from '../service/completed-books.service';
import { HttpClient } from '@angular/common/http';
import data from '../../assets/data.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userID = localStorage.getItem("userID");

  constructor(
    private apiService: ApiService,
    private wishlistService: WishlistService,
    private completeService: CompletedBooksService,
    private http: HttpClient
  ) {}

  booksData: Books[] = [];

  ngOnInit(): void {
    this.booksData = this.apiService.booksData;
  }

  addToWishlist(book: Books) {
    this.wishlistService.addToWishlist(book);
  }

  addToCompleteBooks(book: Books) {
    this.completeService.addToCompleteBooks(book);
    // this.http.post<any>(`http://localhost:3000/Users/${this.userID}/WishList`, )
  }
}
