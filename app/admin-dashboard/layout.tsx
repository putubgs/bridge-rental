"use client";

import React, { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative -top-20 flex max-w-[1920px] flex-col bg-[#F9F9F9]">
        {children}
    </div>
  );
}
