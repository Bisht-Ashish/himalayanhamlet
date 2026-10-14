// All editable content lives here. Change text, numbers and lists in this file;
// the components only decide how things look.

export const SITE = {
  name: 'Himalayan Hamlet',
  whatsapp: '917892712293', // country code, no +
  phone: '+91 78927 12293',
  email: 'hello@yourdomain.in',
  greeting:
    "Namaste! 🙏 I found Himalayan Hamlet on your website and I'd like to enquire about a stay in Almora. Could you please share availability and rates?",
  nightlyRate: 0, // rupees per night; 0 shows "Message us your dates"
  directPerk:
    '[your direct-booking perk, for example a welcome chai or flexible check-out]',
  instagramUrl: 'https://instagram.com/himalayan_hamlet',
  instagramHandle: '@himalayan_hamlet',
  airbnbUrl: 'https://www.airbnb.co.in/rooms/40210492',
  mapsUrl: 'https://maps.app.goo.gl/jnBMKa5w9RrQqQQC7',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.640801505709!2d79.67432951118822!3d29.62253797503498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0b7b0fd1dd5bf%3A0x93ba7719f5172287!2sHimalayan%20Hamlet%20Homestay%20(Homestay%20in%20Almora)!5e1!3m2!1sen!2sin!4v1791915353138!5m2!1sen!2sin',
  latitude: 29.6225,
  longitude: 79.6743,
};

export function waLink(text: string): string {
  return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(text);
}

