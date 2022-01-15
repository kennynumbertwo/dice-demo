import React from 'react';

function LifeBarPlayer({width, current, max}) {
  const fullWidth = 38;
  const percent = current / max;
  const pixelFill = Math.floor(fullWidth * percent);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 -0.5 44 9" shapeRendering="crispEdges">
      <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
      <path stroke="#000000" d="M2 0h40M1 1h1M42 1h1M0 2h1M2 2h40M43 2h1M0 3h1M2 3h1M41 3h1M43 3h1M0 4h1M2 4h1M41 4h1M43 4h1M0 5h1M2 5h1M41 5h1M43 5h1M0 6h1M2 6h40M43 6h1M1 7h1M42 7h1M2 8h40" />
      <path stroke="#ffffff" d="M2 1h40M1 2h1M42 2h1M1 3h1M42 3h1M1 4h1M42 4h1M1 5h1M42 5h1M1 6h1M42 6h1M2 7h40" />
      <path stroke="#391616" d="M3 3h38" />
      <path stroke="#551f1f" d="M3 4h38M3 5h38" />
      <rect fill='#4ccec8' x={3} y={2.5} width={pixelFill} height={3} style={{transition: 'all 500ms ease-in-out'}} />
      <rect fill='#209690' x={3} y={2.5} width={pixelFill} height={1} style={{transition: 'all 500ms ease-in-out'}} />
    </svg>
  )
}

export default LifeBarPlayer;
