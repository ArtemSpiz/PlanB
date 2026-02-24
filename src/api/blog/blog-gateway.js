import { directusApi } from '../../plugins/axios';

const postPreviewFields =
  'category, image, title, description, slug, date_created,timeToRead';

async function getPostsPreview() {
  try {
    const { data } = await directusApi.get('posts', {
      params: {
        fields: postPreviewFields,
      },
    });
    return data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function getPost(slug) {
  try {
    const { data } = await directusApi.get('posts', {
      params: {
        fields: '*',
        filter: slug ? { slug: { _eq: slug } } : {},
      },
    });

    return data.data[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export const BlogGateway = { getPostsPreview, getPost };
