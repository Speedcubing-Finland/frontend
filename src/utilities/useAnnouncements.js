import { useEffect, useState } from 'react';
import { api } from './api';

/**
 * Published, unexpired announcements for the public site.
 *
 * Failures are swallowed on purpose: an announcement is additional content,
 * and the site must render normally if the API is unreachable.
 */
export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/api/announcements')
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setAnnouncements(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return announcements;
};

export default useAnnouncements;
