import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const getSourceName = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace('www.', '').replace(/\.[a-z]{2,}$/i, '');
    } catch (error) {
      return url;
    }
  };

export const getCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
}

export const getCurrentWord = () => {
  const params = useSearchParams();
  return params.get('word') || '';
}