import { describe, expect, it } from 'vitest';
import aboutPortrait from '@/assets/sobre-mim-transparente.png.asset.json';

describe('About page portrait asset', () => {
  it('points at the exact attached transparent PNG as a permanent asset', () => {
    expect(aboutPortrait.original_filename).toBe('sobre-mim-transparente.png');
    expect(aboutPortrait.content_type).toBe('image/png');
    expect(aboutPortrait.size).toBe(1768291);
    expect(aboutPortrait.url).toMatch(/^\/__l5e\/assets-v1\/[^/]+\/sobre-mim-transparente\.png$/);
  });
});
