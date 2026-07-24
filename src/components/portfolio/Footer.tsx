import React from 'react';

export function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-border/40 text-xs text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Mark Protik Mondol. All rights reserved.</p>
    </footer>
  );
}
