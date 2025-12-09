
import { QuestionData, Activity, ActivityCollection, VideoRecommendation, CategoryDefinition } from "./types";
import natureAnimalsIcon from './assets/theme-icons/nature-animals.svg';
import spaceWeatherIcon from './assets/theme-icons/space-weather.svg';
import everydayScienceIcon from './assets/theme-icons/everyday-science.svg';
import feelingsFamiliesIcon from './assets/theme-icons/feelings-families.svg';
import howWorldWorksIcon from './assets/theme-icons/how-world-works.svg';
import culturePeopleIcon from './assets/theme-icons/culture-people.svg';

export const TRUSTED_CHANNELS = [
  "SciShow Kids",
  "Nat Geo Kids",
  "Peekaboo Kidz",
  "StoryBots",
  "TED-Ed",
  "Kurzgesagt – In a Nutshell",
  "Crash Course Kids",
  "MinutePhysics",
  "It's Okay To Be Smart",
  "Science Max"
];

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "nature-animals",
    name: "Nature & Animals",
    description: "Explore the living world—from tiny insects to giant ocean creatures. Learn how animals survive, how plants grow, and how different habitats work together.",
    emoji: "🌿",
    icon: natureAnimalsIcon,
    color: "bg-green-100 text-green-700",
    tags: ["Nature", "Animals", "Insects", "Oceans", "Plants"]
  },
  {
    id: "space-weather",
    name: "Space & Weather",
    description: "Discover what’s happening above us. From the sun and moon to rainstorms and rainbows, kids learn how space and weather shape our world every day.",
    emoji: "🌌",
    icon: spaceWeatherIcon,
    color: "bg-indigo-100 text-indigo-700",
    tags: ["Space", "Weather", "Planets", "Stars"]
  },
  {
    id: "everyday-science",
    name: "Everyday Science",
    description: "Hands-on science kids can see, touch, and try at home. Simple experiments and explanations about how things move, mix, float, and change.",
    emoji: "🔍",
    icon: everydayScienceIcon,
    color: "bg-blue-100 text-blue-700",
    tags: ["Science", "Kitchen Science", "Physics", "Chemistry"]
  },
  {
    id: "feelings-families",
    name: "Feelings & Families",
    description: "Help kids understand themselves and the people they love. Explore emotions, body awareness, and the ways families communicate and grow.",
    emoji: "💛",
    icon: feelingsFamiliesIcon,
    color: "bg-yellow-100 text-yellow-700",
    tags: ["Human Body", "Social", "Feelings", "Health"]
  },
  {
    id: "world-works",
    name: "How the World Works",
    description: "For curious kids who love machines, vehicles, and building. Learn how everyday things around us work—from bridges and airplanes to jobs people do.",
    emoji: "🛠️",
    icon: howWorldWorksIcon,
    color: "bg-slate-200 text-slate-700",
    tags: ["Engineering", "How Things Work", "Technology", "Vehicles"]
  },
  {
    id: "culture-people",
    name: "Culture & People",
    description: "See how people live around the world. Explore countries, cities, traditions, celebrations, and the many ways communities create meaning.",
    emoji: "🌍",
    icon: culturePeopleIcon,
    color: "bg-rose-100 text-rose-700",
    tags: ["History", "Culture", "People", "Places"]
  }
];

export const TOPICS = CATEGORIES.map(c => c.name);

export const ACTIVITY_CATEGORIES = [
  "All",
  "Nature",
  "Space",
  "Kitchen Science",
  "Light & Color",
  "Weather",
  "Engineering",
  "Quiet Time",
  "Outdoor"
];

export const FILTER_AGES = ["All", "3-5", "5-7", "7-9"];
export const FILTER_TIMES = ["All", "5-10 min", "10-20 min", "20+ min"];

export const POPULAR_QUESTION_PILLS = [
  "Why is the sky blue?",
  "Why do birds fly?",
  "Why do we sleep?",
  "Why do cats purr?",
  "What is a black hole?"
];

export const DISCOVERY_TILES = [
  { title: "Dinosaurs", color: "bg-orange-100 text-orange-700", emoji: "🦖" },
  { title: "Oceans", color: "bg-blue-100 text-blue-700", emoji: "🐙" },
  { title: "Robots", color: "bg-slate-200 text-slate-700", emoji: "🤖" },
  { title: "Insects", color: "bg-green-100 text-green-700", emoji: "🐞" },
  { title: "Volcanoes", color: "bg-red-100 text-red-700", emoji: "🌋" },
  { title: "Weather", color: "bg-sky-100 text-sky-700", emoji: "⛈️" },
];

