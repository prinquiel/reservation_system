import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

const ROLES = [
  { value: 'worker', label: 'Operador' },
  { value: 'admin', label: 'Administrador' }
];

const initialForm = {
  id: '',
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  rol: 'worker'
};

export function WorkersPage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [mode, setMode] = useState<'crear' | 'editar'>('crear');
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const filteredWorkers = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    if (!needle) return workers;
    return workers.filter((worker) =>
      `${worker.full_name ?? ''} ${worker.email ?? ''} ${worker.phone ?? ''}`.toLowerCase().includes(needle)
    );
  }, [workers, filter]);

  const loadWorkers = async () => {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('id, email, full_name, phone, role, is_active')
      .in('role', ['worker', 'admin'])
      .order('created_at', { ascending: true });

    if (!fetchError && data) {
      setWorkers(data);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setMode('crear');
    setTempPassword(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setTempPassword(null);

    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim() || null,
      rol: form.rol
    };

    if (!payload.nombre || !payload.apellido || !payload.correo) {
      setError('Nombre, apellido y correo son obligatorios.');
      setLoading(false);
      return;
    }

    const action = mode === 'crear' ? 'create' : 'update';
    const body = action === 'create' ? payload : { ...payload, id: form.id };

    const { data, error: fnError } = await supabase.functions.invoke('workers', {
      body: {
        action,
        payload: body
      }
    });

    if (fnError) {
      setError(fnError.message ?? 'No se pudo completar la acción.');
    } else {
      if (action === 'create') {
        setTempPassword(data?.tempPassword ?? null);
        setMessage('Trabajador creado. Comparte la contraseña temporal con el nuevo usuario.');
      } else {
        setMessage('Trabajador actualizado correctamente.');
      }
      await loadWorkers();
      if (action === 'create') {
        resetForm();
      }
    }

    setLoading(false);
  };

  const handleEdit = (worker: any) => {
    const [nombre = '', apellido = ''] = (worker.full_name ?? '').split(' ');
    setForm({
      id: worker.id,
      nombre,
      apellido: worker.full_name?.replace(nombre, '').trim() ?? '',
      correo: worker.email ?? '',
      telefono: worker.phone ?? '',
      rol: worker.role ?? 'worker'
    });
    setMode('editar');
    setTempPassword(null);
    setMessage(null);
    setError(null);
  };

  const handleDeactivate = async (worker: any, activate = false) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const action = activate ? 'update' : 'deactivate';
    const body = activate ? { id: worker.id, is_active: true } : { id: worker.id };

    const { error: fnError } = await supabase.functions.invoke('workers', {
      body: {
        action,
        payload: body
      }
    });

    if (fnError) {
      setError(fnError.message ?? 'No se pudo actualizar el estado del trabajador.');
    } else {
      setMessage(activate ? 'Trabajador reactivado.' : 'Trabajador desactivado.');
      await loadWorkers();
    }

    setLoading(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Gestión de trabajadores</h1>
        <p className="text-sm text-slate-500">
          Crea nuevos usuarios internos para coordinar reservas. Solo administradores pueden realizar estos cambios.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{mode === 'crear' ? 'Crear nuevo trabajador' : 'Editar trabajador'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateOrUpdate}>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Input id="correo" name="correo" type="email" value={form.correo} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Opcional" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <select
                id="rol"
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-surface-border bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-full flex items-center gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'Guardando…' : mode === 'crear' ? 'Crear trabajador' : 'Guardar cambios'}
              </Button>
              {mode === 'editar' ? (
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancelar edición
                </Button>
              ) : null}
            </div>
          </form>
          {tempPassword ? (
            <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-semibold">Contraseña temporal generada:</p>
              <p className="font-mono text-base">{tempPassword}</p>
              <p>Comparte esta contraseña con el trabajador para que ingrese y la actualice.</p>
            </div>
          ) : null}
          {message ? <p className="mt-4 text-sm text-emerald-600">{message}</p> : null}
          {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Trabajadores registrados</CardTitle>
            <p className="text-sm text-slate-500">Incluye administradores y operadores activos en el sistema.</p>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="buscador" className="text-xs uppercase text-slate-500">
              Buscar
            </Label>
            <Input
              id="buscador"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Filtrar por nombre o correo"
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium text-slate-900">{worker.full_name ?? '—'}</TableCell>
                  <TableCell className="text-slate-500">{worker.email}</TableCell>
                  <TableCell className="text-slate-500">{worker.phone ?? '—'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {worker.role === 'admin' ? 'Administrador' : 'Operador'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={worker.is_active ? 'success' : 'outline'}>
                      {worker.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(worker)}>
                      Editar
                    </Button>
                    {worker.is_active ? (
                      <Button variant="ghost" size="sm" onClick={() => handleDeactivate(worker)}>
                        Desactivar
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => handleDeactivate(worker, true)}>
                        Reactivar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredWorkers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                    No hay trabajadores registrados con los filtros aplicados.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
