import { FormEvent, useState } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

export function AuthPage() {
  const { client, session } = useSupabase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const {
      error: signInError,
      data: { session: nextSession }
    } = await client.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
    }

    if (!nextSession) {
      setError('Sign-in failed');
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await client.auth.signOut();
  };

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin access</CardTitle>
          <CardDescription>Authenticate to access reservations, analytics, and team management.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {session ? (
            <div className="space-y-4 text-sm text-slate-600">
              <p>Signed in as {session.user.email}</p>
              <Button onClick={handleSignOut} className="w-full justify-center">
                Sign out
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          )}
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        </CardContent>
      </Card>
    </section>
  );
}