// Richer Activity Data
export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: "milk-sunset",
    title: "Milk Sunset",
    subtitle: "Make your own sunset in a glass!",
    description: "See how light scatters using a glass of water, a splash of milk, and a flashlight. This simple experiment shows why the sky is blue and sunsets are red.",
    materials: ["Clear drinking glass", "Water", "Milk (1 teaspoon)", "Flashlight (phone works too)", "Spoon for stirring"],
    timeEstimate: "15-30 mins",
    ageRange: "5-9",
    topic: "Science",
    category: "Kitchen Science",
    icon: "🥛",
    relatedQuestionId: "sky-blue",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop",
    messLevel: "Low",
    skills: ["Observation", "Critical Thinking", "Light Physics"],
    curiositySpark: "Have you ever wondered why the sky changes colors? Let's rebuild the atmosphere in a glass!",
    steps: [
        "Fill a clear glass about 3/4 full with water.",
        "Turn off the room lights and shine your flashlight through the side of the glass. The water looks clear.",
        "Add one teaspoon of milk to the water and stir it gently.",
        "Shine the light through the side again. Look at the water from the side—it should look slightly blue!",
        "Now move the flashlight to the back of the glass and look through the front (so the light is coming towards you).",
        "The light should turn orange or red, just like a sunset!"
    ],
    prompts: [
        "What color did the water turn when we first added milk?",
        "Why do you think the light changes color when it goes through the milky water?",
        "Does the light look different if we add even more milk?"
    ],
    parentContext: "This experiment demonstrates Rayleigh scattering. The tiny milk particles scatter blue light waves sideways (making the water look blue from the side), but let the longer red/orange waves pass straight through (creating the sunset look). This is exactly what air molecules do to sunlight!",
    extensions: [
        "Try using skim milk vs whole milk to see if fat content matters.",
        "Try this with a square container vs a round glass."
    ]
  },
  {
    id: "shadow-hunt",
    title: "Shadow Hunt",
    subtitle: "Catch shadows in your backyard.",
    description: "Go outside and trace shadows with chalk at different times of the day to see how the sun moves.",
    materials: ["Sidewalk chalk", "A sunny day", "A toy dinosaur or action figure", "Pavement or driveway"],
    timeEstimate: "30+ mins",
    ageRange: "3-5",
    topic: "Nature",
    category: "Outdoor",
    icon: "👤",
    relatedQuestionId: "day-night",
    imageUrl: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=600&auto=format&fit=crop",
    messLevel: "Low",
    skills: ["Tracing", "Time Awareness", "Nature Observation"],
    curiositySpark: "Can you catch a shadow? Do shadows stay in one place, or do they move?",
    steps: [
        "Find a sunny spot on the pavement.",
        "Place your toy on the ground.",
        "Use chalk to trace the toy's shadow.",
        "Wait 2 hours (play, eat lunch, or read a book).",
        "Come back and look at the shadow. Did it move?",
        "Trace the new shadow with a different color chalk."
    ],
    prompts: [
        "Why do you think the shadow moved?",
        "Is the shadow longer or shorter than before?",
        "Where is the sun in the sky right now?"
    ],
    parentContext: "This activity helps children understand the rotation of the Earth. While it looks like the sun is moving across the sky, it's actually the Earth spinning!",
    extensions: [
        "Trace your own shadow!",
        "Try to make shadow puppets with your hands."
    ]
  },
  {
    id: "tornado-jar",
    title: "Tornado in a Jar",
    subtitle: "Spin a storm safely at home.",
    description: "Create a vortex using water, dish soap, and glitter to visualize how tornadoes move.",
    materials: ["Mason jar with lid", "Water", "Dish soap (clear is best)", "Glitter (optional)", "Vinegar (optional, keeps bubbles down)"],
    timeEstimate: "5-10 mins",
    ageRange: "5-7",
    topic: "Weather",
    category: "Kitchen Science",
    icon: "🌪️",
    relatedQuestionId: "tornadoes",
    imageUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=600&auto=format&fit=crop",
    messLevel: "Low",
    skills: ["Motor Skills", "Pattern Recognition"],
    curiositySpark: "Tornadoes are powerful storms. Let's see if we can capture that spinning power in a jar!",
    steps: [
        "Fill the jar about 3/4 full with water.",
        "Add one drop of dish soap.",
        "Sprinkle in some glitter (this represents debris).",
        "Screw the lid on very tight.",
        "Spin the jar in a circular motion (like you're drawing a circle on the table) quickly.",
        "Stop spinning and watch the vortex form!"
    ],
    prompts: [
        "What shape does the water make?",
        "How long does the tornado last?",
        "What happens to the glitter?"
    ],
    parentContext: "The spinning motion creates a vortex. Centripetal force pulls the water toward the center, creating the funnel shape, just like in a real tornado.",
    extensions: [
        "Try adding food coloring.",
        "Put a small plastic bead inside to see it get caught in the funnel."
    ]
  },
  {
    id: "leaf-rubbing",
    title: "Leaf Rubbing Art",
    subtitle: "Reveal hidden nature patterns.",
    description: "Create art by rubbing crayons over leaves placed under paper.",
    materials: ["Fresh fallen leaves (various shapes)", "White paper", "Crayons (peeled works best)"],
    timeEstimate: "5-10 mins",
    ageRange: "3-5",
    topic: "Nature",
    category: "Nature",
    icon: "🍂",
    relatedQuestionId: "leaves-color",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=600&auto=format&fit=crop",
    messLevel: "Low",
    skills: ["Fine Motor Skills", "Artistic Expression", "Botany"],
    curiositySpark: "Leaves feel smooth, but they have secret bumps and veins. Let's use magic (crayons) to find them!",
    steps: [
        "Go on a nature walk and collect different leaves.",
        "Place a leaf on a flat table, bumpy side UP.",
        "Put a piece of paper on top of the leaf.",
        "Turn a crayon on its side and rub gently over the paper where the leaf is.",
        "Watch the leaf's pattern appear like magic!"
    ],
    prompts: [
        "Can you see the lines (veins) in the leaf?",
        "Why do leaves have those lines?",
        "Which leaf made the coolest pattern?"
    ],
    parentContext: "The veins in a leaf are like tiny pipes that carry water and food. Rubbing highlights these structures, helping kids pay attention to biological details they might overlook.",
    extensions: [
        "Cut out the leaf shapes and make a collage.",
        "Try using different colors for different leaves."
    ]
  },
  {
    id: "balloon-rocket",
    title: "Balloon Rocket",
    subtitle: "Zoom across the room!",
    description: "Learn about thrust with a balloon, string, and straw.",
    materials: ["Balloon", "Long piece of string (10ft+)", "Plastic straw", "Tape", "Two chairs"],
    timeEstimate: "15-30 mins",
    ageRange: "7-9",
    topic: "Science",
    category: "Engineering",
    icon: "🚀",
    relatedQuestionId: "airplanes",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
    messLevel: "Low",
    skills: ["Engineering", "Measurement", "Physics"],
    curiositySpark: "How do rockets fly into space? They push gas backward to go forward!",
    steps: [
        "Tie one end of the string to a chair.",
        "Thread the other end of the string through the straw.",
        "Pull the string tight and tie it to another chair across the room.",
        "Blow up the balloon but don't tie it! Pinch the end.",
        "Tape the balloon to the straw.",
        "Let go and watch it zoom!"
    ],
    prompts: [
        "What pushes the balloon forward?",
        "What happens if we blow more air into the balloon?",
        "Does it go faster if we angle the string up or down?"
    ],
    parentContext: "This is Newton's Third Law of Motion: For every action, there is an equal and opposite reaction. The air rushing out backward pushes the balloon forward.",
    extensions: [
        "Race two balloons side-by-side.",
        "Tape a penny to the balloon to see if weight slows it down."
    ]
  }
];

