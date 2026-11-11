export const MIN_ZOOM = 1;
export const MAX_ZOOM = 3;
export function boundedPage(page: number, total: number) {
  return Math.max(1, Math.min(total, page));
}
export function boundedZoom(zoom: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(zoom * 100) / 100));
}