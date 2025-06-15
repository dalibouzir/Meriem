// questions.ts

export type Emotion =
  | 'Joy' | 'Sadness' | 'Anger' | 'Fear'
  | 'Disgust' | 'Trust' | 'Surprise' | 'Anticipation'
  | 'Shame' | 'Guilt' | 'Anxiety' | 'Grief'
  | 'Loneliness' | 'Numbness'
  | 'Contentment' | 'Pride' | 'Love' | 'Hope'
  | 'Contempt' | 'Jealousy' | 'Envy'
  | 'Overwhelm' | 'Exhaustion' | 'Arousal'
  | 'Betrayal' | 'Resentment' | 'Bittersweet' | 'Vulnerability';

export const emotions: Emotion[] = [
  'Joy','Sadness','Anger','Fear','Disgust','Trust','Surprise','Anticipation',
  'Shame','Guilt','Anxiety','Grief','Loneliness','Numbness',
  'Contentment','Pride','Love','Hope',
  'Contempt','Jealousy','Envy',
  'Overwhelm','Exhaustion','Arousal',
  'Betrayal','Resentment','Bittersweet','Vulnerability'
];

export type YesNoQ = { id: number; type: 'yesno'; q: string; mapping: Emotion };
export type ScaleQ = { id: number; type: 'scale'; q: string; mapping: Emotion; min: number; max: number };
export type OptQ = { id: number; type: 'options'; q: string; options: string[]; mapping: Record<string, Emotion> };
export type Question = YesNoQ | ScaleQ | OptQ;

