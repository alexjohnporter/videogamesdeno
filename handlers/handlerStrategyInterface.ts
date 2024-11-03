export interface HandlerStrategy {
  accepts(pathName: string, method: string): boolean;
  handle(_req: Request): Promise<Response>;
}