export const NAV = [
  { href: '#stay', label: 'The stay' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#around', label: 'Around Almora' },
  { href: '#faq', label: 'FAQ' },
];

export const HERO = {
  title: 'Wake up to Nanda Devi from your own balcony.',
  lead: 'A private first-floor suite in a family home in Almora, Uttarakhand. Two bedrooms, a kitchen, and a big balcony facing the Trishul, Nanda Devi and Nanda Kot ranges.',
  facts: ['★ 4.98 from 84 reviews', 'Guest favourite on Airbnb', 'Up to 4 guests'],
  alt: 'Himalayan Hamlet guest suite with a blue roof above the forested Almora valley and distant Himalayan peaks',
};

export const FACTS = [
  { icon: 'bed', title: '2 bedrooms', text: 'King + double' },
  { icon: 'users', title: 'Up to 4 guests', text: 'Whole first floor' },
  { icon: 'mountain', title: 'Balcony', text: 'Himalayan view' },
  { icon: 'utensils', title: 'Kitchen', text: 'Fridge, oven, chulha' },
  { icon: 'wifi', title: 'Wi-Fi', text: '100 Mbps + backup' },
];

export const STAY = {
  paragraphs: [
    'It is a two-storey family home. The hosts live on the ground floor, and guests get the whole first floor: two bedrooms, each with an attached bathroom, a kitchen, and a large balcony with the Himalayan view.',
    'Wake up to birdsong, watch the stars at night, and join in village life: try farming, or learn to make pahadi namak and bhaang ki chatni. Treks and birdwatching start close by.',
  ],
  highlights: [
    { label: 'Parking', value: 'Street parking, away from the main road' },
    { label: 'Views', value: 'Mountain, valley and garden' },
    { label: 'Workspace', value: 'Wi-Fi, 100 Mbps with backup' },
    { label: 'Hosts', value: 'Ashish and family, on site' },
  ],
};

export const ROOMS = [
  {
    name: 'Bedroom 1',
    text: 'King bed, attached bathroom with geyser.',
    photo: 'images/bedroom1.webp',
    alt: 'Bedroom with a king bed, wooden ceiling and doors opening to the garden and valley view',
  },
  {
    name: 'Bedroom 2',
    text: 'Double bed, attached bathroom with geyser.',
    photo: 'images/bedroom2.webp',
    alt: 'Bedroom with green walls, a wooden sofa, a tea tray and a window looking over the mountains',
  },
];

export const AMENITIES = [
  { icon: 'mountain', text: 'Private balcony with Himalayan view' },
  { icon: 'utensils', text: 'Kitchen with fridge and oven' },
  { icon: 'flame', text: 'Traditional chulha for outdoor cooking' },
  { icon: 'drop', text: 'Hot water (geysers in bathrooms)' },
  { icon: 'thermo', text: 'Room heaters' },
  { icon: 'layers', text: 'Extra bedding and towels' },
  { icon: 'drop', text: 'RO water purifier' },
  { icon: 'wifi', text: '100 Mbps broadband, 20 Mbps backup' },
  { icon: 'laptop', text: 'Dedicated workspace' },
  { icon: 'plug', text: 'Power backup' },
  { icon: 'leaf', text: 'Garden' },
  { icon: 'cup', text: 'Meals on request (extra)' },
];

export const SEASONS = [
  { cls: 'summer', name: 'Summer', text: 'Sharp sunrises, fresh air, snow-capped peaks.' },
  { cls: 'monsoon', name: 'Monsoon', text: 'Cloud inversions, deep greens, seasonal flowers.' },
  { cls: 'winter', name: 'Winter', text: 'Snowfall, starry skies, bonfires and white peaks.' },
];

// Add more photos here and they appear in the gallery automatically.
export const GALLERY = [
  { small: 'images/hero-800.webp', large: 'images/hero.webp', alt: 'The guest suite and garden above the valley' },
  { small: 'images/bedroom1.webp', large: 'images/bedroom1.webp', alt: 'Bedroom 1 with a king bed and wooden ceiling' },
  { small: 'images/bedroom2.webp', large: 'images/bedroom2.webp', alt: 'Bedroom 2 with a wooden sofa and mountain view' },
  { small: 'images/bedroom1-b-800.webp', large: 'images/bedroom1-b.webp', alt: 'Bedroom 1 with a king bed, a writing desk and a red folk-art painting under the wooden ceiling' },
];

export const NEARBY = [
  { label: 'Mrig Vihar Zoo', value: '2 km' },
  { label: 'Kasar Devi', value: '3 km' },
  { label: 'Nanda Devi Temple', value: '4 km' },
  { label: 'Chitai Temple', value: '6 km' },
  { label: 'Binsar', value: '12 km' },
  { label: 'Paragliding', value: '20 km' },
  { label: 'Sun Temple (Katarmal)', value: '20 km' },
  { label: 'Jageshwar Dham', value: '33 km' },
];

export const RATINGS = {
  overall: '4.98',
  count: 84,
  items: [
    { label: 'Cleanliness', value: '4.9' },
    { label: 'Accuracy', value: '4.9' },
    { label: 'Check-in', value: '4.9' },
    { label: 'Communication', value: '5.0' },
    { label: 'Location', value: '4.9' },
    { label: 'Value', value: '4.9' },
  ],
};

export const HOSTS = {
  text: 'Ashish is a software engineer who has lived in Almora for over 20 years. He runs Himalayan Hamlet with his parents, who live on the ground floor, so there is always someone to help with directions, meals or trek advice.',
  note: 'Add a family photo here and a line about what you enjoy showing guests.',
  day: [
    { label: 'Sunrise', value: 'Chai on the balcony, peaks turning gold' },
    { label: 'Morning', value: 'Breakfast, then a village or farm walk' },
    { label: 'Afternoon', value: 'Nanda Devi Temple or Kasar Devi' },
    { label: 'Evening', value: 'Stargazing, bonfire in winter' },
  ],
};

export const REACH =
  'Almora is about 90 km from Kathgodam railway station, roughly a 3 hour drive. Park at the road, then walk about 200 metres to the house. Message us before you set off and we will guide you the last stretch.';

// Paste real guest reviews here: { text: '...', by: 'First name, Month Year' }
export const REVIEWS = [
  { text: 'Paste a real guest review here.', by: 'Guest name, Month Year' },
  { text: 'Paste a second real review here.', by: 'Guest name, Month Year' },
  { text: 'Paste a third real review here.', by: 'Guest name, Month Year' },
];

export const FAQ = [
  { q: 'How far is the parking from the house?', a: 'You walk about 200 metres from the parking area, and the path is a little hilly. Tell us in advance if you travel with elders or heavy luggage.' },
  { q: 'Can my driver stay?', a: 'There is no driver accommodation at the homestay. We can help you find a budget place nearby.' },
  { q: 'Are meals available?', a: 'Breakfast, lunch and dinner can be prepared at extra cost. You can also cook in the kitchen.' },
  { q: 'How do I book and pay?', a: 'Send your dates on WhatsApp. We confirm availability and share payment details. [Edit: advance amount and cancellation policy]' },
  { q: 'Safety', a: 'Smoke and carbon monoxide alarms are not installed. Please use the heaters and chulha with care.' },
];

export const FOOTER_LINKS = [
  { href: '#', label: 'Privacy policy' },
  { href: '#', label: 'Cancellation & refund policy' },
  { href: '#', label: 'Terms' },
];
