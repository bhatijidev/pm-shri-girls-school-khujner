import React from 'react';
import { BookOpen, GraduationCap, Award, Compass, Flame, Target, School, Layers } from 'lucide-react';

export default function CategoryFilter({ categories, activeCategoryId, onSelectCategory }) {
  // Map icons
  const iconMap = {
    BookOpen,
    GraduationCap,
    Award,
    Compass,
    Flame,
    Target,
    School
  };

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
      {/* All Option */}
      <button
        onClick={() => onSelectCategory('')}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
          activeCategoryId === ''
            ? 'bg-slate-900 text-white shadow-md'
            : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-orange hover:text-brand-orange'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>All Books</span>
      </button>

      {/* Categories from backend */}
      {categories.map((cat) => {
        const active = String(activeCategoryId) === String(cat.id);
        const IconComponent = iconMap[cat.icon] || BookOpen;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              active
                ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-orange hover:text-brand-orange'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{cat.name}</span>
            {cat.name_hindi && (
              <span className={`text-[11px] font-hindi ${active ? 'text-white/80' : 'text-slate-400'}`}>
                ({cat.name_hindi})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
