import { Injector } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';

import {
  WTF2_AUTH_OPTIONS, WTF2_AUTH_STRATEGIES,
  WTF2_AUTH_TOKEN_INTERCEPTOR_FILTER,
  WTF2_AUTH_TOKENS,
  WTF2_AUTH_USER_OPTIONS,
} from '@nebular/auth/auth.options';
import { Wtf2AuthJWTInterceptor, Wtf2AuthService } from '@nebular/auth';
import { Wtf2TokenService } from '@nebular/auth/services/token/token.service';
import { Wtf2TokenLocalStorage, Wtf2TokenStorage } from '@nebular/auth/services/token/token-storage';
import { WTF2_AUTH_FALLBACK_TOKEN, Wtf2AuthTokenParceler } from '@nebular/auth/services/token/token-parceler';
import { Wtf2DummyAuthStrategy } from '@nebular/auth/strategies';
import { wtf2OptionsFactory, wtf2StrategiesFactory } from '@nebular/auth/auth.module';
import { Wtf2AuthJWTToken, WTF2AuthSimpleToken} from '@nebular/auth/services/token/token';


describe('jwt-interceptor', () => {

  // tslint:disable
  const validJWTValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c';
  const validJWTToken = new Wtf2AuthJWTToken(validJWTValue, 'dummy');
  const expiredJWTToken = new Wtf2AuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773','dummy');
  const authHeader = 'Bearer ' + validJWTValue;

  let authService: Wtf2AuthService;
  let tokenService: Wtf2TokenService;
  let dummyAuthStrategy: Wtf2DummyAuthStrategy;

  let http: HttpClient;
  let httpMock: HttpTestingController;

  function filterInterceptorRequest(req: HttpRequest<any>): boolean {
    return ['/filtered/url']
      .some(url => req.url.includes(url));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
         { provide: WTF2_AUTH_FALLBACK_TOKEN, useValue: WTF2AuthSimpleToken },
         { provide: WTF2_AUTH_TOKENS, useValue: [Wtf2AuthJWTToken] },
        Wtf2AuthTokenParceler,
         {
          provide: WTF2_AUTH_USER_OPTIONS, useValue: {
            strategies: [
              Wtf2DummyAuthStrategy.setup({
                alwaysFail: false,
                name: 'dummy',
              }),
            ],
          },
        },
        { provide: WTF2_AUTH_OPTIONS, useFactory: wtf2OptionsFactory, deps: [WTF2_AUTH_USER_OPTIONS] },
        { provide: WTF2_AUTH_STRATEGIES, useFactory: wtf2StrategiesFactory, deps: [WTF2_AUTH_OPTIONS, Injector] },
        { provide: Wtf2TokenStorage, useClass: Wtf2TokenLocalStorage },
        { provide: HTTP_INTERCEPTORS, useClass: Wtf2AuthJWTInterceptor, multi: true },
        { provide: WTF2_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        Wtf2TokenService,
        Wtf2AuthService,
        Wtf2DummyAuthStrategy,
      ],
    });
    authService = TestBed.get(Wtf2AuthService);
    tokenService = TestBed.get(Wtf2TokenService);
    dummyAuthStrategy = TestBed.get(Wtf2DummyAuthStrategy);
  });

    beforeEach(async(
      inject([HttpClient, HttpTestingController], (_httpClient, _httpMock) => {
        http = _httpClient;
        httpMock = _httpMock;
      }),
    ));

    it ('Url filtered, isAuthenticatedOrRefresh not called, token not added', () => {
      const spy = spyOn(authService, 'isAuthenticatedOrRefresh');
      http.get('/filtered/url/').subscribe(res => {
        expect(spy).not.toHaveBeenCalled();
      });
      httpMock.expectOne(
        req => req.url === '/filtered/url/'
          && ! req.headers.get('Authorization'),
      ).flush({});
    });

    it ('Url not filtered, isAuthenticatedOrRefresh called, authenticated, token added', () => {
      const spy = spyOn(authService, 'isAuthenticatedOrRefresh')
        .and.
        returnValue(observableOf(true));
      spyOn(authService, 'getToken')
        .and
        .returnValue(observableOf(validJWTToken));
      http.get('/notfiltered/url/').subscribe(res => {
        expect(spy).toHaveBeenCalled();
      });
      httpMock.expectOne(
        req => req.url === '/notfiltered/url/'
          && req.headers.get('Authorization') === authHeader,
      ).flush({});
    });

    it ('Url not filtered, isAuthenticatedOrRefresh called, not authenticated, token not added', () => {
      const spy = spyOn(authService, 'isAuthenticatedOrRefresh')
        .and.
        returnValue(observableOf(false));
      spyOn(authService, 'getToken')
        .and
        .returnValue(observableOf(expiredJWTToken));
      http.get('/notfiltered/url/').subscribe(res => {
        expect(spy).toHaveBeenCalled();
      });
      httpMock.expectOne(
        req => req.url === '/notfiltered/url/'
          && ! req.headers.get('Authorization'),
      ).flush({});
    });

  },
);
