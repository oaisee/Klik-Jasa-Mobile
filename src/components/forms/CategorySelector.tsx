
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, SubCategory, serviceCategories } from '@/utils/serviceCategories';

interface CategorySelectorProps {
  categoryId: string;
  subcategoryId: string;
  setCategoryId: (value: string) => void;
  setSubcategoryId: (value: string) => void;
  disabled?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryId,
  subcategoryId,
  setCategoryId,
  setSubcategoryId,
  disabled = false
}) => {
  const [currentSubcategories, setCurrentSubcategories] = useState<SubCategory[]>([]);
  
  useEffect(() => {
    // Update subcategories when category changes
    if (categoryId) {
      const category = serviceCategories.find(cat => cat.id === categoryId);
      if (category) {
        setCurrentSubcategories(category.subcategories);
        // Reset subcategory selection if not editing
        if (!subcategoryId) {
          setSubcategoryId('');
        }
      }
    } else {
      setCurrentSubcategories([]);
    }
  }, [categoryId, subcategoryId, setSubcategoryId]);
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select value={categoryId} onValueChange={setCategoryId} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {serviceCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subcategory">Sub Kategori</Label>
        <Select 
          value={subcategoryId} 
          onValueChange={setSubcategoryId}
          disabled={disabled || !categoryId || currentSubcategories.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih sub kategori" />
          </SelectTrigger>
          <SelectContent>
            {currentSubcategories.map((subcat) => (
              <SelectItem key={subcat.id} value={subcat.id}>
                {subcat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default CategorySelector;
