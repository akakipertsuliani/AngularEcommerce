import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NgModule } from '@angular/core';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { authGuard } from './guard/auth.guard';

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
        path: "forgotpassword",
        component: ForgotpasswordComponent
    },

    {
        path: "profile",
        component: UserprofileComponent,
        canActivate: [authGuard]
    },
    
    {
        path: "product",
        component: ProductpageComponent,
        canActivate: [authGuard]
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
