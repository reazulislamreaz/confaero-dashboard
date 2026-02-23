import { useState, useEffect } from 'react';

/**
 * Custom hook to get the current user role from localStorage
 * @returns {string|null} The user role (SUPER_ADMIN, ORGANIZER, etc.) or null if not logged in
 */
export const useUserRole = () => {
  const [userRole, setUserRole] = useState(() => {
    // Initialize from localStorage immediately
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  });

  useEffect(() => {
    // Update role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    // Listen for storage changes (in case of multiple tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'userRole') {
        setUserRole(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return userRole;
};

/**
 * Helper function to check if user is admin
 * @returns {boolean} true if user is SUPER_ADMIN
 */
export const useIsAdmin = () => {
  const userRole = useUserRole();
  return userRole === 'SUPER_ADMIN';
};

/**
 * Helper function to check if user is organizer
 * @returns {boolean} true if user is ORGANIZER
 */
export const useIsOrganizer = () => {
  const userRole = useUserRole();
  return userRole === 'ORGANIZER';
};
