import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable, ErrorHandler } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {catchError, map} from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router){}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = sessionStorage.getItem("jwttoken");

        let cloned = req;

        // if (idToken) {
        //     cloned = req.clone({
        //         headers: req.headers.set("Authorization",
        //             "Bearer " + idToken)
        //     });
        // }

        return next.handle(cloned).pipe(
            map(res => {
                // console.log("Passed through the interceptor in response");
                return res
            }),
             catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                if (error.error instanceof ErrorEvent) {
                    //client side error
                } else {
                    //Server side error
                    // errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    errorMsg = '';
                    this.handleAuthError(error);
                }
                return throwError(error);
             })
        );;
    }

    private handleAuthError(err: HttpErrorResponse) {
        //handle your auth error or rethrow
        if ( [401, 403].includes(err.status) ) {
            this.router.navigate(['/login'])
            //this.router.navigate(['/autherror'], { state: {error: err.message, code: err.status} } );
            sessionStorage.clear();
            // sessionStorage.setItem("LastErrorMessage", err.error.message);
            // this.router.navigateByUrl(`/autherror`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            // return of(err.message); // or EMPTY may be appropriate here
            return of(); // or EMPTY may be appropriate here
        }else if ( [0].includes(err.status) ) {
            // console.log("else: ", err);
        }
        return;
        // return throwError(err);
    }

}

@Injectable()
export class GlobalJSErrorHandler implements ErrorHandler {
  handleError(error:any) {
    // console.log("reject: ",typeof error);
    // do something with the exception
  }
}