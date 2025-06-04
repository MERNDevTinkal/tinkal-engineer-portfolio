
"use client";

import { useEffect } from 'react';

/**
 * A simple component to demonstrate setting an item in localStorage.
 * This component does not render any UI.
 * This component is currently not used in the application.
 */
export function DemoLocalStorageSetter() {
  useEffect(() => {
    // Ensure this code runs only on the client-side
    // and after the component has mounted.
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('demoKeyA', 'This is a demo value A (from an unused component)');
        // console.log("LocalStorage: Item 'demoKeyA' has been set by DemoLocalStorageSetter.");
      } catch (error) {
        // console.error("LocalStorage: Failed to set item 'demoKeyA' by DemoLocalStorageSetter.", error);
      }
    }
  }, []); // Empty dependency array means this runs once when the component mounts

  return null; // This component doesn't render anything visible
}
