"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder, Octahedron, Cone, MeshDistortMaterial, MeshWobbleMaterial, Stars, Sparkles, Torus } from '@react-three/drei';
import { useRef } from 'react';
import { useGame } from '../../../context/GameContext';

// --- Shared Parts ---

const Limb = ({ position, rotation, size = [0.15, 0.6], color }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[size[0], size[0], size[1], 16]} castShadow>
            <meshStandardMaterial color={color} />
        </Cylinder>
    </group>
);

// --- Character Variants ---

function NormalMonster({ ...props }) {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    });

    const skinColor = "#A78BFA"; // Light Purple

    return (
        <group ref={group} {...props}>
            {/* Body - Roundish but cleaner */}
            <Sphere args={[0.8, 32, 32]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color={skinColor} roughness={0.4} />
            </Sphere>

            {/* Hair - A bit messy */}
            <group position={[0, 1.2, 0]}>
                <Cone args={[0.3, 0.5]} position={[0, 0, 0]} rotation={[0, 0, 0.5]}>
                    <meshStandardMaterial color="#6D28D9" />
                </Cone>
                <Cone args={[0.3, 0.5]} position={[0.2, 0, 0]} rotation={[0, 0, -0.2]}>
                    <meshStandardMaterial color="#6D28D9" />
                </Cone>
            </group>

            {/* Eyes - Normal */}
            <Sphere args={[0.2]} position={[0.25, 0.6, 0.65]}>
                <meshStandardMaterial color="white" />
            </Sphere>
            <Sphere args={[0.08]} position={[0.25, 0.6, 0.82]}>
                <meshStandardMaterial color="black" />
            </Sphere>

            <Sphere args={[0.2]} position={[-0.25, 0.6, 0.65]}>
                <meshStandardMaterial color="white" />
            </Sphere>
            <Sphere args={[0.08]} position={[-0.25, 0.6, 0.82]}>
                <meshStandardMaterial color="black" />
            </Sphere>

            {/* Mouth */}
            <Torus args={[0.1, 0.03, 16, 32]} position={[0, 0.3, 0.75]} rotation={[0, 0, 0]} arc={3.14}>
                <meshStandardMaterial color="#333" />
            </Torus>

            {/* Arms */}
            <Limb position={[0.9, 0.2, 0]} rotation={[0, 0, -0.8]} color={skinColor} />
            <Limb position={[-0.9, 0.2, 0]} rotation={[0, 0, 0.8]} color={skinColor} />

            {/* Legs */}
            <Limb position={[0.3, -0.6, 0]} size={[0.18, 0.7]} color={skinColor} />
            <Limb position={[-0.3, -0.6, 0]} size={[0.18, 0.7]} color={skinColor} />
        </group>
    );
}

