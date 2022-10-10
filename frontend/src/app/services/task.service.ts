import { NgModule } from "@angular/core";
import { TaskModel } from "../models/task.model";
import { restApiService } from "./restApiService";

@NgModule({})

export class TaskService {
    constructor(private _restApiService: restApiService) {}

    public async getTasks(): Promise<TaskModel[]> {
        const response = await this._restApiService.getTasks().toPromise();

        return new Promise<TaskModel[]>(resolve => resolve(response?.data as TaskModel[]));
    }

    public setTasks(tasks: TaskModel[]): void {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    public async addTask(task: TaskModel): Promise<TaskModel> {
        const response = await this._restApiService.addTask(task).toPromise();

        return new Promise<TaskModel>(resolve => resolve(response?.data as TaskModel));
    }

    public async getTask(id: number): Promise<TaskModel> {
        const response = await this._restApiService.getTask(id).toPromise();

        return new Promise<TaskModel>(resolve => resolve(response?.data as TaskModel));
    }

    public async deleteTask(id: number): Promise<boolean> {
        await this._restApiService.deleteTask(id).toPromise();

        return new Promise(resolve => resolve(true));
    }

    public async updateTask(task: TaskModel): Promise<TaskModel> {
        const response = await this._restApiService.editTask(task).toPromise();

        return new Promise<TaskModel>(resolve => resolve(response?.data as TaskModel));
    }

    public async assignTask(request: any) {
        await this._restApiService.assignTask(request).toPromise();

        return new Promise(resolve => resolve(true));
    }
}