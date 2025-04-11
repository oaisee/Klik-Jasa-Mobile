
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';

const ChatPage = () => {
  const { userType } = useAuth();
  
  // Contoh data chat
  const chatList = [
    {
      id: 1,
      name: 'Andi Pratama',
      lastMessage: 'Baik pak, saya akan datang jam 3 sore',
      time: '14:30',
      unread: 0
    },
    {
      id: 2,
      name: 'Budi Santoso',
      lastMessage: 'Berapa harga untuk perbaikan AC?',
      time: '12:15',
      unread: 2
    },
    {
      id: 3,
      name: 'Cindy Wijaya',
      lastMessage: 'Terima kasih atas jasanya',
      time: 'Kemarin',
      unread: 0
    }
  ];

  return (
    <div className="pb-24">
      <div className="p-4 bg-klikjasa-purple text-white">
        <h1 className="text-xl font-bold">Pesan</h1>
        <div className="mt-2 relative">
          <Input 
            placeholder="Cari pesan..." 
            className="pl-10 bg-white/10 border-none text-white placeholder:text-white/70 focus-visible:ring-offset-klikjasa-purple"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
        </div>
      </div>

      <div className="divide-y">
        {chatList.map((chat) => (
          <div key={chat.id} className="p-4 flex items-center hover:bg-gray-50 cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
              {chat.name.charAt(0)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <div className="ml-2 h-5 w-5 rounded-full bg-klikjasa-purple text-white text-xs flex items-center justify-center">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNavigation userType={userType || 'user'} />
    </div>
  );
};

export default ChatPage;
