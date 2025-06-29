import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Clock } from 'lucide-react';

interface Legend {
  id: string;
  name: string;
  title: string;
  description: string;
  era: string;
  expertise: string[];
  image: string;
  gradient: string;
}

interface LegendCardProps {
  legend: Legend;
}

export default function LegendCard({ legend }: LegendCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:scale-105 group shadow-lg">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${legend.gradient} opacity-30`} />
        <img
          src={legend.image}
          alt={legend.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          style={{
            objectPosition: legend.id === 'gandhi' ? 'center 20%' : 
                           legend.id === 'einstein' ? 'center 15%' : 
                           legend.id === 'cleopatra' ? 'center 25%' : 'center top'
          }}
        />
        <div className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Clock className="h-3 w-3 text-green-400" />
          <span className="text-xs text-white font-medium">{legend.era}</span>
        </div>
        
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-black dark:text-white mb-1">{legend.name}</h3>
          <p className="text-green-600 dark:text-green-400 text-sm font-medium">{legend.title}</p>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 leading-relaxed">
          {legend.description}
        </p>
        
        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {legend.expertise.map((skill, index) => (
            <span
              key={index}
              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full border border-green-200 dark:border-green-800"
            >
              {skill}
            </span>
          ))}
        </div>
        
        {/* Action Button */}
        <Link href={`/legends/${legend.id}/chat`}>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:scale-105">
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Conversation
          </Button>
        </Link>
      </div>
    </div>
  );
}