
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import ProfileImageUpload from '@/components/profile/ProfileImageUpload';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import AddressForm from '@/components/profile/AddressForm';
import BioForm from '@/components/profile/BioForm';
import { useProfileForm } from '@/components/profile/useProfileForm';
import { useAddressData } from '@/components/profile/useAddressData';

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const { form, onSubmit, formSchema } = useProfileForm(user?.email);
  const { provinces, availableRegencies, availableDistricts, availableVillages } = useAddressData(form);

  return (
    <div className="pb-6 px-4">
      <div className="flex items-center my-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-klikjasa-purple ml-2">Pengaturan Profil</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ProfileImageUpload email={user?.email} />
              
              <PersonalInfoForm form={form} formSchema={formSchema} />
              
              <AddressForm 
                form={form}
                provinces={provinces}
                availableRegencies={availableRegencies}
                availableDistricts={availableDistricts}
                availableVillages={availableVillages}
              />
              
              <BioForm form={form} />
              
              <Button type="submit" className="w-full bg-klikjasa-purple">Simpan Perubahan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
