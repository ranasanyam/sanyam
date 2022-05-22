import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Books } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CompletedBooksService {
  completeBooksList: any = [];
  bookDetails = new Subject<any>();

  constructor() { }

  addToCompleteBooks(book: Books) {
    this.completeBooksList.push(book);
    this.bookDetails.next(this.completeBooksList);
  }
}
