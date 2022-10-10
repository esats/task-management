import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskModel } from "src/app/models/task.model";
import { UserModel } from "src/app/models/user.model";
import { TaskService } from "src/app/services/task.service";
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: 'task-edit',
    templateUrl: './task-edit.component.html'
})

export class TaskEditComponent implements OnInit {
    taskRequest: TaskModel = {
        id: 0,
        comments: [],
        user: {} as UserModel,
        description: '',
        title: ''
    };

    isNew = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private toast: NgToastService
    ) {}
    
    ngOnInit(): void {
        this.route.params.subscribe(async params => {
            this.taskRequest.id = Number(params['id']);
            if (this.taskRequest.id > 0) {
                this.isNew = false;
                await this.getTask(this.taskRequest.id);
            }
         });
    }

    private async getTask(id: number) {
        const result = await this.taskService.getTask(id);
        this.taskRequest = result;
    }

    async addTask() {
        await this.taskService.addTask(this.taskRequest);

        this.toast.success({ detail: 'Task added', summary: 'Task successfully added', duration: 3000})

        this.back();
    }

    async deleteTask() {
        await this.taskService.deleteTask(this.taskRequest.id);

        this.toast.success({ detail: 'Task deleted', summary: 'Task successfully deleted', duration: 3000})

        this.back();
    }

    async updateTask() {
        await this.taskService.updateTask(this.taskRequest);

        this.toast.success({ detail: 'Task updated', summary: 'Task successfully updated', duration: 3000})

        this.back();
    }

    back() {
        this.router.navigate(['/tabs']);
    }
}