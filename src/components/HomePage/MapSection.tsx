
import React from 'react';
import Map from '@/components/Map';

interface MapSectionProps {
  userLocation: { latitude: number; longitude: number } | null;
}

const MapSection: React.FC<MapSectionProps> = ({ userLocation }) => {
  return (
    <div className="px-4 py-3">
      <h2 className="text-lg font-bold mb-2">Layanan di Sekitar Anda</h2>
      <Map height="150px" initialLocation={userLocation || undefined} />
    </div>
  );
};

export default MapSection;
