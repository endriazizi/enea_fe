import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


export const apiErrorInterceptor: HttpInterceptorFn = (req, next) =>
next(req).pipe(
catchError((err: unknown) => {
if (err instanceof HttpErrorResponse) {
const msg = err.error?.message || err.message || 'Errore di rete';
return throwError(() => new Error(msg));
}
return throwError(() => err);
})
);