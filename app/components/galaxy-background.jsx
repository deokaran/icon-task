// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useMemo } from "react";

// const COUNT = 30000;
// const ARMS = 5;
// const RADIUS = 80;

// function Galaxy() {
//     const geometry = useMemo(() => {
//         const geo = new THREE.BufferGeometry();

//         const positions = new Float32Array(COUNT * 3);
//         const colors = new Float32Array(COUNT * 3);

//         const color = new THREE.Color();

//         for (let i = 0; i < COUNT; i++) {
//             const radius = Math.sqrt(Math.random()) * RADIUS;
//             const arm = i % ARMS;

//             const angle =
//                 (arm / ARMS) * Math.PI * 2 +
//                 radius * 0.12 +
//                 (Math.random() - 0.5) * 0.5;

//             const spread = radius * 0.08;

//             positions[i * 3] =
//                 Math.cos(angle) * radius +
//                 (Math.random() - 0.5) * spread;

//             positions[i * 3 + 1] =
//                 (Math.random() - 0.5) * radius * 0.08;

//             positions[i * 3 + 2] =
//                 Math.sin(angle) * radius +
//                 (Math.random() - 0.5) * spread;

//             color.setHSL(
//                 0.62 - (radius / RADIUS) * 0.5,
//                 0.8,
//                 0.5 + Math.random() * 0.3
//             );

//             colors[i * 3] = color.r;
//             colors[i * 3 + 1] = color.g;
//             colors[i * 3 + 2] = color.b;
//         }

//         geo.setAttribute(
//             "position",
//             new THREE.BufferAttribute(positions, 3)
//         );

//         geo.setAttribute(
//             "color",
//             new THREE.BufferAttribute(colors, 3)
//         );

//         return geo;
//     }, []);

//     useFrame((state) => {
//         state.scene.rotation.y += 0.0005;
//     });

//     return (
//         <points geometry={geometry}>
//             <pointsMaterial
//                 size={0.25}
//                 vertexColors
//                 transparent
//                 opacity={0.8}
//                 sizeAttenuation
//                 blending={THREE.AdditiveBlending}
//                 depthWrite={false}
//             />
//         </points>
//     );
// }

// export default function GalaxyBackground() {
//     return (
//         <div className="fixed inset-0 bg-black">
//             <Canvas
//                 camera={{
//                     position: [0, 35, 100],
//                     fov: 60,
//                 }}
//             >
//                 <Galaxy />
//             </Canvas>
//         </div>
//     );
// }   


'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

