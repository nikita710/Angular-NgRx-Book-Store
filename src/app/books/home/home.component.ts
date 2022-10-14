import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/appstate';
import {
  deleteBookApiSuccess,
  invokeBooksApi,
  invokeDeleteBookApi,
} from '../store/books.action';
import { selectBooks } from '../store/books.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<AppState>) {}

  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeBooksApi());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }
  confirmDelete() {
    this.store.dispatch(invokeDeleteBookApi({ id: this.idToDelete }));

    let appState$ = this.appStore.pipe(select(selectAppState));
    appState$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.deleteModal.hide();
      }
    });
  }
}
