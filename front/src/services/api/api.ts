export const BASE_URL = "http://127.0.0.1:8000/api";
export const BASE_URL_WITHOUT_API = "http://127.0.0.1:8000";

/**
 * Fait une reqête vers l'api avec les credentials
 * @param url
 * @returns {Promise<Response>}
 */
export function fetchWithCredentials(url: string) {
    return fetch(url, { credentials: "include" });
}