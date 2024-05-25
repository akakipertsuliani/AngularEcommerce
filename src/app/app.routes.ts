import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NgModule } from '@angular/core';
import { UserprofileComponent } from './userprofile/userprofile.component';

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },

    {
        path: "login",
        component: LoginComponent
    },

    {
        path: "singup",
        component: SingupComponent
    },

    {
        path: "resetPassword",
        component: ResetpasswordComponent
    },

    {
        path: "forgotpassword",
        component: ForgotpasswordComponent
    },

    {
        path: "profile",
        component: UserprofileComponent
    },

    {
        path: "**",
        component: HomepageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class appRoute {};
