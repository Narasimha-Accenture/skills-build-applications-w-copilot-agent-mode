const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const isCodespace = Boolean(codespaceName);
const host = isCodespace ? `${codespaceName}-8000.app.github.dev` : "localhost:8000";
const baseUrl = isCodespace ? `https://${host}` : `http://${host}`;

export const getApiUrl = (path: string) => `${baseUrl}/api/${path}`;

export const normalizeListResponse = <T>(payload: any, key: string): T[] => {
  if (!payload) return [];
  const maybeList = payload[key] ?? payload.data ?? payload.items ?? payload;
  return Array.isArray(maybeList) ? maybeList : [];
};

export async function fetchJson<T = any>(path: string): Promise<T> {
  const response = await fetch(getApiUrl(path));

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${body}`);
  }

  const data = await response.json();
  return data as T;
}
