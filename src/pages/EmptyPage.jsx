import React from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function EmptyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Your new application is ready to build amazing things
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/chat">
            <a className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Chat
              </h3>
              <p className="text-gray-400 text-sm">
                Start a conversation
              </p>
            </a>
          </Link>

          <Link href="/conversation">
            <a className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                Conversations
              </h3>
              <p className="text-gray-400 text-sm">
                View all conversations
              </p>
            </a>
          </Link>
        </div>

        <Link href="/home">
          <a className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
            Go to Home
            <ArrowRight className="w-4 h-4" />
          </a>
        </Link>
      </div>
    </div>
  );
}
