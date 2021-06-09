import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {

  listNotes: any;
  editListNotes: any;
  viewListNotes: any;
  viewNoteVisible : boolean;
  editNoteVisible: boolean;
  notesTitle: string;
  notesBody: any;

  constructor(
    private notesService: NotesService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.showListNotes();

  }

  showListNotes(){
    this.notesService.listNotes().subscribe( (data: Object) => {
      //To check what type of data it will return
      //console.log(typeof data)
      this.listNotes = data;
    });
  }


  deleteNote(noteId){
    // Calling and deleting record from db via service
    this.notesService.deleteNote(noteId).subscribe((data: {}) => {
      if(data['success'] == true){
        // Popup success notification with toastr package
        this.toastr.success(
          'Data successfully deleted',
          '',
          {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing'
          });
        
        // This is to make showListNotes fires after the toastr finish loading
        setInterval( () => this.showListNotes(), 2000 );
      }
    });
  }

  viewNote(listData){
    // To show and hide view and edit notes
    this.viewNoteVisible = true;
    this.editNoteVisible = false;

    this.notesTitle = listData.notesTitle;
    // This is to allow innerHTML in angular
    this.notesBody = this.sanitizer.bypassSecurityTrustHtml(listData.notesBody);
  }

  editNote(listData){
    // To show and hide view and edit notes
    this.editNoteVisible = true;
    this.viewNoteVisible = false;

    this.editListNotes = listData;
  }

}
