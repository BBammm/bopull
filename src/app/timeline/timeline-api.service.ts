import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TimelineApiService {

    constructor(
        private http: HttpClient,
    ) { }

    getList() {
        return this.http.get<any>(`${environment.API_ENDPOINT}record/search`);
    }
}
