import React, { Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { useFilters } from '../context/FilterContext';

const sortOptions = [
  { value: 'date-desc', label: 'Newest First', sortBy: 'date' as const, sortOrder: 'desc' as const },
  { value: 'date-asc', label: 'Oldest First', sortBy: 'date' as const, sortOrder: 'asc' as const },
  { value: 'price-asc', label: 'Price: Low to High', sortBy: 'price' as const, sortOrder: 'asc' as const },
  { value: 'price-desc', label: 'Price: High to Low', sortBy: 'price' as const, sortOrder: 'desc' as const },
  { value: 'popularity-desc', label: 'Most Popular', sortBy: 'popularity' as const, sortOrder: 'desc' as const },
  { value: 'rating-desc', label: 'Highest Rated', sortBy: 'rating' as const, sortOrder: 'desc' as const },
];

const SortDropdown: React.FC = () => {
  const { filters, updateFilters } = useFilters();

  const currentSortOption = sortOptions.find(
    option => option.sortBy === filters.sortBy && option.sortOrder === filters.sortOrder
  ) || sortOptions[0];

  const handleSortChange = (option: typeof sortOptions[0]) => {
    updateFilters({
      sortBy: option.sortBy,
      sortOrder: option.sortOrder
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {currentSortOption.label}
          <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => handleSortChange(option)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } ${
                      option.value === `${currentSortOption.sortBy}-${currentSortOption.sortOrder}` 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : ''
                    } block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors`}
                  >
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortDropdown;