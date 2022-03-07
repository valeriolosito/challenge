import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotesComponent} from "./pages/notes/notes.component";

const routes: Routes = [
  {path: 'notes', component: NotesComponent},
  {path: '', redirectTo: '/notes', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
