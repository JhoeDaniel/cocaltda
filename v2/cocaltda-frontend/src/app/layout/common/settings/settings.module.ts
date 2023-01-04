import { AngelDrawerModule } from '@angel/components/drawer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        AngelDrawerModule,
        MatButtonModule,
    ],
    exports: [SettingsComponent],
})
export class SettingsModule {}
