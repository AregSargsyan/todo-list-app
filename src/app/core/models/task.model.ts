export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  description?: string;
}

export enum TaskStatus {
  InProgress,
  Postponed,
  Completed,
}
