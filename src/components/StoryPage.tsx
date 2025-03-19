import { useParams } from "react-router-dom";

const stories = {
  fantasy: {
    title: "The Enchanted Forest",
    content:
      "Once upon a time in a magical forest, a young elf discovered an ancient artifact...",
  },
  mystery: {
    title: "The Vanishing Key",
    content:
      "Detective Morris was baffled—every clue led to a dead end, but the missing key held the answer...",
  },
  "sci-fi": {
    title: "Beyond the Stars",
    content:
      "Captain Vega embarked on a journey beyond the known universe, where time itself unraveled...",
  },
  romance: {
    title: "A Love Beyond Time",
    content:
      "Elara and Theo were separated by centuries, yet fate wove their love through the fabric of time...",
  },
  horror: {
    title: "The Whispering Shadows",
    content:
      "Every night, the old manor whispered secrets—until one fateful evening, someone whispered back...",
  },
  adventure: {
    title: "Quest for the Lost Relic",
    content:
      "An ancient map, a treacherous jungle, and a relic lost to time—Adrian's greatest adventure awaited...",
  },
};

const StoryPage = () => {
  const { category } = useParams();
  const story = stories[category];

  if (!story) {
    return <h2 className="text-center text-xl mt-10">Story not found.</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary">{story.title}</h1>
      <p className="mt-4 text-lg">{story.content}</p>
    </div>
  );
};

export default StoryPage;
