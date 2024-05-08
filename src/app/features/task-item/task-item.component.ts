import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskStatus } from '../../core/models/task.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;

  @Output() onTaskStatusChanged$ = new EventEmitter<TaskStatus>();
  @Output() onTaskDeleted$ = new EventEmitter<Task>();

  TaskStatus = TaskStatus;

  editTaskStatus(newStatus: TaskStatus) {
    this.onTaskStatusChanged$.emit(newStatus);
  }

  deleteTask() {
    this.onTaskDeleted$.emit(this.task);
  }
}
