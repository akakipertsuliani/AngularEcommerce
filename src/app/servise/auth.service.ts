import { Injectable, inject } from "@angular/core";
import { Auth, updateProfile, user } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    firebaseAuth = inject(Auth);

    regiseter(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
            response => updateProfile(response.user, {displayName: username})
        );

        return from(promise);
    }
    
    logInUser(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});

        return from(promise);
    }
}
