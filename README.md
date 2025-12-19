# ভোটার তথ্য অনুসন্ধান | Bengali Voter Information Finder

A modern, user-friendly web application for searching voter information in Bengali. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Bengali Language Support**: Full Bengali interface with Noto Serif Bengali font
- **Fuzzy Search**: Advanced search using Fuse.js for flexible matching (handles spelling variations)
- **Multiple Search Parameters**:
  - Union Parishad (ইউনিয়ন পরিষদ)
  - Ward Number (ওয়ার্ড নম্বর)
  - Name (নাম)
  - Father's Name (পিতার নাম)
  - Mother's Name (মাতার নাম)
  - Address (ঠিকানা)
- **Beautiful UI**: Clean, political-campaign style design with green color scheme
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Loading States**: Visual feedback during search operations
- **Animated Results**: Smooth fade-in animations for search results
- **No Results Handling**: Clear messaging when no voters are found

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Search**: Fuse.js for fuzzy search
- **Icons**: Lucide React
- **Font**: Noto Serif Bengali (Google Fonts)

## Project Structure

```
project/
├── app/
│   ├── layout.tsx          # Root layout with Bengali font
│   ├── page.tsx            # Main page with search logic
│   └── globals.css         # Global styles and animations
├── components/
│   ├── SearchForm.tsx      # Search form component
│   └── SearchResults.tsx   # Results display component
├── data/
│   └── voters.json         # Voter data (sample)
└── package.json
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Data Format

The voter data is stored in `data/voters.json` with the following structure:

```json
{
  "metadata": {
    "district": "চাঁপাইনবাবগঞ্জ",
    "upazila": "চাঁপাইনবাবগঞ্জ সদর",
    "union_parishad": "রাণীহাটি",
    "ward_number": "১",
    "voter_area_name": "কমলাকান্তপুর",
    "voter_area_number": "০৯৯৩",
    "total_voters": "৯৪২",
    "total_female_voters": "৪৬৫",
    "publish_date": "২৪/১১/২০২৫"
  },
  "voters": [
    {
      "serial_no": "০০১",
      "name": "মোসাঃ জাহানারা বেগম",
      "voter_no": "৭০০৯৯৩৩৮৩৫০৪",
      "father_name": "আব্দুস সাত্তার বিশ্বাস",
      "mother_name": "বেলাতুন নেসা",
      "occupation": "গৃহিনী",
      "date_of_birth": "০১/০৬/১৯৬২",
      "address": "কমলাকান্তপুর (কামার পাড়া), রাণীহাটি, চাঁপাইনবাবগঞ্জ সদর, চাঁপাইনবাবগঞ্জ"
    }
  ]
}
```

## How to Add More Data

To add more voter data:

1. Open `data/voters.json`
2. Update the `metadata` section with your area information
3. Add voter entries to the `voters` array following the same structure
4. Ensure all text is in Bengali
5. Update the dropdowns in `SearchForm.tsx` if you need different unions/wards

## Search Algorithm

The application uses Fuse.js for fuzzy searching with the following configuration:

- **Name**: Weight 2.0 (highest priority)
- **Father Name**: Weight 1.5
- **Mother Name**: Weight 1.5
- **Address**: Weight 1.0
- **Threshold**: 0.4 (moderate fuzzy matching)
- **Case-insensitive**: Yes
- **Minimum match length**: 2 characters

This allows the search to work even if:
- There are minor spelling variations
- Some characters are missing
- The order of words is slightly different

## Customization

### Colors

The application uses a green color scheme inspired by political campaign websites. To change colors, update the Tailwind classes in:
- `app/page.tsx` (header gradient, buttons)
- `components/SearchForm.tsx` (buttons, focus states)
- `components/SearchResults.tsx` (card borders, badges)

Main colors used:
- Primary: `green-700`, `green-800` (header)
- Accent: `green-600` (borders, icons)
- Background: `green-50` (subtle background)

### Font

To change the Bengali font, edit `app/layout.tsx`:

```typescript
import { Noto_Serif_Bengali } from 'next/font/google';
// Or use: import { Hind_Siliguri } from 'next/font/google';
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Bengali Unicode font support required

## License

This project is open source and available for use.

## Credits

- Design inspired by [Janatar Ishtehar](https://www.janatarishtehar.org/)
- Icons by [Lucide React](https://lucide.dev/)
- Font by [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Serif+Bengali)
