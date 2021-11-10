import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Release} from "../../model/Release";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    api = '/';

    constructor(private http: HttpClient) {
    }

    getReleases(repo: string) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.get<Release>(`${this.api}releases/` + repo, {headers})
            .pipe(
                catchError(this.errorHandle)
            );
    }

    getReleaseInfo(repo: string, id: string) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.get<Release>(`${this.api}release-info/` + repo + `/` + id, {headers})
            .pipe(
                catchError(this.errorHandle)
            );
    }

    getRelease(repo: string, tag: string, id: string) {
        return this.http.get(`${this.api}release/` + repo + `/` + tag + `/` + id, {responseType: 'blob'})
            .pipe(
                catchError(this.errorHandle)
            );
    }

    createRelease(repo: string, file: File) {
        return this.http.post(`${this.api}pr/` + repo + `/`, file)
            .pipe(
                catchError(this.errorHandle)
            );
    }


    errorHandle(error: any) {
        if (error.status === 401) {
            const removeToken = localStorage.removeItem('access_token');
            if (removeToken !== null) {
            }
        }

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
