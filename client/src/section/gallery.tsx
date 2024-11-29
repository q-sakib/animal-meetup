import * as React from 'react';
import { CategoryButton } from './categoryBtn';
import { ActionButton } from './actionBtn';
import { AnimalCard } from './card';

export const AnimalGallery: React.FC = () => {
  const categories = [
    { name: 'Land Animal', isActive: true },
    { name: 'Bird', isActive: false },
    { name: 'Fish', isActive: false },
    { name: 'Insect', isActive: false },
  ];

  const animals = [
    { name: 'Elephant', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/024e924467e54420909d75249d12eedd/4758f159d16ba2757ed4d786bf633673dbcb878a2c00226acb5469ff4f388aab?apiKey=024e924467e54420909d75249d12eedd&' },
    { name: 'Horse', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/024e924467e54420909d75249d12eedd/d412bd0b6a13dcb62316d37d8c83976dd5bf31f98a2cacf85554a4bf7e0c1fa2?apiKey=024e924467e54420909d75249d12eedd&' },
    { name: 'Fox', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/024e924467e54420909d75249d12eedd/8ef3d18601c9adb5fcbf9f48e4ae777dcfa2d89a447b7ddc0de79bd9003f6451?apiKey=024e924467e54420909d75249d12eedd&' },
    { name: 'Cockatoo', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/024e924467e54420909d75249d12eedd/091547b1d5c4cf518f67fe59026500220ae4c9a0189ccef88e4c36f6552453d2?apiKey=024e924467e54420909d75249d12eedd&' },
    { name: 'Phoenix', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/024e924467e54420909d75249d12eedd/d9c78bae43f70423ce4b64607d8e6799d2e9832678dabe9123bb4ecaa56a3867?apiKey=024e924467e54420909d75249d12eedd&' },
    { name: 'Sparrow', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/024e924467e54420909d75249d12eedd/d85d58e9209d19c7e382c1d103b409c8f7c91272aba9ee23aa85bf30b53ef86c?apiKey=024e924467e54420909d75249d12eedd&' },
  ];

  return (
    <main className="flex overflow-hidden flex-col items-center px-20 pt-24 pb-96 bg-black max-md:px-5 max-md:py-24">
      <div className="flex flex-col w-full max-w-[1170px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full text-lg leading-none max-md:max-w-full">
          <div className="flex flex-wrap gap-6 items-start text-red-600 max-md:max-w-full">
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                name={category.name}
                isActive={category.isActive}
                onClick={() => console.log(`${category.name} clicked`)}
              />
            ))}
          </div>
          <div className="flex gap-4 text-white">
            <ActionButton label="Add Animal" />
            <ActionButton label="Add Category" />
          </div>
        </div>
        <div className="flex flex-wrap gap-10 mt-16 max-md:mt-10">
          {animals.map((animal, index) => (
            <AnimalCard
              key={index}
              name={animal.name}
              imageUrl={animal.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
};