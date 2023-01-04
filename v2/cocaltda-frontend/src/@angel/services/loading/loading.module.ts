import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngelLoadingInterceptor } from './loading.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AngelLoadingInterceptor,
      multi: true,
    },
  ],
})
export class AngelLoadingModule {}
