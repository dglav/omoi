import { PostgrestError } from "@supabase/supabase-js";

export class SupabaseDatabaseError extends Error {
  constructor(supabaseError: PostgrestError) {
    const message = `
    Error connecting to database.\n
    Code: ${supabaseError.code}\n
    Details: ${supabaseError.details}\n
    Hint: ${supabaseError.hint}\n
    Message: ${supabaseError.message}\n
    `;

    super(message);
  }
}
