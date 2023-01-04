import { AngelDrawerModule } from '@angel/components/drawer';
import { AngelScrollbarModule } from '@angel/directives/scrollbar';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [QuickChatComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    AngelDrawerModule,
    AngelScrollbarModule,
    SharedModule,
  ],
  exports: [QuickChatComponent],
})
export class QuickChatModule {}
