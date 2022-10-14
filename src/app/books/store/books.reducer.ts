import { createReducer, on } from '@ngrx/store';
import { Books } from './books';
import {
  addBookApiSuccess,
  deleteBookApiSuccess,
  fetchBookApiSuccess,
  updateBookApiSuccess,
} from './books.action';

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
  initialState,
  on(fetchBookApiSuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(addBookApiSuccess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookApiSuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleteBookApiSuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id !== id);
    return newState;
  })
);
