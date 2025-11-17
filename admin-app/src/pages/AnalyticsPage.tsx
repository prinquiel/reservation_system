import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { formatCurrency } from '../lib/formatCurrency';

const metrics = [
  { label: 'Conversión de leads', value: '36%', trend: '+4.2%' },
  { label: 'Ticket promedio', value: 18400, trend: '+6.1%', isCurrency: true },
  { label: 'Índice de recomendación (NPS)', value: '74', trend: '+2' },
  { label: 'Viajeros recurrentes', value: '28%', trend: '+3.7%' }
];

export function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Analítica</h1>
        <p className="text-sm text-slate-500">Indicadores clave de demanda, cumplimiento y satisfacción de viajeros.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-500">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-slate-900">
                {'isCurrency' in metric && metric.isCurrency ? formatCurrency(metric.value as number) : metric.value}
              </p>
              <p className={metric.trend.startsWith('-') ? 'text-xs text-rose-500' : 'text-xs text-emerald-500'}>
                {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rendimiento por canal</CardTitle>
          <p className="text-sm text-slate-500">Ingresos y conversión por canal de adquisición.</p>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          {[
            { channel: 'Agencias aliadas', share: '42%', change: '+6%' },
            { channel: 'Web orgánica', share: '33%', change: '+3%' },
            { channel: 'Campañas pagadas', share: '25%', change: '+1%' }
          ].map((item) => (
            <div key={item.channel} className="rounded-lg border border-surface-border bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">{item.channel}</p>
              <p className="mt-2 text-2xl text-slate-900">{item.share}</p>
              <p className="text-xs text-emerald-500">{item.change}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clima del viajero</CardTitle>
          <p className="text-sm text-slate-500">Encuestas de satisfacción y volumen de testimonios.</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 rounded-lg border border-surface-border bg-white p-4">
            <p className="text-xs uppercase text-slate-500">CSAT (90 días)</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">4.8 / 5</p>
            <Badge variant="outline" className="mt-2 border-emerald-200 text-emerald-600">
              +0.2 vs trimestre anterior
            </Badge>
          </div>
          <div className="flex-1 rounded-lg border border-surface-border bg-white p-4">
            <p className="text-xs uppercase text-slate-500">Testimonios recibidos</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">126</p>
            <Badge variant="outline" className="mt-2 border-blue-200 text-blue-600">
              +18% mes a mes
            </Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
