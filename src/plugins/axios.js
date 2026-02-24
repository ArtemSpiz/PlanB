import axiosOriginal from 'axios';

const config = {
  directus: {
    baseURL: `${import.meta.env.VITE_DIRECTUS_URL}/items/`,
  },
};

const createApiDirectus = (config = {}) => {
  const api = axiosOriginal.create(config);

  api.interceptors.request.use(
    (successfulReq) => {
      return successfulReq;
    },
    (error) => {
      console.log('ERROR: ', error);

      throw error;
    }
  );
  return api;
};

export const directusApi = createApiDirectus(config.directus);
