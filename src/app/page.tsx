"use client";

import React from 'react';
import withAuth from '@/components/withAuth';
import { UIFactory } from "@/components/home/UIFactory";

const HomePage = () => {
  return (
    <div>
      <UIFactory />
    </div>
  );
};

export default withAuth(HomePage);