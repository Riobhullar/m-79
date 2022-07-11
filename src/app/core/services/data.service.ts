import { Injectable } from '@angular/core';
import { Post, PostComment } from '../models';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  public getPostsList() {
    return this.http.get<Post[]>(ApiUrls.GET_POSTS);
  }

  getPostDetail(id){
    return this.http.get<Post>(`${ApiUrls.GET_POSTS}/${id}`);
  }

  getPostComments(id){
    return this.http.get<PostComment[]>(`${ApiUrls.GET_POSTS}/${id}/comments`);
  }

}
