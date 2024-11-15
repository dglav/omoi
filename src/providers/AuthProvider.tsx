import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";

import { supabase } from "../services/supabase";

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthContext = createContext<{
  session: Session | null;
  isLoading: boolean;
}>({
  session: null,
  isLoading: false,
});

const useSession = () => {
  const ctx = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!ctx) {
      throw new Error("useSession must be wrapped in a <AuthProvider />");
    }
  }

  return ctx;
};

const AuthProvider = (props: React.PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useSession };
