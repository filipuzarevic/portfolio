import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const CryptoReport = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/crypto_report.md');
      const text = await response.text();
      setMarkdownContent(text);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching report:', error);
      setMarkdownContent('# Error Loading Report\n\nUnable to load the crypto intelligence report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([markdownContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `crypto_digest_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Crypto Market Intelligence
              </h1>
              <p className="text-slate-400">
                AI-powered analysis of crypto Twitter sentiment and market signals
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={fetchReport}
                variant="outline"
                className="bg-slate-800 hover:bg-slate-700 text-white border-slate-600"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={downloadReport}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-sm text-slate-500 mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <Card className="p-8 bg-slate-800/50 border-slate-700">
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-300 text-lg">Loading crypto intelligence report...</p>
            </div>
          </Card>
        ) : (
          <Card className="p-8 bg-slate-800/50 border-slate-700">
            <div className="prose prose-invert prose-slate max-w-none
              prose-headings:text-white
              prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-400
              prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-blue-300
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-slate-300
              prose-ol:text-slate-300
              prose-li:my-1
              prose-table:border-slate-700
              prose-thead:border-slate-600
              prose-th:text-left prose-th:py-3 prose-th:px-4 prose-th:bg-slate-700/50 prose-th:text-white
              prose-td:py-2 prose-td:px-4 prose-td:border-slate-700 prose-td:text-slate-300
              prose-tr:border-slate-700
              prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-300
              prose-code:text-blue-400 prose-code:bg-slate-900 prose-code:px-1 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
              prose-hr:border-slate-700
            ">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </Card>
        )}

        {/* Info Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="text-white font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-slate-400 text-sm">
              Powered by Claude AI to extract insights from influential crypto Twitter accounts
            </p>
          </Card>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <RefreshCw className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-white font-semibold mb-2">Real-Time Data</h3>
            <p className="text-slate-400 text-sm">
              Monitoring 8 key accounts including @vitalikbuterin, @coinbase, and @whale_alert
            </p>
          </Card>

          <Card className="p-6 bg-slate-800/30 border-slate-700">
            <TrendingDown className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-white font-semibold mb-2">Sentiment Tracking</h3>
            <p className="text-slate-400 text-sm">
              Track market sentiment, trending topics, and important announcements
            </p>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => window.location.href = '/'}
            variant="ghost"
            className="text-slate-400 hover:text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoReport;
