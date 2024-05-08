import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '../../core/models/task.model';

@Component({
  standalone: true,
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  imports: [MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnChanges {
  @Input() inprogressTasks: Task[] = [];
  @Input() postponedTasks: Task[] = [];
  @Input() completedTasks: Task[] = [];

  inProgressPercentage = 0;
  postponedPercentage = 0;
  completedPercentage = 0;

  ngOnChanges() {
    this.calculateProgress();
  }

  private calculateProgress() {
    const totalTasks = this.inprogressTasks.length + this.postponedTasks.length + this.completedTasks.length;

    if (totalTasks > 0) {
      this.inProgressPercentage = Math.round((this.inprogressTasks.length / totalTasks) * 100);
      this.postponedPercentage = Math.round((this.postponedTasks.length / totalTasks) * 100);
      this.completedPercentage = Math.round((this.completedTasks.length / totalTasks) * 100);
    } else {
      this.inProgressPercentage = 0;
      this.postponedPercentage = 0;
      this.completedPercentage = 0;
    }
  }
}
