import { Action, createReducer, on } from '@ngrx/store';
import { appConfig } from 'app/core/app/app.config';
import { AppInitialData, RememberMe } from 'app/core/app/app.type';
import { Message } from 'app/layout/common/messages/messages.types';
import { user } from 'app/modules/core/user/user.data';
import { User } from 'app/modules/core/user/user.types';
import * as _ from 'lodash';
import {
  addMessage,
  addNavigationCompact,
  addNavigationDefault,
  addNavigationFuturistic,
  addNavigationHorizontal,
  addUser,
  deleteMessage,
  deleteNavigationAll,
  deleteNavigationCompact,
  deleteNavigationDefault,
  deleteNavigationFuturistic,
  deleteNavigationHorizontal,
  deleteUser,
  disabledRememberMe,
  enabledRememberMe,
  resetAppConfig,
  resetInactive,
  resetInside,
  setAppConfig,
  setInactive,
  setInside,
  updateAvatar,
  updateMessage,
} from './global.actions';

const _inactive: boolean = false;

const _inside: boolean = false;

const _rememberMe: RememberMe = {
  enabled: false,
  user: '',
  password: '',
};

const _user: User = user;

const _navigation = {
  defaultNavigation: [],
  compactNavigation: [],
  futuristicNavigation: [],
  horizontalNavigation: [],
};

export const globalState: AppInitialData = {
  appConfig: appConfig,
  inactive: _inactive,
  inside: _inside,
  rememberMe: _rememberMe,
  user: _user,
  navigation: _navigation,
  messages: [],
  notifications: [],
  shortcuts: [],
};

const _reducer = createReducer(
  globalState,
  // APPCONFIG
  on(setAppConfig, (state, _appConfig) => {
    return {
      ...state,
      appConfig: _appConfig,
    };
  }),
  on(resetAppConfig, (state) => {
    return {
      ...state,
      appConfig: appConfig,
    };
  }),
  // Inactive
  on(setInactive, (state) => {
    return {
      ...state,
      inactive: true,
    };
  }),
  on(resetInactive, (state) => {
    return {
      ...state,
      inactive: _inactive,
    };
  }),
  // Inside
  on(setInside, (state) => {
    return {
      ...state,
      inside: true,
    };
  }),
  on(resetInside, (state) => {
    return {
      ...state,
      inside: _inside,
    };
  }),
  // RememberMe
  on(enabledRememberMe, (state, _rememberMe) => {
    return {
      ...state,
      rememberMe: {
        enabled: _rememberMe.enabled,
        user: _rememberMe.user,
        password: _rememberMe.password,
      },
    };
  }),
  on(disabledRememberMe, (state) => {
    return {
      ...state,
      rememberMe: _rememberMe,
    };
  }),
  // User
  on(addUser, (state, _user) => {
    return {
      ...state,
      user: _user,
    };
  }),
  on(deleteUser, (state) => {
    return {
      ...state,
      user: _user,
    };
  }),
  on(updateAvatar, (state, _user) => {
    const newUser = {
      ...state.user,
      avatar_user: _user.avatar_user,
    };
    return {
      ...state,
      user: newUser,
    };
  }),
  // Navigation Default
  on(addNavigationDefault, (state, _navigationDefault) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: _navigationDefault,
        compactNavigation: state.navigation.compactNavigation,
        futuristicNavigation: state.navigation.futuristicNavigation,
        horizontalNavigation: state.navigation.horizontalNavigation,
      },
    };
  }),
  on(deleteNavigationDefault, (state) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: _navigation.defaultNavigation,
        compactNavigation: state.navigation.compactNavigation,
        futuristicNavigation: state.navigation.futuristicNavigation,
        horizontalNavigation: state.navigation.horizontalNavigation,
      },
    };
  }),
  // Navigation Compact
  on(addNavigationCompact, (state, _navigationCompact) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: state.navigation.defaultNavigation,
        compactNavigation: _navigationCompact,
        futuristicNavigation: state.navigation.futuristicNavigation,
        horizontalNavigation: state.navigation.horizontalNavigation,
      },
    };
  }),
  on(deleteNavigationCompact, (state) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: state.navigation.defaultNavigation,
        compactNavigation: _navigation.compactNavigation,
        futuristicNavigation: state.navigation.futuristicNavigation,
        horizontalNavigation: state.navigation.horizontalNavigation,
      },
    };
  }),
  // Navigation Futuristic
  on(addNavigationFuturistic, (state, _navigationFuturistic) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: state.navigation.defaultNavigation,
        compactNavigation: state.navigation.compactNavigation,
        futuristicNavigation: _navigationFuturistic,
        horizontalNavigation: state.navigation.horizontalNavigation,
      },
    };
  }),
  on(deleteNavigationFuturistic, (state) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: state.navigation.defaultNavigation,
        compactNavigation: state.navigation.compactNavigation,
        futuristicNavigation: _navigation.futuristicNavigation,
        horizontalNavigation: state.navigation.horizontalNavigation,
      },
    };
  }),
  // Navigation Horizontal
  on(addNavigationHorizontal, (state, _navigationHorizontal) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: state.navigation.defaultNavigation,
        compactNavigation: state.navigation.compactNavigation,
        futuristicNavigation: state.navigation.futuristicNavigation,
        horizontalNavigation: _navigationHorizontal,
      },
    };
  }),
  on(deleteNavigationHorizontal, (state) => {
    return {
      ...state,
      navigation: {
        defaultNavigation: state.navigation.defaultNavigation,
        compactNavigation: state.navigation.compactNavigation,
        futuristicNavigation: state.navigation.futuristicNavigation,
        horizontalNavigation: _navigation.horizontalNavigation,
      },
    };
  }),
  // Delete Navigation All deleteNavigationAll
  on(deleteNavigationAll, (state) => {
    return {
      ...state,
      navigation: _navigation,
    };
  }),
  // Messages
  on(addMessage, (state, _message) => {
    const messages: Message[] = _.cloneDeep(state.messages)!;

    const itemMatch = messages.filter((message) => message.id == _message.id);

    if (itemMatch.length == 0) {
      messages.push(_message);
    }
    return {
      ...state,
      messages: messages,
    };
  }),
  on(updateMessage, (state, { id, message }) => {
    let messages: Message[] = _.cloneDeep(state.messages)!;

    const itemMatch = messages.filter((_message) => _message.id == message.id);

    if (id) {
      if (itemMatch.length > 0) {
        messages = messages.filter((_message) => _message.id !== id);
        messages.push(message);
      }
    }

    return {
      ...state,
      messages: messages,
    };
  }),
  on(deleteMessage, (state, { id }) => {
    let messages: Message[] = _.cloneDeep(state.messages)!;

    if (id) {
      messages = messages.filter((message) => message.id !== id);
    }

    return {
      ...state,
      messages: messages,
    };
  })
  // Notifications
  // Shortcuts
);

export function reducer(
  state: AppInitialData | undefined,
  action: Action
): any {
  return _reducer(state, action);
}
