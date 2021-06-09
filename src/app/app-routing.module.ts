import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { AddNotesComponent } from './add-notes/add-notes.component';

const routes: Routes = [
  { path: 'list-notes', component: ListNotesComponent },
  { path: 'add-notes', component: AddNotesComponent },
  { path: '', redirectTo: 'list-notes', pathMatch: 'full' }, //default route
  { path: '**', component: ListNotesComponent } //wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