function HandsomeHuman({ ...props }) {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Confident idle
        group.current.position.y = Math.sin(t) * 0.05;
    });

    const skinTone = "#FCD34D"; // Fair skin-ish
    const hairColor = "#7C3AED"; // Purple hair
    const jacketColor = "#8B5CF6"; // Purple jacket
    const pantsColor = "#1F2937"; // Dark pants

    return (
        <group ref={group} {...props}>
            {/* Head */}
            <Box args={[0.5, 0.6, 0.5]} position={[0, 1.4, 0]}>
                <meshStandardMaterial color={skinTone} />
            </Box>

            {/* Cool Hair */}
            <group position={[0, 1.75, 0]}>
                <Box args={[0.55, 0.2, 0.55]} position={[0, 0, 0]}>
                    <meshStandardMaterial color={hairColor} />
                </Box>
                <Cone args={[0.3, 0.5, 4]} position={[0, 0.3, 0]} rotation={[0, 0.7, 0]}>
                    <meshStandardMaterial color={hairColor} />
                </Cone>
            </group>

            {/* Face */}
            <Sphere args={[0.06]} position={[0.15, 1.45, 0.26]}>
                <meshStandardMaterial color="black" />
            </Sphere>
            <Sphere args={[0.06]} position={[-0.15, 1.45, 0.26]}>
                <meshStandardMaterial color="black" />
            </Sphere>
            <Torus args={[0.1, 0.02, 16, 32]} position={[0, 1.3, 0.26]} rotation={[0, 0, 3.14]} arc={3.14}>
                <meshStandardMaterial color="white" />
            </Torus>

            {/* Body (Jacket) */}
            <Box args={[0.7, 0.8, 0.4]} position={[0, 0.7, 0]}>
                <meshStandardMaterial color={jacketColor} />
            </Box>
            <Box args={[0.2, 0.8, 0.05]} position={[0, 0.7, 0.21]}> {/* Shirt */}
                <meshStandardMaterial color="white" />
            </Box>

            {/* Arms */}
            <Limb position={[0.5, 0.7, 0]} rotation={[0, 0, -0.3]} size={[0.15, 0.7]} color={jacketColor} />
            <Sphere args={[0.15]} position={[0.7, 0.35, 0]}> {/* Hand */}
                <meshStandardMaterial color={skinTone} />
            </Sphere>

            <Limb position={[-0.5, 0.7, 0]} rotation={[0, 0, 0.3]} size={[0.15, 0.7]} color={jacketColor} />
            <Sphere args={[0.15]} position={[-0.7, 0.35, 0]}> {/* Hand */}
                <meshStandardMaterial color={skinTone} />
            </Sphere>

            {/* Legs */}
            <Limb position={[0.2, -0.1, 0]} size={[0.18, 0.9]} color={pantsColor} />
            <Box args={[0.2, 0.15, 0.4]} position={[0.2, -0.6, 0.1]}> {/* Shoe */}
                <meshStandardMaterial color="white" />
            </Box>

            <Limb position={[-0.2, -0.1, 0]} size={[0.18, 0.9]} color={pantsColor} />
            <Box args={[0.2, 0.15, 0.4]} position={[-0.2, -0.6, 0.1]}> {/* Shoe */}
                <meshStandardMaterial color="white" />
            </Box>

            <Sparkles count={20} scale={3} size={4} speed={0.4} opacity={1} color="#FFD700" position={[0, 1, 0]} />
        </group>
    );
}

function ScaryFunnyMonster({ ...props }) {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Goofy wobble
        group.current.rotation.z = Math.sin(t * 3) * 0.05;
        group.current.scale.y = 1 + Math.sin(t * 3) * 0.05;
    });

    const bodyColor = "#C084FC"; // Lavender

    return (
        <group ref={group} {...props}>
            {/* Round Fluffy Body - Using High Poly Sphere + Distort */}
            <Sphere args={[1.05, 64, 64]} position={[0, 0.2, 0]}>
                <MeshDistortMaterial
                    color={bodyColor}
                    distort={0.5} // Fluffy feel
                    speed={1.5}
                    roughness={0.9} // Matte/Fur like
                />
            </Sphere>

            {/* Dirt / Mud at bottom */}
            <group position={[0, -0.6, 0.8]}>
                <Sphere args={[0.3]} position={[-0.4, 0, 0]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color="#4B3621" /> {/* Mud Brown */}
                </Sphere>
                <Sphere args={[0.25]} position={[0.4, 0.1, -0.1]} scale={[1, 0.6, 1]}>
                    <meshStandardMaterial color="#4B3621" />
                </Sphere>
                <Sphere args={[0.2]} position={[0, 0.05, 0.1]} scale={[1, 0.4, 1]}>
                    <meshStandardMaterial color="#5D4037" />
                </Sphere>
            </group>

            {/* Eyes - Sleepy & Droopy / Lazy Look */}
            <group position={[0, 0.4, 0.85]}>
                {/* Left Eye */}
                <group position={[0.32, 0, 0]} rotation={[0, -0.2, 0]}>
                    <Sphere args={[0.28]}>
                        <meshStandardMaterial color="white" />
                    </Sphere>
                    <Sphere args={[0.1]} position={[0, -0.05, 0.22]}> {/* Pupil half covered */}
                        <meshStandardMaterial color="#1F2937" />
                    </Sphere>
                    {/* Deep Purple Eyelid */}
                    <Sphere args={[0.29]} position={[0, 0.1, 0]} rotation={[0.6, 0, 0]}>
                        <meshStandardMaterial color="#9333EA" />
                    </Sphere>
                    {/* Dark circle / bag under eye */}
                    <Sphere args={[0.29]} position={[0, -0.1, 0]} rotation={[-0.4, 0, 0]}>
                        <meshStandardMaterial color="#7E22CE" transparent opacity={0.3} />
                    </Sphere>
                </group>

                {/* Right Eye - slightly more closed for laziness */}
                <group position={[-0.32, 0, 0]} rotation={[0, 0.2, 0]}>
                    <Sphere args={[0.28]}>
                        <meshStandardMaterial color="white" />
                    </Sphere>
                    <Sphere args={[0.1]} position={[0, -0.08, 0.22]}>
                        <meshStandardMaterial color="#1F2937" />
                    </Sphere>
                    <Sphere args={[0.29]} position={[0, 0.12, 0]} rotation={[0.5, 0, 0]}>
                        <meshStandardMaterial color="#9333EA" />
                    </Sphere>
                </group>
            </group>

            {/* Mouth - Frown with Yellow Teeth */}
            <group position={[0, -0.3, 0.9]} rotation={[0.1, 0, 0]}>
                {/* Frown Curve - Dark Gray */}
                <Torus args={[0.3, 0.06, 16, 32]} rotation={[0, 0, Math.PI]} arc={2.5} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#374151" />
                </Torus>

                {/* Teeth - Yellow and crooked */}
                <group position={[0, 0.1, 0]}>
                    <Box args={[0.1, 0.12, 0.05]} position={[-0.15, 0, 0]} rotation={[0, 0, -0.1]}>
                        <meshStandardMaterial color="#FEF3C7" />
                    </Box>
                    <Box args={[0.09, 0.1, 0.05]} position={[-0.05, 0.02, 0]} rotation={[0, 0, 0]}>
                        <meshStandardMaterial color="#FEF3C7" />
                    </Box>
                    <Box args={[0.1, 0.11, 0.05]} position={[0.08, 0.01, 0]} rotation={[0, 0, 0.1]}>
                        <meshStandardMaterial color="#FEF3C7" />
                    </Box>
                    <Box args={[0.08, 0.09, 0.05]} position={[0.2, -0.02, 0]} rotation={[0, 0, 0.2]}>
                        <meshStandardMaterial color="#FEF3C7" />
                    </Box>
                </group>
            </group>

            {/* Stink/Dust Particles - Brownish */}
            <Sparkles count={12} scale={3} size={3} speed={0.4} opacity={0.5} color="#5D4037" position={[0, -0.8, 0]} />
        </group>
    );
}

