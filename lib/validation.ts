//for adding and editing tasks
import * as yup from "yup";

export const todoSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required("Task cannot be empty")
    .max(100, "Task must be under 100 characters"),
});
