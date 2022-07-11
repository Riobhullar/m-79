import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { PostCommentsPage } from './post-comments.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { convertToParamMap} from '@angular/router';

describe('PostCommentsPage', () => {
  let component: PostCommentsPage;
  let fixture: ComponentFixture<PostCommentsPage>;
  let service : DataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentsPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {
            paramMap: convertToParamMap({id: 1})
          } }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCommentsPage);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getPostDetail and get post detail and comments', fakeAsync(() => {
    let spy_getPostsDetail = spyOn(service,"getPostDetail").and.callFake(() => {
      return Rx.of({ body: 'test body', id:1, title:'test title', userId:2}).pipe(delay(2000));
    });
    let spy_getPostsComments = spyOn(service,"getPostComments").and.callFake(() => {
      return Rx.of([{ body: 'test body', email:"test@test.com", id: 1, name:"testName", postId:2 }]).pipe(delay(2000));
    });
    component.getPostDetail();
    tick(1000);
    expect(component.postLoader).toEqual(true);
    tick(2000);
    expect(component.postLoader).toEqual(false);
    expect(component.postDetail).toEqual({ body: 'test body', id:1, title:'test title', userId:2});

    expect(component.postComments).toEqual([{ body: 'test body', email:"test@test.com", id: 1, name:"testName", postId:2 }]);

  }));

  
});
