import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Rotate3d, Wind, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { luxuryAudio } from '../utils/audio';
import { useTheme } from '../theme/ThemeContext';

interface Hero3DCanvasProps {
  onInteract?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { activeTheme } = useTheme();

  // Dock state
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [selectedColor, setSelectedColor] = useState<'burgundy' | 'sapphire' | 'ivory' | 'gold' | 'emerald'>(
    activeTheme.swatchSilkId
  );
  const [isRotating, setIsRotating] = useState(true);
  const [isFluttering, setIsFluttering] = useState(true);

  // Sync with theme change
  useEffect(() => {
    setSelectedColor(activeTheme.swatchSilkId);
  }, [activeTheme.swatchSilkId]);

  // Mutable refs to pass React state into the 60fps Three.js loop without re-triggering useEffect
  const colorRef = useRef<'burgundy' | 'sapphire' | 'ivory' | 'gold' | 'emerald'>(activeTheme.swatchSilkId);
  const rotatingRef = useRef(true);
  const flutteringRef = useRef(true);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    rotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    flutteringRef.current = isFluttering;
  }, [isFluttering]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to pace loop accordingly
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(activeTheme.colors.bg);
    scene.fog = new THREE.FogExp2(bgColor, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0.95, 3.8);
    camera.lookAt(0, 0.85, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting Rig with guaranteed Ambient fill
    const ambientLight = new THREE.AmbientLight(0xFFF4E5, 2.0);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xFFE8C4, 3.8);
    keyLight.position.set(3, 4, 3.5);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    // Royal sapphire / golden rim light
    const rimLight = new THREE.DirectionalLight(0x4F80E2, 2.8);
    rimLight.position.set(-3.5, 3, -2.5);
    scene.add(rimLight);

    // Sky/Ground hemisphere fill
    const hemiLight = new THREE.HemisphereLight(0xFFDCA0, bgColor.getHex(), 1.4);
    scene.add(hemiLight);

    // Studio Environment map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback to ambient and hemisphere lights
    }

    // Procedural Silk Bump Map
    const createSilkBumpTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 256, 256);

      // Fine woven silk threads
      ctx.fillStyle = '#909090';
      for (let i = 0; i < 256; i += 4) {
        ctx.fillRect(i, 0, 1.5, 256);
        ctx.fillRect(0, i, 256, 1.5);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(16, 16);
      return texture;
    };
    const silkBumpMap = createSilkBumpTexture();

    // Procedural Contact Shadow Texture
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(40, 20, 25, 0.45)');
      grad.addColorStop(0.5, 'rgba(40, 20, 25, 0.18)');
      grad.addColorStop(1, 'rgba(40, 20, 25, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // Color definitions for lehenga silk
    const paletteMap = {
      burgundy: { color: 0x54252F, sheen: 0xC6A56B, roughness: 0.32, metalness: 0.15 },
      sapphire: { color: 0x1A2E5A, sheen: 0x6E95D4, roughness: 0.28, metalness: 0.22 },
      ivory: { color: 0xF7F2EA, sheen: 0xE0C794, roughness: 0.28, metalness: 0.1 },
      gold: { color: 0xC6A56B, sheen: 0xFFF5E1, roughness: 0.22, metalness: 0.45 },
      emerald: { color: 0x1A382E, sheen: 0xC6A56B, roughness: 0.3, metalness: 0.2 },
    };

    // Root model group
    const outfitGroup = new THREE.Group();
    outfitGroup.position.set(0, -0.05, 0);
    scene.add(outfitGroup);

    // 1. Turned Marble Pedestal
    const pedestalPoints: THREE.Vector2[] = [];
    pedestalPoints.push(new THREE.Vector2(0, 0));
    pedestalPoints.push(new THREE.Vector2(1.2, 0));
    pedestalPoints.push(new THREE.Vector2(1.15, 0.05));
    pedestalPoints.push(new THREE.Vector2(1.1, 0.08));
    pedestalPoints.push(new THREE.Vector2(0.95, 0.12));
    pedestalPoints.push(new THREE.Vector2(0.95, 0.14));
    pedestalPoints.push(new THREE.Vector2(0, 0.14));

    const pedestalGeo = new THREE.LatheGeometry(pedestalPoints, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xECE4D8,
      roughness: 0.35,
      metalness: 0.05,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.receiveShadow = !isSoftwareGl;
    pedestal.position.y = -0.05;
    outfitGroup.add(pedestal);

    // Pedestal Gold Rim
    const rimRingGeo = new THREE.TorusGeometry(0.96, 0.015, 16, 48);
    const goldZariMat = new THREE.MeshStandardMaterial({
      color: 0xC6A56B,
      roughness: 0.18,
      metalness: 0.88,
    });
    const rimRing = new THREE.Mesh(rimRingGeo, goldZariMat);
    rimRing.rotation.x = Math.PI / 2;
    rimRing.position.y = 0.14;
    outfitGroup.add(rimRing);

    // Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.145;
    outfitGroup.add(shadowMesh);

    // 2. Sculpted Couture Dress Form (Torso)
    const torsoPoints: THREE.Vector2[] = [];
    torsoPoints.push(new THREE.Vector2(0.12, 1.8)); // Neck
    torsoPoints.push(new THREE.Vector2(0.16, 1.75));
    torsoPoints.push(new THREE.Vector2(0.32, 1.62)); // Shoulders
    torsoPoints.push(new THREE.Vector2(0.28, 1.45)); // Bust
    torsoPoints.push(new THREE.Vector2(0.21, 1.25)); // Waist
    torsoPoints.push(new THREE.Vector2(0.31, 0.95)); // Hips
    torsoPoints.push(new THREE.Vector2(0.24, 0.8));
    torsoPoints.push(new THREE.Vector2(0, 0.8));

    const torsoGeo = new THREE.LatheGeometry(torsoPoints, 36);
    const mannequinMat = new THREE.MeshStandardMaterial({
      color: 0xE8DFC8,
      roughness: 0.45,
      metalness: 0.05,
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, mannequinMat);
    torsoMesh.castShadow = !isSoftwareGl;
    outfitGroup.add(torsoMesh);

    // 3. Fitted Bridal Blouse (Choli) with Sweetheart Neckline
    const blouseMat = new THREE.MeshPhysicalMaterial({
      color: paletteMap.burgundy.color,
      roughness: paletteMap.burgundy.roughness,
      metalness: paletteMap.burgundy.metalness,
      bumpMap: silkBumpMap,
      bumpScale: 0.003,
      sheen: 0.6,
      sheenColor: new THREE.Color(paletteMap.burgundy.sheen),
    });

    const blousePoints: THREE.Vector2[] = [];
    blousePoints.push(new THREE.Vector2(0.22, 1.7));
    blousePoints.push(new THREE.Vector2(0.33, 1.62));
    blousePoints.push(new THREE.Vector2(0.29, 1.45));
    blousePoints.push(new THREE.Vector2(0.22, 1.25));
    blousePoints.push(new THREE.Vector2(0.218, 1.23));
    blousePoints.push(new THREE.Vector2(0, 1.23));

    const blouseGeo = new THREE.LatheGeometry(blousePoints, 36);
    const blouseMesh = new THREE.Mesh(blouseGeo, blouseMat);
    blouseMesh.scale.set(1.02, 1.02, 1.02);
    blouseMesh.castShadow = !isSoftwareGl;
    outfitGroup.add(blouseMesh);

    // Blouse Zari Neckline & Hem Trim
    const necklineTrimGeo = new THREE.TorusGeometry(0.22, 0.012, 12, 32);
    const necklineTrim = new THREE.Mesh(necklineTrimGeo, goldZariMat);
    necklineTrim.rotation.x = Math.PI / 2;
    necklineTrim.position.set(0, 1.64, 0);
    outfitGroup.add(necklineTrim);

    const waistTrimGeo = new THREE.TorusGeometry(0.222, 0.012, 12, 32);
    const waistTrim = new THREE.Mesh(waistTrimGeo, goldZariMat);
    waistTrim.rotation.x = Math.PI / 2;
    waistTrim.position.set(0, 1.24, 0);
    outfitGroup.add(waistTrim);

    // 4. Flared Royal Lehenga Skirt with Undulating Pleats
    const skirtHeight = 1.1;
    const skirtRadialSegments = 72;
    const skirtHeightSegments = 32;

    const skirtGeo = new THREE.CylinderGeometry(
      0.22, // top radius (waist)
      0.88, // bottom radius (hem flare)
      skirtHeight,
      skirtRadialSegments,
      skirtHeightSegments,
      true
    );

    // Apply mathematical pleat harmonics to the skirt vertices
    const skirtPos = skirtGeo.attributes.position;
    const pleatCount = 18;
    const originalSkirtPositions: number[] = [];

    for (let i = 0; i < skirtPos.count; i++) {
      const x = skirtPos.getX(i);
      const y = skirtPos.getY(i);
      const z = skirtPos.getZ(i);

      originalSkirtPositions.push(x, y, z);

      // Height factor clamped from 0 (waist) to 1 (hem)
      const hNorm = Math.max(0, Math.min(1, 0.5 - (y / skirtHeight)));
      const angle = Math.atan2(z, x);
      const pleatWave = Math.sin(angle * pleatCount) * 0.045 * Math.pow(hNorm, 1.4);

      const radius = Math.sqrt(x * x + z * z) + pleatWave;
      skirtPos.setX(i, Math.cos(angle) * radius);
      skirtPos.setZ(i, Math.sin(angle) * radius);
    }
    skirtGeo.computeVertexNormals();

    const skirtMat = new THREE.MeshPhysicalMaterial({
      color: paletteMap.burgundy.color,
      roughness: paletteMap.burgundy.roughness,
      metalness: paletteMap.burgundy.metalness,
      bumpMap: silkBumpMap,
      bumpScale: 0.005,
      sheen: 0.75,
      sheenColor: new THREE.Color(paletteMap.burgundy.sheen),
      side: THREE.DoubleSide,
    });

    const skirtMesh = new THREE.Mesh(skirtGeo, skirtMat);
    skirtMesh.position.set(0, 0.69, 0);
    skirtMesh.castShadow = !isSoftwareGl;
    skirtMesh.receiveShadow = !isSoftwareGl;
    outfitGroup.add(skirtMesh);

    // Heavy Gold Zari Border at Hem
    const hemBorderGeo = new THREE.TorusGeometry(0.89, 0.024, 16, 64);
    const hemBorder = new THREE.Mesh(hemBorderGeo, goldZariMat);
    hemBorder.rotation.x = Math.PI / 2;
    hemBorder.position.set(0, 0.15, 0);
    outfitGroup.add(hemBorder);

    // 5. Flowing Dupatta (Veil Drape) wrapping shoulder & waist
    const dupattaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.36, 1.62, 0.1), // shoulder crest
      new THREE.Vector3(0.28, 1.45, 0.22),
      new THREE.Vector3(0.12, 1.25, 0.28), // crossing chest
      new THREE.Vector3(-0.25, 1.15, 0.22), // left waist
      new THREE.Vector3(-0.35, 0.85, 0.26),
      new THREE.Vector3(-0.42, 0.45, 0.32),
      new THREE.Vector3(-0.38, 0.18, 0.38), // fluttering hem
    ]);

    const dupattaGeo = new THREE.TubeGeometry(dupattaCurve, 40, 0.065, 8, false);
    const dupattaMat = new THREE.MeshPhysicalMaterial({
      color: 0xC6A56B,
      roughness: 0.2,
      metalness: 0.35,
      transparent: true,
      opacity: 0.88,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xFFF6E6),
      side: THREE.DoubleSide,
    });
    const dupattaMesh = new THREE.Mesh(dupattaGeo, dupattaMat);
    dupattaMesh.castShadow = !isSoftwareGl;
    outfitGroup.add(dupattaMesh);

    // 6. Delicate Gold Latkan (Tassels dangling from waist)
    const tasselGroup = new THREE.Group();
    tasselGroup.position.set(-0.24, 1.22, 0.05);

    const cordGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.28, 8);
    const cordMesh = new THREE.Mesh(cordGeo, goldZariMat);
    cordMesh.position.y = -0.14;
    tasselGroup.add(cordMesh);

    const bellGeo = new THREE.ConeGeometry(0.024, 0.06, 12);
    const bellMesh = new THREE.Mesh(bellGeo, goldZariMat);
    bellMesh.position.y = -0.28;
    tasselGroup.add(bellMesh);

    outfitGroup.add(tasselGroup);

    // 7. Floating Golden Silk Shimmer Particles (Instanced)
    const particleCount = 60;
    const particleGeo = new THREE.SphereGeometry(0.008, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xE0C794,
      transparent: true,
      opacity: 0.7,
    });
    const particleMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    const dummyMat4 = new THREE.Matrix4();
    const particleInitialY: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.4 + Math.random() * 0.9;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = 0.2 + Math.random() * 1.8;
      const z = Math.sin(angle) * radius;
      particleInitialY.push(y);

      dummyMat4.setPosition(x, y, z);
      particleMesh.setMatrixAt(i, dummyMat4);
    }
    particleMesh.instanceMatrix.needsUpdate = true;
    scene.add(particleMesh);

    // Interaction handling: Mouse parallax & drag
    let targetRotationY = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        targetRotationY += deltaX * 0.008;
        prevMouseX = e.clientX;
      } else {
        // Subtle tilt parallax
        const normX = (e.clientX / window.innerWidth) - 0.5;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, normX * 0.35, 2.5, 0.016);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let frameId = 0;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const time = now / 1000;

      // Continuous turntable rotation if enabled
      if (rotatingRef.current && !isDragging) {
        targetRotationY += delta * 0.35;
      }

      // Smooth exponential damping
      currentRotationY = THREE.MathUtils.damp(currentRotationY, targetRotationY, 4.0, delta);
      outfitGroup.rotation.y = currentRotationY;
      camera.lookAt(0, 0.85, 0);

      // Color updates from ref
      const currentConfig = paletteMap[colorRef.current];
      blouseMat.color.lerp(new THREE.Color(currentConfig.color), delta * 5);
      skirtMat.color.lerp(new THREE.Color(currentConfig.color), delta * 5);
      skirtMat.sheenColor.lerp(new THREE.Color(currentConfig.sheen), delta * 5);

      // Fabric flutter animation on skirt vertices
      if (flutteringRef.current && !isSoftwareGl) {
        const pos = skirtGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const origX = originalSkirtPositions[i * 3];
          const origY = originalSkirtPositions[i * 3 + 1];
          const origZ = originalSkirtPositions[i * 3 + 2];

          const hNorm = Math.max(0, Math.min(1, 0.5 - (origY / skirtHeight)));
          const flutter = Math.sin(time * 3 + origY * 5) * 0.015 * hNorm;
          const angle = Math.atan2(origZ, origX);
          const rad = Math.sqrt(origX * origX + origZ * origZ) + flutter;

          pos.setX(i, Math.cos(angle) * rad);
          pos.setZ(i, Math.sin(angle) * rad);
        }
        pos.needsUpdate = true;

        // Subtle tassel sway
        tasselGroup.rotation.z = Math.sin(time * 2.5) * 0.12;
      }

      // Floating Shimmer Particles Drift
      for (let i = 0; i < particleCount; i++) {
        let currentY = (particleInitialY[i] + time * 0.08) % 2.0;
        const angle = i * 0.25 + time * 0.1;
        const radius = 0.5 + (i % 5) * 0.12;
        dummyMat4.setPosition(
          Math.cos(angle) * radius,
          currentY + 0.1,
          Math.sin(angle) * radius
        );
        particleMesh.setMatrixAt(i, dummyMat4);
      }
      particleMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Start loop
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      pedestalGeo.dispose();
      pedestalMat.dispose();
      rimRingGeo.dispose();
      goldZariMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      torsoGeo.dispose();
      mannequinMat.dispose();
      blouseGeo.dispose();
      blouseMat.dispose();
      skirtGeo.dispose();
      skirtMat.dispose();
      dupattaGeo.dispose();
      dupattaMat.dispose();
      silkBumpMap.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleMesh.dispose();
      renderer.dispose();
    };
  }, []);

  const handleColorChange = (color: 'burgundy' | 'sapphire' | 'ivory' | 'gold' | 'emerald') => {
    setSelectedColor(color);
    luxuryAudio.playSilkFlutter();
  };

  return (
    <div className="relative w-full h-[620px] lg:h-[740px] select-none overflow-hidden">
      {/* Dedicated canvas mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />

      {/* Subtle guidance badge (top right of 3D canvas) */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[var(--theme-card)]/90 backdrop-blur-md border border-[var(--theme-accent)]/40 text-[11px] font-sans tracking-[0.14em] uppercase text-[var(--theme-accent)]">
        <Rotate3d className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
        <span>Drag to rotate · 360° Atelier</span>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Follows Three.js Directives §5) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-xl transition-all duration-300">
        {/* Toggle Collapse Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1 px-3 py-1 bg-[#211D1B] text-[#C6A56B] text-[10px] uppercase tracking-[0.2em] border border-[#C6A56B]/30 rounded-t-sm hover:text-white transition-colors cursor-pointer"
            aria-label={isDockCollapsed ? 'Show 3D Atelier Controls' : 'Hide Controls (Cinema View)'}
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3" />
                <span>Show Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                <span>Cinema View</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Body */}
        {!isDockCollapsed && (
          <div className="bg-[#211D1B]/95 border border-[#C6A56B]/40 p-3 sm:p-4 rounded-sm shadow-xl flex flex-wrap items-center justify-between gap-4">
            {/* Silk Color Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#E9DED0]/70 mr-1">
                Silk:
              </span>
              <button
                onClick={() => handleColorChange('burgundy')}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  selectedColor === 'burgundy'
                    ? 'border-[#C6A56B] scale-110 shadow-[0_0_8px_rgba(198,165,107,0.6)]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: '#54252F' }}
                title="Regal Crimson Burgundy"
                aria-label="Regal Crimson Burgundy"
              />
              <button
                onClick={() => handleColorChange('sapphire')}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  selectedColor === 'sapphire'
                    ? 'border-[#C6A56B] scale-110 shadow-[0_0_8px_rgba(198,165,107,0.6)]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: '#1A2E5A' }}
                title="Midnight Sapphire Blue (Bespoke Ayelin Gown)"
                aria-label="Midnight Sapphire Blue"
              />
              <button
                onClick={() => handleColorChange('ivory')}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  selectedColor === 'ivory'
                    ? 'border-[#C6A56B] scale-110 shadow-[0_0_8px_rgba(198,165,107,0.6)]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: '#F7F2EA' }}
                title="Warm Celestial Ivory"
                aria-label="Warm Celestial Ivory"
              />
              <button
                onClick={() => handleColorChange('gold')}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  selectedColor === 'gold'
                    ? 'border-[#C6A56B] scale-110 shadow-[0_0_8px_rgba(198,165,107,0.6)]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: '#C6A56B' }}
                title="Champagne Zari Gold"
                aria-label="Champagne Zari Gold"
              />
              <button
                onClick={() => handleColorChange('emerald')}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  selectedColor === 'emerald'
                    ? 'border-[#C6A56B] scale-110 shadow-[0_0_8px_rgba(198,165,107,0.6)]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: '#1A382E' }}
                title="Peacock Royal Emerald"
                aria-label="Peacock Royal Emerald"
              />
            </div>

            {/* Motion Toggles */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] font-sans border transition-colors ${
                  isRotating
                    ? 'bg-[#C6A56B]/20 text-[#FFF5E1] border-[#C6A56B]'
                    : 'text-[#E9DED0]/60 border-white/10 hover:border-white/30'
                }`}
              >
                <Rotate3d className="w-3 h-3 text-[#C6A56B]" />
                <span>Turntable</span>
              </button>

              <button
                onClick={() => setIsFluttering(!isFluttering)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] font-sans border transition-colors ${
                  isFluttering
                    ? 'bg-[#C6A56B]/20 text-[#FFF5E1] border-[#C6A56B]'
                    : 'text-[#E9DED0]/60 border-white/10 hover:border-white/30'
                }`}
              >
                <Wind className="w-3 h-3 text-[#C6A56B]" />
                <span>Drape Waves</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
