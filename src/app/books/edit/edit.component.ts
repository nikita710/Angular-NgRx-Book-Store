import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import { invokeUpdateBookApi } from '../store/books.action';
import { selectBookById } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  bookForm: Books = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<AppState>
  ) {}

  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );
    fetchFormData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  updateBook() {
    this.store.dispatch(invokeUpdateBookApi({ payload: { ...this.bookForm } }));

    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
