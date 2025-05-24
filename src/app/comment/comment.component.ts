import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { Comments } from './comment';

@Component({
  selector: 'hinv-comment',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent{
  comments$: any;
  comment$;
  comments: Comments[]=[];
  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) {
    this.comments$ = this.commentService.getComments();
    this.comment$= this.activatedRoute.data.pipe(
      pluck('comments')
    );
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.comments = data['comments'];
    });
  }
}
