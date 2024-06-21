import { Injectable } from "@angular/core";
import { Auth, updateProfile } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Observable, from, map } from "rxjs";
import firebase from 'firebase/compat/app';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private firebaseAuth: Auth, private auth: AngularFireAuth) {}

    regiseter(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
            response => updateProfile(response.user, {displayName: username})
        );

        return from(promise);
    }
    
    logInUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
        localStorage.setItem("email", email);
        return from(this.auth.signInWithEmailAndPassword(email, password));
    }

    isUserAuth(): Observable<boolean> {
        return this.auth.authState.pipe(
            map(user => !!user)
        );
    }

    userLogOut() {
        localStorage.clear();
        this.auth.signOut();
    }
}
