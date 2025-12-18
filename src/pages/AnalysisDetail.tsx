import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, MessageSquare, Mic, TrendingUp, Users, Star, Target, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, Analysis, Recording } from "@/lib/supabase";

export default function AnalysisDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [recording, setRecording] = useState<Recording | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const fetchAnalysisAndRecording = async () => {
      if (!id || !user) return;

      try {
        // Fetch analysis
        const { data: analysisData, error: analysisError } = await supabase
          .from('analyses')
          .select('*')
          .eq('id', id)
          .single();

        if (analysisError) throw analysisError;

        // Fetch recording
        const { data: recordingData, error: recordingError } = await supabase
          .from('recordings')
          .select('*')
          .eq('id', analysisData.recording_id)
          .single();

        if (recordingError) throw recordingError;

        setAnalysis(analysisData);
        setRecording(recordingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisAndRecording();
  }, [id, user]);

  const getSentimentColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-accent-blue";
    return "text-warning";
  };

  const getSentimentEmoji = (score: number) => {
    if (score >= 80) return "😊"; // Happy
    if (score >= 60) return "😐"; // Neutral
    return "😔"; // Sad/Concerned
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-accent-blue";
    return "text-warning";
  };

  // Helper functions for professional color indicators
  const getEngagementColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-accent-blue";
    if (score >= 40) return "text-warning";
    return "text-red-500";
  };

  const getEngagementEmoji = (score: number) => {
    if (score >= 80) return "🔥"; // High engagement
    if (score >= 60) return "👍"; // Good engagement
    if (score >= 40) return "👌"; // Moderate engagement
    return "👎"; // Low engagement
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-accent-blue";
    if (score >= 4) return "text-warning";
    return "text-red-500";
  };

  const getConfidenceEmoji = (score: number) => {
    if (score >= 8) return "💪"; // High confidence
    if (score >= 6) return "👍"; // Good confidence
    if (score >= 4) return "🤔"; // Moderate confidence
    return "😰"; // Low confidence
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-blue mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis || !recording) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Analysis Not Found</h1>
          <p className="text-muted-foreground mt-2">The requested analysis could not be found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const details = analysis.detailed_call_analysis || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/?tab=recordings')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recordings
            </Button>
            <img 
              src="/panchsil_logo.png.jpg" 
              alt="Panchshil" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Call Analysis Details</h1>
              <p className="text-muted-foreground">
                <span className="font-semibold text-accent-blue">Tasknova</span> Voice Analysis • {recording.file_name || 'Recording'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-8 py-8 space-y-8">
        {/* Summary Cards - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-8 max-w-6xl">
          <Card className="hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <TrendingUp className="h-6 w-6" />
                Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className={`text-5xl font-bold ${getSentimentColor(analysis.sentiment_score || 0)} flex items-center gap-3 mb-4`}>
                <span className="text-6xl">{getSentimentEmoji(analysis.sentiment_score || 0)}</span>
                {analysis.sentiment_score || 0}%
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    (analysis.sentiment_score || 0) >= 80 ? 'bg-green-500' : 
                    (analysis.sentiment_score || 0) >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${analysis.sentiment_score || 0}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <Users className="h-6 w-6" />
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className={`text-5xl font-bold ${getEngagementColor(analysis.engagement_score || 0)} flex items-center gap-3 mb-4`}>
                <span className="text-6xl">{getEngagementEmoji(analysis.engagement_score || 0)}</span>
                {analysis.engagement_score || 0}%
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    (analysis.engagement_score || 0) >= 80 ? 'bg-green-500' : 
                    (analysis.engagement_score || 0) >= 60 ? 'bg-blue-500' : 
                    (analysis.engagement_score || 0) >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.engagement_score || 0}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <Star className="h-6 w-6" />
                Exec Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className={`text-5xl font-bold ${getConfidenceColor(analysis.confidence_score_executive || 0)} flex items-center gap-3 mb-4`}>
                <span className="text-6xl">{getConfidenceEmoji(analysis.confidence_score_executive || 0)}</span>
                {analysis.confidence_score_executive || 0}/10
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    (analysis.confidence_score_executive || 0) >= 8 ? 'bg-green-500' : 
                    (analysis.confidence_score_executive || 0) >= 6 ? 'bg-blue-500' : 
                    (analysis.confidence_score_executive || 0) >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${((analysis.confidence_score_executive || 0) / 10) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <Target className="h-6 w-6" />
                Person Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className={`text-5xl font-bold ${getConfidenceColor(analysis.confidence_score_person || 0)} flex items-center gap-3 mb-4`}>
                <span className="text-6xl">{getConfidenceEmoji(analysis.confidence_score_person || 0)}</span>
                {analysis.confidence_score_person || 0}/10
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    (analysis.confidence_score_person || 0) >= 8 ? 'bg-green-500' : 
                    (analysis.confidence_score_person || 0) >= 6 ? 'bg-blue-500' : 
                    (analysis.confidence_score_person || 0) >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${((analysis.confidence_score_person || 0) / 10) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <Users className="h-6 w-6" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-5xl font-bold text-accent-blue mb-4">
                {analysis.participants?.count || 'N/A'}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {analysis.participants?.names && (
                  <div>Names: {analysis.participants.names}</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                Objections
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-warning">
                  {analysis.objections_raised || 0}
                </div>
                <div className="text-2xl text-muted-foreground">/</div>
                <div className="text-4xl font-bold text-success">
                  {analysis.objections_tackled || 0}
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Raised / Tackled
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Main Content - Full Width with Proper Sequence */}
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* 1. Executive Summary - Full Width */}
          {analysis.short_summary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {analysis.short_summary}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 2. Next Steps - Full Width */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {details.next_steps_detailed ? (
                  details.next_steps_detailed.split(/\d+\)/).filter(Boolean).map((step: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent-blue text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.trim()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    {analysis.next_steps || 'No next steps defined'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3. Sentiment Analysis - Full Width */}
          {details.sentiments_explanation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {details.sentiments_explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 4. Engagement Analysis - Full Width */}
          {details.engagement_explanation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Engagement Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {details.engagement_explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {/* 5. Executive Confidence and Person Confidence - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Executive Confidence Explanation */}
            {details.confidence_explanation_executive && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Executive Confidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {details.confidence_explanation_executive}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Person Confidence Explanation */}
            {details.confidence_explanation_person && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Person Confidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {details.confidence_explanation_person}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 6. Improvements for Team - Moved from Advanced */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Improvements for Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {details.improvements_for_team ? (
                  details.improvements_for_team.split(/\d+\)/).filter(Boolean).map((improvement: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{improvement.trim()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    {analysis.improvements || 'No improvements suggested'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Advanced Section Button - Centered */}
        <div className="flex justify-center py-8">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-8 py-3 text-lg font-semibold border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {showAdvanced ? (
              <>
                <ChevronDown className="h-5 w-5 mr-2" />
                Hide Advanced Details
              </>
            ) : (
              <>
                <ChevronRight className="h-5 w-5 mr-2" />
                Show Advanced Details
              </>
            )}
          </Button>
        </div>

        {/* Advanced Section Content */}
        {showAdvanced && (
          <div className="space-y-8">
            
            {/* Evidence Quotes - Full Width */}
            {details.evidence_quotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Key Evidence Quotes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg border-l-4 border-accent-blue">
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{details.evidence_quotes}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Objections Section - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Objections Detected - Moved from main content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Objections Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {details.objections_detected ? (
                      details.objections_detected.split(/\d+\)/).filter(Boolean).map((objection: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-warning text-white rounded-full flex items-center justify-center text-xs font-medium">
                            !
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{objection.trim()}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        {analysis.objections_handled || 'No objections recorded'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* How Objections Were Handled */}
              {details.objections_handling_details && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      How Objections Were Handled
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {details.objections_handling_details}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Call Outcome - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Call Outcome
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-lg font-medium text-foreground">
                    {analysis.call_outcome || 'Unknown'}
                  </p>
                  {details.call_outcome_rationale && (
                    <p className="text-muted-foreground leading-relaxed">
                      {details.call_outcome_rationale}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Call Transcript - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Call Transcript
                </CardTitle>
                <CardDescription>
                  Full transcript of the recorded conversation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full rounded border p-4">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {recording.transcript || 'No transcript available for this recording.'}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
}
