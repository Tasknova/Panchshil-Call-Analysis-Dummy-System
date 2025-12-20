import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import ProfilePage from "@/components/ProfilePage";

type ViewType = 'landing' | 'dashboard' | 'profile';

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialView = searchParams.get('view') as ViewType || 'dashboard'; // Default to dashboard if no param
  const [currentView, setCurrentView] = useState<ViewType>(initialView);

  // Update URL when view changes, preserving existing params
  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentView === 'landing') {
      navigate('/', { replace: true });
    } else {
      // Preserve tab parameter if it exists
      const params = new URLSearchParams();
      params.set('view', currentView);
      if (currentTab) {
        params.set('tab', currentTab);
      }
      navigate(`/?${params.toString()}`, { replace: true });
    }
  }, [currentView, navigate, searchParams]);

  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleShowProfile = () => {
    setCurrentView('profile');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Render based on current view
  switch (currentView) {
    case 'landing':
      return <LandingPage onGetStarted={handleGetStarted} />;
    
    case 'profile':
      return <ProfilePage onBack={handleBackToDashboard} />;
    
    case 'dashboard':
      return <Dashboard onShowProfile={handleShowProfile} />;
    
    default:
      return <LandingPage onGetStarted={handleGetStarted} />;
  }
};

export default Index;
