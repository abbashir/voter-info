'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  isLoading: boolean;
}

export interface SearchFilters {
  unionParishad: string;
  name: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
}

// ✅ Bangla DOB validator
const isValidBanglaDate = (date: string) => {
  // Format: ২৩/০৫/২০০৭
  const regex =
    /^(০[১-৯]|[১২][০-৯]|৩০|৩১)\/(০[১-৯]|১[০-২])\/([১২][০-৯]{3})$/;

  return regex.test(date);
};

export default function SearchForm({
  onSearch,
  onClear,
  isLoading,
}: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    unionParishad: 'রাণীহাটি',
    name: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    address: '',
  });

  const [dobError, setDobError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔴 DOB validation
    if (filters.dateOfBirth && !isValidBanglaDate(filters.dateOfBirth)) {
      setDobError('জন্ম তারিখের ফরম্যাট সঠিক নয় (উদাহরণ: ২৩/০৫/২০০৭)');
      return;
    }

    setDobError('');
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      unionParishad: 'রাণীহাটি',
      name: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      address: '',
    });
    setDobError('');
    onClear();
  };

  const handleChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));

    // Clear error while typing DOB
    if (field === 'dateOfBirth') {
      setDobError('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Union Parishad */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ইউনিয়ন পরিষদ
          </label>
          <select
            value={filters.unionParishad}
            disabled
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          >
            <option value="রাণীহাটি">রাণীহাটি</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            জন্ম তারিখ
          </label>
          <input
            type="text"
            value={filters.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            placeholder="২৩/০৫/২০০৭"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-600 ${
              dobError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {dobError && (
            <p className="text-red-600 text-sm mt-1">{dobError}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            নাম
          </label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="ভোটারের নাম লিখুন"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Father Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            পিতার নাম
          </label>
          <input
            type="text"
            value={filters.fatherName}
            onChange={(e) => handleChange('fatherName', e.target.value)}
            placeholder="পিতার নাম লিখুন"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Mother Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            মাতার নাম
          </label>
          <input
            type="text"
            value={filters.motherName}
            onChange={(e) => handleChange('motherName', e.target.value)}
            placeholder="মাতার নাম লিখুন"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ঠিকানা
          </label>
          <input
            type="text"
            value={filters.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="ঠিকানা লিখুন"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={20} />
          {isLoading ? 'খোঁজা হচ্ছে...' : 'খুঁজুন'}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
        >
          <X size={20} />
          পরিষ্কার করুন
        </button>
      </div>
    </form>
  );
}
