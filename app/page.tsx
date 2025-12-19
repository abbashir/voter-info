'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import SearchForm, { SearchFilters } from '@/components/SearchForm';
import SearchResults, { Voter } from '@/components/SearchResults';
import votersData from '@/data/voters.json';
import { Vote } from 'lucide-react';
import { log } from 'console';

export default function Home() {
  const [results, setResults] = useState<Voter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

const handleSearch = (filters: SearchFilters) => {
  setIsLoading(true);
  setSearchPerformed(false);

  setTimeout(() => {
    let voters = [...votersData.voters];

    // 🔴 Union Parishad filter
    if (
      filters.unionParishad &&
      filters.unionParishad !== votersData.metadata.union_parishad
    ) {
      voters = [];
    }

    // 🔴 Exact DOB
    if (filters.dateOfBirth) {
      voters = voters.filter(
        v => v.date_of_birth === filters.dateOfBirth
      );
    }

    if (voters.length) {
      const fuse = new Fuse(voters, {
        keys: [
          { name: 'name', weight: 0.4 },
          { name: 'father_name', weight: 0.2 },
          { name: 'mother_name', weight: 0.2 },
          { name: 'address', weight: 0.2 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeScore: true,
        useExtendedSearch: true,
      });

      const extendedQuery: any = {};

      // ✅ Field-isolated matching
      if (filters.name) {
        extendedQuery.name = filters.name;
      }
      if (filters.fatherName) {
        extendedQuery.father_name = filters.fatherName;
      }
      if (filters.motherName) {
        extendedQuery.mother_name = filters.motherName;
      }
      if (filters.address) {
        extendedQuery.address = filters.address;
      }

      if (Object.keys(extendedQuery).length) {
        voters = fuse
          .search({ $and: [extendedQuery] })
          .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
          .map(r => r.item);
      }
    }

    setResults(voters);
    setSearchPerformed(true);
    setIsLoading(false);
  }, 400);
};



  const handleClear = () => {
    setResults([]);
    setSearchPerformed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <header className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white/10 p-1 rounded-full backdrop-blur-sm">
              <img
                src="/logo.png"
                alt="ভোটার তথ্য সেবা"
                className="h-[40px] w-[40px] object-contain"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">ভোটার তথ্য অনুসন্ধান</h1>
              <p className="text-green-100 text-sm md:text-base ">
                মোঃ নুরুল ইসলাম বুলবুল - চাঁপাইনবাবগঞ্জ সদর - ৩
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} onClear={handleClear} isLoading={isLoading} />
        </div>

        <SearchResults results={results} searchPerformed={searchPerformed} />
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm md:text-base">© ২০২৫ ভোটার তথ্য অনুসন্ধান সেবা। সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="text-xs text-gray-400 mt-2">
              মিডিয়া বিভাগ, বাংলাদেশ জামায়াতে ইসলামী ৬ নং রানীহাটি ইউনিয়ন।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
