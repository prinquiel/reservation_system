import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../providers/SupabaseProvider';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export function AuthPage() {
  const { client, session } = useSupabase();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const {
      error: signInError,
      data: { session: nextSession }
    } = await client.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
    } else if (nextSession) {
      setMessage(t('auth.signedIn', { email: nextSession.user.email }));
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await client.auth.signOut();
  };

  return (
    <section className="py-24 text-white">
      <Container className="max-w-3xl">
        <SectionHeading title={t('auth.title') as string} description={t('auth.description') as string} />
        <motion.div
          className="mt-12 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-card backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {session ? (
            <div className="space-y-4 text-sm text-white/70">
              <p>{t('auth.signedAs', { email: session.user.email })}</p>
              <button className="btn btn-ghost border-white/20" onClick={handleSignOut}>
                {t('auth.signOut')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/80" htmlFor="email">
                  {t('auth.email')}
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-brand-background/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-brand-accent/60"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80" htmlFor="password">
                  {t('auth.password')}
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-brand-background/60 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-brand-accent/60"
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center text-base">
                {loading ? t('auth.signingIn') : t('auth.signIn')}
              </button>
            </form>
          )}
          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
        </motion.div>
      </Container>
    </section>
  );
}
