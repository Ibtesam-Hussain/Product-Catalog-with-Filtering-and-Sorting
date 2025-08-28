"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface DropdownMenuProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const DropdownMenu = ({ options, selected, onSelect }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((open) => !open);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={handleTriggerClick} className="cursor-pointer">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          {selected}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in-0 zoom-in-95 p-1"
          role="menu"
          aria-orientation="vertical"
        >
          {options.map((option) => (
            <a
              key={option}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSelect(option);
              }}
              className={`text-zinc-700 dark:text-zinc-300 group flex items-center px-3 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150 ${selected === option ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold' : ''}`}
              role="menuitem"
            >
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const options = ["Newest First", "Oldest First", "Price: Low to High", "Price: High to Low"];
  return (
    <DropdownMenu options={options} selected={value} onSelect={onChange} />
  );
}
