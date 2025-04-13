
import React from 'react';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HomeHeaderProps {
  userType: string;
  accountBalance: number;
  hasNotifications: boolean;
  onNotificationClick: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userType,
  accountBalance,
  hasNotifications,
  onNotificationClick,
}) => {
  return (
    <div className="px-4 py-2">
      {/* Balance Card */}
      <Card className="bg-klikjasa-purple text-white p-3 mt-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Wallet className="mr-2" size={20} />
            <div>
              <p className="text-sm opacity-90">Saldo Anda</p>
              <p className="text-xl font-bold">Rp {accountBalance.toLocaleString('id-ID')}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white text-klikjasa-purple border-none"
            asChild
          >
            <Link to="/topup">Top Up</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HomeHeader;
