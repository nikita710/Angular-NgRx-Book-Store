import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { mergeMap, switchMap, map, withLatestFrom, EMPTY } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/appstate';
import { BooksService } from '../books.service';
import {
  addBookApiSuccess,
  deleteBookApiSuccess,
  fetchBookApiSuccess,
  invokeAddBookApi,
  invokeBooksApi,
  invokeDeleteBookApi,
  invokeUpdateBookApi,
  updateBookApiSuccess,
} from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private appStore: Store<AppState>,
    private store: Store
  ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksApi),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksFromStore]) => {
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.booksService
          .get()
          .pipe(map((data) => fetchBookApiSuccess({ allBooks: data })));
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeAddBookApi),
      switchMap((data) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.post(data.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return addBookApiSuccess({ response: data });
          })
        );
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookApi),
      switchMap((data) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.update(data.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookApiSuccess({ response: data });
          })
        );
      })
    )
  );

  deleteBook$ = createEffect(() => {
   return this.actions$.pipe(
      ofType(invokeDeleteBookApi),
      switchMap((data) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.delete(data.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteBookApiSuccess({ id: data.id });
          })
        );
      })
    );
  });
}
