import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BackendTask } from './backend-task.model';
import { FrontendTask } from './frontend-task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  // Fetch tasks from the backend and map them to FrontendTask with showDescription property
  getTasks(): Observable<FrontendTask[]> {
    return this.http.get<BackendTask[]>(this.apiUrl).pipe(
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          showDescription: false, // Add the frontend-only property
        }))
      )
    );
  }

  // Add a new task to the backend (using BackendTask type)
  addTask(task: BackendTask): Observable<BackendTask> {
    return this.http.post<BackendTask>(this.apiUrl, task);
  }

  // Delete a task from the backend
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
