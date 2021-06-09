import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import 'quill-emoji/dist/quill-emoji.js'; //Using emojis
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnChanges {

  changeUpdatedNote: any;

  // Quill Editor declarations
  modules = {}
  content = '';

  // Declare the form
  editNotesForm: FormGroup;
  // Declare input decorator and put alias
  @Input('editListNotes') editNote: any;

  constructor(
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private toastr: ToastrService
  ) {

    // Quill Editor declarations
      this.modules = {
        'emoji-shortname': true,
        'emoji-textarea': true,
        'emoji-toolbar': true,
        'toolbar': [
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          //[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          //[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          //[{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          //['link', 'image', 'video'],                         // link and image, video
          //['emoji']

        ]
      }

   }

  //  This is a lifeCycle Hook that works with child component and for input decorator if there is any changes it will be triggered. You can also use setter and getter but for more than one inputs, ngOnChanges is recommended
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    // Declare the reactive forms control
    // You have to declare this first before setValue/patchValue
    this.editNotesForm = this.formBuilder.group({
      noteId: [this.editNote._id],
      title: [
        this.editNote.notesTitle, 
        Validators.required
      ],
      notes: [
        this.editNote.notesBody, 
        Validators.required
      ]
    });

    // NOTE: I condemn this because we can directly set the value to the formBuilder and also we can set validations for a cleaner code i remove this.
    // Setting the value for reactive form that came from the parent component list-notes.component
    // this.editNotesForm.setValue({
    //   title: this.editNote.notesTitle,
    //   notes: this.editNote.notesBody
    // });

  }

  // Quill Editor declarations
  //Using emojis  
  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  submitEditNotes(){
    const noteId = this.editNotesForm.value.noteId;

    // Gather data from reactive form and be sure that the key(notesTitle and notesBody) is the same as what is in you db because this will be stored in db and it will search for it before it will be stored.
    let editedNotes = {
      notesTitle: this.editNotesForm.value.title,
      notesBody: this.editNotesForm.value.notes
    }
    //console.log(editedNotes);
    this.notesService.updateNote(editedNotes, noteId).subscribe(data => {
      //console.log(data);
      if(data['success'] == true){
        // Notification for success
        this.toastr.success(
          'Data updated successfully',
          '',
          {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          }
        );
      }

      document.getElementById(noteId).innerHTML = data['title'];
    });
  }


}
