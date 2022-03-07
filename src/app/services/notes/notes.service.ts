import { Injectable } from '@angular/core';
import {Note} from "../../models/note";
import {BehaviorSubject, Observable } from "rxjs";
import {USER_NOTES} from "../../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2017-03-07T10:00:00'),
      author: {
        id: 1,
        name: 'Mario',
        surname: 'Rossi',
        image: 'assets/images/profile.jpg'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2020-03-07T10:00:00'),
      author: {
        id: 1,
        name: 'Mario',
        surname: 'Rossi',
        image: 'assets/images/profile.jpg'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2021-03-07T10:00:00'),
      author: {
        id: 2,
        name: 'Mauro',
        surname: 'Verdi',
        image: 'assets/images/mauro_verdi.png'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2021-01-11T10:00:00'),
      author: {
        id: 1,
        name: 'Mario',
        surname: 'Rossi',
        image: 'assets/images/profile.jpg'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2022-01-11T10:00:00'),
      author: {
        id: 2,
        name: 'Mauro',
        surname: 'Verdi',
        image: 'assets/images/mauro_verdi.png'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, sectetur adipiscing elit, sed do eisectetur adipiscing elit, sed do eisectetur adipiscing elit, sed do eisectetur adipiscing elit, sed do eisectetur adipiscing elit, sed do ei consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2022-02-11T10:00:00'),
      author: {
        id: 2,
        name: 'Mauro',
        surname: 'Verdi',
        image: 'assets/images/mauro_verdi.png'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2017-03-07T10:00:00'),
      author: {
        id: 1,
        name: 'Mario',
        surname: 'Rossi',
        image: 'assets/images/profile.jpg'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2020-03-07T10:00:00'),
      author: {
        id: 4,
        name: 'Patrizia',
        surname: 'Rossi',
        image: 'assets/images/patrizia_rossi.jpg'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2021-03-07T10:00:00'),
      author: {
        id: 9,
        name: 'Valerio',
        surname: 'Verdi',
        image: 'assets/images/valerio_verdi.png'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2021-01-11T10:00:00'),
      author: {
        id: 3,
        name: 'Andrea',
        surname: 'Bianchi',
        image: 'assets/images/andrea_bianchi.png'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2019-01-11T10:00:00'),
      author: {
        id: 6,
        name: 'Roberto',
        surname: 'Verdi',
        image: 'assets/images/roberto_verdi.png'
      }
    },
    {
      message: 'Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      publishingDate: new Date('2002-07-11T10:00:00'),
      author: {
        id: 9,
        name: 'Valerio',
        surname: 'Verdi',
        image: 'assets/images/valerio_verdi.png'
      }
    }
  ]

  private notes$ : BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor() {
    // get notes from localstorage
    let userNotes: Note[] = JSON.parse(localStorage.getItem(USER_NOTES)) || [];
    // To parse publishingDate from string to Date
    userNotes = userNotes.map((note: Note) => {
      note.publishingDate = new Date(note.publishingDate);
      return note;
    })
    this.notes.push(...userNotes);
    this.notes$.next(this.notes);
  }


  /**
   * get list of notes as Observable
   */
  public getNotes(): Observable<Note[]> {
    return this.notes$
  }

  /**
   * add note into notes and localstorage
   * @param note
   */
  public addNote(note: Note): void {
    this.notes.push(note);
    this.notes$.next(this.notes);
    const userNotes = JSON.parse(localStorage.getItem(USER_NOTES)) || [];
    userNotes.push(note);
    localStorage.setItem(USER_NOTES, JSON.stringify(userNotes));
  }

}
