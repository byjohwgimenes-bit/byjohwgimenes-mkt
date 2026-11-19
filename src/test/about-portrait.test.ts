import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Public portrait assets', () => {
  it.each([
    ['src/routes/sobre-mim.tsx', '/images/johw-sobre-mim.webp'],
    ['src/components/HeroPortrait.tsx', '/images/johw-marketing.png?v=20261119'],
  ])('serves the portrait in %s from the deployable public directory', (file, url) => {
    expect(readFileSync(resolve(file), 'utf8')).toContain(`src="${url}"`);
    expect(existsSync(resolve(`public${url.split("?")[0]}`))).toBe(true);
  });
});
