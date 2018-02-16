import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Wtf2AuthService } from '../auth.service';
import { WTF2_AUTH_INTERCEPTOR_HEADER } from '../../auth.options';
import { Wtf2AuthJWTToken } from '../token/token';

@Injectable()
export class Wtf2AuthSimpleInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
              @Inject(WTF2_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization') {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getToken()
      .pipe(
        switchMap((token: Wtf2AuthJWTToken) => {
          if (token && token.getValue()) {
            req = req.clone({
              setHeaders: {
                [this.headerName]: token.getValue(),
              },
            });
          }
          return next.handle(req);
        }),
      );
  }

  protected get authService(): Wtf2AuthService {
    return this.injector.get(Wtf2AuthService);
  }
}
