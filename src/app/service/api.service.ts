import { Injectable } from '@angular/core';
import data from '../../assets/data.json';
import { Books } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  booksData: Books[] = data.Books;
  userData: any[] = data.Users;
}
