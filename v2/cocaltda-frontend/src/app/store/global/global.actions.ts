import { createAction, props } from '@ngrx/store';
import { AppConfig } from 'app/core/app/app.config';
import { RememberMe } from 'app/core/app/app.type';
import { Message } from 'app/layout/common/messages/messages.types';
import { User } from 'app/modules/core/user/user.types';

/**
 * User preferences
 */
export const SET_APP_CONFIG = '[APP_CONFIG] SET APP_CONFIG';
export const RESET_APP_CONFIG = '[APP_CONFIG] RESET APP_CONFIG';

export const setAppConfig = createAction(SET_APP_CONFIG, props<AppConfig>());
export const resetAppConfig = createAction(RESET_APP_CONFIG);

// Inactive
export const SET_INACTIVE = '[REMEMBERME] SET INACTIVE';
export const RESET_INACTIVE = '[INACTIVE] RESET INACTIVE';

export const setInactive = createAction(SET_INACTIVE);
export const resetInactive = createAction(RESET_INACTIVE);
// Inside
export const SET_INSIDE = '[INSIDE] SET INSIDE';
export const RESET_INSIDE = '[OUTOF] RESET INSIDE';

export const setInside = createAction(SET_INSIDE);
export const resetInside = createAction(RESET_INSIDE);

// RememberMe
export const ENABLED_REMEMBERME = '[REMEMBERME] ENABLED';
export const DISABLED_REMEMBERME = '[REMEMBERME] DISABLED';

export const enabledRememberMe = createAction(
  ENABLED_REMEMBERME,
  props<RememberMe>()
);
export const disabledRememberMe = createAction(DISABLED_REMEMBERME);

// User
export const POST_USER = '[USER] POST';
export const DELETE_USER = '[USER] DELETE';
export const UPDATE_AVATAR = '[USER] UPDATE_AVATAR';

export const addUser = createAction(POST_USER, props<User>());
export const deleteUser = createAction(DELETE_USER);
export const updateAvatar = createAction(UPDATE_AVATAR, props<User>());

// Navigation
export const POST_NAVIGATION_DEFAULT = '[NAVIGATION DEFAULT] POST';
export const DELETE_NAVIGATION_DEFAULT = '[NAVIGATION DEFAULT] DELETE';
export const POST_NAVIGATION_COMPACT = '[NAVIGATION COMPACT] POST';
export const DELETE_NAVIGATION_COMPACT = '[NAVIGATION COMPACT] DELETE';
export const POST_NAVIGATION_FUTURISTIC = '[NAVIGATION FUTURISTIC] POST';
export const DELETE_NAVIGATION_FUTURISTIC = '[NAVIGATION FUTURISTIC] DELETE';
export const POST_NAVIGATION_HORIZONTAL = '[NAVIGATION HORIZONTAL] POST';
export const DELETE_NAVIGATION_HORIZONTAL = '[NAVIGATION HORIZONTAL] DELETE';

export const DELETE_NAVIGATION_ALL = '[NAVIGATION ALL] DELETE';

export const addNavigationDefault = createAction(
  POST_NAVIGATION_DEFAULT,
  props<any>()
);
export const deleteNavigationDefault = createAction(DELETE_NAVIGATION_DEFAULT);
export const addNavigationCompact = createAction(
  POST_NAVIGATION_COMPACT,
  props<any>()
);
export const deleteNavigationCompact = createAction(DELETE_NAVIGATION_COMPACT);
export const addNavigationFuturistic = createAction(
  POST_NAVIGATION_FUTURISTIC,
  props<any>()
);
export const deleteNavigationFuturistic = createAction(
  DELETE_NAVIGATION_FUTURISTIC
);
export const addNavigationHorizontal = createAction(
  POST_NAVIGATION_HORIZONTAL,
  props<any>()
);
export const deleteNavigationHorizontal = createAction(
  DELETE_NAVIGATION_HORIZONTAL
);
export const deleteNavigationAll = createAction(DELETE_NAVIGATION_ALL);

// Message
export const POST_MESSAGE = '[MESSAGE] POST';
export const DELETE_MESSAGE = '[MESSAGE] DELETE';
export const PATCH_MESSAGE = '[MESSAGE] PATCH';

export const addMessage = createAction(POST_MESSAGE, props<Message>());
export const deleteMessage = createAction(
  DELETE_MESSAGE,
  props<{ id: string }>()
);
export const updateMessage = createAction(
  PATCH_MESSAGE,
  props<{ id: string; message: Message }>()
);
// Notifications
// Shortcuts
