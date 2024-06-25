import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../servise/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserAuth().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
