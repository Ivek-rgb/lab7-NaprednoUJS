import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { filter, map, Observable } from 'rxjs';
import { ShearedPost, Post} from '../model/post/post';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  postsPath = 'posts';

  constructor(private dataService : DataService) {}

  fetchPostPrimitive(){
    return this.dataService.fetchAllData(this.postsPath);
  }

  fetchAllPosts() : Observable<Post[]> {
    return this.dataService.fetchAllData(this.postsPath).pipe(map((val : any) => {
      const retArr : Post[] = []
      for(let key in val){
        retArr.push({_id: key, ...val[key]});
      }
      return retArr;
    }))
  }

  postPost(newPost : ShearedPost){
    return this.dataService.postObject(this.postsPath, newPost);
  }

  updatePost(newPost: Post){
    const {_id, ...sheared} = newPost;
    return this.dataService.editObject(this.postsPath, newPost._id, sheared);
  }

  deletePost(postToDelete: Post){
    return this.dataService.deleteObject(this.postsPath, postToDelete._id);
  }

  fetchAndfilterByUserId(username: string){
    return this.fetchAllPosts().pipe(
      map(innerVal => innerVal.filter(val => val.userId === username))
    );
  }

}
