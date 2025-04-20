'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // To handle loading state

  useEffect(() => {
    const user = localStorage.getItem('authUser'); // Fetch user from localStorage
    if (!user) {
      setIsAuthenticated(false); // No user found, not authenticated
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // User is authenticated
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Show loading while checking auth
  }

  if (isAuthenticated === false) {
    return null; // User will be redirected to login
  }

  return <>{children}</>; // Show children if authenticated
}
