import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (data.msg) return null;
      return data || null;
    });

/**
 * @returns {Array<Object> | null}
 */
export default function useExhibitions() {
  const { data, error } = useSWR('/api/exhibitions', fetcher);

  return error && !data ? null : data;
}
