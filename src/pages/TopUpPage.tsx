
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const TopUpPage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const presetAmounts = [
    { value: '10000', label: 'Rp 10.000' },
    { value: '20000', label: 'Rp 20.000' },
    { value: '50000', label: 'Rp 50.000' },
    { value: '100000', label: 'Rp 100.000' },
    { value: '200000', label: 'Rp 200.000' },
    { value: '500000', label: 'Rp 500.000' },
  ];
  
  const paymentMethods = [
    { value: 'bca', label: 'Transfer Bank BCA' },
    { value: 'bni', label: 'Transfer Bank BNI' },
    { value: 'mandiri', label: 'Transfer Bank Mandiri' },
    { value: 'bri', label: 'Transfer Bank BRI' },
    { value: 'gopay', label: 'GoPay' },
    { value: 'ovo', label: 'OVO' },
    { value: 'dana', label: 'DANA' },
  ];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmount(value);
  };
  
  const handlePresetAmount = (value: string) => {
    setAmount(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseInt(amount) < 10000) {
      toast.error('Jumlah minimal top up adalah Rp 10.000');
      return;
    }
    
    if (!paymentMethod) {
      toast.error('Silakan pilih metode pembayaran');
      return;
    }
    
    toast.success('Permintaan top up berhasil dibuat!');
    // Here you would typically redirect to a payment confirmation page
  };
  
  return (
    <div className="pb-6 px-4">
      <div className="flex items-center my-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-klikjasa-purple ml-2">Top Up Saldo</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Masukkan Jumlah</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Top Up</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">Rp</span>
                </div>
                <Input
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pl-10"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-gray-500">Minimal top up Rp 10.000</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset.value}
                  type="button"
                  variant="outline"
                  onClick={() => handlePresetAmount(preset.value)}
                  className={`${amount === preset.value ? 'border-klikjasa-purple text-klikjasa-purple' : ''}`}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">Metode Pembayaran</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-klikjasa-purple"
              disabled={!amount || parseInt(amount) < 10000 || !paymentMethod}
            >
              Lanjutkan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopUpPage;
