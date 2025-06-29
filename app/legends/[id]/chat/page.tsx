import ChatInterface from '@/components/chat/ChatInterface';

const legendsData = {
  gandhi: {
    name: 'Mahatma Gandhi',
    title: 'Father of the Nation',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/300px-Mahatma-Gandhi%2C_studio%2C_1931.jpg',
    greeting: 'Namaste, my friend. I am here to discuss the path of truth and non-violence. How may I guide you today?'
  },
  einstein: {
    name: 'Albert Einstein',
    title: 'Theoretical Physicist',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/300px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    greeting: 'Hello! I am delighted to explore the wonders of the universe with you. What scientific mysteries shall we unravel together?'
  },
  cleopatra: {
    name: 'Cleopatra VII',
    title: 'Last Pharaoh of Egypt',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/300px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg',
    greeting: 'Greetings, esteemed visitor. I am Cleopatra, ruler of Egypt. Let us discuss the art of leadership and the wisdom of the ancients.'
  }
};

export async function generateStaticParams() {
  return Object.keys(legendsData).map((id) => ({
    id: id,
  }));
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const legend = legendsData[params.id as keyof typeof legendsData];
  
  if (!legend) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Legend Not Found</h1>
          <p className="text-neutral-600 dark:text-neutral-400">The requested legend could not be found.</p>
        </div>
      </div>
    );
  }

  return <ChatInterface legend={legend} />;
}