import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (data.msg) return null;
      return data || null;
    });

export default function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR('/api/user', fetcher);
  const user = data;
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo) return;
    if ((redirectTo && !redirectIfFound && !hasUser) || (redirectIfFound && hasUser)) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasUser]);

  return error ? null : user;
}
