import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoolingService {
  constructor(private http: HttpClient) {}

  poolingInterval$ = interval(1000);

  getUserInfo$(userId: number) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
  }

  getTodoInfo$(todoId: number) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
  }
}
