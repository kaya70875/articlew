export const getSourceName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '').replace(/\.[a-z]{2,}$/i, '');
    } catch (error) {
      return url;
    }
  };