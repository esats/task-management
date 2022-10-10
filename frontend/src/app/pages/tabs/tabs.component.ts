import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { AssignTaskComponent } from "../dialogs/assign-task-dialog/assign-task.dialog";

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html'
})

export class TabsComponent implements OnInit {
    comments: CommentModel[] = [];
    tasks: TaskModel[] = [];
    users: UserModel[] = [];

    filteredComments: any[] = [];

    filterWord = '';

    selectedIndex = 0;

    constructor(
        private router: Router,
        private commentService: CommentService,
        private taskService: TaskService,
        private userService: UserService,
        private dialog: MatDialog
    ) {}
    
    async ngOnInit(): Promise<void> {
        this.users = await this.userService.getUsers();
        this.tasks = await this.taskService.getTasks();
        this.comments = await this.commentService.getComments();
        
        this.filteredComments = this.comments;
        this.prepareComments();
    }

    goHome() {
        this.router.navigate(['']);
    }

    openComment(id: number) {
        this.router.navigate(['/comment/edit', id]);
    }

    openTask(id: number) {
        this.router.navigate(['/task', id]);
    }

    selectTab(index: number) {
        this.selectedIndex = index;
    }

    async filterComments() {
        if (this.filterWord.trim() == '')
            this.filteredComments = await this.commentService.getComments();
        else
            this.filteredComments = await this.commentService.searchComments(this.filterWord);

        this.prepareComments();
    }

    addTask() {
        this.router.navigate(['/task/edit', 0]);
    }

    addUser() {
        this.router.navigate(['/addUser']);
    }

    private prepareComments() {
        this.filteredComments.forEach(fc => {
            const user = this.users.find(u => Number(u.id) == fc.userId);
            fc.userName = `${user?.name} ${user?.surname}`;
        });
    }

    assignTask(taskId: any, userId: any) {
        this.dialog.open(AssignTaskComponent, { 
            data: {
                taskId: taskId,
                userId: userId
            }
        });
    }
}