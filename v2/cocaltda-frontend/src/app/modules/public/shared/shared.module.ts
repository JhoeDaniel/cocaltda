import { AngelAlertModule } from '@angel/components/alert';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderBlockComponent } from './header-block/header-block.component';
import { HeaderComponent } from './header/header.component';
import { InformationSectionComponent } from './information-section/information-section.component';
import { ItemsGalleryComponent } from './items-gallery/items-gallery.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderBlockComponent,
    FooterComponent,
    ContactSectionComponent,
    InformationSectionComponent,
    PageTitleComponent,
    CarouselComponent,
    ItemsGalleryComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    MatExpansionModule,
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    AngelAlertModule,
  ],
  exports: [
    HeaderComponent,
    HeaderBlockComponent,
    FooterComponent,
    ContactSectionComponent,
    InformationSectionComponent,
    PageTitleComponent,
    CarouselComponent,
    ItemsGalleryComponent,
    MatIconModule,
    AngelAlertModule,
  ],
})
export class SharedModule {}
