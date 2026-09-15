"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LottieBg() {
  return (
    <div className="w-full h-full overflow-hidden">
      <DotLottieReact
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
        src="https://lottie.host/e1c35b11-01ca-481b-8170-aee4cd5f97df/75lDrECXgN.lottie"
        loop
        autoplay
        layout={{
          fit: 'cover',
          align: [0.5, 0.5],
        }}
      />
    </div>
  );
}

