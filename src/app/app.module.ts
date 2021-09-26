import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from './material/material.module';
import { CreateNotesComponent } from './Components/create-notes/create-notes.component';
import { NoteIconsComponent } from './Components/note-icons/note-icons.component';
import { GetNotesComponent } from './Components/get-notes/get-notes.component';
import { GetNoteIconsComponent } from './Components/get-note-icons/get-note-icons.component';
import { GetArchiveComponent } from './Components/get-archive/get-archive.component';
import { GetTrashComponent } from './Components/get-trash/get-trash.component';
import { GetRemindersComponent } from './Components/get-reminders/get-reminders.component';
import { AddCollaboratorComponent } from './Components/add-collaborator/add-collaborator.component';
import { EditNoteComponent } from './Components/edit-note/edit-note.component';
import { EditLabelComponent } from './Components/edit-label/edit-label.component';
import { GetNotesByLabelComponent } from './Components/get-notes-by-label/get-notes-by-label.component';
import { AddImageComponent } from './Components/add-image/add-image.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    CreateNotesComponent,
    NoteIconsComponent,
    GetNotesComponent,
    GetNoteIconsComponent,
    GetArchiveComponent,
    GetTrashComponent,
    GetRemindersComponent,
    AddCollaboratorComponent,
    EditNoteComponent,
    GetNotesByLabelComponent,
    EditLabelComponent,
    AddImageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }