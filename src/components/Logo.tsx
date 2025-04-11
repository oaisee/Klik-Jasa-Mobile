
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-klikjasa-electric-blue rounded-br-3xl rounded-tl-3xl opacity-70"></div>
        <div className="absolute inset-0 -translate-x-5 -translate-y-5 bg-green-400 rounded-full opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/4dad8dbc-728f-4327-85a0-e55e7cdcddfd.png" 
            alt="Klik Jasa Logo" 
            className="w-28 h-28 object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
