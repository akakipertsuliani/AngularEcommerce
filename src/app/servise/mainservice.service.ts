import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { userInterface } from '../interface/main.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MainserviceService {

  constructor(private firestore: Firestore, private auth: AngularFireAuth) {}

  userCollection = collection(this.firestore, 'user');

  getUser(): Observable<userInterface[]> {
    return collectionData(this.userCollection, {
      idField: 'id',
    }) as Observable<userInterface[]>;
  }

  addUser(user: userInterface): Promise<void> {
    return addDoc(this.userCollection, user).then(() => {});
  }


  signIn(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.auth.signOut();
  }
}
