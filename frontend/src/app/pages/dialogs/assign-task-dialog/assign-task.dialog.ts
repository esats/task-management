import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserModel } from "src/app/models/user.model";
import { TaskService } from "src/app/services/task.service";
import { UserService } from "src/app/services/user.service";
import { NgToastService } from "ng-angular-popup";
import { Router } from "@angular/router";

@Component({
    selector: 'assign-task',
    templateUrl: './assign-task.dialog.html'
})

export class AssignTaskComponent implements OnInit {
    assignRequest = {
        taskId: 0,
        userId: 0
    };

    users: UserModel[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<AssignTaskComponent>,
        private router: Router,
        private taskService: TaskService,
        private userService: UserService,
        private toast: NgToastService
    ) {}

    async ngOnInit(): Promise<void> {
        this.assignRequest = {
            taskId: this.data.taskId,
            userId: Number(this.data.userId)
        };

        this.users = await this.userService.getUsers();
    }

    async assign() {
        await this.taskService.assignTask(this.assignRequest);

        this.toast.success({detail: 'User assigned', summary: 'User successfully assigned', duration: 3000});

        this.closeDialog();

        this.goToTask();
    }

    closeDialog(result = null) {
        this.dialogRef.close(result);
    }

    goToTask() {
        this.router.navigate(['/tabs']);
    }
}