export const FEATURED_QUESTIONS: QuestionData[] = [
  {
    id: "sky-blue",
    questionText: "Why is the sky blue?",
    explanation: "Sunlight looks white, but it is actually made of all the colors of the rainbow mixed together. When sunlight hits the air around Earth, the blue color bumps into gas molecules and scatters everywhere. That scattered blue light is what we see when we look up!",
    ageRange: "4-7",
    topic: "Science",
    takeaways: [
      "Sunlight is a mix of all rainbow colors.",
      "Air scatters blue light more than red or yellow.",
      "We see the scattered blue light as the sky."
    ],
    videos: [
      { 
        title: "Why Is The Sky Blue?", 
        channelName: "StoryBots", 
        youtubeQuery: "StoryBots Why Is The Sky Blue",
        thumbnailUrl: "https://images.unsplash.com/photo-1595878202359-994364028682?q=80&w=600&auto=format&fit=crop",
        duration: "2:15",
        topic: "Science",
        ageRange: "3-5"
      },
      { 
        title: "Why is the Sky Blue?", 
        channelName: "SciShow Kids", 
        youtubeQuery: "SciShow Kids Why is the Sky Blue",
        thumbnailUrl: "https://images.unsplash.com/photo-1534234057913-c9769dae27f4?q=80&w=600&auto=format&fit=crop",
        duration: "3:40",
        topic: "Science",
        ageRange: "5-7"
      }
    ],
    activities: [SAMPLE_ACTIVITIES[0]], // Milk Sunset
    relatedQuestions: ["Why is the sunset red?", "Why are clouds white?"]
  },
  {
    id: "leaves-color",
    questionText: "Why do leaves change color?",
    explanation: "Leaves have a special green stuff called chlorophyll that helps them make food from sunlight. In the fall, when days get shorter and colder, trees stop making food. The green color fades away, letting the yellow, orange, and red colors that were hiding underneath show through!",
    ageRange: "5-8",
    topic: "Nature",
    takeaways: [
      "Chlorophyll makes leaves green.",
      "Trees stop making food in autumn.",
      "Hidden colors reveal themselves when green fades."
    ],
    videos: [
      { 
        title: "Why Do Leaves Change Color?", 
        channelName: "SciShow Kids", 
        youtubeQuery: "SciShow Kids Why Do Leaves Change Color",
        thumbnailUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=600&auto=format&fit=crop",
        duration: "4:10",
        topic: "Nature",
        ageRange: "5-7"
      },
      { 
        title: "Autumn Leaves", 
        channelName: "Nat Geo Kids", 
        youtubeQuery: "Nat Geo Kids Autumn Leaves",
        thumbnailUrl: "https://images.unsplash.com/photo-1507371341162-763b5e419408?q=80&w=600&auto=format&fit=crop",
        duration: "2:55",
        topic: "Nature",
        ageRange: "5-9"
      }
    ],
    activities: [SAMPLE_ACTIVITIES[3]], // Leaf Rubbing
    relatedQuestions: ["Why do trees lose their leaves?", "How do trees drink water?"]
  }
];

