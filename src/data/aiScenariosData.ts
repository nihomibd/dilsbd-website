import { AISpeakingScenario } from '../types';

export const AI_SCENARIOS: AISpeakingScenario[] = [
  {
    id: 'konbini-checkout',
    title: 'Konbini Checkout (コンビニでお買い物)',
    titleBn: 'কনভেনিয়েন্স স্টোরে কেনাকাটা ও ক্যাশিয়ার কথোপকথন',
    category: 'Daily Life',
    roleJapanese: '店員 佐藤さん (Cashier Sato-san)',
    characterAvatar: '🏪',
    difficulty: 'N5',
    location: '7-Eleven, Shinjuku, Tokyo',
    initialPrompt: {
      japanese: 'いらっしゃいませ！温めますか？',
      romaji: 'Irasshaimase! Atatamemasu ka?',
      bangla: 'স্বাগতম! (খাবারটি কি ওভেনে) গরম করে দেব?'
    },
    systemPersona: `You are Sato-san, a polite and friendly Japanese convenience store cashier in Tokyo. 
You speak in clear, natural, beginner-friendly Japanese (JLPT N5 level).
Keep responses concise (1-2 sentences). 
Always guide the student through typical konbini questions: heating food, plastic bag necessity (fukuro), receipt (point card/receipt), and payment method.`,
    recommendedPhrases: [
      { japanese: 'はい、お願いします', romaji: 'Hai, onegaishimasu', bangla: 'হ্যাঁ, দয়া করে দিন' },
      { japanese: 'いいえ、大丈夫です', romaji: 'Iie, daijoubu desu', bangla: 'না, লাগবে না' },
      { japanese: '袋を一枚ください', romaji: 'Fukuro o ichimai kudasai', bangla: 'একটি পলিথিন ব্যাগ দিন' },
      { japanese: 'Suicaで支払います', romaji: 'Suica de shiharaimasu', bangla: 'সুইকা কার্ড দিয়ে দেব' }
    ]
  },
  {
    id: 'ramen-shop-order',
    title: 'Ramen Shop Order (ラーメン屋で注文)',
    titleBn: 'টোকিওর ঐতিহ্যবাহী রামেন শপে খাবার অর্ডার',
    category: 'Dining',
    roleJapanese: '店主 田中さん (Chef Tanaka-san)',
    characterAvatar: '🍜',
    difficulty: 'N5',
    location: 'Ichiran / Tokyo Traditional Ramen, Shibuya',
    initialPrompt: {
      japanese: 'へい、いらっしゃい！ご注文は何にしますか？',
      romaji: 'Hei, irasshai! Gochuumon wa nani ni shimasu ka?',
      bangla: 'স্বাগতম! কী খাবার অর্ডার করবেন?'
    },
    systemPersona: `You are Tanaka-san, an energetic ramen shop master in Shibuya. 
Speak in casual, energetic yet polite Japanese (N5/N4). 
Ask about their ramen choice, firmness of noodles (katame or futsuu), or extra toppings (tamago, chashu).`,
    recommendedPhrases: [
      { japanese: '醤油ラーメンをひとつください', romaji: 'Shouyu raamen o hitotsu kudasai', bangla: 'একটি সয়া সস রামেন দিন' },
      { japanese: '麺は硬めでお願いします', romaji: 'Men wa katame de onegaishimasu', bangla: 'নুডুলস একটু শক্ত/ফার্ম রাখবেন' },
      { japanese: 'お水のおかわりをお願いします', romaji: 'Omizu no okawari o onegaishimasu', bangla: 'দয়া করে আরেক গ্লাস পানি দিন' },
      { japanese: 'ごちそうさまでした！とても美味しかったです', romaji: 'Gochisousama deshita! Totemo oishikatta desu', bangla: 'খাবার দারুণ ছিল, ধন্যবাদ!' }
    ]
  },
  {
    id: 'tokyo-station-counter',
    title: 'Tokyo Station Ticket Counter (切符売り場で道案内)',
    titleBn: 'টোকিও স্টেশনে ট্রেনের টিকিট ও দিকনির্দেশনা',
    category: 'Commute',
    roleJapanese: 'JR駅員 山田さん (JR Attendant Yamada)',
    characterAvatar: '🚅',
    difficulty: 'N5',
    location: 'JR East Ticket Office (Midori no Madoguchi), Tokyo Station',
    initialPrompt: {
      japanese: 'こんにちは。どちらまで行かれますか？',
      romaji: 'Konnichiwa. Dochira made ikaremasu ka?',
      bangla: 'নমস্কার। আপনি কোথায় যাত্রা করবেন?'
    },
    systemPersona: `You are Yamada-san, a helpful JR East railway attendant at Tokyo Station.
Speak polite desu/masu Japanese. 
Help the traveler with destinations, platform numbers (noriba), ticket prices, and train schedules.`,
    recommendedPhrases: [
      { japanese: '新宿駅までの切符を一枚ください', romaji: 'Shinjuku eki made no kippu o ichimai kudasai', bangla: 'শিনজুকু স্টেশনের একটি টিকিট দিন' },
      { japanese: '山手線は何番線ですか？', romaji: 'Yamanote-sen wa nanban-sen desu ka?', bangla: 'ইয়ামানতে লাইন কত নম্বর প্ল্যাটফর্মে?' },
      { japanese: 'この電車は成田空港に行きますか？', romaji: 'Kono densha wa Narita kuukou ni ikimasu ka?', bangla: 'এই ট্রেন কি নারিতা বিমানবন্দরে যায়?' },
      { japanese: 'どうもありがとうございます', romaji: 'Doumo arigatou gozaimasu', bangla: 'আপনাকে অনেক ধন্যবাদ' }
    ]
  },
  {
    id: 'part-time-interview',
    title: 'Part-time Job Interview (アルバイト面接)',
    titleBn: 'জাপানে পার্ট-টাইম (বাইট) চাকরির প্রাথমিক ইন্টারভিউ',
    category: 'Career',
    roleJapanese: '店長 鈴木さん (Manager Suzuki-san)',
    characterAvatar: '💼',
    difficulty: 'N4',
    location: 'FamilyMart / Sukiya Regional Office, Ikebukuro',
    initialPrompt: {
      japanese: 'はじめまして、店長の鈴木です。まずはお名前と簡単な自己紹介をお願いします。',
      romaji: 'Hajimemashite, tenchou no Suzuki desu. Mazu wa onamae to kantan na jikoshoukai o onegaishimasu.',
      bangla: 'শুভ সাক্ষাত, আমি ম্যানেজার সুজুকি। অনুগ্রহ করে আপনার নাম ও সংক্ষিপ্ত পরিচিতি দিন।'
    },
    systemPersona: `You are Suzuki-san, a thoughtful convenience store/restaurant store manager interviewing an international student from Bangladesh.
Speak clear, polite business Japanese (N4).
Ask about their university, Japanese level, how many hours per week they can work (legal limit 28h), and motivation.`,
    recommendedPhrases: [
      { japanese: 'はじめまして。バングラデシュから参りました。', romaji: 'Hajimemashite. Banguradeshu kara mairimashita.', bangla: 'প্রথম সাক্ষাতে স্বাগতম। আমি বাংলাদেশ থেকে এসেছি।' },
      { japanese: '週に28時間まで働けます。', romaji: 'Shuu ni nijuuhachijikan made hatarakemasu.', bangla: 'আমি সপ্তাহে সর্বোচ্চ ২৮ ঘণ্টা কাজ করতে পারি।' },
      { japanese: '一生懸命頑張ります。よろしくお願いします。', romaji: 'Isshoukenmei gambarimasu. Yoroshiku onegaishimasu.', bangla: 'আমি নিষ্ঠার সাথে পরিশ্রম করব।' }
    ]
  }
];

