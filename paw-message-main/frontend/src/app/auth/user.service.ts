import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "./user.model";
import { catchError, Observable } from "rxjs";

@Injectable()
export class UserService {
    private baseUrl = "http://localhost:3000"

    private httpClient = inject(HttpClient)

    addUser(user: User) {
        return this.httpClient.post<any>(`${this.baseUrl}/user/cadastrar`, user).pipe(
            catchError((e) => this.errorHandler(e, "addUser()"))
        )
    }

    getUser(user: Partial<User>) {

        const params = new HttpParams()
            .set('email', user.email || "")
            .set('password', user.password || "")

        return this.httpClient.get<any>(`${this.baseUrl}/user/find`, { params }).pipe(
            catchError((e) => this.errorHandler(e, "getUser()"))
        )
    }

    errorHandler(e: any, info: string): Observable<any> {
        throw({
            info_extra: info,
            error_SS: e, 
            error_CS: "Cliente-side User: Ocorreu um erro!"
        })
    }
}