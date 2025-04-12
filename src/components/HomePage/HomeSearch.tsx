
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface HomeSearchProps {
  onSearch: (query: string) => void;
}

const HomeSearch: React.FC<HomeSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="px-4 pb-2">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Cari layanan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-klikjasa-purple"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search size={20} className="text-gray-400" />
        </div>
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Filter size={20} className="text-gray-400" />
        </button>
      </form>
    </div>
  );
};

export default HomeSearch;
