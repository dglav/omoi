import { Tables } from "../../../../types/supabase";
import { supabase } from "../index";

type NewSurveyEntry = Omit<Tables<"survey_1">, "id">;

export const createSurveyEntry = async (newSurveyEntry: NewSurveyEntry) => {
  return supabase.from("survey_1").insert(newSurveyEntry);
};
