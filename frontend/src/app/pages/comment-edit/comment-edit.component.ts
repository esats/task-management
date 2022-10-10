import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { CommentService } from "src/app/services/comment.service";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: 'comment-edit',
    templateUrl: './comment-edit.component.html'
})

export class CommentEditComponent implements OnInit {
    comment: CommentModel;

    commentRequest = {
        id: 0,
        content: '',
        userName: '',
        taskId: 0
    };

    users: UserModel[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private commentService: CommentService,
        private userService: UserService,
        private toast: NgToastService
    ) {}
    
    ngOnInit(): void {
        this.route.params.subscribe(async params => {
            this.commentRequest.id = Number(params['id']);
            if (this.commentRequest.id > 0) {
                this.users = await this.userService.getUsers();
                
                this.comment = await this.commentService.getComment(this.commentRequest.id);
                this.prepareComment();
            }
         });
    }

    async updateComment() {
        await this.commentService.updateComment(this.commentRequest);

        this.toast.success({ detail: 'Comment updated', summary: 'Comment successfully updated', duration: 3000})

        this.back();
    }

    private prepareComment() {
        const user = this.users.find(u => Number(u.id) == this.comment.userId);

        this.commentRequest = {
            id: this.comment.id,
            content: this.comment.content,
            userName: `${user?.name} ${user?.surname}`,
            taskId: this.comment.taskId
        };
    }

    goTask() {
        this.router.navigate(['/task', this.commentRequest.taskId]);
    }

    back() {
        this.router.navigate(['/tabs']);
    }
}