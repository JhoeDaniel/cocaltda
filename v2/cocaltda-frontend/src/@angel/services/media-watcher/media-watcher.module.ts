import { NgModule } from '@angular/core';
import { AngelMediaWatcherService } from './media-watcher.service';

@NgModule({
  providers: [AngelMediaWatcherService],
})
export class AngelMediaWatcherModule {
  /**
   * Constructor
   */
  constructor(private _angelMediaWatcherService: AngelMediaWatcherService) {}
}
