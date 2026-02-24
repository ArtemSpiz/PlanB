import { BLOG_POSTS } from '../../data/blog';

async function getPostsPreview() {
  try {
    return BLOG_POSTS;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function getPost(slug) {
  try {
    if (!slug) {
      return null;
    }

    const normalizedSlug = slug.toLowerCase();
    const post = BLOG_POSTS.find(
      (item) => item.slug?.toLowerCase() === normalizedSlug
    );

    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export const BlogGateway = { getPostsPreview, getPost };
