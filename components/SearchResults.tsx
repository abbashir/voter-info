'use client';

import { User, Calendar, Briefcase, MapPin, FileText } from 'lucide-react';

export interface Voter {
  serial_no: any;
  name: any;
  voter_no: any;
  father_name: any;
  mother_name: any;
  occupation: any;
  date_of_birth: any;
  address: any;
}

interface SearchResultsProps {
  results: Voter[];
  searchPerformed: boolean;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

const DetailItem = ({ icon, label, value, className }: DetailItemProps) => (
  <div className={`flex items-center gap-2 ${className || ''}`}>
    {icon}
    <span className="text-sm text-gray-500 whitespace-nowrap">{label}:</span>
    <span className="text-gray-800 font-medium truncate">{value}</span>
  </div>
);

export default function SearchResults({ results, searchPerformed }: SearchResultsProps) {
  if (!searchPerformed) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
          <div className="text-yellow-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">কোনো ফলাফল পাওয়া যায়নি</h3>
          <p className="text-gray-600">অনুগ্রহ করে অন্য তথ্য দিয়ে খোঁজার চেষ্টা করুন</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          খোঁজার ফলাফল ({results.length} জন পাওয়া গেছে)
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
{results.map((voter, index) => (
  <div
    key={voter.voter_no}
    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border-l-4 border-green-600 animate-fadeIn"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      {/* Left: Voter Info */}
      <div className="flex-1">
        <div className="flex items-start gap-3 mb-4">
          {/* Serial Number Circle (Left of Name) */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-green-600 text-white flex flex-col items-center justify-center shadow-md">
            <span className="text-[10px] leading-none">ক্রমিক</span>
            <span className="text-lg font-bold leading-none">
              {voter.serial_no}
            </span>
          </div>
        </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
              {voter.name}
            </h3>

            {/* Copyable ভোটার নং */}
            <div
              className="flex items-center gap-2 text-sm text-green-700 font-semibold cursor-pointer select-all truncate"
              onClick={() => navigator.clipboard.writeText(voter.voter_no)}
              title="Click to copy ভোটার নং"
            >
              <FileText size={16} />
              <span className="truncate">ভোটার নং: {voter.voter_no}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DetailItem icon={<User size={16} className="text-gray-500" />} label="পিতার নাম" value={voter.father_name} />
          <DetailItem icon={<User size={16} className="text-gray-500" />} label="মাতার নাম" value={voter.mother_name} />
          <DetailItem icon={<Calendar size={16} className="text-gray-500" />} label="জন্ম তারিখ" value={voter.date_of_birth} />
          <DetailItem icon={<Briefcase size={16} className="text-gray-500" />} label="পেশা" value={voter.occupation} />
          <DetailItem icon={<MapPin size={16} className="text-gray-500" />} label="ঠিকানা" value={voter.address} className="sm:col-span-2" />
        </div>
      </div>

      {/* Right: Serial Number */}
      {/* <div className="flex-shrink-0 mt-4 md:mt-0">
        <div className="bg-green-50 px-4 py-2 rounded-lg text-center border border-green-200 min-w-[80px]">
          <span className="text-xs text-gray-600 block mb-1">ক্রমিক নং</span>
          <span className="text-2xl font-bold text-green-700">{voter.serial_no}</span>
        </div>
      </div> */}
    </div>
  </div>
))}
</div>

    </div>
  );
}
