"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 42;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Japanese sakura + Nepali festival warmth ---
    const ambient = new THREE.AmbientLight(0xfff4df, 0.95);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xd63f35, 2.3, 76);
    pointLight.position.set(8, 5, 12);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffb000, 1.9, 70);
    pointLight2.position.set(-10, -3, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x2d68ff, 1.25, 64);
    pointLight3.position.set(0, 11, 8);
    scene.add(pointLight3);

    // --- Central sunlight glow ---
    const glowGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffb000, transparent: true, opacity: 0.12 });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    glowSphere.position.set(0, 0.5, -4);
    scene.add(glowSphere);

    // --- Gentle orbit arcs ---
    const ringGeo = new THREE.TorusGeometry(4.1, 0.035, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd63f35, transparent: true, opacity: 0.16 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(6, 0.024, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x2d68ff, transparent: true, opacity: 0.12 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    // --- Particles ---
    const mouse = new THREE.Vector2(9999, 9999);
    const mouseWorld = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    const PARTICLE_COUNT = 460;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const data: {
      vx: number;
      vy: number;
      vz: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      phase: number;
      lift: number;
      sway: number;
    }[] = [];

    const palette = [
      new THREE.Color(0xff7aa8),
      new THREE.Color(0xffb7c9),
      new THREE.Color(0xffb000),
      new THREE.Color(0xd81920),
      new THREE.Color(0xd63f35),
      new THREE.Color(0x2d68ff),
      new THREE.Color(0xf7f1df),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const rangeX = 54;
      const rangeY = 30;
      const rangeZ = 28;
      const x = (Math.random() - 0.5) * rangeX;
      const y = (Math.random() - 0.5) * rangeY;
      const z = (Math.random() - 0.5) * rangeZ - 4;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      const s = 0.18 + Math.random() * 0.72;
      sizes[i] = s;

      data.push({
        vx: (Math.random() - 0.5) * 0.012,
        vy: 0.006 + Math.random() * 0.012,
        vz: (Math.random() - 0.5) * 0.008,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: s,
        phase: Math.random() * Math.PI * 2,
        lift: 0.006 + Math.random() * 0.014,
        sway: 0.018 + Math.random() * 0.035,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleTexture = (() => {
      const c = document.createElement("canvas");
      c.width = 48;
      c.height = 48;
      const ct = c.getContext("2d")!;
      const petal = ct.createRadialGradient(23, 18, 2, 24, 24, 22);
      petal.addColorStop(0, "rgba(255,255,255,0.92)");
      petal.addColorStop(0.35, "rgba(255,183,201,0.78)");
      petal.addColorStop(0.72, "rgba(214,63,53,0.34)");
      petal.addColorStop(1, "rgba(214,63,53,0)");
      ct.translate(24, 24);
      ct.rotate(-0.35);
      ct.scale(1.35, 0.82);
      ct.beginPath();
      ct.ellipse(0, 0, 13, 18, 0, 0, Math.PI * 2);
      ct.fillStyle = petal;
      ct.fill();
      return new THREE.CanvasTexture(c);
    })();

    const material = new THREE.PointsMaterial({
      size: 0.68,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
      map: particleTexture,
      depthWrite: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const SPARKLE_COUNT = 120;
    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(SPARKLE_COUNT * 3);
    const sparkleColors = new Float32Array(SPARKLE_COUNT * 3);
    const sparkleData: { baseX: number; baseY: number; baseZ: number; phase: number; speed: number }[] = [];
    const sparklePalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xffe4a3),
      new THREE.Color(0xc7ff46),
      new THREE.Color(0xffb7c9),
    ];

    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 18 - 8;
      sparklePositions[i * 3] = x;
      sparklePositions[i * 3 + 1] = y;
      sparklePositions[i * 3 + 2] = z;

      const color = sparklePalette[Math.floor(Math.random() * sparklePalette.length)];
      sparkleColors[i * 3] = color.r;
      sparkleColors[i * 3 + 1] = color.g;
      sparkleColors[i * 3 + 2] = color.b;

      sparkleData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.75 + Math.random() * 1.25,
      });
    }

    sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
    sparkleGeometry.setAttribute("color", new THREE.BufferAttribute(sparkleColors, 3));

    const sparkleTexture = (() => {
      const c = document.createElement("canvas");
      c.width = 48;
      c.height = 48;
      const ct = c.getContext("2d")!;
      const gradient = ct.createRadialGradient(24, 24, 0, 24, 24, 22);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.22, "rgba(255,236,178,0.9)");
      gradient.addColorStop(0.46, "rgba(255,236,178,0.25)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ct.fillStyle = gradient;
      ct.fillRect(0, 0, 48, 48);
      ct.strokeStyle = "rgba(255,255,255,0.8)";
      ct.lineWidth = 1.2;
      ct.beginPath();
      ct.moveTo(24, 7);
      ct.lineTo(24, 41);
      ct.moveTo(7, 24);
      ct.lineTo(41, 24);
      ct.stroke();
      return new THREE.CanvasTexture(c);
    })();

    const sparkleMaterial = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.54,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: sparkleTexture,
      depthWrite: false,
    });
    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(sparkles);

    // --- Connection lines ---
    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffb000,
      transparent: true,
      opacity: 0.025,
      blending: THREE.NormalBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    function updateConnections() {
      const pos = particles.geometry.attributes.position.array as Float32Array;
      const pairs: number[] = [];
      const maxDist = 6.2;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < maxDist) {
            pairs.push(
              pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
              pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
            );
          }
        }
      }
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(pairs, 3));
      lineGeo.setDrawRange(0, pairs.length);
    }

    let animationId: number;
    let frameCount = 0;
    let time = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      frameCount++;
      time += 0.006;

      // Animate rings
      ring.rotation.z += 0.003;
      ring2.rotation.y += 0.002;
      ring2.rotation.x += 0.001;

      // Pulse glow sphere
      const pulse = 0.16 + Math.sin(time * 2) * 0.06;
      glowSphere.material.opacity = pulse;
      glowSphere.scale.setScalar(1 + Math.sin(time * 1.5) * 0.1);

      // Animate point lights
      pointLight.position.x = Math.sin(time * 0.7) * 8;
      pointLight.position.z = Math.cos(time * 0.7) * 8;
      pointLight2.position.x = Math.sin(time * 0.5 + 2) * 6;
      pointLight2.position.z = Math.cos(time * 0.5 + 2) * 6;

      const pos = particles.geometry.attributes.position.array as Float32Array;
      const sparklePos = sparkles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const d = data[i];

        const px = pos[i * 3];
        const py = pos[i * 3 + 1];
        const pz = pos[i * 3 + 2];

        const dx = px - mouseWorld.x;
        const dy = py - mouseWorld.y;
        const dz = pz - mouseWorld.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let fx = 0, fy = 0, fz = 0;

        if (dist < 9 && mouseWorld.x !== 0) {
          const strength = 0.7 / (dist + 0.1);
          fx += (dx / dist) * strength;
          fy += (dy / dist) * strength;
          fz += (dz / dist) * strength;
        }

        const wave = Math.sin(time * 2 + d.phase);
        const toCenter = 0.0022;
        fx -= (px - d.baseX) * toCenter;
        fy -= (py - d.baseY) * (toCenter * 0.55);
        fz -= (pz - d.baseZ) * toCenter;
        fx += wave * d.sway * 0.05;
        fy += d.lift;

        d.vx += fx;
        d.vy += fy;
        d.vz += fz;

        d.vx *= 0.96;
        d.vy *= 0.96;
        d.vz *= 0.96;

        pos[i * 3] += d.vx;
        pos[i * 3 + 1] += d.vy;
        pos[i * 3 + 2] += d.vz;

        if (pos[i * 3 + 1] > 18) {
          pos[i * 3 + 1] = -16;
          pos[i * 3] = d.baseX + (Math.random() - 0.5) * 5;
        }
        if (Math.abs(pos[i * 3]) > 30) d.vx *= -0.65;
        if (Math.abs(pos[i * 3 + 2]) > 22) d.vz *= -0.65;
      }

      particles.geometry.attributes.position.needsUpdate = true;

      for (let i = 0; i < SPARKLE_COUNT; i++) {
        const d = sparkleData[i];
        const twinkle = Math.sin(time * 5 * d.speed + d.phase);
        sparklePos[i * 3] = d.baseX + Math.sin(time * 0.9 + d.phase) * 0.7;
        sparklePos[i * 3 + 1] = d.baseY + Math.cos(time * 0.7 + d.phase) * 0.55;
        sparklePos[i * 3 + 2] = d.baseZ + twinkle * 0.35;
      }
      sparkles.geometry.attributes.position.needsUpdate = true;
      sparkleMaterial.opacity = 0.38 + Math.sin(time * 1.8) * 0.12;

      if (frameCount % 3 === 0) updateConnections();

      renderer.render(scene, camera);
    }
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.ray.intersectPlane(plane, mouseWorld);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="scene-container" />;
}
