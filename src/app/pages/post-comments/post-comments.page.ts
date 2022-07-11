import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Post, PostComment } from 'src/app/core/models';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.page.html',
  styleUrls: ['./post-comments.page.scss'],
})
export class PostCommentsPage implements OnInit {

  postDetail:Post;
  postComments:PostComment[] = [];
  postLoader:boolean = true;;
  postError:boolean = false;

  constructor(
    private route:ActivatedRoute,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.getPostDetail();
  }

  getPostDetail(){
    let postId = this.route.snapshot.paramMap.get('id');

    let postDetail = this.dataService.getPostDetail(postId);
    let postComments = this.dataService.getPostComments(postId);

    forkJoin({
      postDetail,
      postComments
    }).subscribe( (resp) => {
      this.postDetail = resp.postDetail;
      this.postComments = resp.postComments;
    },err => {
      this.postError = true;
    }, () => {
      this.postLoader = false;
    })
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Home' : '';
  }

}
