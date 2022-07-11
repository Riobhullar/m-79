import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PostModule } from '../../components/post/post.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DataService } from '../../core/services/data.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service : DataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), PostModule, RouterModule.forRoot([]), HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getposts and get response as array', fakeAsync(() => {
    let spy_getPosts = spyOn(service,"getPostsList").and.callFake(() => {
      return Rx.of([{ body: 'test body', id:1, title:'test title', userId:2}]).pipe(delay(2000));
    });
    component.getPosts();
    tick(1000);
    expect(component.postsLoading).toEqual(true);
    tick(1000);
    expect(component.postsLoading).toEqual(false);
    expect(component.allPostsList).toEqual([{ body: 'test body', id:1, title:'test title', userId:2}]);
  }));

  it('searchClear should clear searchModel and set postlist to default list', fakeAsync(() => {
    component.searchModel = 'searchstring';
    component.allPostsList = [{ body: 'test body', id:1, title:'test title', userId:2}];
    component.postsList = [];
    expect(component.searchModel).toEqual('searchstring');

    component.searchClear();

    expect(component.searchModel).toEqual(undefined);

    expect(component.allPostsList).toEqual(component.postsList);

  }));


});
