import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function RoleManagementPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('worker');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error: rpcError } = await supabase.rpc('admin_set_profile_role', {
      target_email: email,
      target_role: role
    });

    if (rpcError) {
      setError(rpcError.message);
    } else {
      setMessage('Rol actualizado correctamente');
      setEmail('');
    }

    setLoading(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Roles de usuario</h1>
        <p className="text-sm text-slate-500">Asigna permisos de cliente, operador o administrador con trazabilidad completa.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Actualizar acceso</CardTitle>
          <CardDescription>Busca un perfil por correo y define el nivel de acceso permitido.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="operaciones@reservapro.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <select
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="h-10 w-full rounded-lg border border-surface-border bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="buyer">Cliente</option>
                <option value="worker">Operador</option>
                <option value="admin">Administrador</option>
              </select>
              <p className="text-xs text-slate-500">
                Clientes envían solicitudes, operadores gestionan logística y administradores controlan permisos.
              </p>
            </div>
            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? 'Actualizando…' : 'Actualizar rol'}
            </Button>
          </form>
          {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}
          {message ? (
            <p className="mt-4 text-sm text-emerald-600">
              <Badge variant="success">Listo</Badge> {message}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
