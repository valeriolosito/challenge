import {
  AfterViewInit,
  Component, ElementRef, Inject,
  OnInit, ViewChild
} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note} from "../../models/note";
import {Position} from "../../components/note/position";
import {Author} from "../../models/author";
import {map, Observable} from "rxjs";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {AuthorService} from "../../services/author/author.service";
import {Option} from "./option";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [
    trigger('inOut', [
      state('inLeftToRight', style({transform: 'translateX(0)'})),
      state('inRightToLeft', style({transform: 'translateX(0)'})),
      transition('* => inLeftToRight', [
        animate('700ms', keyframes([
          style({opacity: 0, transform: 'translateX(-100%)'}),
          style({opacity: 1, transform: 'translateX(0)'})]
        ))]
      ),
      transition('inLeftToRight => *', [
        animate('700ms', keyframes([
          style({opacity: 1, transform: 'translateX(0%)'}),
          style({opacity: 0, transform: 'translateX(-100%)'})]
        ))]
      ),
      transition('* => inRightToLeft', [
        style({ opacity: 0 }),
        animate('700ms', keyframes([
          style({opacity: 0, transform: 'translateX(100%)'}),
          style({opacity: 1, transform: 'translateX(0)'})]
        ))]
      ),
      transition('inRightToLeft => *', [
        animate('700ms', keyframes([
          style({opacity: 1, transform: 'translateX(0%)'}),
          style({opacity: 0, transform: 'translateX(100%)'})]
        ))]
      ),
    ])
  ]
})
export class NotesComponent implements OnInit, AfterViewInit {

  Position = Position;
  notes$: Observable<Note[]> = null;
  currentAuthor: Author = null;
  message: string = '';
  showOpacityArea = true;
  optionsList: Option[] = []
  filteredList: Author[] = [];
  authorsList: Author[] = [];
  @ViewChild('notesBody') notesBody: ElementRef


  constructor(@Inject(NotesService) private notesService: NotesService,@Inject(AuthorService) private authorService: AuthorService) {
    this.notes$ = this.notesService.getNotes().pipe(
      map((data: Note[]) => {
        data = data.sort((a, b) => {
          return a.publishingDate.getTime() - b.publishingDate.getTime();
        });
        this.setOptionsList(data);
        return data;
      })
    );
  }

  /**
   * @param notes list of notes
   * set options List
   */
  private setOptionsList(notes: Note[]) {
    const authors: Author[] = [];
    notes.forEach( (note: Note) => {
      if(!authors.some(x => x.id === note.author.id)) {
        authors.push(note.author);
      }
    });
    this.authorsList = authors;
    authors.forEach((author: Author) => {
      if(!this.optionsList.some(x => x.id === author.id)) {
        const title = this.currentAuthor.id === author.id ? 'You' : `${author.name} ${author.surname}`;
        this.optionsList.push({id: author.id, title, active: false});
      }
    })
    this.setFilteredList();
  }

  ngOnInit(): void {
    this.currentAuthor = this.authorService.getCurrentAuthor();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  /**
   * check if message is valid and add new note
   */
  onPublishClick(): void{
    if(this.message && this.message.trim().length > 0) {
      const note = {
        message: this.message.trim(),
        publishingDate: new Date(),
        author: this.currentAuthor
      }
      this.notesService.addNote(note);
      this.message = '';
      this.scrollToBottom();
    }
  }

  onScrollBody(event: any) {
    this.showOpacityArea = event.target.scrollTop !== 0
  }

  scrollToBottom(): void {
    setTimeout( () => {
      this.notesBody.nativeElement.scrollTop = this.notesBody.nativeElement.scrollHeight;
    },0)
  }

  /**
   * @param option
   * update option value and filtered list
   */
  onSelectedOption(option: Option): void{
    option.active = !option.active;
    this.setFilteredList();
  }

  /**
   * set filtered list
   */
  private setFilteredList(): void {
    const activeOptions = this.optionsList.filter((option: Option) => {
      return option.active
    });
    this.filteredList = [];
    activeOptions.forEach( (option: Option) => {
      const author = this.authorsList.find((author: Author) => {
        return author.id === option.id;
      })
      if (author) {
        this.filteredList.push(author);
      }
    })
  }
}
