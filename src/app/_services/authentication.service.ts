import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    marqueeMsg: EventEmitter<any>;
     
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.marqueeMsg = new EventEmitter<any>();
        if(JSON.parse(localStorage.getItem('message'))){
            console.log("hi............")
            this.marqueeMsg.emit(JSON.parse(localStorage.getItem('message')).name);
        }
     
    }
    raiseEvent(msg): void {
        this.marqueeMsg.emit(msg);
    }
    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        console.log("login");
        return this.http.get<any>(`${environment.apiUrl}/login.php?login=`+username+`&pass=`+password,)
            .pipe(map(user => {
                //local storage to keep user logged in between page refreshes
                if(user.status=="success"){
                    localStorage.setItem('user', JSON.stringify(user.logindata));
                    this.userSubject.next(user.logindata);
                    return user;
                }else{
                    return user;
                }
                
            }
            ));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
        window.location.reload();
    }
}