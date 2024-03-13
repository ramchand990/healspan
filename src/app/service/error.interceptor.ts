import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators"; 

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // console.log("Passed through the interceptor in request");

        return next.handle(request)
            .pipe(
                map(res => {
                    // console.log("Passed through the interceptor in response");
                    return res
                }),
                catchError((error: HttpErrorResponse) => {
                    // console.log(JSON.stringify(HttpErrorResponse))
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        // console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        // console.log('This is server side error');
                        //  console.log(errorMsg = `Error Code: ${error.status},  Message: ${error.error.message}`);
                    }
                    // console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}