import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <Card className="p-8 bg-white border-gray-200 shadow-lg">
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-700 text-lg">Loading crypto intelligence report...</p>
            </div>
          </Card>
        ) : (
          <Card className="p-8 md:p-12 bg-white border-gray-200 shadow-lg">
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-5xl prose-h1:mb-6 prose-h1:border-b-4 prose-h1:border-gray-300 prose-h1:pb-4
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-700 prose-h2:border-b-2 prose-h2:border-blue-200 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-900 prose-h3:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-800
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:list-disc prose-ul:text-gray-700 prose-ul:my-6 prose-ul:ml-6 prose-ul:pl-4
              prose-ol:text-gray-700 prose-ol:my-4
              prose-li:my-1 prose-li:text-base prose-li:leading-relaxed
              prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:border-2 prose-table:border-gray-300
              prose-thead:bg-blue-600 prose-thead:border-b-2 prose-thead:border-blue-700
              prose-th:text-left prose-th:py-4 prose-th:px-4 prose-th:font-bold prose-th:text-white prose-th:text-sm prose-th:border-r prose-th:border-blue-500 prose-th:last:border-r-0
              prose-td:py-3 prose-td:px-4 prose-td:border-b prose-td:border-r prose-td:border-gray-300 prose-td:text-gray-800 prose-td:text-sm prose-td:last:border-r-0
              prose-tr:bg-white even:prose-tr:bg-gray-50 prose-tr:hover:bg-blue-50
              prose-tbody:border-t-2 prose-tbody:border-gray-300
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:py-2
              prose-code:text-blue-700 prose-code:bg-blue-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-xs prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-hr:border-gray-400 prose-hr:my-8 prose-hr:border-t-2
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};

export default CryptoReport;
