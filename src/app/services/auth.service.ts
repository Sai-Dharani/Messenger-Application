import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;

}
@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new Subject<User>();
    constructor(private http: HttpClient, private router: Router) {

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcwC1JIR64E1MyFrtPNGO1g-NcU-FMlbg', {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn)
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcwC1JIR64E1MyFrtPNGO1g-NcU-FMlbg', {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError))
    }
    // autoLogin() {
    //     const userData: {
    //         email: string,
    //         id: string,
    //         _token: string,
    //         _tokenExpirationDate: string
    //     } = JSON.parse(localStorage.getItem('userData'));

    //     if (!userData) {
    //         return;
    //     }

    //     const loadedUser = new User(
    //         userData.email,
    //         userData.id,
    //         userData._token,
    //         new Date(userData._tokenExpirationDate)
    //     );

    //     if (loadedUser.token) {
    //         this.user.next(loadedUser);
    //     }
    // }

    logout() {

        this.user.next();
        this.router.navigate(['/auth']);
    }
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));

    }

    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage = 'error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'this email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email or password is incorrect'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'this email or password is incorrect'
                break;

            default:
                break;
        }
        return throwError(errorMessage);
    }
}