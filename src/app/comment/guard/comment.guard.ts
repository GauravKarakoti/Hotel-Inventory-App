import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Comments } from '../comment';
import { CommentService } from '../comment.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentGuard implements Resolve<Comments> {
  constructor(private commentService: CommentService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comments> | Promise<Comments> | Comments {
    return this.commentService.getComments();
  }
}
