import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request Intercepter',req);
  if(req.method==='POST') {
    const newRequest=req.clone({headers:new HttpHeaders({token:'bvwno832fn32mc'})});
    return next(newRequest);
  }
  return next(req);
};

