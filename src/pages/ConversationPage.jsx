import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';
import { Link } from 'wouter';

const mockConversations = [
  {
    id: 1,
    title: 'Project Discussion',
    preview: 'Let\'s talk about the new features...',
    timestamp: '2 hours ago',
    unread: 3,
  },
  {
    id: 2,
    title: 'Team Meeting Notes',
    preview: 'Summary of today\'s meeting...',
    timestamp: '5 hours ago',
    unread: 0,
  },
  {
    id: 3,
    title: 'Bug Report #1234',
    preview: 'Found an issue with the login...',
    timestamp: 'Yesterday',
    unread: 1,
  },
  {
    id: 4,
    title: 'Feature Request',
    preview: 'It would be great if we could add...',
    timestamp: '2 days ago',
    unread: 0,
  },
];

export default function ConversationPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Conversations</h1>
          <p className="text-gray-400 mt-1">All your chat history</p>
        </div>
      </div>

      {/* Conversations List */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-3">
          {mockConversations.map((conversation) => (
            <Link key={conversation.id} href="/chat">
              <a className="block p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {conversation.title}
                      </h3>
                      {conversation.unread > 0 && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm truncate mb-2">
                      {conversation.preview}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{conversation.timestamp}</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {mockConversations.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No conversations yet
            </h3>
            <p className="text-gray-500">
              Start a new chat to begin a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
