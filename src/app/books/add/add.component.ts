import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import { invokeAddBookApi } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router
  ) {}

  bookForm: Books = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  ngOnInit(): void {}

  saveBook() {
    this.store.dispatch(invokeAddBookApi({ payload: { ...this.bookForm } }));
   
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
