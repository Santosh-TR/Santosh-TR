import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if a media query matches.
 * @param query The media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);

        // Initial check
        setMatches(media.matches);

        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);

    return matches;
}
