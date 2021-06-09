import { Injectable } from '@angular/core';
import { NotesModel } from '../model/notes.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // READ - Display all notes record from db
  listNotes(): Observable<NotesModel>{
    const url = `${environment.BASE_URL}/${environment.NOTES.DISPLAY_ALL_NOTES}`;

    return this.httpClient.get<NotesModel>(url);
  }

  // CREATE - Add notes
  addNotes(newNotesData): Observable<NotesModel>{
    const url = `${environment.BASE_URL}/${environment.NOTES.ADD_NOTES}`;

    return this.httpClient.post<NotesModel>(url, newNotesData);
  }

  // READ SPECIFIC - Read specific notes
  showNote(noteId): Observable<NotesModel>{
    // ES6 Template string
    const url = `${environment.BASE_URL}/${environment.NOTES.GET_SPECIFIC_NOTE}/${noteId}`;

    return this.httpClient.get<NotesModel>(url);
  }

  // DELETE SPECIFIC - Delete specific note
  deleteNote(noteId): Observable<NotesModel>{
    const url = `${environment.BASE_URL}/${environment.NOTES.DELETE_SPECIFIC_NOTE}/${noteId}`;

    return this.httpClient.delete<NotesModel>(url);
  }

  // UPDATE SPECIFIC - Update specific note
  updateNote(noteUpdatedData, noteId): Observable<NotesModel>{
    const url = `${environment.BASE_URL}/${environment.NOTES.EDIT_SPECIFIC_NOTE}/${noteId}`;

    return this.httpClient.patch<NotesModel>(url, noteUpdatedData);
  }
}
