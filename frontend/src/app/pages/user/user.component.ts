import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { userRequest } from "src/app/models/user-request.model";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

export class userComponent implements OnInit {
    userRequest: userRequest = {
        name: '',
        surname: '',
        title: '',
    };

    isError = false;

    errorText = '';
    userId = 1;

    constructor(
        private router: Router,
        private userService: UserService,
        private toast: NgToastService
    ) {}
    
    async ngOnInit(): Promise<void> {
        this.userId = (await this.userService.getUsers()).length + 1
    }

    async create(): Promise<void> {
        const user: UserModel = {
            id: this.userId.toString(),
            surname: this.userRequest.surname,
            name: this.userRequest.name,
            title: this.userRequest.title
        };

        await this.userService.addUser(user);

        this.toast.success({ detail: 'User added', summary: 'User successfully added', duration: 3000 });

        this.router.navigate(['tabs']);
    }
}