function ParticleSwarm() {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 5;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    }
    return pos;
  }, []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  // Tunable parameters for the scene
  const PARAMS = useMemo(
    () => ({ scale: 79.8, speed: -0.1 , arms: 20, thick: 0.1, bloom: 1 }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;

    for (let i = 0; i < count; i++) {
      const scale = PARAMS.scale;
      const speed = PARAMS.speed;
      const arms = PARAMS.arms;
      const thick = PARAMS.thick;
      const bloom = PARAMS.bloom;

      const h1 = Math.sin(i * 127.1) * 43758.5453;
      const r1 = h1 - Math.floor(h1);
      const h2 = Math.sin(i * 311.7) * 43758.5453;
      const r2 = h2 - Math.floor(h2);
      const h3 = Math.sin(i * 74.93) * 43758.5453;
      const r3 = h3 - Math.floor(h3);
      const h4 = Math.sin(i * 191.3) * 43758.5453;
      const r4 = h4 - Math.floor(h4);
      const h5 = Math.sin(i * 233.7) * 43758.5453;
      const r5 = h5 - Math.floor(h5);

      // Layer split: 48% disk arms, 16% core, 11% halo, 8% dust, 8% bg stars, 7% planets, 2% sun
      const layer = r4;
      const inArm = layer < 0.48;
      const inCore = layer >= 0.48 && layer < 0.64;
      const inHalo = layer >= 0.64 && layer < 0.75;
      const inDust = layer >= 0.75 && layer < 0.83;
      const inBgStar = layer >= 0.83 && layer < 0.91;
      const inPlanet = layer >= 0.91 && layer < 0.98;
      const inSun = layer >= 0.98;

      // ── SPIRAL ARMS ───────────────────────────────────────────
      const armIdx = Math.floor(r1 * arms);
      const armOff = armIdx * (6.2832 / arms);
      const rawR = r2 * r2 * scale;
      const logR = Math.max(rawR, 0.5);
      const windTight = 0.35;
      const spiralA = Math.log(logR / (scale * 0.01) + 1.0) / windTight + armOff;
      const orbSpeed = speed * (1.0 / (0.12 + logR / scale));
      const totalA = spiralA + time * orbSpeed * 0.15;
      const armScatter = (r3 - 0.5) * scale * 0.045 * (0.3 + logR / scale);
      const armX = inArm
        ? Math.cos(totalA) * logR + Math.cos(totalA + 1.5708) * armScatter
        : 0.0;
      const armZ = inArm
        ? Math.sin(totalA) * logR + Math.sin(totalA + 1.5708) * armScatter
        : 0.0;
      const armY = inArm
        ? (r1 - 0.5) * scale * thick * (0.2 + 0.8 * (1.0 - logR / scale))
        : 0.0;

      // ── CORE BULGE ────────────────────────────────────────────
      const cTheta = r1 * 6.2832;
      const cPhi = r2 * 3.1416;
      const cR = scale * 0.14 * r3 * r3;
      const cx = inCore ? Math.sin(cPhi) * Math.cos(cTheta) * cR : 0.0;
      const cy = inCore ? Math.cos(cPhi) * cR * 0.55 : 0.0;
      const cz = inCore ? Math.sin(cPhi) * Math.sin(cTheta) * cR : 0.0;

      // ── STELLAR HALO ──────────────────────────────────────────
      const hTheta = r1 * 6.2832;
      const hPhi = r2 * 3.1416;
      const hR = scale * (0.4 + r3 * 0.6);
      const hx = inHalo ? Math.sin(hPhi) * Math.cos(hTheta) * hR : 0.0;
      const hy = inHalo ? Math.cos(hPhi) * hR * 0.7 : 0.0;
      const hz = inHalo ? Math.sin(hPhi) * Math.sin(hTheta) * hR : 0.0;

      // ── DUST LANES ────────────────────────────────────────────
      const dArmIdx = Math.floor(r1 * arms);
      const dArmOff = dArmIdx * (6.2832 / arms) + (3.1416 / arms) * 0.5;
      const dRawR = (0.1 + r2 * 0.7) * scale;
      const dSpiralA = Math.log(dRawR / (scale * 0.01) + 1.0) / windTight + dArmOff;
      const dTotalA = dSpiralA + time * speed * 0.08;
      const dx2 = inDust ? Math.cos(dTotalA) * dRawR : 0.0;
      const dy2 = inDust ? (r3 - 0.5) * scale * thick * 0.15 : 0.0;
      const dz2 = inDust ? Math.sin(dTotalA) * dRawR : 0.0;

      // ── BACKGROUND STARS ──────────────────────────────────────
      const bsTheta = r1 * 6.2832;
      const bsPhi = r2 * 3.1416;
      const bsR = scale * (1.1 + r3 * 2.2);
      const bsx = inBgStar ? Math.sin(bsPhi) * Math.cos(bsTheta) * bsR : 0.0;
      const bsy = inBgStar ? Math.cos(bsPhi) * bsR : 0.0;
      const bsz = inBgStar ? Math.sin(bsPhi) * Math.sin(bsTheta) * bsR : 0.0;

      // ── PLANETS ───────────────────────────────────────────────
      const sunDist = scale * 0.28;
      const sunAngle = 0.9;
      const sunX = Math.cos(sunAngle) * sunDist;
      const sunZ = Math.sin(sunAngle) * sunDist;

      const planetIdx = Math.floor(r5 * 1.0);
      const pOrbitR = scale * (0.012 + planetIdx * 0.018 + r1 * 0.004);
      const pOrbitSpeed = speed * (3.5 / (0.5 + planetIdx * 0.6));
      const pAngle = r2 * 6.2832 + time * pOrbitSpeed;
      const pTilt = (r3 - 0.5) * 0.18;
      const px2 = inPlanet ? sunX + Math.cos(pAngle) * pOrbitR : 0.0;
      const py2 = inPlanet ? Math.sin(pAngle) * pOrbitR * pTilt * 6.0 : 0.0;
      const pz2 = inPlanet ? sunZ + Math.sin(pAngle) * pOrbitR : 0.0;

      // ── SUN ───────────────────────────────────────────────────
      const sPulse = 1.0 + Math.sin(time * 2.3) * 0.12 + Math.sin(time * 5.7) * 0.05;
      const sR = scale * 0.022 * sPulse * r1;
      const sTheta2 = r2 * 6.2832;
      const sPhi2 = r3 * 3.1416;
      const sx2 = inSun ? sunX + Math.sin(sPhi2) * Math.cos(sTheta2) * sR : 0.0;
      const sy2 = inSun ? Math.cos(sPhi2) * sR * 0.9 : 0.0;
      const sz2 = inSun ? sunZ + Math.sin(sPhi2) * Math.sin(sTheta2) * sR : 0.0;

      // Compose final position
      const px = inArm
        ? armX
        : inCore
        ? cx
        : inHalo
        ? hx
        : inDust
        ? dx2
        : inBgStar
        ? bsx
        : inPlanet
        ? px2
        : sx2;
      const py = inArm
        ? armY
        : inCore
        ? cy
        : inHalo
        ? hy
        : inDust
        ? dy2
        : inBgStar
        ? bsy
        : inPlanet
        ? py2
        : sy2;
      const pz = inArm
        ? armZ
        : inCore
        ? cz
        : inHalo
        ? hz
        : inDust
        ? dz2
        : inBgStar
        ? bsz
        : inPlanet
        ? pz2
        : sz2;

      target.set(px, py, pz);

      // ── HDR COLOR ─────────────────────────────────────────────
      const radFrac = Math.min(Math.sqrt(px * px + pz * pz) / scale, 1.0);
      const twinkle =
        0.88 +
        Math.sin(time * 7.0 + r1 * 314.0) * 0.08 +
        Math.sin(time * 13.0 + r2 * 271.0) * 0.04;

      let hue, sat, lit;

      if (inSun) {
        const corona = 0.85 + Math.sin(time * 4.1 + r1 * 28.0) * 0.15;
        hue = 0.1 + r1 * 0.03;
        sat = 0.9 - r3 * 0.4;
        lit = (1.8 + r2 * 1.2) * bloom * corona;
      } else if (inPlanet) {
        const planetHues = [0.08, 0.55, 0.33, 0.62, 0.07, 0.09, 0.5, 0.48];
        const planetSats = [0.95, 0.7, 0.8, 0.65, 0.9, 0.85, 0.55, 0.6];
        const pIdx = Math.min(planetIdx, 7);
        hue = planetHues[pIdx];
        sat = planetSats[pIdx];
        const distFactor = 1.0 / (0.4 + planetIdx * 0.15);
        lit = (0.4 + r1 * 0.2) * bloom * distFactor * twinkle;
      } else if (inBgStar) {
        const starType = r2;
        hue =
          starType < 0.3
            ? 0.6 + r1 * 0.05
            : starType < 0.7
            ? 0.13 + r1 * 0.04
            : 0.05 + r1 * 0.03;
        sat = 0.3 + r3 * 0.5;
        const tk = Math.abs(Math.sin(time * (3.0 + r3 * 9.0) + r1 * 628.0));
        lit = (0.15 + r2 * 0.4 + tk * 0.6) * bloom * 0.6;
      } else if (inCore) {
        hue = 0.1 + r1 * 0.05;
        sat = 0.6 - r3 * 0.3;
        lit = (1.2 + r2 * 0.8) * bloom;
      } else if (inArm) {
        const innerBlue = Math.max(0.0, 0.35 - radFrac * 0.35);
        const midYellow = Math.max(0.0, 1.0 - Math.abs(radFrac - 0.35) * 4.0);
        const outerBlue = Math.max(0.0, radFrac - 0.55) * 1.8;
        hue = 0.6 * innerBlue + 0.13 * midYellow + 0.62 * outerBlue + r1 * 0.06;
        sat = 0.5 + innerBlue * 0.4 + outerBlue * 0.3;
        lit = (0.3 + (1.0 - radFrac) * 0.5 + r2 * 0.2) * bloom * twinkle;
      } else if (inHalo) {
        hue = 0.04 + r1 * 0.04;
        sat = 0.5 + r2 * 0.3;
        lit = (0.05 + r3 * 0.08) * bloom * 0.4;
      } else {
        hue = 0.02 + r2 * 0.03;
        sat = 0.4;
        lit = (0.02 + r1 * 0.03) * bloom * 0.25;
      }

      color.setHSL(hue, sat, lit);

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
}

export default function Galaxy() {
  return (
    <div className='h-screen w-full overflow-hidden absolute top-0 left-0'>
      <Canvas camera={{ position: [10, 45, 150], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate />
        <Effects disableGamma>
          <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}