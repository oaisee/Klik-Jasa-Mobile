
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  image: string;
  providerName: string;
  title: string;
  price: string;
  rating: number;
  category: string;
  distance: string;
}

interface ServiceListProps {
  services: Service[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onServiceClick: (id: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  favorites,
  onToggleFavorite,
  onServiceClick
}) => {
  return (
    <div className="px-4 py-2">
      <h2 className="text-lg font-bold mb-3">Rekomendasi Layanan</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            image={service.image}
            providerName={service.providerName}
            title={service.title}
            price={service.price}
            rating={service.rating}
            isFavorite={favorites.includes(service.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={onServiceClick}
            distance={service.distance}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
