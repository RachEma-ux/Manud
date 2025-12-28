import React from 'react';
import { Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <a className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
              <Home className="w-4 h-4" />
              Go Home
            </a>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium border border-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
