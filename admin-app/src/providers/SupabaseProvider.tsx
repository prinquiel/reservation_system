import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { WorkerProfile } from '../types/profile';

type SupabaseContextValue = {
  client: SupabaseClient;
  session: Session | null;
  profile: WorkerProfile | null;
  initializing: boolean;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const synchronizeSession = async () => {
      const {
        data: { session: currentSession }
      } = await supabase.auth.getSession();
      setSession(currentSession);
      setInitializing(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    synchronizeSession();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user) {
        setProfile(null);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, phone')
        .eq('id', session.user.id)
        .maybeSingle();

      setProfile((data as WorkerProfile | null) ?? null);
    };

    loadProfile();
  }, [session?.user?.id]);

  const value = useMemo(() => ({ client: supabase, session, profile, initializing }), [session, profile, initializing]);

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }

  return context;
}