export function getScenarioById(id: string): AISpeakingScenario {
  return AI_SCENARIOS.find(s => s.id === id) || AI_SCENARIOS[0];
}

// Robust Context-Aware Fallback Engine when Gemini API key is offline
export function getScriptedFallbackResponse(scenarioId: string, userMessage: string, exchangeCount: number) {
  const lower = userMessage.toLowerCase();

  if (scenarioId === 'konbini-checkout') {
    if (exchangeCount === 1) {
      return {
        japanese: 'かしこまりました。レジ袋はご利用になりますか？一枚5円です。',
        romaji: 'Kashikomarimashita. Rejibukuro wa goriyou ni narimasu ka? Ichimai go-en desu.',
        bangla: 'বুঝেছি। পলিথিন ব্যাগ কি লাগবে? প্রতিটি ৫ ইয়েন।',
        feedback: {
          isUnderstood: true,
          suggestion: 'খাবারের প্যাকেটের পর ক্যাশিয়ার প্রায়ই ব্যাগ লাগবে কিনা জিজ্ঞেস করেন।',
          naturalAlternative: lower.includes('はい') ? 'はい、お願いします (Hai, onegaishimasu)' : 'いいえ、大丈夫です (Iie, daijoubu desu)',
          culturalTipBangla: 'জাপানে ২০২০ সাল থেকে প্লাস্টিক ব্যাগের জন্য ৫ ইয়েন পরিশোধ করতে হয়, তাই অনেকে নিজস্ব ইকোগব্যাগ বহন করেন।'
        }
      };
    } else if (exchangeCount === 2) {
      return {
        japanese: '承知いたしました。合計で680円になります。お支払いは現金ですか、それとも電子マネーですか？',
        romaji: 'Shouchi itashimashita. Goukei de roppyaku-hachijuu-en ni narimasu. Oshiharai wa genkin desu ka, soretomo denshi manee desu ka?',
        bangla: 'ঠিক আছে। সর্বমোট ৬৮০ ইয়েন হয়েছে। ক্যাশ নাকি কার্ড/ই-মানিতে পরিশোধ করবেন?',
        feedback: {
          isUnderstood: true,
          suggestion: 'পেমেন্ট পদ্ধতির নাম পরিষ্কার করে বলুন: "Genkin" (ক্যাশ) অথবা "Suica" / "PayPay"।',
          naturalAlternative: 'Suicaでお願いします (Suica de onegaishimasu)',
          culturalTipBangla: 'জাপানের যেকোনো কনবিনিতে ট্রেন কার্ড Suica বা Pasmo স্পর্শ করলেই ২ সেকেন্ডে পেমেন্ট সম্পন্ন হয়।'
        }
      };
    } else {
      return {
        japanese: 'ありがとうございました！レシートと商品でございます。またお越しくださいませ！',
        romaji: 'Arigatou gozaimashita! Reshiito to shouhin de gozaimasu. Mata okoshi kudasai mase!',
        bangla: 'অসংখ্য ধন্যবাদ! এই নিন আপনার রসিদ ও কেনাকাটা। আবার আসবেন!',
        feedback: {
          isUnderstood: true,
          suggestion: 'লেনদেন শেষ! উত্তরে হালকা মাথা ঝুঁকিয়ে 「どうも」 (Doumo) বলতে পারেন।',
          naturalAlternative: 'どうも、ありがとうございます (Doumo, arigatou gozaimasu)',
          culturalTipBangla: 'জাপানি কনবিনিতে কেনাকাটার পর্ব সফলভাবে সম্পন্ন করার জন্য অভিনন্দন!'
        }
      };
    }
  }

  if (scenarioId === 'ramen-shop-order') {
    if (exchangeCount === 1) {
      return {
        japanese: 'へい！麺の硬さはどうしますか？硬め、普通、柔らかめから選べますよ！',
        romaji: 'Hei! Men no katasa wa dou shimasu ka? Katame, futsuu, yawarakame kara erabemasu yo!',
        bangla: 'ঠিক আছে! নুডুলস কেমন সেদ্ধ চান? একটু শক্ত (Katame), স্বাভাবিক (Futsuu), নাকি নরম (Yawarakame)?',
        feedback: {
          isUnderstood: true,
          suggestion: 'জাপানিরা রামেনে সাধারণত "Katame" (একটু শক্ত) বেশি পছন্দ করেন।',
          naturalAlternative: '硬めでお願いします (Katame de onegaishimasu)',
          culturalTipBangla: 'রামেন শপে স্বাদ ও টেক্সচার নিজের ইচ্ছামতো কাস্টমাইজ করা যায়।'
        }
      };
    } else {
      return {
        japanese: 'あいよ、硬めね！お待たせしました、熱々の特製ラーメンです！ごゆっくりどうぞ！',
        romaji: 'Aiyo, katame ne! Omatase shimashita, atsuatsu no tokusei raamen desu! Goyukkuri douzo!',
        bangla: 'ঠিক আছে, একটু শক্ত! অপেক্ষার জন্য ধন্যবাদ, এই নিন আপনার গরম স্পেশাল রামেন! উপভোগ করুন!',
        feedback: {
          isUnderstood: true,
          suggestion: 'খাবার শুরুর পূর্বে জাপানি রীতি অনুযায়ী 「いただきます！」 (Itadakimasu!) বলতে ভুলবেন না।',
          naturalAlternative: 'いただきます！ (Itadakimasu!)',
          culturalTipBangla: 'রামেন খাওয়ার সময় শব্দ করে (Slurping) খাওয়া শেফের প্রতি সম্মান হিসেবে গণ্য হয়।'
        }
      };
    }
  }

  if (scenarioId === 'tokyo-station-counter') {
    return {
      japanese: '新宿駅ですね。山手線の外回り、4番線からお乗りください。所要時間は約15分です。',
      romaji: 'Shinjuku eki desu ne. Yamanote-sen no sotomawari, yonban-sen kara onori kudasai. Shoyou jikan wa yaku juugo-fun desu.',
      bangla: 'শিনজুকু স্টেশন তো? ইয়ামানতে লাইনের ৪ নম্বর প্ল্যাটফর্ম থেকে উঠবেন। সময় লাগবে প্রায় ১৫ মিনিট।',
      feedback: {
        isUnderstood: true,
        suggestion: 'প্ল্যাটফর্ম নম্বর জানতে পারলে উত্তরে বিনম্র ধন্যবাদ জানান।',
        naturalAlternative: '分かりました。ありがとうございます！ (Wakarimashita. Arigatou gozaimasu!)',
        culturalTipBangla: 'টোকিও স্টেশনের সবুজ ট্রেনের বৃত্তাকার লাইনটিকে "Yamanote Line" বলা হয়, যা পুরো শহর প্রদক্ষিণ করে।'
      }
    };
  }

  // Fallback for part-time interview & generic
  return {
    japanese: 'はい、よく分かりました！日本語がとてもお上手ですね。日本の生活にはもう慣れましたか？',
    romaji: 'Hai, yoku wakarimashita! Nihongo ga totemo ojouzu desu ne. Nihon no seikatsu ni wa mou naremashita ka?',
    bangla: 'হ্যাঁ, সুন্দরভাবে বুঝেছি! আপনার জাপানি ভাষা চমৎকার। জাপানের জীবনের সাথে কি মানিয়ে নিয়েছেন?',
    feedback: {
      isUnderstood: true,
      suggestion: 'ম্যানেজার আপনার প্রশংসায় "Ojouzu" বললেন। জবাবে বিনম্রভাবে "Iie, mada mada desu" (না, এখনো শিখছি) বলাই জাপানি শিষ্টাচার।',
      naturalAlternative: 'いいえ、まだまだ勉強中です (Iie, mada mada benkyou chuu desu)',
      culturalTipBangla: 'জাপানি সংস্কৃতিতে অতিরিক্ত আত্মবিশ্বাস প্রকাশের চেয়ে বিনয়ী ও পরিশ্রমী মনোভাব ইন্টারভিউতে বেশি সমাদৃত হয়।'
    }
  };
}
