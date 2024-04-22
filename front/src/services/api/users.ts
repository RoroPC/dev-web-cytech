import { BASE_URL, BASE_URL_WITHOUT_API, fetchWithCredentials } from "./api";

//TODO: Modifier les liens en fonction de l'api
export function getMe() {
    return fetchWithCredentials(`${BASE_URL}/me`).then((response) => {
        if (response.status === 401 || response.status === 301 || response.status === 302) {
            return Promise.resolve(null);
        }
        return response.json();
    });
}

export function loginUrl() {
    return `${BASE_URL_WITHOUT_API}/login`;
}

export function logoutUrl() {
    return `${BASE_URL_WITHOUT_API}/logout`;
}