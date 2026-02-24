import { initialCards } from '../../data/apps';

const mockApps = initialCards.map((card) => ({
  ...card,
  description: card.text,
  tags: card.tag,
  links: card.links || '#',
}));

export async function getPostsPreview() {
  try {
    return mockApps;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export const AppsGateway = { getPostsPreview };
