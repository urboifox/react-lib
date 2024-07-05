import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

/**
 * Custom hook to manage URL query parameters in a Next.js application.
 *
 * @returns {object} - An object containing functions to set, get, and remove query parameters,
 * and the current pathname.
 */
export default function useQueryString() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    /**
     * Set or update query parameters.
     *
     * @param {object|string} entry - An object with key-value pairs of query parameters to set, 
     * or a string representing a single query parameter key.
     * @param {string} [value] - The value to set for the query parameter if the first argument is a string.
     * @returns {string} - The updated query string.
     */
    const createQueryString = useCallback(
        (entry: { [key: string]: any } | string, value?: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (typeof entry === "string") {
                if (value) {
                    params.set(entry, value);
                    return params.toString();
                } 
                return params;
            }

            Object.keys(entry).forEach(key => params.set(key, JSON.stringify(entry[key])));
            return params.toString();
        },
        [searchParams]
    )

    /**
     * Get the value of a specific query parameter.
     *
     * @param {string} name - The name of the query parameter.
     * @returns {string | null} - The value of the query parameter, or null if it doesn't exist.
     */
    const getQueryString = useCallback(
        (name: string) => {
            return searchParams.get(name);
        },
        [searchParams]
    )

    /**
     * Remove specific query parameters.
     *
     * @param {...string} names - The names of the query parameters to remove.
     * @returns {string} - The updated query string.
     */
    const removeQueryString = useCallback(
        (...names: string[]) => {
            const params = new URLSearchParams(searchParams.toString());
            names.forEach(name => params.delete(name));

            return params.toString();
        },
        [searchParams]
    )

    return { createQueryString, getQueryString, removeQueryString, pathname }
}
