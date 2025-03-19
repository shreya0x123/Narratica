
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import ContributionForm from "@/components/ContributionForm";
import { BookOpen, ChevronLeft, Calendar, User, Clock, Users } from "lucide-react";

const YourComponent = () => {
  return (
    <Link 
      to="/stories" 
      className="flex items-center gap-2 rounded-full px-6 py-2 bg-primary text-white font-medium transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] text-sm md:text-base"
    >
      <BookOpen size={20} /> {/* Icon */}
      Explore Stories
    </Link>
  );
};

export { YourComponent };


interface Contribution {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

// Mock story data
const getMockStory = (id: string) => ({
  id,
  title: "The Chronicles of Eldoria",
  category: "Fantasy",
  coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFudGFzeSUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
  createdAt: "May 15, 2023",
  contributors: 12,
  lastUpdated: "2 days ago",
  contributions: [
    {
      id: "c1",
      content: "In the mystical land of Eldoria, where ancient magic flowed through every blade of grass and whispered in the rustling leaves, there stood a forgotten tower. The Tower of Whispers, as locals called it, had remained sealed for centuries, its secrets guarded by enchantments older than the kingdom itself.",
      author: {
        name: "Elena Nightshade",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
      },
      createdAt: "May 15, 2023",
    },
    {
      id: "c2",
      content: "Lyra, a young scholar with an insatiable curiosity for the arcane, had spent years studying the tower from afar. Her research suggested that within its walls lay the Codex of Origins, a text said to contain the true history of how magic came to Eldoria. As winter gave way to spring, she finally gathered the courage to venture closer, drawn by the tower's silent call.",
      author: {
        name: "Thorne Blackwood",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
      },
      createdAt: "May 18, 2023",
    },
    {
      id: "c3",
      content: "The tower stood at the edge of the Whispering Woods, a place locals avoided after sunset. As Lyra approached, she noticed something peculiar: the usual cacophony of forest sounds—chirping birds, rustling leaves, distant animal calls—had fallen silent. The air felt heavy, charged with anticipation, as if the very elements were holding their breath.\n\nAt the base of the tower, ancient runes carved into stone pulsed with a faint blue light. Lyra's heart raced as she recognized the symbols from her studies—they spoke of guardians and trials, of wisdom granted only to the worthy. As she reached out to trace a finger along the cool stone, the runes flared brilliantly, and a voice like the wind itself whispered, \"Seeker of knowledge, are you prepared to face what lies within?\"",
      author: {
        name: "Aria Moonshadow",
      },
      createdAt: "May 25, 2023",
    },
  ],
});

const Story = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<ReturnType<typeof getMockStory> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const storyData = getMockStory(id);
      setStory(storyData);
      setContributions(storyData.contributions);
      
      // Simulate loading
      setTimeout(() => setIsLoaded(true), 500);
    }
  }, [id]);

  const handleNewContribution = (content: string) => {
    const newContribution: Contribution = {
      id: `c${contributions.length + 1}`,
      content,
      author: {
        name: "You", // In a real app, this would be the current user
      },
      createdAt: "Just now",
    };
    
    setContributions([...contributions, newContribution]);
  };

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BookOpen className="h-12 w-12 text-primary mb-4" />
          <p className="text-muted-foreground">Loading story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
            <div 
              className={`absolute inset-0 bg-gray-200 ${
                isLoaded ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500`}
            />
            <img
              src={story.coverImage}
              alt={story.title}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 -mt-32 md:-mt-40">
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 animate-slide-up">
              <div className="mb-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-muted-foreground" 
                    asChild
                  >
                    <Link to="/stories">
                      <ChevronLeft className="h-4 w-4" /> Back to stories
                    </Link>
                  </Button>
                  
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {story.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{story.title}</h1>
                
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Started on {story.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{story.contributors} contributors</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Updated {story.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Story Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-semibold mb-6">The Story So Far</h2>
                  
                  {contributions.map((contribution, index) => (
                    <div 
                      key={contribution.id} 
                      className={`mb-10 pb-10 ${
                        index < contributions.length - 1 ? "border-b border-gray-100" : ""
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          {contribution.author.avatar ? (
                            <AvatarImage src={contribution.author.avatar} />
                          ) : null}
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contribution.author.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="font-medium">{contribution.author.name}</div>
                          <div className="text-sm text-muted-foreground">{contribution.createdAt}</div>
                        </div>
                      </div>
                      
                      <div className="text-foreground leading-relaxed whitespace-pre-line">
                        {contribution.content}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-10" />
                
                <ContributionForm 
                  storyId={story.id} 
                  onContribute={handleNewContribution} 
                />
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24 animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4">About This Story</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Contributors</h4>
                      <div className="flex -space-x-2 overflow-hidden">
                        <Avatar className="border-2 border-background">
                          <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" />
                          <AvatarFallback>EN</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww" />
                          <AvatarFallback>TB</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback className="bg-primary/10 text-primary">AM</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarFallback className="bg-gray-200 text-gray-600">+{story.contributors - 3}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Story Rules</h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
                          <span>Contributions should continue the story coherently.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
                          <span>Be respectful of others' contributions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
                          <span>Aim for contributions between 50-300 words.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Related Stories</h4>
                      <div className="space-y-3">
                        <Link to="/story/2" className="block group">
                          <div className="text-sm font-medium group-hover:text-primary transition-colors story-link">Whispers in the Dark</div>
                          <div className="text-xs text-muted-foreground">Mystery • 8 contributors</div>
                        </Link>
                        <Link to="/story/3" className="block group">
                          <div className="text-sm font-medium group-hover:text-primary transition-colors story-link">Beyond the Stars</div>
                          <div className="text-xs text-muted-foreground">Sci-Fi • 15 contributors</div>
                        </Link>
                      </div>
                    </div>
                  </div>
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

export default Story;
