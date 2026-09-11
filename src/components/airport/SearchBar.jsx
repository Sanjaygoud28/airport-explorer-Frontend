import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export function SearchBar({ value, onChange, placeholder = "Search by name, IATA, or city..." }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-9 h-10"
      />
    </div>
  );
}
