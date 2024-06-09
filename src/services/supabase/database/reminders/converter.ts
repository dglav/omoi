import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../../../../../types/supabase";

type Entity = Tables<"reminders">;
type CreateDTO = TablesInsert<"reminders">;
type DatabaseUpdateDTO = TablesUpdate<"reminders">;
export type Reminder = { id: string; hour: number; minute: number };

export const fromSupabase = (reminder: Entity): Reminder => ({
  id: reminder.id,
  hour: reminder.hour,
  minute: reminder.minute,
});

export const toCreateDTO = (reminder: {
  hour: number;
  minute: number;
}): CreateDTO => ({
  hour: reminder.hour,
  minute: reminder.minute,
});

export const toUpdateDTO = (reminder: {
  hour: number;
  minute: number;
}): DatabaseUpdateDTO => ({
  hour: reminder.hour,
  minute: reminder.minute,
});
