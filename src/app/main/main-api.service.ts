import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MainApiService {

    constructor(
        private http: HttpClient
    ) { }

    getList() {
        return this.http.get(`http://127.0.0.1:3000/v1/record/search`);
    }
}
