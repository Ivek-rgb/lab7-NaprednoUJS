import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user';
import { AuthService } from '../../auth/auth.service';
import { ForumService } from '../../forum-data/forum.service';
import { Post } from '../../model/post/post';
import { ForumThreadModule } from "../forum-thread.module";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css',
})
export class ForumComponent implements OnInit{

  username : string = "";
  textAreaValue : string = "";
  recordedPosts : Post[] = [];
  currEdit : number | null = null;
  public editTextAreaVal = "";
  public peekABoo = false;

  constructor(private authService : AuthService, private forumService : ForumService){
    this.username = authService.getUsername()!;
  }

  ngOnInit(): void {
    this.refillPostBox();
  }

  checkForSend() : boolean {
    return !this.textAreaValue.length;
  }

  clearTextAreaVal(){
    this.textAreaValue = "";
  }

  refillPostBox(){
    this.forumService.fetchAllPosts().subscribe(valList => {
      this.recordedPosts = valList;
    });
  }

  getNumberOfForumPosts(){
    return this.recordedPosts.length;
  }

  checkEditByIdx(idx: number) : boolean{
    return idx === this.currEdit;
  }

  setEditByIdx(idx: number, event: Event){
    if(this.currEdit === idx){
      this.recordedPosts[idx].comment = this.editTextAreaVal;
      this.forumService.updatePost(this.recordedPosts[idx]).subscribe(retVal => {
        this.currEdit = null;
        this.refillPostBox();
      });
    }else{
      this.editTextAreaVal = this.recordedPosts[idx].comment;
      this.currEdit = idx;
    }
  }

  deleteCommentByIdx(idx: number){
    this.forumService.deletePost(this.recordedPosts[idx]).subscribe(retVal => {
      this.refillPostBox();
      this.currEdit = null;
    });
  }

  formSubmit(event: Event){
    const {_id, ...shearedPost} = new Post('', this.username, new Date(Date.now()).toISOString(), this.textAreaValue);
    this.forumService.postPost(shearedPost).subscribe( val => {
      this.refillPostBox();
      this.clearTextAreaVal();
    });
  }

  checkForColorOfButton(){
    return this.textAreaValue.length > 0 ? "green" : "lightcoral";
  }

}
