import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppInitialData } from '../core/app/app.type';
import { reducer } from './global/global.reducer';
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export interface RootState {
  global: AppInitialData;
}

export const reducers: ActionReducerMap<RootState> = {
  global: reducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
