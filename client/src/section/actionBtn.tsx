
import * as React from 'react';
import { ActionButtonProps } from '@/types';

export const ActionButton: React.FC<ActionButtonProps> = ({ label }) => {
  return (
    <button
      className="gap-1 py-3.5 pr-5 pl-6 border border-white border-solid rounded-[100px] max-md:pl-5 text-white"
      aria-label={label}
    >
      {label}
    </button>
  );
};