import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FrontendTask } from '../frontend-task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.less',
})
export class AddTaskComponent {
  task: FrontendTask = {
    title: '',
    description: '',
    showDescription: false,
    completed: false,
  };

  constructor(private taskService: TaskService, private router: Router) {}

  addTask() {
    this.taskService
      .addTask({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed,
      })
      .subscribe(() => {
        this.router.navigate(['./tasks']);
      });
  }
}
