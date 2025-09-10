export type EventName = string | RegExp;
export type EventHandler<T = any> = (payload: T) => void;

export interface IEvents {
  on<T = any>(event: EventName, handler: EventHandler<T>): void;
  off<T = any>(event: EventName, handler: EventHandler<T>): void;
  once<T = any>(event: EventName, handler: EventHandler<T>): void;
  emit<T = any>(event: string, payload?: T): void;
  trigger<T = any>(event: string, context?: Partial<T>): (payload?: Partial<T>) => void;
}

type Bucket = Map<EventName, Set<EventHandler>>;

export class EventBus implements IEvents {
  private buckets: Bucket = new Map();

  on<T = any>(event: EventName, handler: EventHandler<T>): void {
    if (!this.buckets.has(event)) this.buckets.set(event, new Set());
    this.buckets.get(event)!.add(handler as EventHandler);
  }

  off<T = any>(event: EventName, handler: EventHandler<T>): void {
    const set = this.buckets.get(event);
    if (!set) return;
    set.delete(handler as EventHandler);
    if (set.size === 0) this.buckets.delete(event);
  }

  once<T = any>(event: EventName, handler: EventHandler<T>): void {
    const wrapper: EventHandler = (p: T) => {
      this.off(event, wrapper as EventHandler);
      (handler as EventHandler)(p);
    };
    this.on(event, wrapper as EventHandler);
  }

  emit<T = any>(event: string, payload?: T): void {
    for (const [key, set] of this.buckets.entries()) {
      const isMatch =
        typeof key === 'string' ? key === event : (key as RegExp).test(event);
      if (isMatch) {
        for (const fn of Array.from(set)) {
          try { (fn as EventHandler<T>)(payload as T); } catch (e) { console.error(e); }
        }
      }
    }
  }

  trigger<T = any>(event: string, context?: Partial<T>) {
    return (payload?: Partial<T>) => {
      this.emit<T>(event, { ...(context || {}), ...(payload || {}) } as T);
    };
  }
}