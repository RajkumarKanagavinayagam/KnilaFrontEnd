import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, from, map, mergeMap, retry, switchMap, throwError } from 'rxjs';

import { Token } from '@angular/compiler';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _router: Router, private userService: UserService, private inject : Injector,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let authservice = this.inject.get(UserService);
      const token = sessionStorage.getItem('AccessToken');
      let authrequest = request;
      authrequest = this.AddTokenheader(request, token);
      return next.handle(authrequest).pipe(
        catchError(error => {
          console.log(error);
          if (error.status === 401) {
            return this.handle401Error(request, next);
          }
          return throwError(error);
        })
      );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Attempt to refresh token
      let accesstoken = this.getAccessToken();
      let refresToken = sessionStorage.getItem("RefreshToken");
        return this.userService.refreshToken(accesstoken, refresToken).pipe(
          switchMap((res : any) => {
            console.log(res);
            if(res.isSuccess === true){
              request = request.clone({
                          setHeaders :{
                           'Content-Type': 'application/json',
                 Authorization: 'Bearer '+ res.token
                     }
                 });
              this.saveAccessToken(res);
              this.AddTokenheader(request, res.token);
            }  
            // If token refreshed successfully, retry the original request
            return next.handle(request);
          }),
          catchError(error => {
            // Handle refresh token failure
            // Redirect to login or do something appropriate
            this._router.navigateByUrl('');
            return throwError(error);
          })
        );
    }

getAccessToken(){
  if(this.userService.GetUserValues() == true){
    return sessionStorage.getItem("AccessToken");
  }
  return null;
}

saveAccessToken(data: any){
  sessionStorage.setItem("AccessToken", data.token);
  sessionStorage.setItem("RefreshToken", data.refreshToken);
}

AddTokenheader(request: HttpRequest<any>, token : any){
    return request.clone({
      setHeaders :{
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ token
      }
}
    )}
}
