import LegendCard from '@/components/legends/LegendCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const legends = [
  {
    id: 'gandhi',
    name: 'Mahatma Gandhi',
    title: 'Father of the Nation',
    description: 'Learn about non-violence, truth, and peaceful resistance from the leader of India\'s independence movement.',
    era: '1869-1948',
    expertise: ['Non-violence', 'Philosophy', 'Leadership', 'Social Reform'],
    image: 'https://images.pexels.com/photos/8815067/pexels-photo-8815067.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-green-500/20 to-green-600/20'
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    title: 'Theoretical Physicist',
    description: 'Discover the mysteries of the universe through conversations about relativity, quantum mechanics, and scientific curiosity.',
    era: '1879-1955',
    expertise: ['Physics', 'Mathematics', 'Philosophy', 'Innovation'],
    image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-neutral-500/20 to-neutral-700/20'
  },
  {
    id: 'cleopatra',
    name: 'Cleopatra VII',
    title: 'Last Pharaoh of Egypt',
    description: 'Explore ancient wisdom, leadership, and the art of diplomacy with one of history\'s most powerful rulers.',
    era: '69-30 BCE',
    expertise: ['Leadership', 'Diplomacy', 'Ancient Wisdom', 'Strategy'],
    image: 'https://images.pexels.com/photos/8960459/pexels-photo-8960459.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-green-600/20 to-green-800/20'
  }
];

export default function LegendsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-neutral-900 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
              Choose Your Legend
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Select a historical figure to begin your conversation. Each legend brings unique wisdom and perspectives from their era.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legends.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}