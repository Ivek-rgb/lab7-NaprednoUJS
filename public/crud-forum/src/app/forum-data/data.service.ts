import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbLink : string = environment.api_link;

  constructor(private httpClient : HttpClient) { }

  fetchAllData(storagePath : string) : Observable<any> {
    return this.fetchWithQueries(storagePath, '');
  }

  fetchWithQueries(storagePath: string, query : string) : Observable<any>{
    return this.httpClient.get(this.dbLink + '/' + storagePath  + (query && query.length ? '?' : '')  + query);
  }

  checkExistance( storagePath:string ) : Observable<any> {
    return this.fetchAllData(storagePath);
  }

  putObject(storagePath:string, object : any) : Observable<any> {
    return this.httpClient.put(this.dbLink + '/' + storagePath, {"payload" : object});
  }

  postObject(storagePath:string, object : any) : Observable<any> {
    return this.httpClient.post(this.dbLink + '/' + storagePath, {"payload" : object});
  }

  editObject(storagePath: string, objectPath : string, newObject : any) : Observable<any> {
    return this.httpClient.patch(`${this.dbLink}/${storagePath}/${objectPath}/`, {"payload" : newObject});
  }

  deleteObject(storagePath : string, objectPath : string) : Observable<any> {
    return this.httpClient.delete(this.dbLink +  '/' + storagePath + '/' + objectPath);
  }

}
