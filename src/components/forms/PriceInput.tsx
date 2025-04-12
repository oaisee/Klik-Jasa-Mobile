
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PriceInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const SinglePriceInput: React.FC<PriceInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Masukkan harga",
  required = false,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="price">{label}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500">Rp</span>
        </div>
        <Input 
          id="price" 
          type="number" 
          placeholder={placeholder} 
          value={value}
          onChange={onChange}
          className="pl-10"
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

interface RangePriceInputProps {
  label: string;
  minValue: string;
  maxValue: string;
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export const RangePriceInput: React.FC<RangePriceInputProps> = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  required = false,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">Rp</span>
          </div>
          <Input 
            type="number" 
            placeholder="Minimum" 
            value={minValue}
            onChange={onMinChange}
            className="pl-10"
            required={required}
            disabled={disabled}
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">Rp</span>
          </div>
          <Input 
            type="number" 
            placeholder="Maksimum" 
            value={maxValue}
            onChange={onMaxChange}
            className="pl-10"
            required={required}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
