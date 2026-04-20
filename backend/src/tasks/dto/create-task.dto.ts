export class CreateTaskDto {
  title: string;
  domain?: string;
  xp: number;
  dueDate?: string;
  verified?: boolean;
  type?: string;
}
