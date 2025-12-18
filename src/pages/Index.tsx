import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import ProfilePage from "@/components/ProfilePage";

type ViewType = 'landing' | 'dashboard' | 'profile';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');

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
