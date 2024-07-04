import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth as getAuth_alias } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environment/environment';

const firebaseConfig = {
    apiKey: environment.firebase.apiKey,
    authDomain: environment.firebase.authDomain,
    projectId: environment.firebase.projectId,
    storageBucket: environment.firebase.storageBucket,
    messagingSenderId: environment.firebase.messagingSenderId,
    appId: environment.firebase.appId,
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        
        importProvidersFrom([
            provideFirebaseApp(() => initializeApp(firebaseConfig)),
            provideAuth(() => getAuth()),
            provideFirestore(() => getFirestore()),
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFirestore,
            AngularFireAuth,
            AngularFireAuthModule,
        ]), provideAnimationsAsync(), provideAnimationsAsync(),
    ],
};
