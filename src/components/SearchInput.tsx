import React, { useState, useDeferredValue } from "react";
import { useRouter } from "next/router";

import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const router = useRouter();

  const [currentCity, setCurrentCity] = useState<string>("");
  const deferredName = useDeferredValue(currentCity);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentCity(e.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/${deferredName}`);
    }
  };

  return (
    <div className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Enter City Name"
        className="h-10 px-5 pr-10 text-sm bg-white rounded-full focus:outline-none"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={currentCity}
      />
      <button onClick={() => router.push(`/${deferredName}`)} className="absolute top-0 right-0 mt-3 mr-4">
        <BsSearch color="gray" />
      </button>
    </div>
  );
};

export default SearchInput;