export const SAMPLE_QUESTIONS: QuestionData[] = [
    ...FEATURED_QUESTIONS,
    {
        id: "fireflies-glow",
        questionText: "Why do fireflies glow?",
        explanation: "Fireflies have a tiny light bulb inside their tails! It's actually a chemical reaction called bioluminescence. They mix oxygen with special chemicals to create light without heat. They use these flashes to talk to each other and find friends in the dark.",
        ageRange: "4-8",
        topic: "Nature",
        takeaways: [
            "It's a chemical reaction called bioluminescence.",
            "They use light to talk to other fireflies.",
            "The light is cold, not hot like a lightbulb."
        ],
        videos: [],
        activities: [],
        relatedQuestions: ["How do glow sticks work?", "Why do some fish glow?"]
    },
    {
        id: "cats-purr",
        questionText: "Why do cats purr?",
        explanation: "Cats purr by vibrating the muscles in their voice box very quickly. They usually purr when they are happy and relaxed, but sometimes they do it to comfort themselves when they are hurt. It's like a self-healing hum!",
        ageRange: "3-7",
        topic: "Animals",
        takeaways: [
            "Purring comes from vibrating voice box muscles.",
            "Cats purr when happy or to calm down.",
            "It might help their bones heal."
        ],
        videos: [],
        activities: [],
        relatedQuestions: ["Why do dogs wag tails?", "Why do cats have whiskers?"]
    },
    {
        id: "birds-fly",
        questionText: "How do birds fly?",
        explanation: "Birds have specially shaped wings that are curved on top and flat on the bottom. When they flap, air moves faster over the top, creating a suction force called 'lift' that pulls them up. Their bones are also hollow and super light!",
        ageRange: "5-9",
        topic: "Animals",
        takeaways: [
            "Wings are curved to create lift.",
            "Hollow bones make them light.",
            "Strong chest muscles help them flap."
        ],
        videos: [],
        activities: [SAMPLE_ACTIVITIES[4]],
        relatedQuestions: ["How do airplanes fly?", "Why can't penguins fly?"]
    },
    {
        id: "volcanoes-erupt",
        questionText: "Why do volcanoes erupt?",
        explanation: "Deep inside the Earth, it is so hot that rock turns into a thick liquid called magma. When pressure builds up from gas bubbles, the magma pushes up through cracks in the ground and explodes out as lava. It's like shaking a soda bottle!",
        ageRange: "6-9",
        topic: "Science",
        takeaways: [
            "Magma is melted rock underground.",
            "Pressure from gas causes the eruption.",
            "Lava is magma that comes out."
        ],
        videos: [],
        activities: [SAMPLE_ACTIVITIES[2]],
        relatedQuestions: ["What is the Earth made of?", "Where does lava come from?"]
    }
];

