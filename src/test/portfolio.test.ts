import { describe, expect, it } from 'vitest';
import { ORIGINAL_PDFS, PORTFOLIO } from '@/lib/portfolio';
import { boundedPage, boundedZoom } from '@/lib/portfolio-reader';

describe('Authorized original portfolio PDFs', () => {
  it('preserves the authorized 93 pages across six originals', () => {
    expect(PORTFOLIO.map((project) => project.pages)).toEqual([38, 16, 28, 9, 1, 1]);
    expect(PORTFOLIO.reduce((sum, project) => sum + project.pages, 0)).toBe(93);
  });
  it.each([38, 16, 28, 9, 1])('keeps reader navigation inside a %i-page document', (total) => {
    expect(boundedPage(0, total)).toBe(1);
    expect(boundedPage(total + 1, total)).toBe(total);
    expect(boundedPage(total, total)).toBe(total);
  });
  it('bounds zoom and preserves quarter increments', () => {
    expect(boundedZoom(.75)).toBe(1);
    expect(boundedZoom(3.25)).toBe(3);
    expect(boundedZoom(1.25)).toBe(1.25);
  });
  it.each(PORTFOLIO)('$slug references a permanent original with its exact byte count', (project) => {
    const pdf = ORIGINAL_PDFS[project.slug];
    expect(pdf.size).toBe(project.bytes);
    expect(pdf.url).toMatch(/^\/__l5e\/assets-v1\/[^/]+\/[a-z0-9-]+\.pdf$/);
    expect(pdf.original_filename).toBe(`${project.slug}.pdf`);
  });
});