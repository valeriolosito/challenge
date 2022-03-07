import { Pipe, PipeTransform } from '@angular/core';
import {Note} from "../models/note";
import {Author} from "../models/author";

@Pipe({
  name: 'filterNotes'
})
export class FilterNotesPipe implements PipeTransform {
  /**
   * return  list of notes filtered by authors. If authors list is null or empty return the list of notes.
   * @param notes list of notes
   * @param authors list of authors
   */
  transform(notes: Note[], authors: Author[]): Note[] {
    if (!notes || !authors || authors.length === 0) {
      return notes;
    }
    let result: Note[] = [];
    notes.forEach( (note: Note) => {
      if(authors.some(x => x.id === note.author.id)) {
        result.push(note);
      }
    });
    return result;
  }
}
