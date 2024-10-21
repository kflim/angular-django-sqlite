import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="form-title">Add Task</h2>
    <form class="task-form" (ngSubmit)="addTask()">
      <label for="title" class="form-label">Title: </label>
      <input
        type="text"
        [(ngModel)]="task.title"
        name="title"
        class="form-input"
        required
      />
      <button type="submit" class="form-button">Add Task</button>
    </form>
    <a class="back-link" routerLink="/tasks">Back to Task List</a>
  `,
  styleUrl: './add-task.component.less',
})
export class AddTaskComponent {
  task: Task = {
    title: '',
    completed: false,
  };

  constructor(private taskService: TaskService, private router: Router) {}

  addTask() {
    this.taskService.addTask(this.task).subscribe(() => {
      this.router.navigate(['./tasks']);
    });
  }
}
