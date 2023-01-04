import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { AuthService } from 'app/core/auth/auth.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
