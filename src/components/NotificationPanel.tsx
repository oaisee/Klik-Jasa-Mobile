
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

interface NotificationProps {
  hasUnread: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Permintaan Layanan Baru',
    message: 'Ada permintaan baru untuk jasa Anda dari Ahmad Sudrajat',
    time: '15 menit yang lalu',
    isRead: false
  },
  {
    id: '2',
    title: 'Saldo Berhasil Ditambahkan',
    message: 'Saldo Anda berhasil ditambahkan sebesar Rp 100.000',
    time: '1 jam yang lalu',
    isRead: false
  },
  {
    id: '3',
    title: 'Pemberitahuan Pembayaran',
    message: 'Pembayaran untuk jasa Perbaikan AC telah diterima',
    time: '3 jam yang lalu',
    isRead: true
  },
  {
    id: '4',
    title: 'Ulasan Baru',
    message: 'Anda mendapatkan ulasan bintang 5 dari Budi',
    time: 'Kemarin',
    isRead: true
  },
  {
    id: '5',
    title: 'Promo Spesial',
    message: 'Dapatkan diskon 10% untuk layanan Premium',
    time: '2 hari yang lalu',
    isRead: true
  }
];

const NotificationPanel: React.FC<NotificationProps> = ({ hasUnread, onOpenChange }) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(mockNotifications);
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    if (onOpenChange) onOpenChange(false);
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="p-2 bg-gray-100 rounded-full relative">
          <Bell size={20} className="text-gray-600" />
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-lg">Notifikasi</SheetTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            className="absolute top-4 right-12"
          >
            Tandai Semua Dibaca
          </Button>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-6rem)] py-2">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg relative ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <h3 className={`text-sm font-medium ${
                    notification.isRead ? 'text-gray-900' : 'text-klikjasa-purple'
                  }`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-700 my-1">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                  
                  <button 
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <p>Tidak ada notifikasi</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
