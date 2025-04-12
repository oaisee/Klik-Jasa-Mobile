
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'number' | 'textarea' | 'file';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  prefix?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  prefix,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      
      {type === 'textarea' ? (
        <Textarea 
          id={id} 
          placeholder={placeholder} 
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          disabled={disabled}
        />
      ) : (
        <div className={prefix ? "relative" : ""}>
          {prefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {prefix}
            </div>
          )}
          <Input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            className={prefix ? "pl-10" : ""}
            required={required} 
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default FormField;
