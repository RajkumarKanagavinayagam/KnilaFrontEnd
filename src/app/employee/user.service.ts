import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserModel } from './Model/user-model';
import { Observable } from 'rxjs';
import { AuthModel } from './Model/auth-model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:44361/api';
  constructor(private http: HttpClient) {}
  adduserData(userData: UserModel): Observable<any> {
    debugger;
    return this.http.post<any>(
      `${this.baseUrl}/Contact/AddOrEditContact`,
      userData
    );
  }
  loginuserData(authData: AuthModel): Observable<any> {
    debugger;
    return this.http.post<any>(`${this.baseUrl}/Contact/Auth`, authData);
  }

  GetUserValues(): any {
    if (
      sessionStorage.getItem('AccessToken') == null ||
      sessionStorage.getItem('AccessToken') == undefined
    ) {
      return false;
    }
    return true;
  }
  refreshToken(accesstoken: any, refreshToken: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accesstoken}`,
    });
    let params = new HttpParams();
    params = params.append('accessToken', accesstoken);
    params = params.append('refreshToken', refreshToken);
    return this.http.get<any>(`${this.baseUrl}/Contact/Refresh`, {
      params: params,
      headers: headers,
    });
  }
  getUserList(
    searchKeyword: string,
    filterData: string,
    sortingColumn: string,
    sortingType: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('searchKeyword', searchKeyword);
    params = params.append('filters', filterData);
    params = params.append('sortColumn', sortingColumn);
    params = params.append('sortDirection', sortingType);
    return this.http.get<any>(`${this.baseUrl}/Contact/GetAllContact`, {
      params: params,
    });
  }
  getuserDetails(contactId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/Contact/GetByContactID?ContactID=${contactId}`
    );
  }
  removeuserDetails(contactId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/Contact/DeleteContactByContactID?ContactID=${contactId}`
    );
  }
}
