import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTasks(title?: string): Observable<Task[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    return this.http.get<Task[]>(this.apiUrl,  { params });
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  editTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(task: Task): Observable<void> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<void>(url);
  }
}
