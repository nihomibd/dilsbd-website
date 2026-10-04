import { DailyMission } from '../types';

export const SEED_MISSIONS: DailyMission[] = [
  {
    id: 'mission-01-greeting',
    title: 'Meet Japan 🇯🇵 (Aisatsu Kickoff)',
    titleBn: 'জাপানে প্রথম সম্ভাষণ ও শিষ্টাচার (Aisatsu)',
    category: 'Greeting',
    scenarioDescription: 'Master the 3 golden phrases of daily Japanese survival: Konnichiwa, Arigatou, and Sumimasen.',
    scenarioDescriptionBn: 'জাপানের দৈনন্দিন জীবনের সবচেয়ে প্রয়োজনীয় ৩টি সোনালী বাক্য: こんにちは, ありがとう, এবং すみません।',
    difficulty: 'Beginner',
    xpReward: 20,
    estimatedMinutes: 5,
    steps: [
      {
        stepNumber: 1,
        type: 'learn',
        title: 'Learn the 3 Golden Phrases',
        titleBn: 'ধাপ ১: ৩টি সোনালী বাক্য শিখুন',
        description: 'These 3 words will unlock friendly smiles anywhere across Tokyo.',
        descriptionBn: 'জাপানে পা রেখেই যেকোনো স্থানে উষ্ণ সহযোগিতা পেতে এই তিনটি বাক্যই যথেষ্ট।',
        japanesePhrase: 'こんにちは • ありがとう • すみません',
        romaji: 'Konnichiwa • Arigatou • Sumimasen',
        englishMeaning: 'Hello • Thank you • Excuse me / Sorry',
        banglaMeaning: 'হ্যালো / শুভ অপরাহ্ন • ধন্যবাদ • মাফ করবেন / দুঃখিত'
      },
      {
        stepNumber: 2,
        type: 'listen',
        title: 'Listen to Native Pronunciation',
        titleBn: 'ধাপ ২: প্রমিত নেটিভ উচ্চারণ শুনুন',
        description: 'Listen closely to the gentle pitch accent of "Sumimasen" (すみません).',
        descriptionBn: 'বাটনে ক্লিক করে "すみません" (মাফ করবেন) শব্দটির বিনম্র উচ্চারণ শুনুন।',
        japanesePhrase: 'すみません',
        romaji: 'Su-mi-ma-sen',
        englishMeaning: 'Excuse me / I am sorry',
        banglaMeaning: 'মাফ করবেন / শুনছেন কি?',
        audioText: 'すみません'
      },
      {
        stepNumber: 3,
        type: 'choose',
        title: 'Interactive Real-Life Situation',
        titleBn: 'ধাপ ৩: বাস্তব সিচুয়েশন টেস্ট',
        description: 'You enter a 7-Eleven in Tokyo. The clerk loudly greets: 「いらっしゃいませ！」 (Irasshaimase! Welcome!). What is the natural Japanese etiquette?',
        descriptionBn: 'টোকিওর একটি সেভেন-ইলেভেনে ঢোকার সাথে সাথে দোকানের কর্মী বললেন 「いらっしゃいませ！」 (স্বাগতম!)। জাপানি শিষ্টাচার অনুযায়ী আপনার স্বাভাবিক প্রতিক্রিয়া কী হবে?',
        promptSituation: '🏪 Konbini Staff: 「いらっしゃいませ！」',
        options: [
          {
            id: 'opt-a',
            text: 'Give a slight, polite head nod (Eshaku) or friendly smile (Natural Japanese culture)',
            textBn: 'হালকা মাথা ঝুঁকিয়ে (Eshaku) বা মৃদু হেসে ভেতরে প্রবেশ করা (গ্রাহকদের উচ্চস্বরে কিছু বলতে হয় না)',
            isCorrect: true
          },
          {
            id: 'opt-b',
            text: 'Loudly yell back 「いらっしゃいませ！」 to the staff',
            textBn: 'কর্মীকে পাল্টা জোরে 「いらっしゃいませ！」 বলা',
            isCorrect: false
          },
          {
            id: 'opt-c',
            text: 'Say 「さようなら！」 (Sayounara)',
            textBn: 'বিদায় সম্ভাষণ 「さようなら！」 বলা',
            isCorrect: false
          },
          {
            id: 'opt-d',
            text: 'Say 「ごちそうさまでした！」 (Gochisousama)',
            textBn: 'খাবারের সমাপ্তি বাক্য বলা',
            isCorrect: false
          }
        ],
        feedbackBn: 'চমৎকার! জাপানে কনবিনি বা দোকানে কর্মীরা সম্মান জানাতে 「いらっしゃいませ！」 বলে। জাপানি সংস্কৃতিতে গ্রাহকরা পাল্টা কিছু না বলে হালকা মাথা ঝুঁকিয়ে (Eshaku 会釈) বা হেসে ঢুকে পড়েন।'
      },
      {
        stepNumber: 4,
        type: 'complete',
        title: 'Shadowing & Wrap Up',
        titleBn: 'ধাপ ৪: ফাইনাল শ্যাডোয়িং ও সম্পন্ন',
        description: 'Repeat after the audio: 「ありがとうございます！」 (Arigatou gozaimasu!).',
        descriptionBn: 'শুদ্ধ উচ্চারণে বলুন: 「ありがとうございます！」 (অসংখ্য ধন্যবাদ!)।',
        japanesePhrase: 'ありがとうございます！',
        romaji: 'Arigatou gozaimasu!',
        englishMeaning: 'Thank you very much (Polite)',
        banglaMeaning: 'আপনাকে অনেক ধন্যবাদ (বিনম্র)',
        audioText: 'ありがとうございます！'
      }
    ]
  },
  {
    id: 'mission-02-konbini',
    title: 'Konbini Order 🏪 (コンビニで注文)',
    titleBn: 'কনভেনিয়েন্স স্টোরে খাবার অর্ডার করা',
    category: 'Konbini',
    scenarioDescription: 'Order hot fried chicken (Famichiki) or water smoothly at FamilyMart or Lawson.',
    scenarioDescriptionBn: 'জাপানের কনবিনি থেকে প্রিয় স্ন্যাক্স বা পানীয় কেনার চমৎকার কথোপকথন।',
    difficulty: 'N5',
    xpReward: 20,
    estimatedMinutes: 5,
    steps: [
      {
        stepNumber: 1,
        type: 'learn',
        title: 'Magic Phrase: "Kore o kudasai"',
        titleBn: 'ধাপ ১: জাদুকরী বাক্য "এটা দিন"',
        description: 'Point at anything in Japan and say 「これ を ください」 to buy it instantly.',
        descriptionBn: 'জাপানের যেকোনো দোকানে আঙুল নির্দেশ করে 「これ を ください」 বললেই কেনাকাটা হয়ে যাবে।',
        japanesePhrase: 'これをください',
        romaji: 'Kore o kudasai',
        englishMeaning: 'Please give me this',
        banglaMeaning: 'দয়া করে এটি দিন'
      },
      {
        stepNumber: 2,
        type: 'listen',
        title: 'Listen to the Order Request',
        titleBn: 'ধাপ ২: অর্ডারের প্রমিত উচ্চারণ শুনুন',
        description: 'Listen to the natural flow of 「お水をお願いします」 (Water, please).',
        descriptionBn: 'বিনম্রভাবে পানি চাইতে 「お水をお願いします」 এর অডিও শুনুন।',
        japanesePhrase: 'お水をお願いします',
        romaji: 'Omizu o onegaishimasu',
        englishMeaning: 'Water, please',
        banglaMeaning: 'দয়া করে একটু পানি দিন',
        audioText: 'お水をお願いします'
      },
      {
        stepNumber: 3,
        type: 'choose',
        title: 'Select the Correct Order Phrase',
        titleBn: 'ধাপ ৩: সঠিক অর্ডারিং বাক্য নির্বাচন করুন',
        description: 'You are at the heated showcase counter. You point to a hot pork bun (Nikuman). What should you say to the cashier?',
        descriptionBn: 'আপনি কাউন্টারের হটকেসে থাকা গরম বানটির দিকে আঙুল নির্দেশ করলেন। ক্যাশিয়ারকে কী বলবেন?',
        promptSituation: '🥟 Counter Order: Pointing to Nikuman',
        options: [
          {
            id: 'opt-a',
            text: '「これをひとつください」 (Kore o hitotsu kudasai - One of this, please)',
            textBn: '「これをひとつください」 (দয়া করে এটি একটি দিন)',
            isCorrect: true
          },
          {
            id: 'opt-b',
            text: '「トイレはどこですか」 (Toire wa doko desu ka)',
            textBn: 'টয়লেট কোথায়?',
            isCorrect: false
          },
          {
            id: 'opt-c',
            text: '「はじめまして、どうぞよろしく」',
            textBn: 'প্রথম সাক্ষাতের পরিচিতি',
            isCorrect: false
          },
          {
            id: 'opt-d',
            text: '「いくらですか」 (How much is this)',
            textBn: 'দাম কত?',
            isCorrect: false
          }
        ],
        feedbackBn: 'সঠিক উত্তর! 「ひとつ」 (Hitotsu) মানে একটি, এবং 「これをひとつください」 মানে "দয়া করে এটি একটি দিন"।'
      },
      {
        stepNumber: 4,
        type: 'complete',
        title: 'Payment & Receipt Practice',
        titleBn: 'ধাপ ৪: বিল পরিশোধ ও রসিদ নেওয়া',
        description: 'Cashier asks 「レシートはご利用ですか？」 (Do you need the receipt?). You reply 「はい、お願いします」.',
        descriptionBn: 'ক্যাশিয়ার রসিদ লাগবে কিনা জিজ্ঞেস করলে বলুন: 「はい、お願いします」 (হ্যাঁ, দয়া করে দিন)।',
        japanesePhrase: 'はい、お願いします',
        romaji: 'Hai, onegaishimasu',
        englishMeaning: 'Yes, please',
        banglaMeaning: 'হ্যাঁ, দয়া করে দিন',
        audioText: 'はい、お願いします'
      }
    ]
  },
  {
    id: 'mission-03-commute',
    title: 'Tokyo Station Navigation 🚅 (東京駅で道案内)',
    titleBn: 'টোকিও স্টেশনে দিকনির্দেশনা চাওয়া',
    category: 'Commute',
    scenarioDescription: 'Learn how to ask for directions politely on the JR Yamanote or Subway line.',
    scenarioDescriptionBn: 'টোকিওর ব্যস্ত ট্রেন বা সাবওয়ে স্টেশনে প্রমিতভাবে দিকনির্দেশনা জিজ্ঞাসা করার পদ্ধতি।',
    difficulty: 'N5',
    xpReward: 20,
    estimatedMinutes: 5,
    steps: [
      {
        stepNumber: 1,
        type: 'learn',
        title: 'Location Question Pattern',
        titleBn: 'ধাপ ১: স্থান জিজ্ঞাসা করার নিয়ম',
        description: '[Place] + 「は どこ です か？」 = Where is [Place]?',
        descriptionBn: '[স্থান] + 「は どこ です か？」 (wa doko desu ka?) = [স্থান] কোথায়?',
        japanesePhrase: '新宿駅はどこですか？',
        romaji: 'Shinjuku eki wa doko desu ka?',
        englishMeaning: 'Where is Shinjuku Station?',
        banglaMeaning: 'শিনজুকু স্টেশন কোথায়?'
      },
      {
        stepNumber: 2,
        type: 'listen',
        title: 'Listen to Station Directions',
        titleBn: 'ধাপ ২: স্টেশনের ডিরেকশন শুনুন',
        description: 'A station staff points forward and says 「まっすぐ行ってください」 (Go straight).',
        descriptionBn: 'স্টেশন কর্মকর্তা সোজা যেতে বলছেন: 「まっすぐ行ってください」 (সোজা যান)।',
        japanesePhrase: 'まっすぐ行ってください',
        romaji: 'Massugu itte kudasai',
        englishMeaning: 'Please go straight ahead',
        banglaMeaning: 'দয়া করে সোজা এগিয়ে যান',
        audioText: 'まっすぐ行ってください'
      },
      {
        stepNumber: 3,
        type: 'choose',
        title: 'Responding with Gratitude',
        titleBn: 'ধাপ ৩: ধন্যবাদ জ্ঞাপন নির্বাচন',
        description: 'The station attendant politely explains the way to the platform. What is your proper response?',
        descriptionBn: 'স্টেশন কর্মকর্তা আপনাকে টিকিট গেটের সঠিক পথ দেখিয়ে দিলেন। উত্তরে কী বলবেন?',
        promptSituation: '🚅 Station Attendant: 「あそこです」 (It is over there)',
        options: [
          {
            id: 'opt-a',
            text: '「どうもありがとうございます！」 (Doumo arigatou gozaimasu!)',
            textBn: '「どうもありがとうございます！」 (আপনাকে অনেক অনেক ধন্যবাদ!)',
            isCorrect: true
          },
          {
            id: 'opt-b',
            text: '「おやすみなさい」 (Oyasuminasai)',
            textBn: 'শুভরাত্রি',
            isCorrect: false
          },
          {
            id: 'opt-c',
            text: '「ただいま」 (Tadaima)',
            textBn: 'আমি বাড়ি ফিরেছি',
            isCorrect: false
          },
          {
            id: 'opt-d',
            text: '「ごめんなさい」 (Gomen nasai)',
            textBn: 'ক্ষমা চাইছি',
            isCorrect: false
          }
        ],
        feedbackBn: 'একদম সঠিক! সাহায্য নেওয়ার পর সবসময় বিনম্রভাবে 「どうもありがとうございます！」 বলা উচিত।'
      },
      {
        stepNumber: 4,
        type: 'complete',
        title: 'Mission Complete!',
        titleBn: 'ধাপ ৪: মিশন সম্পন্ন!',
        description: 'You are now ready to commute with confidence in Tokyo! 🚅',
        descriptionBn: 'টোকিওর সাবওয়ে ও ট্রেনে চলাচলে আপনি এখন শতভাগ প্রস্তুত!',
        japanesePhrase: 'いってきます！',
        romaji: 'Ittekimasu!',
        englishMeaning: 'I am going and will be back!',
        banglaMeaning: 'আমি যাচ্ছি!',
        audioText: 'いってきます'
      }
    ]
  }
];

export function getTodayMission(completedMissionIds: string[] = []): DailyMission {
  // Find first uncompleted mission, or cycle through
  const uncompleted = SEED_MISSIONS.find(m => !completedMissionIds.includes(m.id));
  return uncompleted || SEED_MISSIONS[0];
}