export const TRUSTED_VIDEOS_FEED: VideoRecommendation[] = [
  { 
    title: "How Do Black Holes Work?", 
    channelName: "StoryBots", 
    youtubeQuery: "StoryBots Black Holes", 
    duration: "3:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop",
    topic: "Space",
    ageRange: "5-7"
  },
  { 
    title: "The Science of Macaroni Salad", 
    channelName: "SciShow Kids", 
    youtubeQuery: "SciShow Kids Macaroni", 
    duration: "4:12",
    thumbnailUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    topic: "Science",
    ageRange: "3-5"
  },
  { 
    title: "Why Do We Have Tears?", 
    channelName: "Peekaboo Kidz", 
    youtubeQuery: "Peekaboo Kidz Tears", 
    duration: "5:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=800&auto=format&fit=crop",
    topic: "Human Body",
    ageRange: "5-9"
  },
  { 
    title: "How Volcanoes Erupt", 
    channelName: "Nat Geo Kids", 
    youtubeQuery: "Nat Geo Kids Volcano", 
    duration: "2:50",
    thumbnailUrl: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=800&auto=format&fit=crop",
    topic: "Nature",
    ageRange: "7-9"
  }
];

// Extended list for the Library Page
export const SAMPLE_VIDEOS: VideoRecommendation[] = [
  ...TRUSTED_VIDEOS_FEED,
  {
    title: "Solar System Song",
    channelName: "StoryBots",
    youtubeQuery: "StoryBots Solar System",
    duration: "1:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    topic: "Space",
    ageRange: "3-5"
  },
  {
    title: "Germs for Kids",
    channelName: "SciShow Kids",
    youtubeQuery: "SciShow Kids Germs",
    duration: "3:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1584036561566-b4522f58db26?q=80&w=800&auto=format&fit=crop",
    topic: "Human Body",
    ageRange: "5-7"
  },
  {
    title: "Photosynthesis for Kids",
    channelName: "Peekaboo Kidz",
    youtubeQuery: "Peekaboo Kidz Photosynthesis",
    duration: "4:50",
    thumbnailUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
    topic: "Nature",
    ageRange: "7-9"
  },
  {
    title: "Gravity Compilation",
    channelName: "Crash Course Kids",
    youtubeQuery: "Crash Course Kids Gravity",
    duration: "6:20",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    topic: "Science",
    ageRange: "7-9"
  },
  {
    title: "What is Engineering?",
    channelName: "Nat Geo Kids",
    youtubeQuery: "Nat Geo Kids Engineering",
    duration: "3:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    topic: "Engineering",
    ageRange: "7-9"
  },
  {
    title: "Why Do We Dream?",
    channelName: "It's Okay To Be Smart",
    youtubeQuery: "It's Okay To Be Smart Dreams",
    duration: "5:12",
    thumbnailUrl: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=800&auto=format&fit=crop",
    topic: "Human Body",
    ageRange: "7-9"
  },
  {
    title: "Ants!",
    channelName: "SciShow Kids",
    youtubeQuery: "SciShow Kids Ants",
    duration: "3:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1598516082260-264627d26dbb?q=80&w=800&auto=format&fit=crop",
    topic: "Animals",
    ageRange: "5-7"
  },
  {
    title: "Food Chains",
    channelName: "Crash Course Kids",
    youtubeQuery: "Crash Course Kids Food Chains",
    duration: "4:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=800&auto=format&fit=crop",
    topic: "Science",
    ageRange: "5-7"
  }
];

export const CURIOSITY_OF_THE_DAY = {
  question: "Why do fireflies glow?",
  fact: "They use a chemical reaction inside their bodies to talk to each other!",
  id: "fireflies-glow"
};

export const ACTIVITY_COLLECTIONS: ActivityCollection[] = [
  {
    title: "Quick 5-Minute Activities",
    description: "Perfect for busy afternoons.",
    activities: [SAMPLE_ACTIVITIES[2], SAMPLE_ACTIVITIES[3]] // Tornado, Leaf Rubbing
  },
  {
    title: "Weekend Mini Experiments",
    description: "Science fun for the whole family.",
    activities: [SAMPLE_ACTIVITIES[0], SAMPLE_ACTIVITIES[4]] // Milk Sunset, Balloon Rocket
  },
  {
    title: "Outdoor Exploration",
    description: "Get some fresh air and learn.",
    activities: [SAMPLE_ACTIVITIES[1]] // Shadow Hunt
  }
];
