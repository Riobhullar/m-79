import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCommentsPageRoutingModule } from './post-comments-routing.module';

import { PostCommentsPage } from './post-comments.page';
import { PostModule } from '../../components/post/post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostCommentsPageRoutingModule,
    PostModule
  ],
  declarations: [PostCommentsPage]
})
export class PostCommentsPageModule {}