export const questionPool: Question[] = [
  { id: 1, type: 'yesno', q: 'Did you feel joy today?', mapping: 'Joy' },
  { id: 2, type: 'scale', q: 'How much sadness did you feel today?', mapping: 'Sadness', min: 1, max: 5 },
  { id: 3, type: 'yesno', q: 'Did you feel angry at any moment today?', mapping: 'Anger' },
  { id: 4, type: 'scale', q: 'On a scale of 1 to 5, how intense was your fear today?', mapping: 'Fear', min: 1, max: 5 },
  { id: 5, type: 'yesno', q: 'Did you feel disgusted by anything today?', mapping: 'Disgust' },
  { id: 6, type: 'scale', q: 'Rate your level of trust in others today.', mapping: 'Trust', min: 1, max: 5 },
  { id: 7, type: 'yesno', q: 'Were you surprised by anything today?', mapping: 'Surprise' },
  { id: 8, type: 'scale', q: 'How much anticipation did you feel about the future today?', mapping: 'Anticipation', min: 1, max: 5 },
  { id: 9, type: 'yesno', q: 'Did you feel shame or embarrassment today?', mapping: 'Shame' },
  { id: 10, type: 'scale', q: 'Rate your guilt on a scale of 1 to 5.', mapping: 'Guilt', min: 1, max: 5 },
  { id: 11, type: 'yesno', q: 'Did anxiety affect you today?', mapping: 'Anxiety' },
  { id: 12, type: 'scale', q: 'How much grief did you carry today?', mapping: 'Grief', min: 1, max: 5 },
  { id: 13, type: 'yesno', q: 'Did you feel lonely today?', mapping: 'Loneliness' },
  { id: 14, type: 'scale', q: 'How emotionally numb did you feel today?', mapping: 'Numbness', min: 1, max: 5 },
  { id: 15, type: 'yesno', q: 'Did you experience contentment today?', mapping: 'Contentment' },
  { id: 16, type: 'scale', q: 'How proud did you feel today?', mapping: 'Pride', min: 1, max: 5 },
  { id: 17, type: 'yesno', q: 'Did you feel loved or loving today?', mapping: 'Love' },
  { id: 18, type: 'scale', q: 'Rate your level of hopefulness today.', mapping: 'Hope', min: 1, max: 5 },
  { id: 19, type: 'yesno', q: 'Did you feel contempt for someone today?', mapping: 'Contempt' },
  { id: 20, type: 'scale', q: 'How jealous did you feel today?', mapping: 'Jealousy', min: 1, max: 5 },
  { id: 21, type: 'yesno', q: 'Did you feel envious of someone today?', mapping: 'Envy' },
  { id: 22, type: 'scale', q: 'Rate your level of overwhelm today.', mapping: 'Overwhelm', min: 1, max: 5 },
  { id: 23, type: 'yesno', q: 'Did you feel physically or mentally exhausted today?', mapping: 'Exhaustion' },
  { id: 24, type: 'scale', q: 'On a scale of 1 to 5, how aroused (stimulated/alert) were you today?', mapping: 'Arousal', min: 1, max: 5 },
  { id: 25, type: 'yesno', q: 'Did you feel betrayed by someone today?', mapping: 'Betrayal' },
  { id: 26, type: 'scale', q: 'How resentful did you feel today?', mapping: 'Resentment', min: 1, max: 5 },
  { id: 27, type: 'yesno', q: 'Did you feel a mix of joy and sadness (bittersweet) today?', mapping: 'Bittersweet' },
  { id: 28, type: 'scale', q: 'How vulnerable did you feel today?', mapping: 'Vulnerability', min: 1, max: 5 },
  {
    id: 29,
    type: 'options',
    q: 'Which phrase best describes your experience today?',
    options: [
      'I felt a warm connection',
      'I felt utterly exhausted',
      'I felt a surge of confidence',
      'I felt hollow inside'
    ],
    mapping: {
      'I felt a warm connection': 'Trust',
      'I felt utterly exhausted': 'Exhaustion',
      'I felt a surge of confidence': 'Pride',
      'I felt hollow inside': 'Numbness'
    }
  },
  {
    id: 30,
    type: 'options',
    q: 'Choose the color that best matches your mood today:',
    options: ['Soft blue', 'Fiery red', 'Pale gray', 'Vibrant green'],
    mapping: {
      'Soft blue': 'Sadness',
      'Fiery red': 'Anger',
      'Pale gray': 'Numbness',
      'Vibrant green': 'Hope'
    }
  },
  {
    id: 31,
    type: 'options',
    q: 'How did you respond to a challenge today?',
    options: ['I gave up', 'I pushed through with pride', 'I asked for help', 'I ignored it'],
    mapping: {
      'I gave up': 'Grief',
      'I pushed through with pride': 'Pride',
      'I asked for help': 'Vulnerability',
      'I ignored it': 'Numbness'
    }
  },
  {
    id: 32,
    type: 'options',
    q: 'How would you describe your emotional energy today?',
    options: ['Calm and relaxed', 'Tense and anxious', 'Excited and joyful', 'Detached'],
    mapping: {
      'Calm and relaxed': 'Contentment',
      'Tense and anxious': 'Anxiety',
      'Excited and joyful': 'Joy',
      'Detached': 'Numbness'
    }
  }
];



  
  export const emotionResults: Record<Emotion, {
    emoji: string,
    label: string,
    description: string,
    tip?: string
  }> = {
    Joy: {
      emoji: "😊",
      label: "Joy",
      description: "You’re feeling bright, uplifted, and grateful.",
      tip: "Notice the little things that spark joy and savor them.",
    },
    Sadness: {
      emoji: "😢",
      label: "Sadness",
      description: "It’s okay to feel sad. Your feelings are valid.",
      tip: "Give yourself space. Talk to someone you trust.",
    },
    Anger: {
      emoji: "😠",
      label: "Anger",
      description: "Something important to you is at stake.",
      tip: "Express anger safely—try writing or physical activity.",
    },
    Fear: {
      emoji: "😨",
      label: "Fear",
      description: "You’re feeling threatened or anxious about something.",
      tip: "Pause, breathe slowly, and ground yourself in the present.",
    },
    Disgust: {
      emoji: "🤢",
      label: "Disgust",
      description: "You’re instinctively pushing away what feels wrong.",
      tip: "Reflect on your boundaries. Honor what feels true to you.",
    },
    Trust: {
      emoji: "🤝",
      label: "Trust",
      description: "You feel safe relying on others or yourself.",
      tip: "Show appreciation to those you trust.",
    },
    Surprise: {
      emoji: "😲",
      label: "Surprise",
      description: "Unexpected events have caught your attention.",
      tip: "Stay open—surprises can lead to growth.",
    },
    Anticipation: {
      emoji: "⏳",
      label: "Anticipation",
      description: "You’re looking forward to something ahead.",
      tip: "Channel this energy by preparing or planning.",
    },
    Shame: {
      emoji: "😳",
      label: "Shame",
      description: "You may feel unworthy or exposed.",
      tip: "Remember, everyone makes mistakes. Speak kindly to yourself.",
    },
    Guilt: {
      emoji: "🙇",
      label: "Guilt",
      description: "You regret something you did or didn’t do.",
      tip: "Make amends if you can. Then let yourself move forward.",
    },
    Anxiety: {
      emoji: "😬",
      label: "Anxiety",
      description: "You feel tense, worried, or uneasy.",
      tip: "Focus on your breath. Take one thing at a time.",
    },
    Grief: {
      emoji: "🖤",
      label: "Grief",
      description: "You’re mourning a loss or change.",
      tip: "Let yourself feel and seek support—healing takes time.",
    },
    Loneliness: {
      emoji: "😔",
      label: "Loneliness",
      description: "You feel isolated or disconnected.",
      tip: "Reach out. Even a small message can help.",
    },
    Numbness: {
      emoji: "😶",
      label: "Numbness",
      description: "You feel detached or empty inside.",
      tip: "Try gentle activity or art to reconnect with your feelings.",
    },
    Contentment: {
      emoji: "😌",
      label: "Contentment",
      description: "You feel peaceful and satisfied with the moment.",
      tip: "Appreciate the present. Let it recharge you.",
    },
    Pride: {
      emoji: "😎",
      label: "Pride",
      description: "You feel good about your achievements or values.",
      tip: "Acknowledge your efforts and share your success.",
    },
    Love: {
      emoji: "❤️",
      label: "Love",
      description: "You’re feeling connected and caring.",
      tip: "Express love—say it, show it, or write it down.",
    },
    Hope: {
      emoji: "🌈",
      label: "Hope",
      description: "You’re looking forward to better possibilities.",
      tip: "Visualize what you hope for and take a small step toward it.",
    },
    Contempt: {
      emoji: "😤",
      label: "Contempt",
      description: "You feel superior or dismissive of someone/something.",
      tip: "Notice judgment and try to find empathy or understanding.",
    },
    Jealousy: {
      emoji: "😒",
      label: "Jealousy",
      description: "You want what someone else has.",
      tip: "Turn comparison into inspiration for your own growth.",
    },
    Envy: {
      emoji: "🤑",
      label: "Envy",
      description: "You long for what isn’t yours.",
      tip: "Focus on gratitude for what you already have.",
    },
    Overwhelm: {
      emoji: "🌊",
      label: "Overwhelm",
      description: "You feel buried by too many demands.",
      tip: "List your tasks and tackle them one at a time.",
    },
    Exhaustion: {
      emoji: "🥱",
      label: "Exhaustion",
      description: "Your mind or body is deeply tired.",
      tip: "Rest is not a luxury—prioritize it today.",
    },
    Arousal: {
      emoji: "🔥",
      label: "Arousal",
      description: "You feel stimulated, alert, or energized.",
      tip: "Channel energy into positive actions or creativity.",
    },
    Betrayal: {
      emoji: "💔",
      label: "Betrayal",
      description: "Trust has been broken by someone close.",
      tip: "Allow yourself to grieve. Trust will rebuild over time.",
    },
    Resentment: {
      emoji: "😡",
      label: "Resentment",
      description: "You’re holding onto past hurts or unfairness.",
      tip: "Express your feelings in a safe way—release what you can.",
    },
    Bittersweet: {
      emoji: "🎭",
      label: "Bittersweet",
      description: "You feel both happy and sad at once.",
      tip: "Honor both sides—mixed emotions are human.",
    },
    Vulnerability: {
      emoji: "🫶",
      label: "Vulnerability",
      description: "You’re open to emotional risk or exposure.",
      tip: "Vulnerability is strength—share your truth with care.",
    },
  };
  