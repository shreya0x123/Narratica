
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import StoryCard, { StoryCardProps } from "@/components/StoryCard";
import { ChevronRight, Sparkles, Pencil, Users, BookOpen } from "lucide-react";

// Mock data - in a real app, this would come from an API
const featuredStories: StoryCardProps[] = [
  {
    id: "1",
    title: "The Chronicles of Eldoria",
    excerpt: "A magical journey through a land of mythical creatures and ancient prophecies.",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFudGFzeSUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
    contributors: 12,
    category: "Fantasy",
    createdAt: "2023-05-15",
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    title: "Whispers in the Dark",
    excerpt: "A chilling tale of mystery and suspense set in a small coastal town.",
    cover: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXlzdGVyeXxlbnwwfHwwfHx8MA%3D%3D",
    contributors: 8,
    category: "Mystery",
    createdAt: "2023-06-20",
    lastUpdated: "5 days ago",
  },
  {
    id: "3",
    title: "Beyond the Stars",
    excerpt: "An epic space adventure that challenges the boundaries of human exploration.",
    cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2UlMjBzY2lmaXxlbnwwfHwwfHx8MA%3D%3D",
    contributors: 15,
    category: "Sci-Fi",
    createdAt: "2023-04-10",
    lastUpdated: "Yesterday",
  },
];

const categories = [
  { name: "Fantasy", count: 28 },
  { name: "Mystery", count: 22 },
  { name: "Sci-Fi", count: 19 },
  { name: "Romance", count: 24 },
  { name: "Horror", count: 15 },
  { name: "Adventure", count: 31 },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className={`max-w-3xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary font-medium text-sm">
                Collaborative Storytelling
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Create Stories <span className="text-primary">Together</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Join a community of storytellers and bring narratives to life through collective creativity. One contribution at a time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] group"
                  asChild
                >
                  <Link to="/create">
                    Start Creating <Pencil className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-md group"
                  asChild
                >
                  <Link to="/stories">
                    Explore Stories <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
        
        {/* Featured Stories Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="staggered-animation">
                <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary font-medium text-sm">
                  Featured Stories
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Community Favorites</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Explore the most captivating collaborative stories from our community.
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                className="mt-4 md:mt-0 group text-primary"
                asChild
              >
                <Link to="/stories">
                  View all stories <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStories.map((story) => (
                <div key={story.id} className="animate-scale-in">
                  <StoryCard {...story} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 staggered-animation">
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary font-medium text-sm">
                The Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Contribute to stories one paragraph at a time, or start your own. Our platform makes collaborative storytelling simple and engaging.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <Pencil size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Create or Join</h3>
                <p className="text-muted-foreground">
                  Start a new story with a prompt or join existing stories that spark your interest.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaborate</h3>
                <p className="text-muted-foreground">
                  Add your contribution to the narrative, building upon what others have written.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Watch It Grow</h3>
                <p className="text-muted-foreground">
                  See the story evolve as contributors add new twists, characters, and plot developments.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-24 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 staggered-animation">
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary font-medium text-sm">
                Explore
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Story Categories</h2>
              <p className="text-lg text-muted-foreground">
                Dive into diverse genres and find stories that match your creative interests.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/stories?category=${category.name}`}
                  className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary hover:text-white group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/80">
                    {category.count} stories
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl overflow-hidden">
              <div className="py-16 px-8 md:px-12 lg:px-16 relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
                </div>
                
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center justify-center mb-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1">
                    <Sparkles className="text-white h-4 w-4 mr-2" />
                    <span className="text-white text-sm font-medium">Unleash your creativity</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                    Ready to contribute to the next great story?
                  </h2>
                  
                  <p className="text-xl text-white/80 mb-8 leading-relaxed">
                    Join our community of storytellers and bring your imagination to life.
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                    asChild
                  >
                    <Link to="/create">
                      Start Your Story Journey
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-xl font-bold text-primary">
                Narratica
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Collaborative storytelling platform
              </p>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/stories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Stories
              </Link>
              <Link to="/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Create
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Narratica. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
