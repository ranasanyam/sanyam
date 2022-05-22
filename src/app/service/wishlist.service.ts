import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Books } from '../model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService implements OnInit{
  wishlistItem: any = [];
  bookDetails = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
  }

  addToWishlist(book: Books) {
    this.wishlistItem.push(book);
    this.bookDetails.next(this.wishlistItem);
  }
}
