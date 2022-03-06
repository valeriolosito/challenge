import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Note} from "../../models/note";
import {Position} from "./position";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements AfterViewInit{
  Position = Position;
  @Input() note: Note | undefined
  @Input() position: Position = Position.LEFT;
  @ViewChild('noteText') noteText: ElementRef;
  isClamped = false;
  showFullText = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isClamped = this.noteText.nativeElement.offsetHeight < this.noteText.nativeElement.scrollHeight
  }
  constructor(private cdref: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.isClamped = this.noteText.nativeElement.offsetHeight < this.noteText.nativeElement.scrollHeight
    this.cdref.detectChanges();
  }

}
