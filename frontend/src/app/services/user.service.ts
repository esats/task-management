import { NgModule } from "@angular/core";
import { UserModel } from "../models/user.model";
import { restApiService } from "./restApiService";

@NgModule({})

export class UserService {
    constructor(private _restApiService: restApiService) {}

    public async getUsers(): Promise<UserModel[]> {
        const response = await this._restApiService.getUsers().toPromise();
        
        return new Promise<UserModel[]>(resolve => resolve(response?.data as UserModel[]));
    }

    public setUsers(users: UserModel[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    public setUser(user: UserModel): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public async addUser(user: UserModel): Promise<void> {
        debugger
        await this._restApiService.addUser(user).toPromise();
        
        this.setUser(user);
    }

    public userUser(user: UserModel): void {
        this.addUser(user);
        this.setUser(user);
    }

    public async getActiveUser(): Promise<UserModel> {
        const user = localStorage.getItem('user');
        if (user != null)
            return JSON.parse(user);

        return await this.getLastUser();
    }

    private async getLastUser(): Promise<UserModel> {
        const users = await this.getUsers(); 
        const user = users[users.length - 1];
        
        this.setUser(user);

        return user; 
    }
}