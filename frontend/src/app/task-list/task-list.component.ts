import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FrontendTask } from '../frontend-task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.less',
  animations: [
    trigger('dropdownAnimation', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class TaskListComponent {
  tasks: FrontendTask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  toggleDescription(task: FrontendTask) {
    task.showDescription = !task.showDescription;
  }

  trackByTask(index: number, task: FrontendTask): string {
    return String(task.id); // Assuming each task has a unique `id`
  }

  deleteTask(task: FrontendTask) {
    this.taskService.deleteTask(task.id ?? -1).subscribe(() => {
      this.loadTasks();
    });
  }
}
