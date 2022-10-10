import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentEditComponent } from './pages/comment-edit/comment-edit.component';
import { userComponent } from './pages/user/user.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskComponent } from './pages/task/task.component';
import { CommentService } from './services/comment.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignTaskComponent } from './pages/dialogs/assign-task-dialog/assign-task.dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    userComponent,
    TaskComponent,
    TaskEditComponent,
    CommentEditComponent,
    TabsComponent,
    AssignTaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserService,
    TaskService,
    CommentService,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule
  ],
  entryComponents: [
    AssignTaskComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
