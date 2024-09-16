import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let checkAuthen = localStorage.getItem('session');

  if (checkAuthen === 'undefined') {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
