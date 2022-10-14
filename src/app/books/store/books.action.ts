import { createAction, props } from '@ngrx/store';
import { Books } from './books';

export const invokeBooksApi = createAction(
  '[Books API] Invoke Books Fetch API'
);

export const fetchBookApiSuccess = createAction(
  '[Books API] Fetch Book API Success',
  props<{ allBooks: Books[] }>()
);

export const invokeAddBookApi = createAction(
  '[Book API] Invoke Add Book API',
  props<{ payload: Books }>()
);

export const addBookApiSuccess = createAction(
  '[Book API] Add Book API Success',
  props<{ response: Books }>()
);

export const invokeUpdateBookApi = createAction(
  '[Book API] Invoke Update Book API',
  props<{ payload: Books }>()
);

export const updateBookApiSuccess = createAction(
  '[Book API]  Update Book API Success',
  props<{ response: Books }>()
);

export const invokeDeleteBookApi = createAction(
  '[Book API] Invoke Delete Book API',
  props<{ id: number }>()
);
export const deleteBookApiSuccess = createAction(
  '[Book API] Delete Book API Success',
  props<{ id: number }>()
);
