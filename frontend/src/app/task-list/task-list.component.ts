import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Task List</h2>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }}
        <button (click)="deleteTask(task.id ?? -1)">X</button>
      </li>
    </ul>
  `,
  styleUrl: './task-list.component.less',
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
