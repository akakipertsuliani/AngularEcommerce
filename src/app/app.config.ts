import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
    
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom([
            provideFirebaseApp(() => initializeApp(firebaseConfig)),
            provideAuth(() => getAuth()),
        ]),
    ],
};
