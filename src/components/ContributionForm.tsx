
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SendHorizonal, Lightbulb } from "lucide-react";

interface ContributionFormProps {
  storyId: string;
  onContribute: (contribution: string) => void;
}

const ContributionForm = ({ storyId, onContribute }: ContributionFormProps) => {
  const [contribution, setContribution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contribution.trim()) {
      toast.error("Please enter your contribution");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this to your API
      // await submitContribution(storyId, contribution);
      
      onContribute(contribution);
      setContribution("");
      toast.success("Your contribution has been added to the story!");
    } catch (error) {
      console.error("Error submitting contribution:", error);
      toast.error("Failed to submit your contribution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSuggestion = async () => {
    setIsSuggesting(true);
    
    try {
      // Mock AI suggestion - in a real app, this would call an AI API
      setTimeout(() => {
        const suggestions = [
          "The mysterious door creaked open, revealing a staircase that spiraled into darkness.",
          "Suddenly, a flash of light illuminated the sky, and everyone froze in disbelief.",
          "As they reached the clearing, they discovered an ancient artifact that seemed to pulse with energy.",
          "The character's eyes widened as they realized the truth behind the enigmatic message.",
          "A soft melody drifted through the air, somehow familiar yet impossible to place."
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        setContribution(currentValue => currentValue ? `${currentValue}\n\n${randomSuggestion}` : randomSuggestion);
        toast.success("Creative suggestion added!");
      }, 1000);
    } catch (error) {
      toast.error("Failed to get a suggestion. Please try again.");
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Continue the story</h3>
        <p className="text-sm text-muted-foreground">
          Add your creative contribution to help develop this collaborative story.
        </p>
      </div>
      
      <div className="relative">
        <Textarea
          placeholder="Once upon a time..."
          className="min-h-32 p-4 resize-y text-base"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="absolute top-2 right-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={getSuggestion}
            disabled={isSuggesting || isSubmitting}
            title="Get a creative suggestion"
          >
            <Lightbulb size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="gap-2 rounded-full px-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
          disabled={isSubmitting || !contribution.trim()}
        >
          {isSubmitting ? "Submitting..." : "Contribute"} 
          <SendHorizonal size={16} />
        </Button>
      </div>
    </form>
  );
};

export default ContributionForm;
