import { createReducer, on } from '@ngrx/store';
import { setApiStatus } from './app.action';
import { AppState } from './appstate';

export const initialState: AppState = {
  apiStatus: '',
  apiResponseMessage: '',
};

export const appReducer = createReducer(
  initialState,
  on(setApiStatus, (state, { apiStatus }) => {
    return apiStatus;
  })
);
