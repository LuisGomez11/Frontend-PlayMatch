import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token && !authService.isTokenExpired(token)) {
    return true;
  } else {
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};
