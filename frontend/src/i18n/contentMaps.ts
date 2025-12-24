import { Locale } from './messages';

export type ChapterText = { title: string; description: string };
export type PdfText = { title: string; description: string };

export const chapterTextByLocale: Record<Locale, Record<number, ChapterText>> = {
  fa: {},
  en: {
    1: {
      title: 'Real Freedom = Absolute Property Rights',
      description: 'Freedom redefined as ownership over four domains: body, mind, time, and property.',
    },
    2: {
      title: 'What Is a Formal Axiomatic System?',
      description: 'A simple, step-by-step explanation (from games to math), and why Gödel matters.',
    },
    3: {
      title: 'Religion as the Guardian of Freedom',
      description: 'How religion can oppose statism and protect ownership rights.',
    },
    4: {
      title: 'Application in Contemporary Iran',
      description: 'Inflation, coercion, and censorship—diagnosis and a freedom-oriented path forward.',
    },
    5: {
      title: 'Philosophical Analysis of Freedom',
      description: 'A deeper look at freedom in Islamic and Western philosophical traditions.',
    },
    6: {
      title: 'Divine Justice and Human Rights',
      description: 'How justice relates to absolute ownership and non-aggression.',
    },
    7: {
      title: 'The Awaiting Society and Freedom',
      description: 'Imamate/Mahdism and the idea of a society that resists coercion.',
    },
    8: {
      title: 'Freedom in the Modern World',
      description: 'Digital age, globalization, and how ownership rights are challenged and defended.',
    },
    9: {
      title: 'The Future of Freedom',
      description: 'A forward-looking vision of freedom grounded in durable principles.',
    },
    10: {
      title: 'Freedom in the Age of AI',
      description: 'Translating ethical principles into enforceable rules for fair, non-oppressive AI.',
    },
  },
};

export const pdfTextByLocale: Record<Locale, Record<number, PdfText>> = {
  fa: {},
  en: {
    1: { title: 'What Is Real Freedom?', description: 'A foundational redefinition of freedom as absolute ownership.' },
    2: { title: 'Formal Axiomatic System', description: 'Religion as a durable logical framework for protecting freedom.' },
    3: { title: 'Religion as Guardian', description: 'How religion opposes statism and protects ownership rights.' },
    4: { title: 'Contemporary Iran', description: 'Practical diagnosis: inflation, coercion, and privacy violations.' },
    5: { title: 'Philosophical Analysis', description: 'A deeper philosophical reading of freedom.' },
    6: { title: 'Justice & Rights', description: 'Divine justice and the logic of non-aggression.' },
    7: { title: 'Awaiting Society', description: 'Mahdism and a society oriented toward reducing coercion.' },
    8: { title: 'Modern World', description: 'Freedom in the digital, global era.' },
    9: { title: 'Future of Freedom', description: 'A future vision grounded in durable principles.' },
  },
};

export function localizeChapter(locale: Locale, number: number, fallback: ChapterText): ChapterText {
  return chapterTextByLocale[locale]?.[number] ?? fallback;
}

export function localizePdf(locale: Locale, number: number, fallback: PdfText): PdfText {
  return pdfTextByLocale[locale]?.[number] ?? fallback;
}


