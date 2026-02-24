import { directusApi } from '../../plugins/axios';

const postPreviewFields = 'category, logo, title, description, tags , links';

export async function getPostsPreview() {
  try {
    const { data } = await directusApi.get('Apps', {
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

export const AppsGateway = { getPostsPreview };
