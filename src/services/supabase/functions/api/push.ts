import { baseUrl } from ".";
import { getSession } from "../../auth/getSession";

export const push = async (payload: {
  title: string;
  body: string;
}): Promise<{ data: any; error: any }> => {
  const session = await getSession();
  const token = session.data.session?.access_token;

  if (!token) {
    throw new Error("Not authorized");
  }

  const res = await fetch(`${baseUrl}/push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { data: null, error };
    });

  return { data: res.data, error: null };
};
