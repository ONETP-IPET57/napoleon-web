import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (data.msg) return null;
      return data || null;
    });

/**
 * @returns {Object | null}
 */
export default function useGuidedTour(id) {
  const { data, error } = useSWR('/api/guided_tours/' + id, fetcher);

  return error && !data ? null : data;
}
