
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BookOpen, Users, Calendar } from "lucide-react";

export interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
  contributors: number;
  category: string;
  createdAt: string;
  lastUpdated: string;
}

const StoryCard = ({
  id,
  title,
  excerpt,
  cover,
  contributors,
  category,
  createdAt,
  lastUpdated,
}: StoryCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/story/${id}`}>
      <Card className="overflow-hidden h-full hover-scale">
        <div className="relative aspect-video w-full overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gray-200 ${
              isLoaded ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
          />
          <img
            src={cover}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute top-2 left-2">
            <Badge className="text-xs font-semibold bg-primary/90 text-white">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="text-xl font-medium line-clamp-1">{title}</h3>
        </CardHeader>
        
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground pt-0">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{contributors} contributors</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>Updated {lastUpdated}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default StoryCard;
