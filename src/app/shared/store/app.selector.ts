import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './appstate';

export const selectAppState = createFeatureSelector<AppState>('appstate');
