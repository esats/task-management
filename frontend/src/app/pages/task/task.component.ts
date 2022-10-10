import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: 'task',
    templateUrl: './task.component.html'
})

export class TaskComponent implements OnInit {
    task: any;
    user: UserModel;
    users: UserModel[] = [];
    commentForm: any = {
        id: 0,
        content: '',
        userId: 0,
        taskId: 0
    };

    isEdit = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private userService: UserService,
        private commentService: CommentService,
        private toast: NgToastService
    ) {}
    
    async ngOnInit(): Promise<void> {
        this.user = await this.userService.getActiveUser();
        this.users = await this.userService.getUsers();

        this.route.params.subscribe(async params => {
            const id = Number(params['id']);

            if (id > 0)
                await this.getTask(id);
        })
    }

    private async getTask(id: number) {
        const task = await this.taskService.getTask(id);

        this.task = task;

        this.task.comments.forEach((c: any) => c.userName = this.getCommenter(c.userId));

        this.commentForm.userId = Number(this.user.id);
        this.commentForm.taskId = this.task.id;
    }

    editTask() {
        this.router.navigate(['/task/edit', this.task.id]);
    }

    async addComment() {
        await this.commentService.addComment(this.commentForm);

        this.toast.success({ detail: 'Comment added', summary: 'Comment successfully added', duration: 3000})
        
        this.commentForm.userName = this.getCommenter(this.commentForm.userId);
        this.task.comments.push(this.commentForm);
    }

    back() {
        this.router.navigate(['/tabs']);
    }

    private getCommenter(userId: number) {
        const user = this.users.find(u => Number(u.id) == userId);
        return `${user?.name} ${user?.surname}`
    }
}