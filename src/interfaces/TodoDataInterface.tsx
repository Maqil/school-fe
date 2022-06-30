export interface TodoDataInterface {
  todoAiid: number;
  description: string;
  subject: string;
  professor: string;
}

export const defaultTodoData = {
  todoAiid: 1,
  description: "",
  subject: "",
  professor: "",
} as TodoDataInterface;
