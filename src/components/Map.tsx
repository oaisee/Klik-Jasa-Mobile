
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Locate, Navigation, X } from 'lucide-react';
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
  showLocationDetails?: boolean;
}

const defaultLocation = {
  latitude: -6.200000, // Jakarta, Indonesia
  longitude: 106.816666
};

const Map: React.FC<MapProps> = ({
  onLocationSelect,
  initialLocation,
  height = "200px",
  interactive = true,
  showLocationDetails = true
}) => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(initialLocation || null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Try to get current location on component mount if no initial location provided
  useEffect(() => {
    if (!initialLocation && interactive && navigator.geolocation) {
      getCurrentLocation();
    }
  }, [initialLocation, interactive]);

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolokasi tidak didukung di perangkat Anda");
      toast.error("Geolokasi tidak didukung di perangkat Anda");
      return;
    }

    setLoadingLocation(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setCurrentLocation(newLocation);
        
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }
        
        setLoadingLocation(false);
        toast.success("Lokasi berhasil ditemukan");
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoadingLocation(false);
        
        let errorMessage = "Gagal mendapatkan lokasi. Silakan coba lagi.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Akses lokasi ditolak. Silakan aktifkan akses lokasi di browser Anda.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia. Silakan coba lagi nanti.";
            break;
          case error.TIMEOUT:
            errorMessage = "Waktu permintaan lokasi habis. Silakan coba lagi.";
            break;
        }
        
        setLocationError(errorMessage);
        toast.error(errorMessage);
        
        // Set to default location if we can't get user's actual location
        if (!currentLocation) {
          setCurrentLocation(defaultLocation);
          if (onLocationSelect) {
            onLocationSelect(defaultLocation);
          }
        }
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    if (onLocationSelect) {
      onLocationSelect(defaultLocation);
    }
    toast.info("Lokasi telah direset");
  };

  // Format coordinates to more readable form
  const formatCoordinates = (coord: number): string => {
    return coord.toFixed(6);
  };

  // Get approximate location name based on coordinates
  const getLocationName = (): string => {
    if (!currentLocation) return "Lokasi tidak diketahui";
    
    // In a real app, we would do reverse geocoding here
    // For now, just return the coordinates as a string
    return `${formatCoordinates(currentLocation.latitude)}, ${formatCoordinates(currentLocation.longitude)}`;
  };

  return (
    <Card className="overflow-hidden shadow-md">
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
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Map content */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {currentLocation ? (
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-red-500" />
              {showLocationDetails && (
                <div className="bg-black/50 p-2 rounded max-w-[220px] text-xs">
                  <p className="text-sm font-semibold mb-1">Lokasi saat ini:</p>
                  <p>{getLocationName()}</p>
                </div>
              )}
            </div>
          ) : locationError ? (
            <div className="text-center bg-black/50 p-3 rounded max-w-[250px]">
              <X size={24} className="mx-auto mb-2 text-red-500" />
              <p className="text-sm">{locationError}</p>
            </div>
          ) : (
            <p className="bg-black/50 p-2 rounded text-sm">Lokasi belum dipilih</p>
          )}
        </div>
        
        {interactive && (
          <div className="absolute bottom-2 right-2 flex gap-2">
            {currentLocation && (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={clearLocation}
                className="bg-white/90 hover:bg-white"
                title="Reset lokasi"
              >
                <X size={16} className="text-red-500" />
              </Button>
            )}
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={getCurrentLocation}
              disabled={loadingLocation}
              className="bg-white/90 hover:bg-white"
            >
              {loadingLocation ? (
                <>
                  <div className="animate-spin mr-1 h-4 w-4 border-2 border-klikjasa-purple border-t-transparent rounded-full"></div>
                  <span>Mencari...</span>
                </>
              ) : (
                <>
                  <Locate size={16} className="mr-1 text-klikjasa-purple" />
                  <span>Lokasi Saya</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Map;
