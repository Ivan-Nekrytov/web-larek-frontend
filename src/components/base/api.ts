export type ApiListResponse<T> = { total: number; items: T[] };

export class Api {
  constructor(public baseUrl: string, public cdnUrl: string) {}

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    const res = await fetch(url, options);
    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(`API ${res.status}: ${msg || res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  get<T>(path: string): Promise<T> { return this.request<T>(path); }
  post<T>(path: string, body: any): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }
}