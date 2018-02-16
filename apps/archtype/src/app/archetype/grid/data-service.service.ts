import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataServiceService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  _baseUrl: string = '';

  // For Using Fake API by Using It's URL
  constructor(private http: Http) {
    this._baseUrl = 'https://jsonplaceholder.typicode.com/';
  }

  // To fill the Datatable for Default Table [Dummy Data]
  public GetAllRecords() {
    return this.http.get(this._baseUrl + 'posts')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Comments [Dummy Data]
  public GetAllComments() {
    return this.http.get(this._baseUrl + 'comments')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Photos [Dummy Data]
  public GetAllPhotos() {
    return this.http.get(this._baseUrl + 'albums/1/photos')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Albums [Dummy Data]
  public GetAllAlbums() {
    return this.http.get(this._baseUrl + 'albums')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Todos [Dummy Data]
  public GetAllTodos() {
    return this.http.get(this._baseUrl + 'todos')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }
  public getGridData() {
    return this.http.get('assets/data/grid.json')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To provide error description - Manav
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
