import { useRef, useState, Suspense, Component, type ReactNode, type ErrorInfo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { TextureLoader, MathUtils, Vector3, DoubleSide } from 'three';
import type { Group } from 'three';

/* ── WebGL support check ── */
function webGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/* ── CSS 3D fallback (used when WebGL not available) ── */
function LogoFallback({ size }: { size: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
    >
      <div
        className="rounded-full border-4 border-orange-500 shadow-2xl overflow-hidden bg-white logo-spin"
        style={{
          width: size * 0.85,
          height: size * 0.85,
          boxShadow: '0 0 40px rgba(249,115,22,0.35)',
        }}
      >
        <img
          src="/images/fenappaci-logo-transparent.png"
          alt="FENAPPACI"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ── Error boundary for Three.js canvas ── */
interface EBState { hasError: boolean }
class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(_err: Error, _info: ErrorInfo) { /* silently caught */ }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Three.js 3D coin mesh ── */
function LogoCoin({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<Group>(null);
  const scaleVec = useRef(new Vector3(1, 1, 1));
  const texture = useLoader(TextureLoader, '/images/fenappaci-logo-transparent.png');

  useFrame((state) => {
    if (!groupRef.current) return;
    // Continuous slow Y rotation
    groupRef.current.rotation.y += 0.007;
    // Mouse tilt on X axis
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      state.mouse.y * -0.35,
      0.04
    );
    // Hover scale
    const target = hovered ? 1.12 : 1.0;
    scaleVec.current.lerp(new Vector3(target, target, target), 0.08);
    groupRef.current.scale.copy(scaleVec.current);
  });

  return (
    <group ref={groupRef}>
      {/* Front face — logo texture */}
      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[1.42, 64]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.22}
          metalness={0.28}
          side={DoubleSide}
        />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[1.42, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Orange metallic rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.07, 16, 120]} />
        <meshStandardMaterial
          color="#f97316"
          metalness={0.9}
          roughness={0.08}
          emissive="#ea580c"
          emissiveIntensity={0.32}
        />
      </mesh>
      {/* Inner green ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.013, 8, 100]} />
        <meshStandardMaterial
          color="#16a34a"
          metalness={0.7}
          roughness={0.2}
          emissive="#16a34a"
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

interface Logo3DProps {
  size?: number;
  interactive?: boolean;
}

export default function Logo3D({ size = 200, interactive: _interactive = false }: Logo3DProps) {
  const [hovered, setHovered] = useState(false);

  // If WebGL is unavailable, fall back to CSS 3D animation
  if (typeof window !== 'undefined' && !webGLSupported()) {
    return <LogoFallback size={size} />;
  }

  const fallback = <LogoFallback size={size} />;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <div
        style={{ width: size, height: size, cursor: hovered ? 'pointer' : 'default' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 42 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.85} color="#fff7ed" />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#fed7aa" />
          <pointLight position={[0, 0, 4]} intensity={1.0} color="#f97316" distance={8} decay={2} />
          <pointLight position={[3, 3, 3]} intensity={0.6} color="#fbbf24" distance={6} decay={2} />

          <Suspense fallback={null}>
            <LogoCoin hovered={hovered} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
