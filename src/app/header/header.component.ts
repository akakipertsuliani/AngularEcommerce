import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatMenuModule, MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../servise/auth.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatMenu,
        MatMenuTrigger,
        MatButtonModule,
        MatMenuModule,
        RouterLink,
        RouterModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    public isClick: boolean = false;
    public isUserDropDown: boolean = false;
    isUserHere: boolean = false;

    @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;

    constructor(private auth: AuthService, private route: Router) {
        this.auth.isUserAuth().subscribe(data => {
            this.isUserHere = data;
        })
    }

    someMethod() {
        if (this.trigger) {
            this.trigger.openMenu();
        }
    }

    userLogout() {
        this.auth.userLogOut();
    }
}
