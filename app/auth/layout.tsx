import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      {/* Layout ini tidak pakai Navbar supaya halaman login bersih */}
      {children} 
    </section>
  );
}