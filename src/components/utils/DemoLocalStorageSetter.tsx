
"use client";

import { useEffect } from 'react';

/**
 * A simple component to demonstrate setting an item in localStorage.
 * This component does not render any UI.
 */
export function DemoLocalStorageSetter() {
  useEffect(() => {
    // Ensure this code runs only on the client-side
    // and after the component has mounted.
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('demoKeyA', 'This is a demo value A');
        // console.log("LocalStorage: Item 'demoKeyA' has been set.");
      } catch (error) {
        // console.error("LocalStorage: Failed to set item 'demoKeyA'.", error);
      }
    }
  }, []); // Empty dependency array means this runs once when the component mounts

  return null; // This component doesn't render anything visible
}
