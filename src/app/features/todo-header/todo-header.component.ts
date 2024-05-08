import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoHeaderComponent {
  toDay = new Date();
}
