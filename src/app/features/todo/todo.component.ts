import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { finalize, forkJoin, tap } from 'rxjs';
import { Task, TaskStatus } from '../../core/models/task.model';
import { TaskService } from '../../core/task.service';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SearchTasksComponent } from '../search-tasks/search-tasks.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProgressBarComponent,
    TodoHeaderComponent,
    TaskItemComponent,
    SearchTasksComponent,
    AsyncPipe,
    MatExpansionModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
  ],
})
export class TodoComponent implements OnInit {
  TaskStatus = TaskStatus;

  allTasks!: Task[];

  inprogressTasks = signal<Task[]>([]);
  postponedTasks = signal<Task[]>([]);
  completedTasks = signal<Task[]>([]);

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(searchParam?: string) {
    this.taskService
      .getTasks(searchParam)
      .pipe(
        tap((tasks) => {
          this.allTasks = tasks;
          const inProgress = tasks.filter(task => task.status === TaskStatus.InProgress);
          const postponed = tasks.filter((task) => task.status === TaskStatus.Postponed);
          const completed = tasks.filter((task) => task.status === TaskStatus.Completed);

          this.inprogressTasks.set(inProgress);
          this.postponedTasks.set(postponed);
          this.completedTasks.set(completed);
        })
      )
      .subscribe();
  }

  deleteAllTasks() {
    if (this.allTasks.length) {
      const deleteTasks$ = this.allTasks.map((task) =>
        this.taskService.deleteTask(task)
      );

      forkJoin(deleteTasks$).pipe(finalize(() => this.getAllTasks()))
        .subscribe();
    }
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result: { title: string; description: string; } | false) => {
      if (result) {
        this.taskService
          .addTask({ ...result, status: TaskStatus.InProgress })
          .subscribe(() => this.getAllTasks());
      }
    });
  }

  updateTask(task: Task, newStatus: TaskStatus) {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.editTask(updatedTask).subscribe(() => this.getAllTasks());
  }

  onTaskDeleted(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => this.getAllTasks());
  }

  dropTask(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    if (event.previousContainer !== event.container) {
      const task = event.item.data;
      this.updateTask(task, newStatus);
    }
  }
}
