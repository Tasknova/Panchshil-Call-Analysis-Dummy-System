import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Upload, BarChart3, Users, Zap, Shield, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {

  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Upload call recordings directly from your device with secure cloud storage"
    },
    {
      icon: BarChart3,
      title: "AI Analysis",
      description: "Advanced sentiment, engagement, and objection analysis powered by AI"
    },
    {
      icon: Users,
      title: "Team Insights",
      description: "Track performance across your entire sales team with detailed metrics"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get analysis results in under 5 minutes with automated pipeline"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with encrypted storage and access controls"
    }
  ];

  const benefits = [
    "Automate call quality monitoring",
    "Identify conversion levers and roadblocks",
    "Track sentiment and engagement trends",
    "Reduce manual review time by 90%",
    "Improve team performance with data insights",
    "Searchable transcript analysis"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar - Minimal Luxury */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-card/95">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <img 
                src="/panchsil_logo.png.jpg" 
                alt="Panchshil" 
                className="h-12 w-auto cursor-pointer hover:opacity-70 transition-opacity duration-300"
                onClick={() => window.location.href = '/'}
              />
            </div>
            
            {/* Right side - Auth buttons */}
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={onGetStarted}
                className="text-foreground hover:text-accent-blue font-medium tracking-wide"
              >
                ENTER
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Luxury Minimal */}
      <section className="relative bg-background px-8 py-32 text-foreground">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="h-px w-12 bg-accent-blue mr-4"></div>
                <span className="text-sm tracking-widest text-muted-foreground uppercase">Panchshil Voice Intelligence</span>
              </div>
              <h1 className="text-6xl font-bold leading-tight tracking-tight">
                Elevate Your
                <br />
                <span className="text-primary">Communication</span>
                <br />
                Excellence
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Premium AI-powered voice analysis for discerning professionals. 
                Transform conversations into actionable intelligence with unparalleled precision.
              </p>
              <div className="flex justify-start pt-4">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base tracking-widest uppercase font-medium transition-all duration-300"
                >
                  Begin Your Journey
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-3 rounded-full bg-success"></div>
                    <div className="text-sm text-gray-600">Growth Analytics</div>
                  </div>
                  
                  {/* Frequency Graph */}
                  <div className="relative h-32 w-full">
                    <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <defs>
                        {/* Bar gradients */}
                        <linearGradient id="barGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="barGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#67e8f9" />
                        </linearGradient>
                        <linearGradient id="barGradient3" x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <g stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5">
                        <line x1="0" y1="100" x2="300" y2="100" />
                        <line x1="0" y1="80" x2="300" y2="80" />
                        <line x1="0" y1="60" x2="300" y2="60" />
                        <line x1="0" y1="40" x2="300" y2="40" />
                        <line x1="0" y1="20" x2="300" y2="20" />
                      </g>
                      
                      {/* Frequency bars */}
                      <g>
                        {/* Bar 1 */}
                        <rect x="20" y="70" width="15" height="30" fill="url(#barGradient1)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="30;35;30" dur="2s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="70;65;70" dur="2s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 2 */}
                        <rect x="45" y="50" width="15" height="50" fill="url(#barGradient2)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="50;55;50" dur="2s" begin="0.2s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="50;45;50" dur="2s" begin="0.2s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 3 */}
                        <rect x="70" y="40" width="15" height="60" fill="url(#barGradient3)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="60;65;60" dur="2s" begin="0.4s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="40;35;40" dur="2s" begin="0.4s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 4 */}
                        <rect x="95" y="60" width="15" height="40" fill="url(#barGradient1)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="40;45;40" dur="2s" begin="0.6s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="60;55;60" dur="2s" begin="0.6s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 5 */}
                        <rect x="120" y="30" width="15" height="70" fill="url(#barGradient3)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="70;75;70" dur="2s" begin="0.8s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="30;25;30" dur="2s" begin="0.8s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 6 */}
                        <rect x="145" y="55" width="15" height="45" fill="url(#barGradient2)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="45;50;45" dur="2s" begin="1s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="55;50;55" dur="2s" begin="1s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 7 */}
                        <rect x="170" y="25" width="15" height="75" fill="url(#barGradient3)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="75;80;75" dur="2s" begin="1.2s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="25;20;25" dur="2s" begin="1.2s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 8 */}
                        <rect x="195" y="45" width="15" height="55" fill="url(#barGradient1)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="55;60;55" dur="2s" begin="1.4s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="45;40;45" dur="2s" begin="1.4s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 9 */}
                        <rect x="220" y="35" width="15" height="65" fill="url(#barGradient2)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="65;70;65" dur="2s" begin="1.6s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="35;30;35" dur="2s" begin="1.6s" repeatCount="indefinite"/>
                        </rect>
                        
                        {/* Bar 10 */}
                        <rect x="245" y="20" width="15" height="80" fill="url(#barGradient3)" rx="2" className="drop-shadow-sm">
                          <animate attributeName="height" values="80;85;80" dur="2s" begin="1.8s" repeatCount="indefinite"/>
                          <animate attributeName="y" values="20;15;20" dur="2s" begin="1.8s" repeatCount="indefinite"/>
                        </rect>
                      </g>
                    </svg>
                    
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-700 font-medium">
                    <span>Performance Growth</span>
                    <span className="text-success">↗ Trending Up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Grid Luxury Layout */}
      <section className="px-8 py-32 bg-card">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="h-px w-12 bg-accent-blue mr-4"></div>
              <span className="text-sm tracking-widest text-muted-foreground uppercase">Capabilities</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 tracking-tight">Excellence in Every Detail</h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Precision-engineered tools for the modern professional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border hover:border-accent-blue transition-all duration-300 bg-background group">
                <CardHeader className="space-y-6">
                  <div className="h-14 w-14 border border-border group-hover:border-accent-blue flex items-center justify-center transition-all duration-300">
                    <feature.icon className="h-7 w-7 text-muted-foreground group-hover:text-accent-blue transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-semibold tracking-wide">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Industries That Trust Our Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From HR agencies to banking institutions, businesses across industries rely on our AI-powered call analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-accent-blue transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">HR Agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Streamline candidate interviews and improve hiring decisions with detailed conversation analysis and candidate assessment insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent-blue transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Real Estate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Enhance client consultations, property showings, and negotiations with sentiment analysis and engagement tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent-blue transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Monitor support call quality, identify customer pain points, and improve resolution rates with AI-driven insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent-blue transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Lead Qualification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Optimize sales conversations, identify qualified prospects, and improve conversion rates with detailed call analytics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent-blue transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Ensure compliance, improve customer relationships, and enhance loan consultations with comprehensive call analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent-blue transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Customer & Business Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Optimize operational efficiency, improve customer interactions, and drive business growth with actionable call insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Our Platform?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of sales teams who have transformed their call performance with our AI-powered insights.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-accent-blue mb-2">90%</div>
                <div className="text-muted-foreground">Time Savings</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-success mb-2">34%</div>
                <div className="text-muted-foreground">Conversion Boost</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-warning mb-2">5 Min</div>
                <div className="text-muted-foreground">Analysis Time</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Happy Teams</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Calls?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start analyzing your call recordings today and unlock insights that drive results.
          </p>
          <div className="flex justify-center">
            <Button size="xl" variant="accent" onClick={onGetStarted}>
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img 
                src="/panchsil_logo.png.jpg" 
                alt="Panchshil" 
                className="h-8 w-auto cursor-pointer hover:opacity-70 transition-opacity duration-300"
                onClick={() => window.location.href = '/'}
              />
              <div>
                <p className="font-semibold text-foreground">Panchshil</p>
                <p className="text-sm text-muted-foreground">Voice Intelligence Platform</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025 Panchshil Realty. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}