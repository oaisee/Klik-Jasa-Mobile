
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'KlikJasa',
    siteDescription: 'Platform Marketplace Jasa Nomor 1 di Indonesia',
    contactEmail: 'admin@klikjasa.com',
    contactPhone: '081234567890',
    platformFee: '5',
    enableRegistration: true,
    enablePayments: true,
    maintenanceMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pengaturan berhasil disimpan');
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
        </div>

        <form onSubmit={handleSaveSettings}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Situs</CardTitle>
                <CardDescription>Informasi dasar tentang platform KlikJasa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nama Situs</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Deskripsi Situs</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>Informasi kontak untuk pengguna</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Kontak</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Nomor Telepon</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Platform Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Platform</CardTitle>
                <CardDescription>Konfigurasi platform KlikJasa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platformFee">Biaya Platform (%)</Label>
                  <Input
                    id="platformFee"
                    name="platformFee"
                    type="number"
                    value={settings.platformFee}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableRegistration">Aktifkan Pendaftaran</Label>
                  <Switch
                    id="enableRegistration"
                    checked={settings.enableRegistration}
                    onCheckedChange={(checked) => handleSwitchChange('enableRegistration', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enablePayments">Aktifkan Pembayaran</Label>
                  <Switch
                    id="enablePayments"
                    checked={settings.enablePayments}
                    onCheckedChange={(checked) => handleSwitchChange('enablePayments', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceMode">Mode Pemeliharaan</Label>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSwitchChange('maintenanceMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="bg-klikjasa-purple">
              <Save className="mr-2 h-4 w-4" />
              Simpan Pengaturan
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
