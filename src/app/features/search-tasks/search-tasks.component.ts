import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-tasks',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatLabel, MatIconModule],
  templateUrl: './search-tasks.component.html',
  styleUrl: './search-tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTasksComponent {
  @Output() onTaskSearch$ = new EventEmitter<string>();

  onSearchUpdated(searchParam: string) {
    this.onTaskSearch$.emit(searchParam);
  }
}
