// Protected Route Component
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-8">
                    <div className="animate-pulse text-white text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    // Render children if authenticated
    return children;
};

export default ProtectedRoute;
