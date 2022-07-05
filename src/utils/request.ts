// const baseUrl = 'http://localhost:12888/'
const baseUrl = 'https://api.bangz.me/ra3/';

export async function jsonRequest<T = any>(url: string, data?: any) {
  const resp = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (resp.status !== 200) throw new Error(resp.statusText);
  const json: { status: number, message: string, result: T } = await resp.json();
  if (json.status !== 200) throw new Error(json.message);
  return json.result;
}
