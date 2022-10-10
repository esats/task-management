import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentEditComponent } from './pages/comment-edit/comment-edit.component';
import { userComponent } from './pages/user/user.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
  { path: '', component: TabsComponent },
  { path: 'addUser', component: userComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'task/:id', component: TaskComponent },
  { path: 'task/edit/:id', component: TaskEditComponent },
  { path: 'comment/edit/:id', component: CommentEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
