
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface ProfileImageUploadProps {
  email?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ email }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold mb-2">
        {email?.charAt(0).toUpperCase()}
      </div>
      <Button variant="outline" size="sm" className="gap-1">
        <Upload size={16} />
        Unggah Foto
      </Button>
    </div>
  );
};

export default ProfileImageUpload;
