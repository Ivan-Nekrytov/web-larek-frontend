export interface View {
  render(data: unknown): void;
  show(): void;
  hide(): void;
}