// --- Main Page ---

export default function CharacterPage() {
    const { stats } = useGame();
    const { characterState } = stats;

    return (
        <div className="h-[80vh] lg:h-[calc(100vh-8rem)] w-full relative bg-gray-900 rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.4)] border border-gray-800 flex flex-col">
            {/* Mobile Title - Static */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h1 className="text-2xl lg:text-4xl font-black text-white/90 uppercase tracking-tighter drop-shadow-lg">
                    Evolution Status
                </h1>
                <div className="mt-2 inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl text-sm font-bold border border-white/10 shadow-sm">
                    Form: <span className={
                        characterState === 'handsome' ? 'text-purple-400' :
                            characterState === 'ugly' ? 'text-green-500' : 'text-blue-400'
                    }>{
                            characterState === 'handsome' ? 'HANDSOME HUMAN' :
                                characterState === 'ugly' ? 'SCARY MONSTER' : 'EVOLVING...'
                        }</span>
                </div>
            </div>

            <div className="flex-1 relative">
                <Canvas camera={{ position: [0, 1, 5], fov: 50 }} shadows className="touch-none bg-gray-900">
                    <color attach="background" args={['#111827']} />
                    <ambientLight intensity={0.6} />
                    <directionalLight
                        position={[5, 10, 7]}
                        intensity={1.2}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />
                    <spotLight position={[-5, 5, 5]} angle={0.5} intensity={0.8} color="#E0E7FF" />

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
                        <circleGeometry args={[3, 32]} />
                        <meshStandardMaterial color="#000000" opacity={0.5} transparent />
                    </mesh>

                    <group position={[0, -0.5, 0]}>
                        {characterState === 'handsome' && <HandsomeHuman />}
                        {characterState === 'neutral' && <NormalMonster />}
                        {characterState === 'ugly' && <ScaryFunnyMonster />}
                    </group>

                    <OrbitControls enablePan={false} enableZoom={true} minDistance={3} maxDistance={8} />
                </Canvas>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none px-4">
                <div className="inline-block px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5">
                    <p className="text-gray-400 font-medium text-xs lg:text-sm tracking-wide">Play quizzes to evolve your character!</p>
                </div>
            </div>
        </div>
    );
}
