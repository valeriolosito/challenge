import { Injectable } from '@angular/core';
import {Author} from "../../models/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  /**
   * get current author
   */
  getCurrentAuthor(): Author{
    return {
      id: 1,
      name: 'Mario',
      surname: 'Rossi',
      image : 'assets/images/profile.jpg'
    }
  }
}
