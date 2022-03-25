import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseURL: string = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient: HttpClient) {}

  getAllNotes(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'getUserNotes', data);
  }

  addNote(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'addNote', data);
  }

  deletNote(data: any): Observable<any> {
    let options: object = {
      Headers: new HttpHeaders({}),
      body: {
        token: data.token,
        NoteID: data.NoteID,
      },
    };
    return this._HttpClient.delete(this.baseURL + 'deleteNote', options);
  }

  updateNote(data: any): Observable<any> {
    return this._HttpClient.put(this.baseURL + 'updateNote', data);
  }
}
