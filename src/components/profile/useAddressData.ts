
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  provinces, 
  getRegenciesByProvince, 
  getDistrictsByRegency, 
  getVillagesByDistrict 
} from '@/data/indonesianRegions';

export const useAddressData = (form: UseFormReturn<any>) => {
  const [availableRegencies, setAvailableRegencies] = useState<Array<{ id: string; name: string }>>([]);
  const [availableDistricts, setAvailableDistricts] = useState<Array<{ id: string; name: string }>>([]);
  const [availableVillages, setAvailableVillages] = useState<Array<{ id: string; name: string }>>([]);
  
  // Update available regions when province selection changes
  useEffect(() => {
    const provinceId = form.watch('province');
    if (provinceId) {
      const regencies = getRegenciesByProvince(provinceId);
      setAvailableRegencies(regencies);
      form.setValue('regency', '');
      form.setValue('district', '');
      form.setValue('village', '');
    } else {
      setAvailableRegencies([]);
    }
  }, [form.watch('province')]);
  
  // Update available districts when regency selection changes
  useEffect(() => {
    const regencyId = form.watch('regency');
    if (regencyId) {
      const districts = getDistrictsByRegency(regencyId);
      setAvailableDistricts(districts);
      form.setValue('district', '');
      form.setValue('village', '');
    } else {
      setAvailableDistricts([]);
    }
  }, [form.watch('regency')]);
  
  // Update available villages when district selection changes
  useEffect(() => {
    const districtId = form.watch('district');
    if (districtId) {
      const villages = getVillagesByDistrict(districtId);
      setAvailableVillages(villages);
      form.setValue('village', '');
    } else {
      setAvailableVillages([]);
    }
  }, [form.watch('district')]);

  return {
    provinces,
    availableRegencies,
    availableDistricts,
    availableVillages
  };
};
