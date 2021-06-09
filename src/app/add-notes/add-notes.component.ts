import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'quill-emoji/dist/quill-emoji.js'; //Using emojis
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  addNotes: FormGroup;
  // Quill Editor declarations
  modules = {}
  content = '';

  constructor(
    private notesService: NotesService,
    private formBuilder: FormBuilder,
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

  ngOnInit(): void {

    // this.addNotes = this.formBuilder.group({
    //   title: new FormControl(),
    //   notes: new FormControl()
    // });

    this.addNotes = this.formBuilder.group({
      title: [
        '',
          [
            Validators.required,
            Validators.minLength(6), //Note: encountered an error in html in declaring the minLength it should be minlength
            Validators.maxLength(50)
          ]
        ],
      notes: ['', Validators.required]
    });

  }

  submitNewNotes(){
    //console.log(this.addNotes.value);
    let newNotesData = {
      notesTitle: this.addNotes.value.title,
      notesBody: this.addNotes.value.notes
    }

    this.notesService.addNotes(newNotesData).subscribe((data: {}) => {
      if(data['success'] == true){

        // A notification message for successfully submit
        this.toastr.success(
          'Data successfully save',
          '',
          {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing'
          });

          // This will reset the reactive form
          this.addNotes.reset();

      }
    });
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

}
