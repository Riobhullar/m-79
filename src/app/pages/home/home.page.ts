import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Post } from '../../core/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  allPostsList:Post[] = [];
  postsList:Post[] = [];
  postsLoading:boolean = true;
  postsListError:boolean = false;

  searchModel;

  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.getPosts();
  }

  getPosts() {
    this.dataService.getPostsList().subscribe( (postList:Post[]) => {
      if(postList && postList.length){
        this.postsList = postList;
        this.allPostsList = postList;
      }
    },err => {
      this.postsListError = true;
    }, () => {
      this.postsLoading = false;
    })
  }

  searchPost(){
    const search = this.searchModel ? this.searchModel.slice() : undefined;
    if(!search || !search.length){
      this.searchCancel();
    }
    let filteredItems = this.allPostsList.filter( item => {
      let isSearched =  item.body.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 
      ||    item.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1;

      return isSearched;
    })
    this.postsList = filteredItems;
  }

  searchCancel(){
    this.searchModel = undefined;
    this.postsList = this.allPostsList;
  }

  searchClear(){
    this.searchModel = undefined;
    this.postsList = this.allPostsList;
  }

}
