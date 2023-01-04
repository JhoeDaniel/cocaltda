import { AngelFullscreenModule } from '@angel/components/fullscreen';
import { AngelLoadingBarModule } from '@angel/components/loading-bar';
import { AngelNavigationModule } from '@angel/components/navigation';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { MaterialLayoutComponent } from 'app/layout/layouts/horizontal/material/material.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [MaterialLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    AngelFullscreenModule,
    AngelLoadingBarModule,
    AngelNavigationModule,
    MessagesModule,
    NotificationsModule,
    SearchModule,
    ShortcutsModule,
    UserModule,
    SharedModule,
  ],
  exports: [MaterialLayoutComponent],
})
export class MaterialLayoutModule {}
