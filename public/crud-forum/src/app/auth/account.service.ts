import { map, Observable } from 'rxjs';
import { DataService } from '../forum-data/data.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private dataService : DataService) {}

  private usersRoute : string = 'users';

  getAllUsers(){
    return this.dataService.fetchAllData(this.usersRoute);
  }

  getUserNamed(username : string){
    return this.dataService.fetchWithQueries(this.usersRoute + '/', `name=${username}`);
  }

  getUserLoginInfo(username : string, password: string){
    return this.dataService.postObject(this.usersRoute + '/login', { username : username, password : password});
  }

  returnUserLogin(username : string, passsword : string) : Observable<User | undefined> {
    return this.getUserLoginInfo(username, passsword).pipe(map((val : User | undefined) => {
      if(!val || val.password !== passsword){
        return undefined;
      }
      return val;
    }));
  }

}
