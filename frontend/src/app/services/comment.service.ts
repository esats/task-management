import { NgModule } from "@angular/core";
import { CommentModel } from "../models/comment.model";
import { restApiService } from "./restApiService";

@NgModule({})

export class CommentService {
    constructor(private _restApiService: restApiService) {}

    public async getComments(): Promise<CommentModel[]> {
        const response = await this._restApiService.getComments().toPromise();

        return new Promise<CommentModel[]>(resolve => resolve(response?.data as CommentModel[]));
    }

    public setComments(comments: CommentModel[]): void {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    public async addComment(comment: CommentModel): Promise<CommentModel> {
        const response = await this._restApiService.makeComment(comment).toPromise();

        return new Promise<CommentModel>(resolve => resolve(response?.data as CommentModel));
    }

    public async getComment(id: number): Promise<CommentModel> {
        const comment = (await this.getComments()).find(c => c.id == id);

        if (!comment)
            return {} as CommentModel;

        return new Promise<CommentModel>(resolve => resolve(comment));
    }

    public async updateComment(model: any): Promise<CommentModel> {
        const response = await this._restApiService.editComment(model).toPromise();
        
        return new Promise<CommentModel>(resolve => resolve(response?.data as CommentModel));
    }

    public async searchComments(prefix: string): Promise<CommentModel[]> {
        const response = await this._restApiService.searchComments(prefix).toPromise();

        return new Promise<CommentModel[]>(resolve => resolve(response?.data as CommentModel[]));
    }
}