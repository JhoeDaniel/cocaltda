import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { UserComponent } from 'app/layout/common/user/user.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
