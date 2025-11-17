import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';

export function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Control notifications, branding, and operational defaults.</p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Brand identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand name</Label>
            <Input id="brandName" defaultValue="ReservaPro" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support email</Label>
            <Input id="supportEmail" type="email" defaultValue="concierge@reservapro.com" />
          </div>
          <Button className="w-fit">Save branding</Button>
        </CardContent>
      </Card>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-surface-border bg-white p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Slack alerts</p>
              <p className="text-xs text-slate-500">Push critical reservation updates to your #ops channel.</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <Button variant="secondary" className="w-fit">
            Manage channels
          </Button>
          <Badge variant="outline" className="border-amber-200 text-amber-600">
            Tip: Sync message receipts with your CRM for full visibility.
          </Badge>
        </CardContent>
      </Card>
    </section>
  );
}
