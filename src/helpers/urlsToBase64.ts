import axios from 'axios';
export const urlsToBase64 = (urls: string[]) =>
  Promise.all(
    urls.map(async (url) => {
      const response = await axios.get(url, {
        withCredentials: false,
        responseType: 'arraybuffer',
      });
    }),
  );
