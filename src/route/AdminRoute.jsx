import { Navigate, useLocation } from 'react-router-dom';
import { useIsAdmin } from '../hooks/useUserRole';

/**
 * Protected route component for admin-only pages
 * Redirects to /dashboard/home if user is not SUPER_ADMIN
 */
const AdminRoute = ({ children }) => {
  const isAdmin = useIsAdmin();
  const location = useLocation();

  // Check if user has SUPER_ADMIN role
  if (!isAdmin) {
    const userRole = localStorage.getItem('userRole');
    console.log('AdminRoute check:', { isAdmin, userRole, path: location.pathname });
    
    // Redirect to home if not admin
    return <Navigate to="/dashboard/home" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
