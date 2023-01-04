import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngelDrawerComponent } from './drawer.component';

@NgModule({
    declarations: [AngelDrawerComponent],
    imports: [CommonModule],
    exports: [AngelDrawerComponent],
})
export class AngelDrawerModule {}
