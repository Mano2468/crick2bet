import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
@Injectable()
export class ApiFactory {

    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            // 'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



    getUrl(uri): any {
        return this.http.get(uri)
        //  .timeout(30000, new Error('delay exceeded'));
    }

    postUrl(uri, data): any {
        return this.http.post(uri, data)
        //  .timeout(30000, new Error('delay exceeded'));
    }


    // prepareApi(apiName, path = '') {
    //     if ((`${environment.apiUrl}` + apiName + path).indexOf('?') > -1)
    //         return `${environment.apiUrl}` + apiName + path + '&api_key=' + this.authenticationService.userValue.sessionid;
    //     else
    //         return `${environment.apiUrl}` + apiName + path + '?api_key=' + this.authenticationService.userValue.sessionid;
    // }


    getMasterData(): Observable<any> {
        return this.getUrl(`${environment.apiUrl}` + '/masterset.php?flag=1').pipe(map(res => res));
    }

    createUser(data): Observable<any> {
        const formData = new FormData();
        for (let dataKey in data) {
            console.log(dataKey);
            formData.append(dataKey, data[dataKey]);
        }
        console.log(formData)
        return this.postUrl(`${environment.apiUrl}` + '/masterset.php?flag=2', formData).pipe(map(res => res));
    }
    getUser(id): Observable<any> {
        return this.getUrl(`${environment.apiUrl}` + '/masterset.php?flag=3&userid=' + id).pipe(map(res => res));
    }
    changeStatus(id, status): Observable<any> {
        return this.getUrl(`${environment.apiUrl}` + '/masterset.php?flag=5&userid=' + id + '&userstatus=' + status).pipe(map(res => res));
    }

    changePassword(data): Observable<any> {
        const formData = new FormData();
        for (let dataKey in data) {
            console.log(dataKey);
            formData.append(dataKey, data[dataKey]);
        }
        console.log(formData)
        return this.postUrl(`${environment.apiUrl}` + '/masterset.php?flag=4', formData).pipe(map(res => res));
    }

    wdcFromSubmit(data): Observable<any> {
        const formData = new FormData();
        for (let dataKey in data) {
            console.log(dataKey);
            formData.append(dataKey, data[dataKey]);
        }
        console.log(formData)
        return this.postUrl(`${environment.apiUrl}` + '/masterset.php?flag=6', formData).pipe(map(res => res));
    }
    setMessage(data): Observable<any> {

        return this.postUrl(`${environment.apiUrl}` + '/masterset.php?flag=8', data).pipe(map(res => res));
    }
    getMessage(): Observable<any> {
        return this.getUrl(`${environment.apiUrl}` + '/masterset.php?flag=7').pipe(map(res => res));
    }


}  
