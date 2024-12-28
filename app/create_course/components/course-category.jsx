'use client';
import { UserInputContext } from '@/app/context/UserInputContext';
import Image from 'next/image';
import { useContext } from 'react';

export function CategorySelection({ selectedCategory, onSelectCategory }) {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  
  const categories = [
    {
      id: 'programming',
      name: 'Programming',
      icon: '/placeholder.svg?height=48&width=48',
    },
    {
      id: 'health',
      name: 'Health',
      icon: '/placeholder.svg?height=48&width=48',
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: '/placeholder.svg?height=48&width=48',
    },
  ];

  const handleCategoryClick = (categoryId) => {
    // Action 1: Update the selected category
    onSelectCategory(categoryId);

    // Action 2: Update userCourseInput in context
    setUserCourseInput((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`p-8 rounded-xl border-2 transition-all ${
            selectedCategory === category.id
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 hover:border-purple-300'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Image
              src={category.icon}
              alt={`${category.name} icon`}
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className="text-lg font-medium text-gray-900">{category.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
