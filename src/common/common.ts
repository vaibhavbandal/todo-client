

export function getJwtToken(): string | null {

    return localStorage.getItem(info.access_token);

}

export const production = true;

export const info = {
    production,
    access_token: "access_token",
    base_url: production ? "https://mytodo-server-production.up.railway.app/" : 'http://localhost:9000/',
    client_base_url: "http://localhost:3000/"
}