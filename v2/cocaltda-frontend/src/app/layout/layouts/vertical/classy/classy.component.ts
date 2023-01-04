import {
  AngelNavigationItem,
  AngelNavigationService,
  AngelVerticalNavigationComponent,
} from '@angel/components/navigation';
import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppData, appData } from 'app/core/app/app.data';
import { AppInitialData } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { UserService } from 'app/modules/core/user/user.service';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'classy-layout',
  templateUrl: './classy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
  id_company: string = '';
  /**
   * Establecer en true si en el layout esta activado el chat
   */
  havedQuickChat: boolean = false;

  data!: AppInitialData;
  navigationDefault!: AngelNavigationItem[];
  _app_data: AppData = appData;

  @ViewChild('avatarFileInput') private _avatarFileInput!: ElementRef;

  isScreenSmall: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  editMode: boolean = false;
  userForm!: FormGroup;
  opacity: number = 0;

  _urlPathAvatar: string = environment.urlBackend + '/resource/img/avatar/';

  /**
   * Constructor
   */
  constructor(
    private store: Store<{ global: AppInitialData }>,
    private _globalUtils: GlobalUtils,
    private _layoutService: LayoutService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _angelMediaWatcherService: AngelMediaWatcherService,
    private _angelNavigationService: AngelNavigationService,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    /**
     * Set the QuickChat
     */
    this._layoutService.setQuickChat(this.havedQuickChat);
    /**
     * Set the QuickChat
     */
    // Create the contact form
    this.userForm = this._formBuilder.group({
      id: ['124'],
      avatar: ['assets/images/avatars/avatar.jpg'],
      name: 'Miguel',
    });
    // Subscribe to user changes of state
    this.store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
      this.id_company = this.data.user.company.id_company;
      this.navigationDefault = this._globalUtils.parseObjectToArray(
        this.data.navigation.defaultNavigation
      );
    });

    // Subscribe to media changes
    this._angelMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
    /**
     * byCompanyQueryRead
     */
    this._userService
      .byCompanyQueryRead(this.id_company, '*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._angelNavigationService.getComponent<AngelVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  /**
   * Toggle edit mode
   *
   * @param editMode
   */
  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
    }

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Upload avatar
   *
   * @param fileList
   */
  uploadAvatar(fileList: FileList): void {
    // Return if canceled
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    // Upload the avatar
    this._userService
      .uploadAvatar(this.data.user, file, this.data.user)
      .subscribe();
    // Set Edit mode in true
    this.editMode = false;
  }

  /**
   * Remove the avatar
   */
  removeAvatar(): void {
    this._userService.removeAvatar(this.data.user, this.data.user).subscribe();
    // Set the file input value as null
    this._avatarFileInput.nativeElement.value = null;
    // Set Edit mode in true
    this.editMode = false;
  }
}
