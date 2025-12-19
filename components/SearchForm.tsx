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

export default function SearchForm({
  onSearch,
  onClear,
  isLoading,
}: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    unionParishad: 'রাণীহাটি', // always selected
    name: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    onClear();
  };

  const handleChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            জন্ম তারিখ
          </label>
          <input
            type="text"
            value={filters.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            placeholder="০১/০৬/১৯৬২"
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
