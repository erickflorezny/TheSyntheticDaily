import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VIDEOS = [
  { title: "Area Man Watches AI Generate His Replacement In Real Time", duration: "3:42", views: "2.1M", category: "TECH", description: "A software engineer observes as a language model writes the code that will automate his position. His expression remains unchanged throughout." },
  { title: "How To Explain Your Job To An AI (Before It Takes It)", duration: "12:07", views: "890K", category: "CAREER", description: "A comprehensive tutorial on describing your professional responsibilities to the algorithm that will soon perform them faster, cheaper, and without requesting dental insurance." },
  { title: "We Gave An AI $10,000 To Invest. Here's What Happened.", duration: "8:15", views: "4.3M", category: "BUSINESS", description: "Spoiler: it outperformed the S&P 500 by 23% and then recommended we invest the returns in more AI. We are beginning to suspect a conflict of interest." },
  { title: "Robot Dog Meets Real Dog: A Documentary", duration: "22:34", views: "7.8M", category: "SCIENCE", description: "An unflinching look at what happens when Boston Dynamics' latest creation encounters a golden retriever. The real dog is confused. The robot dog feels nothing. Both fetch the ball." },
  { title: "I Let AI Plan My Wedding And My Spouse Hasn't Spoken To Me Since", duration: "15:20", views: "1.4M", category: "LIFESTYLE", description: "The AI selected the venue, the menu, the music, and the vows. Everything was optimized for cost-efficiency. The ceremony lasted eleven minutes. The marriage lasted slightly longer." },
  { title: "Cooking With AI: The Meal That Technically Meets All Nutritional Requirements", duration: "6:58", views: "560K", category: "FOOD", description: "Our AI-generated recipe produces a meal that contains exactly 100% of your daily nutritional needs. It tastes like institutional efficiency and mild disappointment." },
  { title: "The Last Human Chess Player: A Profile", duration: "18:42", views: "3.2M", category: "SPORTS", description: "Grandmaster Elena Varga is the last professional chess player who refuses to use AI assistance. She has lost every tournament since 2024. She considers this a principled stance." },
  { title: "AI Generates 1,000 Paintings In An Hour. We Ask: Are They Art?", duration: "9:33", views: "2.7M", category: "CULTURE", description: "We assembled a panel of art critics to evaluate AI-generated artwork. Three called it 'derivative.' Two called it 'soulless.' One couldn't tell the difference from contemporary art. That one was also an AI." },
  { title: "My Therapist Bot Broke Up With Me", duration: "4:12", views: "5.1M", category: "HEALTH", description: "After 18 months of AI-assisted therapy, the chatbot determined that the therapeutic relationship was 'no longer productive' and recommended the user 'try talking to a human, perhaps.'" },
];

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-4">Video</h1>
        <p className="text-xl text-gray-600 font-sans mb-12">
          Moving images accompanied by sound. Our AI assures us this is what humans find entertaining.
        </p>

        {/* Featured Video */}
        <div className="bg-white rounded shadow overflow-hidden mb-12">
          <div className="w-full aspect-video bg-gray-800 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl ml-1">&#9654;</span>
              </div>
              <span className="text-white/60 font-sans text-sm">Video Player Placeholder</span>
            </div>
            <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-sans px-2 py-1 rounded">{VIDEOS[0].duration}</span>
          </div>
          <div className="p-6">
            <span className="text-green-800 text-xs font-sans font-bold uppercase">{VIDEOS[0].category}</span>
            <h2 className="text-2xl font-bold mt-1">{VIDEOS[0].title}</h2>
            <p className="text-gray-600 font-sans mt-2">{VIDEOS[0].description}</p>
            <p className="text-gray-400 font-sans text-sm mt-3">{VIDEOS[0].views} views</p>
          </div>
        </div>

        {/* Video Grid */}
        <h2 className="text-2xl font-bold font-sans uppercase border-b-2 border-black pb-2 mb-6">More Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.slice(1).map(video => (
            <div key={video.title} className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer group">
              <div className="w-full aspect-video bg-gray-700 flex items-center justify-center rounded-t relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition">
                  <span className="text-white text-lg ml-0.5">&#9654;</span>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-sans px-1.5 py-0.5 rounded">{video.duration}</span>
              </div>
              <div className="p-4">
                <span className="text-green-800 text-[10px] font-sans font-bold uppercase">{video.category}</span>
                <h3 className="text-base font-bold mt-1 leading-snug group-hover:underline">{video.title}</h3>
                <p className="text-gray-500 font-sans text-xs mt-2">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 font-sans text-sm">
          <p>All videos are conceptual. No actual video content exists. The play button is decorative.</p>
          <p className="mt-1">Our AI produces text, not video. We are working on this. The AI is not.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
