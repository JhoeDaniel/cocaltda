import { AngelAlertModule } from '@angel/components/alert';
import { AngelFindByKeyPipeModule } from '@angel/pipes/find-by-key';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { CenteredLayoutModule } from 'app/layout/layouts/horizontal/centered/centered.module';
import { EnterpriseLayoutModule } from 'app/layout/layouts/horizontal/enterprise/enterprise.module';
import { MaterialLayoutModule } from 'app/layout/layouts/horizontal/material/material.module';
import { ModernLayoutModule } from 'app/layout/layouts/horizontal/modern/modern.module';
import { ClassicLayoutModule } from 'app/layout/layouts/vertical/classic/classic.module';
import { ClassyLayoutModule } from 'app/layout/layouts/vertical/classy/classy.module';
import { CompactLayoutModule } from 'app/layout/layouts/vertical/compact/compact.module';
import { DenseLayoutModule } from 'app/layout/layouts/vertical/dense/dense.module';
import { FuturisticLayoutModule } from 'app/layout/layouts/vertical/futuristic/futuristic.module';
import { ThinLayoutModule } from 'app/layout/layouts/vertical/thin/thin.module';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsCenterComponent } from './common/settings-center/settings-center.component';
import { SettingsCompanyComponent } from './common/settings-company/settings-company.component';

const layoutModules = [
  // Empty
  EmptyLayoutModule,

  // Horizontal navigation
  CenteredLayoutModule,
  EnterpriseLayoutModule,
  MaterialLayoutModule,
  ModernLayoutModule,

  // Vertical navigation
  ClassicLayoutModule,
  ClassyLayoutModule,
  CompactLayoutModule,
  DenseLayoutModule,
  FuturisticLayoutModule,
  ThinLayoutModule,
];

@NgModule({
  declarations: [
    LayoutComponent,
    SettingsCenterComponent,
    SettingsCompanyComponent,
  ],
  imports: [
    SharedModule,
    SettingsModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    AngelFindByKeyPipeModule,
    AngelAlertModule,
    ...layoutModules,
  ],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
