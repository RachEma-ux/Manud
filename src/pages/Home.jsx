import React from 'react';
import { Link } from 'wouter';
import { MessageSquare, Users, Settings, BarChart } from 'lucide-react';

const cards = [
  {
    title: 'Messages',
    description: 'View and manage your messages',
    icon: MessageSquare,
    link: '/chat',
    color: 'from-blue-500 to-blue-600',
    stats: '12 new',
  },
  {
    title: 'Conversations',
    description: 'Browse all conversations',
    icon: Users,
    link: '/conversation',
    color: 'from-purple-500 to-purple-600',
    stats: '4 active',
  },
  {
    title: 'Analytics',
    description: 'View your statistics',
    icon: BarChart,
    link: '#',
    color: 'from-green-500 to-green-600',
    stats: '↑ 23%',
  },
  {
    title: 'Settings',
    description: 'Customize your experience',
    icon: Settings,
    link: '#',
    color: 'from-gray-500 to-gray-600',
    stats: '',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.link}>
                <a className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {card.stats && (
                      <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded">
                        {card.stats}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-3 bg-gray-950 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">New message received</p>
                  <p className="text-gray-500 text-xs">{item} hour{item > 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
