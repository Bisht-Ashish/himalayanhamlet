// All editable content lives here. Change text, numbers and lists in this file;
// the components only decide how things look.

export const SITE = {
  name: 'Himalayan Hamlet',
  whatsapp: '917892712293', // country code, no +
  phone: '+91 78927 12293',
  email: '', // add a real address here once you have one; it then appears in the footer
  greeting:
    "Namaste! 🙏 I found Himalayan Hamlet on your website and I'd like to enquire about a stay in Almora. Could you please share availability and rates?",
  nightlyRate: 0, // rupees per night; 0 shows "Message us your dates"
  directPerk: '', // optional: a direct-booking perk, shown only when filled in
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
  { label: 'Kasar Devi', value: '3 km' },
  { label: 'Nanda Devi Temple', value: '4 km' },
  { label: 'Chitai Temple', value: '6 km' },
  { label: 'Binsar', value: '12 km' },
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
  'Almora is about 90 km from Kathgodam railway station, roughly a 3 hour drive. Park on the street, then walk about 300 metres to the house. Message us before you set off and we will guide you the last stretch.';

// Real guest reviews from the Airbnb listing (first name only). Add or swap quotes here.
export const REVIEWS = [
  { text: 'This stay is as colorful, idyllic, and peaceful as made evident by the photos and description. But what put it over the top was the warmth and generosity of the family. Each member played their part in making me feel safe and very welcome, which means a lot as a solo traveler in India for the first time.', by: 'Dora' },
  { text: 'Ashish\'s place is fantastic. It\'s serenely quiet, private, WFH ready … and well appointed so that you can just show up with the clothes on your back.', by: 'Aman' },
  { text: 'I wish I could give the stay and the family more than 5 star, one of the best AirBnB stay and the best family I have ever come across. The food aunty makes and the chats, snacks we had with the family was the star of our trip, we stayed for a week there and it felt like a family vacation.', by: 'Piyush' },
  { text: 'One of the most memorable parts of our stay was the breathtaking sunrise and the stunning panoramic view of the entire Himalayan range from the balcony. Waking up to such a magical view every morning was an unforgettable experience.', by: 'Sarada' },
  { text: 'The place has a marvelous view and the family is the perfect icing on the cake. … The entire family is extremely warm and it honestly felt like we are visiting a family; that\'s how much they take care of you.', by: 'Astha' },
  { text: 'Love the place!!! if you\'re ever in almora and this property is available, blindly go for it. The people are very hospitable and they treat you with utmost kindness and like one of them.', by: 'Tanisha' },
];

export const FAQ = [
  { q: 'How far is the parking from the house?', a: 'It is about a 300 metre walk from the parking, along a path that slopes downhill to the house (and uphill when you leave). Tell us in advance if you travel with elders or heavy luggage.' },
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
