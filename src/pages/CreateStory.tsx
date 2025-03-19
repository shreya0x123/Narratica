import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { PenLine, Upload, Lightbulb, Sparkles, X } from "lucide-react";

const categories = [
  "Fantasy",
  "Mystery",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Adventure",
  "Historical",
  "Thriller",
  "Comedy",
  "Drama",
];

const CreateStory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [firstContribution, setFirstContribution] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const getSuggestion = () => {
    const suggestions = [
      "In a world where dreams manifested as tangible objects, seventeen-year-old Elara discovered she could manipulate the fabric of reality itself.",
      "The ancient library stood at the edge of town, its doors sealed for centuries until a mysterious key appeared on my doorstep one foggy morning.",
      "When the stars began disappearing one by one, astronomers were baffled, but the truth lay hidden in an obscure prophecy written in a language long forgotten.",
      "The mirror showed not my reflection, but a version of myself from another timeline, desperately trying to communicate a warning.",
      "In the aftermath of the Great Divide, humanity split into two distinct societies: those who embraced the technological singularity, and those who retreated to the old ways.",
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    if (title === "") {
      setTitle(randomSuggestion.split(",")[0]);
    }
    
    setFirstContribution(randomSuggestion);
    toast.success("Creative suggestion applied!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    if (!firstContribution.trim()) {
      toast.error("Please enter the first part of your story");
      return;
    }
    
    if (!coverImage && !coverPreview) {
      toast.error("Please upload a cover image");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      setTimeout(() => {
        toast.success("Your story has been created successfully!");
        navigate("/story/1");
      }, 1500);
    } catch (error) {
      console.error("Error creating story:", error);
      toast.error("Failed to create your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl pt-10">
          <div className="mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3">
              <PenLine className="h-8 w-8 text-primary" />
              Create a New Story
            </h1>
            <p className="text-xl text-muted-foreground">
              Start a collaborative journey by setting up your story for others to join.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a captivating title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="h-12">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cover-image">Cover Image</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                      id="cover-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload cover image"
                    />
                    
                    {coverPreview ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <img
                          src={coverPreview}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCoverImage(null);
                            setCoverPreview(null);
                          }}
                          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full text-gray-700 hover:text-red-500 transition-colors"
                          aria-label="Remove image"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">
                          Drag and drop or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG or GIF, max 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="first-contribution">Begin Your Story</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs text-muted-foreground hover:text-primary"
                      onClick={getSuggestion}
                    >
                      <Lightbulb className="h-3.5 w-3.5" /> Get inspiration
                    </Button>
                  </div>
                  <Textarea
                    id="first-contribution"
                    placeholder="Once upon a time..."
                    value={firstContribution}
                    onChange={(e) => setFirstContribution(e.target.value)}
                    className="min-h-[260px] resize-y text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Write the first paragraph of your story to set the scene and tone.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-blue-100 text-primary flex-shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 mb-1">
                        Tips for a Great Story Start
                      </h4>
                      <ul className="text-xs text-blue-600/80 space-y-1">
                        <li>• Set an intriguing scene or introduce a compelling character</li>
                        <li>• Create a sense of mystery or pose an interesting question</li>
                        <li>• Establish the tone and mood for the collaborative narrative</li>
                        <li>• Leave openings for others to continue the story</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Story..." : "Create Story"}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-xl font-bold text-primary">
                Creatopia
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
            <p>© {new Date().getFullYear()} Creatopia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateStory;
