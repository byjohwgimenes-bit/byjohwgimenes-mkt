import { describe, expect, it } from 'vitest';
import { ORIGINAL_PDFS, PORTFOLIO } from '@/lib/portfolio';

describe('Authorized original portfolio PDFs', () => {
  it.each(PORTFOLIO)('$slug references a permanent original with its exact byte count', (project) => {
    const pdf = ORIGINAL_PDFS[project.slug];
    expect(pdf.size).toBe(project.bytes);
    expect(pdf.url).toMatch(/^\/__l5e\/assets-v1\/[^/]+\/[a-z0-9-]+\.pdf$/);
    expect(pdf.original_filename).toBe(`${project.slug}.pdf`);
  });
});