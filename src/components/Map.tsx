
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Locate } from 'lucide-react';
import { toast } from 'sonner';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapProps {
  onLocationSelect?: (coords: Coordinates) => void;
  initialLocation?: Coordinates;
  height?: string;
  interactive?: boolean;
}

const Map: React.FC<MapProps> = ({
  onLocationSelect,
  initialLocation,
  height = "200px",
  interactive = true
}) => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(initialLocation || null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolokasi tidak didukung di perangkat Anda");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setCurrentLocation(newLocation);
        if (onLocationSelect) onLocationSelect(newLocation);
        setLoadingLocation(false);
        toast.success("Lokasi berhasil ditemukan");
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoadingLocation(false);
        toast.error("Gagal mendapatkan lokasi. Silakan coba lagi.");
      },
      { enableHighAccuracy: true }
    );
  };

  // In a real app, we would initialize a map using a library like Google Maps or Mapbox
  useEffect(() => {
    if (mapRef.current && currentLocation) {
      // This is where we would initialize and update the map with the current location
      console.log("Map would be initialized with:", currentLocation);
    }
  }, [currentLocation, mapRef.current]);

  return (
    <Card className="overflow-hidden">
      <div 
        ref={mapRef} 
        className="bg-gray-200 relative" 
        style={{ 
          height, 
          backgroundImage: "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000')", 
          backgroundSize: "cover",
          backgroundPosition: "center" 
        }}
      >
        {/* Placeholder for actual map */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
          {currentLocation ? (
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2" />
              <p className="text-sm">
                {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
              </p>
            </div>
          ) : (
            <p>Lokasi belum dipilih</p>
          )}
        </div>
        
        {interactive && (
          <div className="absolute bottom-2 right-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={getCurrentLocation}
              disabled={loadingLocation}
              className="bg-white"
            >
              <Locate size={16} className="mr-1" />
              {loadingLocation ? "Mencari..." : "Lokasi Saya"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Map;
