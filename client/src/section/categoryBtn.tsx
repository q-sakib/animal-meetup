import * as React from 'react';
import { CategoryProps } from '@/types';
// <button
//   className={`gap-1 py-3.5 pr-5 pl-6 whitespace-nowrap border border-solid rounded-[100px] w-[152px] max-md:pl-5 ${isActive ? 'text-green-700 border-green-700' : 'text-red-600 border-red-600'
//     }`}
//   // aria-pressed={isActive ? 'true' : 'false'}
// >
//   {name}
// </button>

export const CategoryButton: React.FC<CategoryProps> = ({ name, isActive = false }) => {
  return (
    <>
      <button
        type="button"
        className="inline-block rounded-full bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
        {name}
      </button>
    </>
  );
};