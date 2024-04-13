import React from "react";
import { useRouter } from "next/router";

const Custom404: React.FC = () => {
  const router = useRouter();

  return (
    <div className="text-center py-4">
      <p className="mb-5 text-5xl">404 | Page Not Found. </p>
      <button onClick={() => router.back()} className="px-5 py-3 text-white rounded-full cursor-pointer bg-sky-500">
        Go Back
      </button>
    </div>
  );
};

export default Custom404;
