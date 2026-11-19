import { Link } from '@tanstack/react-router';
import type { PointerEvent } from 'react';

export function HeroPortrait() {
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    event.currentTarget.style.setProperty('--portrait-rx', `${-y * 8}deg`);
    event.currentTarget.style.setProperty('--portrait-ry', `${x * 8}deg`);
  };
  const reset = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--portrait-rx', '0deg');
    event.currentTarget.style.setProperty('--portrait-ry', '0deg');
  };
  return <Link to="/sobre-mim" className="brand-portrait" aria-label="Conhecer Johw e sua trajetória em marketing" onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <span className="brand-portrait-art">
      <img src="/images/johw-marketing.png?v=20261119" alt="Retrato de Johw com camiseta preta e iluminação vermelha, em composição com o símbolo branco da ByJohwGimenes." width={1638} height={2048} decoding="async" fetchPriority="high" draggable={false} />
    </span>
    <span className="brand-portrait-caption">Conheça quem está por trás da marca <span aria-hidden="true">↗</span></span>
  </Link>;
}
