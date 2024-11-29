'use client'

import * as React from 'react';
import { CategoryButton } from './categoryBtn';
import { ActionButton } from './actionBtn';
import { AnimalCard } from './card';
import axios from '@/utils/axiosClient';

export const AnimalGallery: React.FC = () => {
  // Local state to store categories and animals
  interface Category {
    _id: string;
    name: string;
    isActive: boolean;
  }

  const [categories, setCategories] = React.useState<Category[]>([]); // Dynamic categories
  interface Animal {
    _id: string;
    name: string;
    image: string;
  }

  const [animals, setAnimals] = React.useState<Animal[]>([]); // Dynamic animals array
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch categories and animals from backend
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories'); // Update with your backend URL
        const categoriesData = response.data;

        console.log('Fetched Categories:', categoriesData); // Log categories data

        // Mark the first category as active (you can adjust this logic as needed)
        if (categoriesData.length > 0) {
          categoriesData[0].isActive = true;
        }

        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error fetching categories.');
      }
    };

    const fetchAnimals = async () => {
      try {
        const response = await axios.get('/animals'); // Update with your backend URL
        console.log('Fetched Animals:', response.data); // Log animals data
        setAnimals(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching animals:', err);
        setError('Error fetching animals.');
        setLoading(false);
      }
    };

    fetchCategories();
    fetchAnimals();
  }, []); // Empty dependency array means this will run only once when the component mounts

  // Handle category selection
  const handleCategorySelect = (selectedCategoryName: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.name === selectedCategoryName
          ? { ...category, isActive: true } // Set selected category to active
          : { ...category, isActive: false } // Set others to inactive
      )
    );
  };

  // If data is loading, show a loading message
  if (loading) {
    return (
      <main className="flex overflow-hidden flex-col items-center px-20 pt-24 pb-96 bg-black max-md:px-5 max-md:py-24">
        <p>Loading animals...</p>
      </main>
    );
  }

  // If there is an error fetching animals, show an error message
  if (error) {
    return (
      <main className="flex overflow-hidden flex-col items-center px-20 pt-24 pb-96 bg-black max-md:px-5 max-md:py-24">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="flex overflow-hidden flex-col items-center px-20 pt-24 pb-96 bg-black max-md:px-5 max-md:py-24">
      <div className="flex flex-col w-full max-w-[1170px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full text-lg leading-none max-md:max-w-full">
          <div className="flex flex-wrap gap-6 items-start text-red-600 max-md:max-w-full">
            {categories.map((category) => (
              <CategoryButton
                key={category._id} // Unique key from the backend
                name={category.name}
                isActive={category.isActive}
                onClick={() => handleCategorySelect(category.name)} // Add onClick for handling category selection
              />
            ))}
          </div>
          <div className="flex gap-4 text-white">
            <ActionButton label="Add Animal" />
            <ActionButton label="Add Category" />
          </div>
        </div>
        <div className="flex flex-wrap gap-10 mt-16 max-md:mt-10">
          {animals.length > 0 ? (
            animals.map((animal) => (
              <AnimalCard
                key={animal._id} // Use the animal's unique ID for the key
                name={animal.name}
                imageUrl={animal.image} // Make sure the image path is correct
              />
            ))
          ) : (
            <p>No animals found.</p>
          )}
        </div>
      </div>
    </main>
  );
};
