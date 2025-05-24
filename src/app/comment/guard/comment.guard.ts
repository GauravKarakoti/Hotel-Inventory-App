import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Comments } from '../comment';
import { CommentService } from '../comment.service';
import { Observable } from 'rxjs';

export class CommentGuard implements Resolve<Comments> {
  constructor(private commentService: CommentService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comments> | Promise<Comments> | Comments {
    return this.commentService.getComments();
  }
}
