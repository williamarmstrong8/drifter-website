import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { journalEntries } from '@/data/journalEntries';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface GlobeProps {
  onPinClick?: (destination: any, position?: { x: number; y: number }) => void;
  onRotationChange?: (isRotating: boolean) => void;
  isRotating?: boolean;
}

interface MarkerProps {
  position: [number, number, number];
  onClick: () => void;
}

const Marker = ({ position, onClick }: MarkerProps) => {
  const markerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Tan color matching the HTML version: 0xD2B48C
  const markerColor = '#D2B48C';
  
  // Random values for pulse variation (like the HTML version)
  const pulseData = useMemo(() => ({
    growFactor: 0.3 + Math.random() * 0.2,
    speed: 0.01 + Math.random() * 0.01,
    phase: Math.random() * Math.PI * 2,
    originalScale: 1,
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (pulseRef.current) {
      // Subtle pulsing effect matching the HTML version
      const scale = pulseData.originalScale + Math.sin(time * pulseData.speed * 5 + pulseData.phase) * pulseData.growFactor;
      pulseRef.current.scale.set(scale, scale, scale);
      
      // Update opacity based on scale
      if (pulseRef.current.material instanceof THREE.MeshBasicMaterial) {
        pulseRef.current.material.opacity = 0.5 - (scale - pulseData.originalScale) * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      {/* Main marker - sphere like the HTML version, bigger size */}
      <mesh 
        ref={markerRef}
        onClick={onClick}
        onPointerOver={(e) => {
          setHovered(true);
          e.stopPropagation();
        }}
        onPointerOut={(e) => {
          setHovered(false);
          e.stopPropagation();
        }}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={markerColor} />
      </mesh>
      
      {/* Pulse effect - matching HTML version */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial 
          color={markerColor}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

const PinMarker = ({ 
  position, 
  destination, 
  onPinClick 
}: { 
  position: [number, number, number]; 
  destination: any;
  onPinClick?: (destination: any, position?: { x: number; y: number }) => void;
}) => {
  const markerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const { camera, size, gl } = useThree();
  const [hovered, setHovered] = useState(false);
  
  // Tan color matching the HTML version: 0xD2B48C
  const markerColor = '#D2B48C';
  
  // Random values for pulse variation (like the HTML version)
  const pulseData = useMemo(() => ({
    growFactor: 0.3 + Math.random() * 0.2,
    speed: 0.01 + Math.random() * 0.01,
    phase: Math.random() * Math.PI * 2,
    originalScale: 1,
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (pulseRef.current) {
      // Subtle pulsing effect matching the HTML version
      const scale = pulseData.originalScale + Math.sin(time * pulseData.speed * 5 + pulseData.phase) * pulseData.growFactor;
      pulseRef.current.scale.set(scale, scale, scale);
      
      // Update opacity based on scale
      if (pulseRef.current.material instanceof THREE.MeshBasicMaterial) {
        pulseRef.current.material.opacity = 0.5 - (scale - pulseData.originalScale) * 0.1;
      }
    }
  });

  const handleClick = () => {
    if (markerRef.current && camera && gl) {
      // Convert 3D position to screen coordinates
      const vector = new THREE.Vector3(...position);
      vector.project(camera);
      
      // Convert normalized device coordinates to screen coordinates
      const x = (vector.x * 0.5 + 0.5) * size.width;
      const y = (vector.y * -0.5 + 0.5) * size.height;
      
      // Get the canvas element's bounding rect
      const rect = gl.domElement.getBoundingClientRect();
      
      onPinClick?.(destination, {
        x: x + rect.left,
        y: y + rect.top,
      });
    } else {
      onPinClick?.(destination);
    }
  };

  return (
    <group position={position}>
      {/* Main marker - sphere like the HTML version, bigger size */}
      <mesh 
        ref={markerRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          setHovered(true);
          e.stopPropagation();
        }}
        onPointerOut={(e) => {
          setHovered(false);
          e.stopPropagation();
        }}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={markerColor} />
      </mesh>
      
      {/* Pulse effect - matching HTML version */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial 
          color={markerColor}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

const Earth = ({ onPinClick, isRotating }: { onPinClick?: (destination: any, position?: { x: number; y: number }) => void; isRotating: boolean }) => {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Load Earth textures - matching the HTML version
  const [earthTexture, normalMap, specularMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  ]);

  // Load clouds texture - matching HTML version
  const cloudsTexture = useTexture(
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  );

  // Auto-rotate Earth and clouds
  useFrame((state, delta) => {
    if (isRotating) {
      if (earthRef.current) {
        earthRef.current.rotation.y += delta * 0.05; // Super slow rotation
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += delta * 0.02; // Clouds rotate slower
      }
    }
  });

  // Get destinations from journal entries that have coordinates
  const destinations = useMemo(() => {
    return journalEntries
      .filter(entry => entry.coordinates)
      .map(entry => ({
        lat: entry.coordinates!.lat,
        lng: entry.coordinates!.lng,
        title: entry.location,
        country: entry.country,
        journalId: entry.id,
        image: entry.image,
        excerpt: entry.excerpt,
      }));
  }, []);

  // Convert lat/lng to 3D position on sphere (matching HTML version)
  const markerPositions = useMemo(() => {
    const earthRadius = 1.0; // Match HTML version
    return destinations.map((dest) => {
      const phi = (90 - dest.lat) * (Math.PI / 180);
      const theta = (dest.lng + 180) * (Math.PI / 180);
      
      const x = -earthRadius * Math.sin(phi) * Math.cos(theta);
      const y = earthRadius * Math.cos(phi);
      const z = earthRadius * Math.sin(phi) * Math.sin(theta);
      
      return {
        position: [x, y, z] as [number, number, number],
        destination: dest,
      };
    });
  }, [destinations]);

  return (
    <group>
      {/* Stars background */}
      <Stars radius={300} depth={60} count={5000} factor={7} fade />

      {/* Earth group - everything inside rotates together */}
      <group ref={earthRef}>
        {/* Earth sphere - using PhongMaterial like HTML version */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial
            map={earthTexture}
            bumpMap={normalMap}
            bumpScale={0.8}
            specularMap={specularMap}
            specular={new THREE.Color(0x333333)}
            shininess={15}
            emissive={new THREE.Color(0x223344)}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Clouds layer - matching HTML version */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.025, 64, 64]} />
          <meshPhongMaterial
            map={cloudsTexture}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            emissive={new THREE.Color(0xffffff)}
            emissiveIntensity={0.1}
            shininess={5}
          />
        </mesh>

        {/* Destination markers - children of Earth group so they rotate with it */}
        {markerPositions.map((mp) => (
          <PinMarker
            key={mp.destination.journalId}
            position={mp.position}
            destination={mp.destination}
            onPinClick={onPinClick}
          />
        ))}
      </group>

      {/* Lighting - brighter for better visibility */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[1, 1, 1]} intensity={1.0} />
      <directionalLight position={[-1, -1, -1]} intensity={0.8} />
      <directionalLight position={[-1, 1, -1]} intensity={0.6} />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#444444" />
    </group>
  );
};

const ZoomHandler = ({ 
  zoomInRef,
  zoomOutRef
}: { 
  zoomInRef: React.MutableRefObject<(() => void) | null>;
  zoomOutRef: React.MutableRefObject<(() => void) | null>;
}) => {
  const { camera } = useThree();
  const minDistance = 2.1;
  const maxDistance = 3.5;

  useFrame(() => {
    // Update zoom functions on every frame
    zoomInRef.current = () => {
      const distance = camera.position.length();
      const newDistance = Math.max(distance - 0.25, minDistance);
      const direction = camera.position.clone().normalize();
      camera.position.copy(direction.multiplyScalar(newDistance));
      camera.updateProjectionMatrix();
    };

    zoomOutRef.current = () => {
      const distance = camera.position.length();
      const newDistance = Math.min(distance + 0.25, maxDistance);
      const direction = camera.position.clone().normalize();
      camera.position.copy(direction.multiplyScalar(newDistance));
      camera.updateProjectionMatrix();
    };
  });

  return null;
};

const Globe = ({ onPinClick, onRotationChange, isRotating: externalIsRotating }: GlobeProps) => {
  const [internalIsRotating, setInternalIsRotating] = useState(true);
  const zoomInRef = useRef<(() => void) | null>(null);
  const zoomOutRef = useRef<(() => void) | null>(null);
  
  const isRotating = externalIsRotating !== undefined ? externalIsRotating : internalIsRotating;

  const handlePinClick = (destination: any) => {
    const newState = false;
    if (externalIsRotating === undefined) {
      setInternalIsRotating(newState);
    }
    onRotationChange?.(newState);
    onPinClick?.(destination);
  };

  const handleZoomIn = () => {
    zoomInRef.current?.();
  };

  const handleZoomOut = () => {
    zoomOutRef.current?.();
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          logarithmicDepthBuffer: true,
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          // Set background color - slightly lighter dark blue
          gl.setClearColor(0x2a4a6a, 1);
        }}
      >
        <Suspense fallback={null}>
          <Earth onPinClick={handlePinClick} isRotating={isRotating} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minDistance={2.1}
            maxDistance={3.5}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.1}
            rotateSpeed={0.7}
            screenSpacePanning={true}
          />
          <ZoomHandler zoomInRef={zoomInRef} zoomOutRef={zoomOutRef} />
        </Suspense>
      </Canvas>
      
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 pointer-events-auto"
        >
          <ZoomIn className="w-4 h-4 text-white" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 pointer-events-auto"
        >
          <ZoomOut className="w-4 h-4 text-white" />
        </Button>
      </div>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none z-10">
        <p className="text-white/70 text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
          Drag to rotate the globe • Click on the glowing markers to explore destinations
        </p>
      </div>
    </div>
  );
};

export default Globe;
