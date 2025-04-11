
import React from 'react';
import { Star, Heart } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  image: string;
  providerName: string;
  title: string;
  price: string;
  rating: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onClick: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  image,
  providerName,
  title,
  price,
  rating,
  isFavorite = false,
  onToggleFavorite,
  onClick,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite(id);
  };

  return (
    <div 
      className="card mb-4 relative animate-fade-in" 
      onClick={() => onClick(id)}
    >
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={handleFavoriteClick}
          className="bg-white rounded-full p-1 shadow"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'} 
          />
        </button>
      </div>
      <div className="w-full h-40 mb-2 rounded overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm text-gray-500">{providerName}</h3>
          <h2 className="font-bold text-gray-800">{title}</h2>
          <p className="text-klikjasa-purple font-bold mt-1">{price}</p>
        </div>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
          <Star size={16} className="text-yellow-500 mr-1" fill="#EAB308" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
