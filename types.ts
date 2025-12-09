
export interface VideoRecommendation {
  id?: string;
  title: string;
  channelName: string;
  youtubeQuery: string;
  thumbnailUrl?: string; // URL for visual appeal
  duration?: string;
  topic?: string;
  ageRange?: string;
}

export interface Activity {
  id: string; // Made required for routing
  title: string;
  subtitle?: string; // Short engaging description
  description: string;
  materials: string[];
  timeEstimate: string;
  ageRange: string;
  topic?: string;
  category?: string; // For grouping (e.g., "Kitchen Science")
  relatedQuestionId?: string;
  icon?: string; // Emoji or icon name
  imageUrl?: string; // URL for banner image
  
  // New Detailed Fields
  curiositySpark?: string; // A hook/question
  steps?: string[]; // Instruction steps
  prompts?: string[]; // Talk while you explore
  messLevel?: string; // Low, Medium, High
  skills?: string[]; // e.g. "Observation", "Fine Motor"
  parentContext?: string; // "Why this matters"
  extensions?: string[]; // "Try next time"
  videoUrl?: string; // Optional embedded video
}

export interface QuestionData {
  id: string;
  questionText: string;
  explanation: string;
  ageRange: string;
  topic: string;
  takeaways: string[];
  videos: VideoRecommendation[];
  activities: Activity[];
  relatedQuestions: string[];
}

export interface ActivityCollection {
  title: string;
  description: string;
  activities: Activity[];
}

export interface FilterState {
  age: string;
  topic: string;
  time: string;
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  tags: string[]; // Maps to data topics (e.g., ["Nature", "Animals"])
}
