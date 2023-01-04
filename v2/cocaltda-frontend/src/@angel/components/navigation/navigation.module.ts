import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AngelScrollbarModule } from '../../directives/scrollbar/public-api';
import { AngelHorizontalNavigationBasicItemComponent } from './horizontal/components/basic/basic.component';
import { AngelHorizontalNavigationBranchItemComponent } from './horizontal/components/branch/branch.component';
import { AngelHorizontalNavigationDividerItemComponent } from './horizontal/components/divider/divider.component';
import { AngelHorizontalNavigationSpacerItemComponent } from './horizontal/components/spacer/spacer.component';
import { AngelHorizontalNavigationComponent } from './horizontal/horizontal.component';
import { AngelVerticalNavigationAsideItemComponent } from './vertical/components/aside/aside.component';
import { AngelVerticalNavigationBasicItemComponent } from './vertical/components/basic/basic.component';
import { AngelVerticalNavigationCollapsableItemComponent } from './vertical/components/collapsable/collapsable.component';
import { AngelVerticalNavigationDividerItemComponent } from './vertical/components/divider/divider.component';
import { AngelVerticalNavigationGroupItemComponent } from './vertical/components/group/group.component';
import { AngelVerticalNavigationSpacerItemComponent } from './vertical/components/spacer/spacer.component';
import { AngelVerticalNavigationComponent } from './vertical/vertical.component';

@NgModule({
  declarations: [
    AngelHorizontalNavigationBasicItemComponent,
    AngelHorizontalNavigationBranchItemComponent,
    AngelHorizontalNavigationDividerItemComponent,
    AngelHorizontalNavigationSpacerItemComponent,
    AngelHorizontalNavigationComponent,
    AngelVerticalNavigationAsideItemComponent,
    AngelVerticalNavigationBasicItemComponent,
    AngelVerticalNavigationCollapsableItemComponent,
    AngelVerticalNavigationDividerItemComponent,
    AngelVerticalNavigationGroupItemComponent,
    AngelVerticalNavigationSpacerItemComponent,
    AngelVerticalNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    AngelScrollbarModule,
  ],
  exports: [
    AngelHorizontalNavigationComponent,
    AngelVerticalNavigationComponent,
  ],
})
export class AngelNavigationModule {}
