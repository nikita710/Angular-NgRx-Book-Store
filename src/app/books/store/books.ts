export interface Books {
  id: number;
  title: string;
  author: string;
  cost: number;
}

export interface BookState {
  books: Books[];
}
