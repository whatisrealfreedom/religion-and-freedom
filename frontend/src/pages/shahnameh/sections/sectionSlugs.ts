// Mapping from section IDs to beautiful slugs
export const sectionSlugs: Record<string, string> = {
  // Introduction
  'introduction': 'introduction',
  
  // Jamshid sections
  'jamshid-1': '700-years-jamshid',
  'jamshid-2': 'maradass-zahhak',
  'jamshid-3': 'serpents-growth',
  'jamshid-4': 'fall-of-jamshid',
  
  // Zahhak sections
  'section-1': 'thousand-year-reign',
  'section-2': 'armayel-garmayel',
  'section-3': 'zahhak-nightmare',
  'section-4': 'feraydun-birth',
  'section-5': 'barmayeh-death',
  'section-6': 'feraydun-sixteen',
  'section-7': 'kaveh-uprising',
  'section-8': 'feraydun-rises',
  'section-9': 'journey-to-jerusalem',
  'section-10': 'freeing-princesses',
  'section-11': 'kandro-news',
  'section-12': 'victory-and-imprisonment',
};

// Reverse mapping: slug to section ID
export const slugToSectionId: Record<string, string> = Object.fromEntries(
  Object.entries(sectionSlugs).map(([id, slug]) => [slug, id])
);

// Get slug for a section ID
export const getSlugForSection = (sectionId: string): string => {
  return sectionSlugs[sectionId] || sectionId;
};

// Get section ID for a slug
export const getSectionIdForSlug = (slug: string): string => {
  return slugToSectionId[slug] || slug;
};
