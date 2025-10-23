import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
const auth = inject(AuthService);
const router = inject(Router);
const token = auth.token();


const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;


return next(cloned).pipe(
catchError((err: unknown) => {
if (err instanceof HttpErrorResponse && err.status === 401) {
auth.logout();
const current = router.url || '/';
router.navigate(['/login'], { queryParams: { redirect: current } });
}
return throwError(() => err);
})
);
};