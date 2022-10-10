import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export interface TaskModel {
    id: number;
    title: string;
    description: string;
    comments: CommentModel[];
    user: UserModel;
}