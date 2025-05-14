
import React from "react";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* You can add sidebar or persistent header here */}
      {children}
    </section>
  );
}
