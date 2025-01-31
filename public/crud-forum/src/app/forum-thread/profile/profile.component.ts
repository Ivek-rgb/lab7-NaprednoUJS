import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post/post';
import { ForumService } from '../../forum-data/forum.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  username : string;
  email : string;
  name : string;
  listOfPosts : Post[] = [];

  constructor(private forumService : ForumService, private authService : AuthService){
    this.username = authService.getUsername()!;
    this.name = authService.getFullName()!;
    this.email = authService.getEmail()!;
  }

  ngOnInit(): void {
    this.refillPosts();
  }

  refillPosts(){
    this.forumService.fetchAndfilterByUserId(this.username).subscribe(
      retVal => {
        this.listOfPosts = retVal;
      }
    );
  }

  getNumberOfForumPosts(){
    return this.listOfPosts.length;
  }

}
