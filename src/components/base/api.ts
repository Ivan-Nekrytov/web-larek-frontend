export class Api {
  protected readonly baseUrl: string;
  protected readonly cdn: string;

  constructor(baseUrl: string, cdn: string) {
    this.baseUrl = baseUrl;
    this.cdn = cdn;
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return (await response.json()) as T;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`);
    return this.handleResponse<T>(res);
  }

  protected async post<T>(endpoint: string, data: object): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(res);
  }
}
