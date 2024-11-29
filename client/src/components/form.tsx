import * as React from "react";
import { InputField } from "./inputField";
import { Button } from "./btn";

export const AnimalForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden flex-col py-9 text-lg leading-none bg-white rounded-3xl border border-solid border-neutral-900 max-w-[352px]"
      role="main"
      aria-labelledby="form-title"
    >
      <div className="flex flex-col px-6 pb-2.5 w-full text-black">
        <h1 id="form-title" className="self-start">
          Add Animal
        </h1>

        <InputField label="Animal Name" />

        <div className="relative">
          <InputField label="Image" />
          <Button className="absolute right-2 top-6 px-2 py-1.5 text-sm whitespace-nowrap bg-stone-300">
            upload
          </Button>
        </div>
      </div>

      <Button className="self-center mt-6 w-full max-w-[305px] text-white bg-black">
        Create Animal
      </Button>
    </form>
  );
};
