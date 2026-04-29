import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { 
  Heart, 
  MessageCircle, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Quote,
  BookOpen,
  Brain,
  Leaf,
  Layers,
  ShieldCheck,
  AlertCircle,
  Clock,
  RotateCcw,
  ZapOff,
  ClipboardList,
  Send,
  CheckCircle2,
  User,
  HelpCircle,
  Calendar,
  Lock,
  Clipboard,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Copy,
  LayoutDashboard,
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  Target,
  FileText,
  NotebookPen
} from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, PerspectiveCamera, Environment, Icosahedron, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from 'three';
import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { supabase } from "./supabase";

/**
 * ANIMATION HELPERS
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const Reveal = ({ children, delay = 0, x = 0, y = 20, duration = 0.8 }: any) => {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ opacity: 0, x, y: isMobile ? 10 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 5, rotateY: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        paddingTop: isScrolled ? (isMobile ? "0.5rem" : "0.75rem") : (isMobile ? "0.75rem" : "1.25rem"),
        paddingBottom: isScrolled ? (isMobile ? "0.5rem" : "0.75rem") : (isMobile ? "0.75rem" : "1.25rem"),
        backgroundColor: isScrolled ? "rgba(7, 7, 7, 0.92)" : "rgba(10, 10, 10, 0.65)",
      }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 flex justify-between items-center backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      
      {/* Scroll Progress Indicator Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-imposing-gold z-20"
        style={{ 
          width: useTransform(useScroll().scrollYProgress, [0, 1], ["0%", "100%"]),
          boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)"
        }}
      />

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none opacity-20">
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white" />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20">
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white" />
      </div>

      {/* Animated Border Line - Scanning Effect (Subtle) */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-imposing-gold/40 to-transparent w-full z-10"
        animate={{ 
          x: ["-100%", "100%"],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      <motion.div 
        whileHover={{ scale: 1.02 }}
        onClick={onAdminClick}
        className="flex items-center gap-3 md:gap-5 cursor-pointer group"
      >
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-8 h-8 md:w-12 md:h-12 bg-imposing-gold flex items-center justify-center relative shadow-[0_0_20px_rgba(212,175,55,0.6)] group-hover:shadow-[0_0_35px_rgba(212,175,55,1)] transition-all duration-500 after:absolute after:inset-0 after:shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"
        >
          <span className="text-imposing-black font-black text-sm md:text-2xl drop-shadow-sm">GR</span>
          <div className="absolute inset-0 border border-white/30" />
        </motion.div>
        <div className="flex flex-col">
          <p className="font-black text-base md:text-2xl uppercase tracking-tighter leading-none group-hover:text-imposing-gold group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-300">Gabriel Rocha</p>
          <p className="text-[7px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-imposing-white/50 group-hover:text-imposing-white/80 transition-colors duration-300">Psicólogo, autor e palestrante</p>
        </div>
      </motion.div>
      
      <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
        {[
          { name: "Home", href: "#" },
          { name: "Sobre", href: "#sobre" },
          { name: "Especialidade", href: "#manifesto" },
          { name: "FAQ", href: "#faq" },
          { name: "Contato", href: "#contato" }
        ].map((link) => (
          <motion.a 
            key={link.name}
            href={link.href}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 px-4 py-2 bg-imposing-gray border border-white/10 rounded-full cursor-pointer hover:border-imposing-gold/50 hover:text-imposing-gold transition-all shadow-inner group"
          >
            <span className="w-1.5 h-1.5 bg-imposing-white/20 rounded-full group-hover:bg-imposing-gold transition-colors" />
            {link.name}
          </motion.a>
        ))}

        <motion.a 
          href="#triagem"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-6 py-2 bg-imposing-gray border border-imposing-gold/30 rounded-full cursor-pointer hover:border-imposing-gold hover:bg-imposing-gold hover:text-imposing-black transition-all shadow-inner font-black"
        >
          <span className="w-2.5 h-2.5 bg-imposing-gold rounded-full animate-pulse shadow-[0_0_8px_rgba(212, 175, 55,0.8)]" />
          Agendar agora
        </motion.a>
      </div>
    </motion.nav>
  );
};

const CyberneticNeuralBrain = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const isMobile = useIsMobile();

  // Geometria Cerebral Anatômica Refinada (Suavizada)
  const brainGeometry = useMemo(() => {
    // Redução drástica de subdivisões no mobile para performance (80 -> 20)
    const detail = isMobile ? 20 : 80;
    const geo = new THREE.IcosahedronGeometry(1.6, detail);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const absX = Math.abs(v.x);
      v.x *= 1.2; v.y *= 1.15; v.z *= 1.38;

      // Dobras anatômicas procedurais suavizadas
      const noise = (
        Math.sin(v.x * 5) * Math.sin(v.y * 5) * Math.sin(v.z * 5) * 0.08 +
        Math.cos(v.x * 8 + v.y * 6) * Math.sin(v.z * 8) * 0.03
      );
      const cleft = Math.exp(-Math.pow(absX * 7, 2)) * 0.22;
      
      v.multiplyScalar(1 + noise - cleft);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [isMobile]);

  // Sistema de Neurônios e Sinapses Internas Equilibrado
  // Otimização: Reduzir contagem de partículas no mobile (1100 -> 300)
  const neuronCount = isMobile ? 300 : 1100;
  const { neuronPositions, synapseLines, neuronScales } = useMemo(() => {
    const points = [];
    const lines = [];
    const scales = [];
    
    // Gerar neurônios bem distribuídos
    for (let i = 0; i < neuronCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = (Math.pow(Math.random(), 0.6) * 1.55); 
      
      const x = r * Math.sin(theta) * Math.cos(phi) * 1.15;
      const y = r * Math.sin(theta) * Math.sin(phi) * 1.15;
      const z = r * Math.cos(theta) * 1.35;
      
      points.push(x, y, z);
      scales.push(Math.random()); 
    }

    // Criar conexões distribuídas de forma uniforme (menos acumulada e mais espalhada)
    for (let i = 0; i < neuronCount; i++) {
      // Cada neurônio tenta fazer 1 ou 2 conexões espalhadas
      let connectionsPerNeuron = 0;
      let attempts = 0;
      
      while (connectionsPerNeuron < 2 && attempts < 10) {
        const targetIdx = Math.floor(Math.random() * neuronCount);
        attempts++;
        
        if (targetIdx === i) continue;
        
        const p1 = new THREE.Vector3(points[i*3], points[i*3+1], points[i*3+2]);
        const p2 = new THREE.Vector3(points[targetIdx*3], points[targetIdx*3+1], points[targetIdx*3+2]);
        
        const dist = p1.distanceTo(p2);
        // Distância generosa para espalhar as linhas, mas filtrando distâncias curtíssimas que geram acúmulos
        if (dist < 1.6 && dist > 0.3) {
          lines.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          connectionsPerNeuron++;
        }
      }
    }

    return { 
      neuronPositions: new Float32Array(points),
      synapseLines: new Float32Array(lines),
      neuronScales: new Float32Array(scales)
    };
  }, []);

  // Shader para Neurônios com animação e brilho (Glow)
  const neuronMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#FFAA00") },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        attribute float scale;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Animação de pulsação de tamanho
          float pulse = 0.8 + 0.5 * sin(uTime * 2.0 + scale * 10.0);
          gl_PointSize = 24.0 * pulse * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = 0.4 + 0.4 * sin(uTime * 3.0 + scale * 15.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          float glow = pow(1.0 - dist * 2.0, 3.0);
          if (dist > 0.5) discard;
          gl_FragColor = vec4(uColor, glow * vAlpha * 0.7);
        }
      `
    });
  }, []);

  const synapseRef = useRef<THREE.LineSegments>(null);

  // Shader Customizado para Efeito "Circuit/Topographic" da Imagem
  const brainMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorGold: { value: new THREE.Color("#D4AF37") },
        uColorNavy: { value: new THREE.Color("#FF8C00") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorGold;
        uniform vec3 uColorNavy;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        // Função de ruído para as linhas de circuito
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        void main() {
          // Fresnel Effect (Brilho nas bordas)
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.5);
          
          // Padrão de Linhas Topográficas (Circuitos)
          float density = 18.0;
          float linePattern = abs(sin(vPosition.y * density + sin(vPosition.x * 5.0 + vPosition.z * 5.0) * 2.0));
          linePattern = smoothstep(0.8, 0.95, linePattern);

          // Cores baseadas na posição e Fresnel (Ciano no centro, Navy nas bordas)
          vec3 baseColor = mix(uColorGold, uColorNavy, fresnel * 0.8);
          
          // Composição final
          float alpha = (linePattern * 0.4 + fresnel * 0.6);
          vec3 finalColor = baseColor * (linePattern * 1.5 + fresnel * 0.5);
          
          gl_FragColor = vec4(finalColor, alpha * 0.8);
        }
      `
    });
  }, []);

  const [timer] = useState(() => new (THREE as any).Timer());

  useFrame((state) => {
    const { x, y } = state.mouse;
    timer.update();
    const time = timer.getElapsed();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.2, 0.05);
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = time;
    }
    if (neuronMaterial) {
      neuronMaterial.uniforms.uTime.value = time;
    }
  });

  const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 768 : false;

  return (
    <group ref={groupRef} position={[-0.35, -0.6, -2.5]} scale={isDesktop ? 0.76 : 0.56}>
      {/* Camada Principal do Córtex */}
      <mesh geometry={brainGeometry}>
        <primitive object={brainMaterial} ref={shaderRef} attach="material" />
      </mesh>
      
      {/* Sistema Neural Interno (Neurônios e Sinapses) */}
      <points material={neuronMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={neuronPositions.length / 3} array={neuronPositions} itemSize={3} />
          <bufferAttribute attach="attributes-scale" count={neuronScales.length} array={neuronScales} itemSize={1} />
        </bufferGeometry>
      </points>

      <lineSegments ref={synapseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={synapseLines.length / 3} array={synapseLines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#FF4500" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      
      {/* Brilho de Ambiente Suave */}
      <pointLight color="#FFAA00" intensity={15} distance={10} />
      <pointLight position={[-2, 1, -1]} color="#FF6600" intensity={8} distance={8} />
    </group>
  );
};

const FloatingParticles = () => {
  const particlesCount = 800; // Quantidade de partículas flutuantes
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, scales, randomizeSpeeds } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const scale = new Float32Array(particlesCount);
    const speeds = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Espalhar ao redor do cérebro (Volume maior)
      const r = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6; // y: espalhamento vertical
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta); // z
      
      // Tamanhos variados
      scale[i] = Math.random() * 0.5 + 0.1;
      
      // Velocidades de vibração / movimentação independentes
      speeds[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions: pos, scales: scale, randomizeSpeeds: speeds };
  }, [particlesCount]);

  const particlesMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#FFD700") }, // Dourado Vivo
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        attribute float scale;
        attribute float speed;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          // Movimento de flutuação orgânico
          pos.y += sin(uTime * speed + pos.x * 2.0) * 0.1;
          pos.x += cos(uTime * speed + pos.z * 2.0) * 0.05;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Piscar das partículas e distância
          float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + scale * 10.0);
          gl_PointSize = (15.0 * scale * pulse) * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          vAlpha = 0.3 + 0.6 * sin(uTime * 1.5 + scale * 15.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if(dist > 0.5) discard;
          // Borda suave
          float glow = pow(1.0 - dist * 2.0, 2.0);
          gl_FragColor = vec4(uColor, glow * vAlpha);
        }
      `
    });
  }, []);

  const [timer] = useState(() => new (THREE as any).Timer());

  useFrame(() => {
    timer.update();
    if (particlesMaterial) {
      particlesMaterial.uniforms.uTime.value = timer.getElapsed();
    }
    // Faz a constelação girar sutilmente
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={pointsRef} material={particlesMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-scale" count={scales.length} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-speed" count={randomizeSpeeds.length} array={randomizeSpeeds} itemSize={1} />
      </bufferGeometry>
    </points>
  );
};

const HeroBrain = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <div className="w-full h-full opacity-100">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
          <ambientLight intensity={0.2} />
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
              <CyberneticNeuralBrain />
            </Float>
            <FloatingParticles />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden bg-imposing-black">
      {/* Background/Base Layer */}
      <div className="absolute inset-0 bg-imposing-black" />

      {/* Photo Layer */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-[1] pointer-events-none flex justify-center">
        
        {/* Pattern of Architectural Golden Stripes BEHIND the doctor (z-0) */}
        {/* Stripe 1: Far left subtle line */}
        <div className="absolute right-[65%] top-[-30%] bottom-[-30%] w-[2px] bg-imposing-gold/80 transform -skew-x-[25deg] pointer-events-none z-0" />
        {/* Stripe 2: Left thin bright line */}
        <div className="absolute right-[58%] top-[-30%] bottom-[-30%] w-[8px] bg-imposing-gold shadow-[0_0_30px_rgba(212,175,55,0.9)] transform -skew-x-[25deg] pointer-events-none z-0" />
        
        {/* Stripe 3: Wide glass/matte band - HIGHER IMPACT */}
        <div className="absolute right-[43%] top-[-30%] bottom-[-30%] w-[160px] bg-gradient-to-r from-imposing-gold/20 via-imposing-gold/10 to-imposing-gold/30 border-x-2 border-imposing-gold/60 backdrop-blur-md shadow-[0_0_50px_rgba(212,175,55,0.3)] transform -skew-x-[25deg] pointer-events-none z-0" />
        
        {/* Stripe 4: Intense core band behind the face/torso */}
        <div className="absolute right-[28%] top-[-30%] bottom-[-30%] w-[90px] bg-gradient-to-r from-imposing-gold/70 to-imposing-gold/40 backdrop-blur-sm shadow-[0_0_80px_rgba(212,175,55,0.7)] transform -skew-x-[25deg] pointer-events-none z-0" />
        {/* Stripe 5: High brightness solid accent */}
        <div className="absolute right-[24%] top-[-30%] bottom-[-30%] w-[15px] bg-imposing-gold shadow-[0_0_40px_rgba(212,175,55,1)] transform -skew-x-[25deg] pointer-events-none z-0" />
        
        {/* Stripe 6: Right supporting band */}
        <div className="absolute right-[10%] top-[-30%] bottom-[-30%] w-[45px] bg-imposing-gold/60 shadow-[0_0_40px_rgba(212,175,55,0.5)] transform -skew-x-[25deg] pointer-events-none z-0" />
        {/* Stripe 7: Far right razor */}
        <div className="absolute right-[2%] top-[-30%] bottom-[-30%] w-[4px] bg-imposing-gold/90 shadow-[0_0_20px_rgba(212,175,55,0.8)] transform -skew-x-[25deg] pointer-events-none z-0" />

        {/* Solid Doctor Image (z-10, no transparency) */}
        <img 
          src="/1773347591988-Photoroom.png" 
          alt="Gabriel Rocha" 
          className="relative z-10 w-full h-full object-contain scale-[1.15] translate-y-24 translate-x-4 brightness-125 contrast-110 md:brightness-100 md:contrast-100 md:scale-125 hover:scale-[1.20] md:hover:scale-[1.30] object-top md:object-[80%_15%] md:translate-x-[1cm] md:translate-y-40 transition-all duration-1000 drop-shadow-[0_10px_40px_rgba(0,0,0,1)] md:drop-shadow-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Shadow Overlay in Front (z-20) */}
        <div className="absolute inset-0 bg-gradient-to-t from-imposing-black via-imposing-black/80 to-transparent md:bg-gradient-to-r md:from-imposing-black md:via-imposing-black/85 md:to-transparent z-20 pointer-events-none" />
      </motion.div>

      {/* Content Layer (Top) */}
      <div className="container mx-auto px-10 relative z-10 pt-64 md:pt-20">

        {/* Core Text Wrapper for 3D alignment */}
        <div className="relative inline-block max-w-2xl md:max-w-4xl py-10">
          
          <div className="relative inline-block w-fit">
            {/* Brain 3D Visualization (Massive DOM container to prevent clipping, adjusted position) */}
            <div className="absolute top-[calc(60%-1cm)] md:top-[calc(50%-1cm)] left-1/2 md:left-[calc(50%+1cm)] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] -z-20 pointer-events-none">
              <HeroBrain />
            </div>
            
            <Reveal y={100} duration={1.2}>
              <h1 className="text-4xl md:text-8xl leading-[0.9] mb-8 font-black uppercase tracking-tighter text-imposing-white [text-shadow:_0_10px_40px_rgba(0,0,0,1),_0_2px_15px_rgba(0,0,0,0.8)] relative z-10">
                Ressignifique <br /> sua <span className="text-[#FFD700] drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">história</span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <motion.div 
              className="inline-block relative z-10 mb-10 group"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Architectural Glass Slab - Compact & High Contrast */}
              <div className="relative overflow-hidden backdrop-blur-3xl bg-imposing-black/95 border border-white/20 rounded-sm py-3.5 px-6 md:px-8 shadow-2xl">
                
                {/* Minimalist Gold Accent Line */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-imposing-gold shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                
                <p className="text-sm md:text-lg font-medium text-white leading-snug tracking-tight relative z-10">
                  <span className="text-white/70 font-light pr-1">Transformando o sofrimento em</span> 
                  <br className="hidden md:block"/>
                  <span className="text-imposing-gold font-bold uppercase tracking-[0.05em] text-base md:text-[1.3rem] inline-block mt-0.5">
                    reconstrução da identidade
                  </span>
                  <span className="mx-2 text-white/30 font-light text-xs md:text-sm">e</span>
                  <span className="text-imposing-gold font-bold uppercase tracking-[0.05em] text-base md:text-[1.3rem] inline-block mt-0.5">
                    resiliência
                  </span>
                </p>
              </div>
              
              {/* Modern "Floating" Label - Compact Solid */}
              <div className="absolute -top-2.5 -left-1.5 bg-imposing-gold px-2.5 py-0.5 rounded-sm shadow-xl z-20">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-imposing-black">Propósito</span>
              </div>
            </motion.div>
          </Reveal>
          <Reveal delay={0.6}>
             <div className="flex gap-6 relative z-10">
              <motion.a 
                href="#triagem-form"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden bg-imposing-gold px-12 py-5 rounded-[2rem] flex items-center gap-6 shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.5)] transition-all duration-500 border-2 border-white/20 cursor-pointer"
              >
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full -skew-x-[20deg]"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                />
                
                <span className="text-imposing-black font-black uppercase text-sm md:text-base tracking-[0.2em] relative z-10">
                  Iniciar Tratamento
                </span>
                
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-imposing-black flex items-center justify-center rounded-full group-hover:bg-white transition-colors duration-500 shadow-xl">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-imposing-gold group-hover:text-imposing-black group-hover:translate-x-1 transition-all duration-500" />
                </div>
                
                {/* Button Glow Aura */}
                <div className="absolute inset-0 bg-imposing-gold/0 group-hover:bg-imposing-gold/20 transition-colors duration-500 ring-2 ring-inset ring-white/30 rounded-[2rem]" />
              </motion.a>
            </div>
          </Reveal>

        </div>
      </div>
      
    </section>
  );
};

const PainIdentification = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const painPoints = [
    {
      id: "01",
      title: "O Vazio da Identidade",
      description: "A sensação de se perder de si mesmo após uma ruptura ou perda significativa.",
      icon: <Layers className="w-8 h-8" />,
      tooltip: "As camadas da psique e a complexidade da identidade.",
      color: "from-gray-800 to-black"
    },
    {
      id: "02",
      title: "Estagnação Temporal",
      description: "Sentir que o mundo avançou, mas você continua preso ao momento do trauma.",
      icon: <Clock className="w-8 h-8" />,
      tooltip: "A percepção distorcida do tempo sob o efeito do trauma.",
      color: "from-gray-900 to-black"
    },
    {
      id: "03",
      title: "Ciclos de Perda",
      description: "Padrões repetitivos que transformam o sofrimento em um ciclo recorrente.",
      icon: <RotateCcw className="w-8 h-8" />,
      tooltip: "A recorrência de padrões e comportamentos cíclicos.",
      color: "from-black to-gray-800"
    },
    {
      id: "04",
      title: "Esgotamento Emocional",
      description: "O peso físico e mental de carregar feridas que não foram devidamente processadas.",
      icon: <ZapOff className="w-8 h-8" />,
      tooltip: "O esgotamento e a desconexão dos recursos internos.",
      color: "from-gray-900 to-[#111111]"
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#FAFAFA] pt-32 md:pt-48 pb-12 md:pb-16 text-imposing-black overflow-hidden border-t border-black/5">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2 }}
          className="text-[40vw] font-black leading-none whitespace-nowrap select-none rotate-90 text-black"
        >
          IDENTIDADE
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Header Column */}
          <div className="lg:w-1/3">
            <Reveal x={-30}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-imposing-black" />
                  <span className="text-imposing-black text-xs font-black uppercase tracking-[0.4em]">Sinais de Alerta</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-imposing-black">
                  A Linguagem <br /> 
                  <span className="text-imposing-gold drop-shadow-sm">do Silêncio.</span>
                </h2>
                <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-sm">
                  O sofrimento raramente grita. Ele se manifesta em padrões silenciosos que paralisam a vida. Você reconhece algum deles?
                </p>
              </div>
            </Reveal>
          </div>

          {/* Points Grid Column - Mixture Concept */}
          <div className="lg:w-2/3 grid md:grid-cols-2 gap-px bg-black/10 border border-black/10 shadow-2xl">
            {painPoints.map((point, index) => {
              // Creating a mixed/alternating layout: White, Black, Black, White
              const isDark = index === 1 || index === 2;
              
              return (
                <motion.div 
                  key={point.id}
                  whileHover={{ backgroundColor: isDark ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 1)" }}
                  className={`${isDark ? 'bg-imposing-black text-white' : 'bg-white text-imposing-black'} p-10 md:p-16 flex flex-col justify-between group transition-all duration-500 min-h-[400px] relative overflow-hidden`}
                >
                  {/* Subtle Texture for dark cards */}
                  {isDark && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />}
                  
                  <div className="relative z-10">
                    <Reveal delay={index * 0.1} y={20}>
                      <div className="flex justify-between items-start mb-12">
                        <span className={`text-xs font-black ${isDark ? 'text-imposing-gold/60' : 'text-imposing-black/40'} group-hover:text-imposing-gold transition-colors duration-500 tracking-widest`}>{point.id}</span>
                        <div className="relative">
                          <div className="text-imposing-gold opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 cursor-help peer">
                            {point.icon}
                          </div>
                          
                          {/* Tooltip */}
                          <div className="absolute top-12 right-0 w-48 p-3 bg-imposing-black text-white text-[10px] font-mono leading-relaxed opacity-0 peer-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 border border-imposing-gold/30 shadow-2xl">
                            <div className="flex items-center gap-2 mb-1">
                              <AlertCircle className="w-3 h-3 text-imposing-gold" />
                              <span className="text-imposing-gold uppercase tracking-[0.2em] font-black">Simbologia</span>
                            </div>
                            {point.tooltip}
                            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-imposing-black border-t border-l border-imposing-gold/30 rotate-45" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-6 group-hover:text-imposing-gold transition-colors duration-500">{point.title}</h3>
                      <p className={`text-lg transition-colors duration-500 leading-relaxed ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-800'}`}>
                        {point.description}
                      </p>
                    </Reveal>
                  </div>
                  
                  <div className="mt-12 overflow-hidden h-1 w-0 group-hover:w-full bg-imposing-gold transition-all duration-700 relative z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to the methodology */}
        <Reveal delay={0.6} y={30}>
          <div className="mt-12 pt-10 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-xl text-gray-600 font-medium italic">
              "Identificar o sofrimento é o primeiro passo para <span className="text-imposing-black font-bold underline decoration-imposing-gold/40 decoration-4 underline-offset-8">parar de apenas sobreviver</span> a ele."
            </p>
            <motion.a 
              href="#manifesto"
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-imposing-black font-black uppercase tracking-widest text-sm group border-b-2 border-imposing-gold pb-1"
            >
              Conheça a Abordagem Clínica
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-imposing-gold" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const SectionDivider = () => (
  <div className="relative h-16 bg-[#FAFAFA] overflow-visible z-20 border-y border-black/5">
    {/* Intense Yellow Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent pointer-events-none" />
    
    {/* Architectural Golden Lines - More Intense Yellow */}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: "circOut" }}
      className="absolute top-[48%] left-[2%] right-[2%] h-[2px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent origin-center"
    />
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.8, ease: "circOut", delay: 0.2 }}
      className="absolute top-[52%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent origin-center"
    />

    {/* Central Imposing Accent - More Vibrant */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 z-30">
       {/* Rotating outer frame */}
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute inset-0 border-2 border-[#FFB800]/60 rotate-45"
       />
       {/* Solid base */}
       <div className="absolute inset-0 m-1 bg-[#FAFAFA] border border-[#FFD700] rotate-45 flex items-center justify-center shadow-[0_10px_40px_rgba(255,184,0,0.4)]">
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              backgroundColor: ["#FFD700", "#FFB800", "#FFD700"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3.5 h-3.5 bg-[#FFD700] shadow-[0_0_20px_rgba(255,184,0,1)]"
          />
       </div>
    </div>

    {/* Intense listras accents */}
    <div className="absolute left-[20%] top-0 bottom-0 w-[8px] bg-[#FFD700]/15 -skew-x-[25deg] border-x border-[#FFB800]/20" />
    <div className="absolute left-[22%] top-0 bottom-0 w-[1px] bg-[#FFB800]/40 -skew-x-[25deg]" />
    
    <div className="absolute right-[20%] top-0 bottom-0 w-[8px] bg-[#FFD700]/15 -skew-x-[25deg] border-x border-[#FFB800]/20" />
    <div className="absolute right-[22%] top-0 bottom-0 w-[1px] bg-[#FFB800]/40 -skew-x-[25deg]" />
  </div>
);

const Bio = () => {
  const [isSpecialtiesModalOpen, setIsSpecialtiesModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="sobre" ref={containerRef} className="relative bg-[#FAFAFA] pt-12 md:pt-16 pb-32 md:pb-48 overflow-hidden text-imposing-black flex items-center">
      {/* Background elegant accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-imposing-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      {/* Pattern of Architectural Golden Stripes - BIO Section */}
      <div className="absolute left-[5%] top-[-20%] bottom-[-20%] w-[1px] bg-imposing-gold/30 transform -skew-x-[25deg] pointer-events-none z-0" />
      <div className="absolute left-[12%] top-[-20%] bottom-[-20%] w-[90px] bg-gradient-to-r from-imposing-gold/5 to-imposing-gold/10 transform -skew-x-[25deg] pointer-events-none z-0" />
      <div className="absolute left-[18%] top-[-20%] bottom-[-20%] w-[4px] bg-imposing-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)] transform -skew-x-[25deg] pointer-events-none z-0" />
      <div className="absolute left-[19%] top-[-20%] bottom-[-20%] w-[2px] bg-imposing-gold/40 transform -skew-x-[25deg] pointer-events-none z-0" />
      
      {/* Stripes running behind the text on the right side */}
      <div className="absolute right-[8%] top-[-20%] bottom-[-20%] w-[60px] bg-gradient-to-l from-imposing-gold/10 to-transparent border-r border-imposing-gold/20 transform -skew-x-[25deg] pointer-events-none z-0" />
      <div className="absolute right-[15%] top-[-20%] bottom-[-20%] w-[8px] bg-imposing-gold/20 backdrop-blur-sm transform -skew-x-[25deg] pointer-events-none z-0" />
      <div className="absolute right-[22%] top-[-20%] bottom-[-20%] w-[1px] bg-imposing-gold/30 transform -skew-x-[25deg] pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Column */}
          <motion.div style={{ y: imageY }} className="w-full lg:w-5/12 relative">
             <Reveal x={-50} duration={1}>
                {/* Offset Decorative Box */}
                <div className="absolute inset-0 bg-imposing-gold translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 z-0 shadow-xl" />
                
                <TiltCard className="relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <div className="overflow-hidden bg-black ring-1 ring-black/10">
                    <motion.img 
                      whileHover={{ scale: 1.05, opacity: 0.9 }}
                      transition={{ duration: 0.7 }}
                      src="/IMG_20260312_173941_718(1)(1).jpg.jpeg" 
                      alt="Gabriel Rocha"
                      className="w-full aspect-[4/5] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Subtle overlay glow */}
                  <div className="absolute inset-0 border border-black/10 pointer-events-none" />
                </TiltCard>
             </Reveal>
             
             {/* Floating Authority Badge */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
               viewport={{ once: true }}
               className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 z-20 bg-imposing-black p-4 rounded-full w-32 h-32 md:w-40 md:h-40 flex flex-col justify-center items-center shadow-2xl border-4 border-[#FAFAFA] group overflow-hidden"
             >
               {/* Elegant rotating inner dash */}
               <div className="absolute inset-0 m-2 border-[1px] border-imposing-gold/30 rounded-full border-dashed animate-[spin_15s_linear_infinite]" />
               
               <Brain strokeWidth={1.5} className="w-8 h-8 md:w-11 md:h-11 text-imposing-gold mb-1 md:mb-2 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-all duration-500 relative z-10" />
               <div className="flex flex-col items-center relative z-10">
                 <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.15em] text-imposing-gold leading-none pb-0.5">Autoridade</span>
                 <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-white leading-none">Clínica</span>
               </div>
             </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div style={{ y: textY }} className="w-full lg:w-7/12 relative mt-16 lg:mt-0 lg:pl-10">
            {/* Elegant slash line replacement */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-imposing-gold via-imposing-gold to-transparent transform -skew-x-[15deg] hidden lg:block" />
            
            <div className="lg:pl-16">
              <Reveal y={40} duration={0.8} delay={0.2}>
                <div className="mb-10">
                  {/* Name */}
                  <h2 className="text-6xl md:text-7xl lg:text-[5rem] font-black leading-[0.9] tracking-tighter text-imposing-black mb-6">
                    Gabriel
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-imposing-black via-gray-700 to-gray-400 block mt-1">Rocha</span>
                  </h2>

                  {/* Credential Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] mb-8"
                  >
                    <div className="flex bg-imposing-gold/20 p-1 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full bg-imposing-gold animate-pulse" />
                    </div>
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
                      Registro <span className="text-imposing-black">CRP 03-34761</span>
                    </span>
                  </motion.div>

                  {/* Role / Focus */}
                  <div className="text-2xl md:text-3xl lg:text-[2.2rem] font-medium text-gray-500 leading-[1.4] tracking-tight mb-8">
                    Psicólogo com Prática Clínica de {` `}
                    <span className="relative inline-flex items-center mt-2 lg:mt-3 mx-1">
                      {/* Animated Gold Highlight Background */}
                      <motion.span 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                        className="absolute inset-0 bg-imposing-gold origin-left rounded-sm -skew-x-6 shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                      />
                      {/* Text inside highlight */}
                      <span className="relative z-10 px-4 py-1 text-imposing-black font-black uppercase tracking-wider text-xl md:text-2xl lg:text-[1.7rem]">
                        ênfase
                      </span>
                    </span>
                    <span className="text-imposing-black font-black block md:inline md:mt-0 mt-3"> em :</span>
                  </div>
                  <button 
                    onClick={() => setIsSpecialtiesModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-imposing-gold text-imposing-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-imposing-black hover:text-imposing-gold transition-all shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                  >
                    ver práticas clínicas <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </Reveal>

              <div className="space-y-10 mt-12 md:max-w-2xl">
                {/* Immersive Mission Quote */}
                <Reveal y={20} duration={0.8} delay={0.4}>
                  <motion.div 
                    whileHover={{ x: 8, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="relative pl-8 md:pl-10 py-6 border-l-[3px] border-imposing-gold bg-gradient-to-r from-imposing-gold/10 to-transparent rounded-r-3xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] cursor-default group"
                  >
                    <Quote className="absolute top-2 left-[-16px] md:left-[-18px] w-8 h-8 text-imposing-gold bg-[#FAFAFA] p-1 rounded-full shadow-sm" />
                    
                    <p className="text-xl md:text-[1.35rem] text-imposing-black/80 leading-relaxed font-light">
                      "Minha trajetória é pautada pela missão de <span className="font-semibold text-imposing-black">transformar o sofrimento</span> em processos de{' '}
                      <motion.span whileHover={{ color: '#D4AF37', textShadow: "0 0 12px rgba(212,175,55,0.4)" }} className="relative inline-block font-semibold text-imposing-black transition-colors duration-300">
                        reconstrução da identidade
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-imposing-gold/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                      </motion.span>
                      {' '}e{' '}
                      <motion.span whileHover={{ color: '#D4AF37', textShadow: "0 0 12px rgba(212,175,55,0.4)" }} className="relative inline-block font-semibold text-imposing-black transition-colors duration-300">
                        resiliência
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-imposing-gold/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 delay-100" />
                      </motion.span>.
                    </p>
                    <p className="text-lg text-imposing-black/70 leading-relaxed mt-4">
                      Através da tradução da complexidade da dor humana em caminhos práticos de clareza e autonomia."
                    </p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-8 pt-8 border-t border-imposing-gold/20"
                    >
                      <p className="text-xl md:text-2xl font-serif italic text-imposing-black leading-tight">
                        "Onde o <span className="text-imposing-gold font-sans font-black uppercase not-italic tracking-tighter text-lg md:text-xl">diálogo</span> se torna o caminho para o encontro com a <span className="text-imposing-gold font-sans font-black uppercase not-italic tracking-tighter text-lg md:text-xl">sua essência</span>"
                      </p>
                    </motion.div>
                  </motion.div>
                </Reveal>

                {/* Elegant Author/Books Section */}
                <Reveal y={20} duration={0.8} delay={0.5}>
                  <div className="bg-white p-8 border border-gray-100 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] group/books hover:border-imposing-gold/30 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] transition-all duration-500">
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-6">
                      Como autor, busco acompanhar aqueles que enfrentam o fim de ciclos, ajudando-os a <span className="font-medium text-imposing-black">ressignificar suas histórias</span> e a reencontrar o equilíbrio necessário para o <span className="font-medium text-imposing-black">protagonismo da própria vida</span> com obras reconhecidas:
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      {/* Book 1 */}
                      <motion.a 
                        href="https://www.amazon.com.br/dp/B08DXGRVCP"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-imposing-black text-imposing-gold rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.15)] cursor-pointer hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] transition-shadow border border-transparent hover:border-imposing-gold/50"
                      >
                        <BookOpen className="w-5 h-5 flex-shrink-0" />
                        <span className="font-bold tracking-wide text-sm md:text-base">"Acabou! E Agora?"</span>
                      </motion.a>
                      
                      {/* Book 2 */}
                      <motion.a 
                        href="https://www.amazon.com.br/dp/B0B7CHK1ZL"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-[#FAFAFA] text-imposing-black rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-white hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] transition-all border border-gray-200 hover:border-imposing-gold"
                      >
                        <BookOpen className="w-5 h-5 flex-shrink-0 text-imposing-gold" />
                        <span className="font-bold tracking-wide text-sm md:text-base">"Força e Medo"</span>
                      </motion.a>
                    </div>
                  </div>
                </Reveal>
              </div>
              
              <Reveal y={20} duration={0.8} delay={0.6}>
                 <div className="mt-16 flex items-center gap-6">
                   <div className="w-20 h-[2px] bg-imposing-gold" />
                   <span className="uppercase tracking-[0.3em] font-black text-sm text-imposing-black">Escritor & Autor</span>
                 </div>
              </Reveal>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Specialties Modal */}
      <AnimatePresence>
        {isSpecialtiesModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsSpecialtiesModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-imposing-black border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsSpecialtiesModalOpen(false)}
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-8">
                Especialidades <span className="text-imposing-gold">Clínicas</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                {[
                  "Ansiedade",
                  "Depressão",
                  "Burnout e Esgotamento Profissional",
                  "Luto e Rupturas Amorosas",
                  "Dependência Emocional",
                  "Traumas",
                  "TEPT (Transtorno de Estresse Pós-Traumático)",
                  "Fobias",
                  "Transtornos de Pânico",
                  "Gestão de Crises Existenciais",
                  "Fortalecimento da Autoestima e Identidade",
                  "Transições de Vida e Carreira",
                  "Desenvolvimento de Resiliência"
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-imposing-gold/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-imposing-gold flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SparkItem = ({ spark, mouseX, mouseY }: { spark: any, mouseX: any, mouseY: any }) => {
  const xOffset = useTransform(mouseX, [-1, 1], [-spark.parallaxX, spark.parallaxX]);
  const yOffset = useTransform(mouseY, [-1, 1], [-spark.parallaxY, spark.parallaxY]);

  return (
    <motion.div
      className={`absolute rounded-full ${spark.theme.bg} ${spark.blur}`}
      style={{
        width: spark.size,
        height: spark.size,
        boxShadow: `0 0 ${spark.size * 4}px ${spark.theme.shadow}`,
        x: xOffset,
        y: yOffset,
      }}
      initial={{ top: "110%", left: spark.startX, opacity: 0 }}
      animate={{
        top: "-15%", // Ensures it goes past the top
        left: spark.endX,
        opacity: [0, 0.8, 0.8, 0.5, 0], // Keeps it visible for longer
        scale: [0.7, 1.2, 1, 0.8],
      }}
      transition={{
        duration: spark.duration,
        repeat: Infinity,
        delay: spark.delay,
        ease: "linear",
        times: [0, 0.2, 0.8, 1] // Precise control over lifecycle
      }}
    />
  );
};

const FloatingSparks = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const sparks = useMemo(() => Array.from({ length: 350 }).map((_, i) => {
    const startX = Math.random() * 100;
    const endX = startX + (Math.random() - 0.5) * 20; 
    const size = Math.random() * 3 + 1.5; 
    
    // Warm Ember Palette
    const colorPalette = [
        { bg: 'bg-imposing-gold', shadow: 'rgba(212,175,55,0.6)' },
        { bg: 'bg-[#FF9100]', shadow: 'rgba(255,145,0,0.4)' },
        { bg: 'bg-[#FFF9E6]', shadow: 'rgba(255,249,230,0.5)' },
        { bg: 'bg-[#D4AF37]', shadow: 'rgba(212,175,55,0.4)' }
    ];
    const theme = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    
    let blur = 'blur-0';
    if (size > 3) blur = 'blur-[1px]';

    return {
      id: i,
      startX: `${startX}%`,
      endX: `${endX}%`,
      size,
      theme,
      blur,
      duration: Math.random() * 12 + 15, // Much slower and calmer
      delay: -(Math.random() * 20),
      parallaxY: Math.random() * 30 + 10,
      parallaxX: Math.random() * 20 + 5,
    };
  }), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
      {sparks.map((spark) => (
        <SparkItem 
          key={spark.id} 
          spark={spark} 
          mouseX={smoothMouseX} 
          mouseY={smoothMouseY} 
        />
      ))}
    </div>
  );
};

const Approach = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="manifesto" ref={containerRef} className="relative bg-imposing-black py-32 md:py-48 text-white overflow-hidden">
      {/* Floating Sparks Layer */}
      <FloatingSparks />

      {/* Editorial Sharp Lines Background */}
      <div className="absolute top-0 bottom-0 left-6 md:left-[10%] w-[1px] bg-white/[0.05] z-0" />
      <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-white/[0.05] z-0 hidden lg:block" />
      
      {/* Dynamic glow to add life to the darkness */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-imposing-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10 w-full">
        <Reveal y={30} duration={0.8}>
          <div className="flex flex-col items-start gap-4 mb-20 md:mb-32">
            <p className="text-imposing-gold font-mono uppercase tracking-[0.4em] text-xs md:text-sm flex items-center gap-4">
              <span className="w-12 h-[1px] bg-imposing-gold" />
              Manifesto Clínico
            </p>
            <h2 className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter text-white leading-[0.9] uppercase">
              A Ciência da <br /> 
              <span className="text-imposing-gold font-serif italic font-light lowercase">re</span>construção.
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-20 md:gap-32 relative md:pl-0">
           {/* Vertical connection timeline (Mobile only) */}
           <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-imposing-gold via-white/10 to-transparent md:hidden z-0" />

           {/* Block 1: Philosophy Core */}
           <Reveal y={40} duration={0.8} delay={0.2}>
             <div className="relative z-10 ml-10 md:ml-[15%] lg:ml-[20%] xl:ml-[25%] border-l md:border-l-[3px] border-imposing-gold pl-6 md:pl-12">
               <p className="text-2xl md:text-4xl lg:text-[2.5rem] text-gray-300 leading-[1.6] md:leading-[1.5] font-light max-w-4xl tracking-tight">
                 <strong className="text-white font-medium">Minha prática clínica</strong> integra a sensibilidade da <span className="text-imposing-gold/90 font-medium md:whitespace-nowrap">Abordagem Centrada na Pessoa (ACP)</span> ao rigor estratégico da <span className="text-imposing-gold/90 font-medium">Terapia Cognitivo-Comportamental (TCC)</span>.
                 <br/><br/>
                 Acredito que o vínculo de confiança é o {` `}
                 <span className="relative inline-block group">
                   <strong className="text-white font-medium">solo necessário</strong>
                   <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-imposing-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                 </span> 
                 {` `}para a mudança, mas que a superação real exige ferramentas técnicas para <strong className="text-white font-medium">reestruturar os padrões</strong> que nos mantêm estagnados em ciclos de perda.
               </p>
             </div>
           </Reveal>

           {/* Block 2: Specialization & Goal */}
           <Reveal y={40} duration={0.8} delay={0.3}>
             <div className="relative z-10 ml-6 md:ml-0 md:w-[85%] lg:w-[70%] bg-white/[0.02] border border-white/[0.05] p-8 md:p-12 lg:p-16 backdrop-blur-md rounded-2xl group hover:border-white/10 transition-colors duration-500">
               {/* Decorative subtle border top */}
               <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-imposing-gold/50 to-transparent" />
               <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
               
               <p className="text-xl md:text-2xl text-gray-400 leading-[1.8] font-light">
                 Buscando o constante aperfeiçoamento no cuidado com feridas emocionais profundas, sou <strong className="text-gray-200 font-medium">Pós-graduando em Psicotraumatologia Clínica</strong> e estou em formação em <strong className="text-gray-200 font-medium text-imposing-gold transition-colors duration-300">EMDR (TraumaClinic)</strong>, o que me permite oferecer um suporte ainda mais especializado no processamento de experiências traumáticas. 
                 <br/><br/>
                 Com uma <strong className="text-white font-medium">visão multidisciplinar</strong> que une ciência e acolhimento, acompanho aqueles que enfrentam o fim de ciclos, ajudando-os a <span className="text-white font-semibold">ressignificar suas histórias</span> e a reencontrar o equilíbrio necessário para o <span className="text-white font-semibold border-b border-transparent hover:border-imposing-gold transition-colors pb-1 cursor-default">protagonismo da própria vida</span>.
               </p>
             </div>
           </Reveal>
        </div>
      </div>
    </section>
  );
};

const TriagemDigital = () => {
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  const [answers, setAnswers] = useState({
    nome: "",
    queixa: "",
    tempo: "",
    objetivo: ""
  });

  const analysisSteps = [
    "Sincronizando dados no ambiente seguro...",
    "Mapeando padrões de resposta...",
    "Identificando gatilhos de sofrimento...",
    "Estruturando prioridade clínica...",
    "Preparando resumo para Gabriel Rocha..."
  ];

  const questions = [
    {
      id: "nome",
      question: "Para começar, com quem estou falando?",
      description: "Digite seu nome completo para iniciarmos sua ficha.",
      type: "text",
      placeholder: "Seu nome aqui..."
    },
    {
      id: "queixa",
      question: "O que mais te incomoda hoje?",
      description: "Selecione o sintoma ou situação predominante.",
      type: "options",
      options: ["Ansiedade", "Luto (perda recente)", "Trauma do Passado", "Fim de Ciclo (Relacionamento/Trabalho)"]
    },
    {
      id: "tempo",
      question: "Há quanto tempo você sente isso?",
      description: "",
      type: "options",
      options: ["Algumas semanas", "1 a 6 meses", "De 6 meses a 1 ano", "Mais de um ano"]
    },
    {
      id: "objetivo",
      question: "Qual o seu principal objetivo na terapia?",
      description: "O que você espera alcançar ao final do nosso processo?",
      type: "text",
      placeholder: "Ex: Recuperar minha autoconfiança..."
    }
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      
      // Rotate through analysis steps
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < analysisSteps.length) {
          setAnalysisText(analysisSteps[currentStep]);
          currentStep++;
        }
      }, 700);

      setTimeout(() => {
        clearInterval(interval);
        setIsAnalyzing(false);
        setStep(questions.length); // Final step
      }, 4000);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [questions[step].id]: option });
    setTimeout(handleNext, 400);
  };

  const sendToWhatsApp = () => {
    const messageText = `*🏥 TRIAGEM DIGITAL - Gabriel Rocha*\n\n` +
      `👋 *Olá Gabriel, realizei o mapeamento digital pelo site:*\n\n` +
      `👤 *Nome:* ${answers.nome}\n` +
      `🧠 *Queixa Principal:* ${answers.queixa}\n` +
      `⏳ *Tempo dos Sintomas:* ${answers.tempo}\n` +
      `🎯 *Objetivo na Terapia:* ${answers.objetivo}\n\n` +
      `⚙️ _Aguardando retorno para iniciar o agendamento._`;
    
    const encodedMessage = encodeURIComponent(messageText);
    // Usando a API completa do WhatsApp que costuma ser mais resiliente com caracteres especiais
    window.open(`https://api.whatsapp.com/send?phone=557196228759&text=${encodedMessage}`, "_blank");
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <section id="triagem" className="relative bg-white py-8 md:py-16 text-imposing-black overflow-hidden border-y border-black/5">
      {/* Background Architectural Elements - Repositioned and Compacted */}
      <div className="absolute inset-0 z-0">
        {/* Main Grid structure - Subtle Black */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Intense Architectural Skewed Stripes - Pushed further to the edges */}
          
          {/* Left Side Group */}
          {/* Gold Razor 1 */}
          <div className="absolute left-[0%] top-[-30%] bottom-[-30%] w-[3px] bg-imposing-gold transform -skew-x-[25deg] opacity-60 shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
          
          {/* Black Bold Band */}
          <div className="absolute left-[4%] top-[-30%] bottom-[-30%] w-[100px] bg-black/[0.04] transform -skew-x-[25deg] border-x border-black/5 backdrop-blur-[1px]" />
          
          {/* Gold Main Stripe - Moved further left away from "digital" */}
          <div className="absolute left-[10%] top-[-30%] bottom-[-30%] w-[12px] bg-imposing-gold shadow-[0_0_40px_rgba(212,175,55,0.5)] transform -skew-x-[25deg]" />
          
          {/* Right Side Group */}
          {/* Wide Golden/Matte Band */}
          <div className="absolute right-[10%] top-[-30%] bottom-[-30%] w-[150px] bg-gradient-to-r from-imposing-gold/15 via-imposing-gold/[0.05] to-imposing-gold/15 border-x border-black/10 backdrop-blur-[1px] transform -skew-x-[25deg]" />
          
          {/* Intense Gold Core Stripe */}
          <div className="absolute right-[5%] top-[-30%] bottom-[-30%] w-[40px] bg-gradient-to-r from-imposing-gold/60 to-imposing-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.15)] transform -skew-x-[25deg] border-r-2 border-black/5" />
          
          {/* Far Right Gold Razor */}
          <div className="absolute right-[0%] top-[-30%] bottom-[-30%] w-[5px] bg-imposing-gold shadow-[0_0_30px_rgba(212,175,55,0.8)] transform -skew-x-[25deg]" />
        </div>

        {/* Ambient Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-imposing-gold/[0.06] rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4"
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-6 md:mb-8">
          <Reveal y={40} duration={1}>
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="text-imposing-gold font-mono text-xs uppercase tracking-[0.8em] font-black">Digital Screener Module</span>
              <div className="h-[1px] w-24 bg-imposing-gold/30" />
            </div>
            
            <h2 className="text-5xl md:text-[8rem] lg:text-[9rem] font-black text-imposing-black leading-[0.85] tracking-tighter uppercase mb-10">
              Triagem <br />
              <span className="text-imposing-gold font-serif italic font-light lowercase">digital</span>
            </h2>
          </Reveal>

          <div className="max-w-2xl mx-auto">
            <Reveal y={30} delay={0.3}>
              <div className="mb-6">
                <Quote className="w-10 h-10 text-imposing-gold/20 mx-auto mb-4" />
                <p className="text-imposing-black text-2xl md:text-3xl font-light leading-tight tracking-tight px-4">
                  Uma escuta técnica <br className="hidden md:block" />
                  <span className="text-imposing-gold italic font-serif text-3xl md:text-4xl">silenciosa</span> para mapear as feridas que impedem seu progresso.
                </p>
              </div>
            </Reveal>

            <Reveal y={20} delay={0.5}>
              <div className="flex flex-col items-center gap-3">
                <div className="bg-black/5 backdrop-blur-sm p-5 md:p-6 rounded-3xl border border-black/5 hover:border-imposing-gold/30 transition-colors duration-500 max-w-lg">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-imposing-gold animate-ping" />
                    <p className="text-imposing-black/70 text-base md:text-lg leading-relaxed font-medium">
                      Seus dados são <span className="text-imposing-black font-bold">criptografados</span> e entregues com exclusividade a Gabriel Rocha.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-imposing-gold" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-imposing-black font-black">Privacidade Total de Dados</span>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-imposing-black/40">Conformidade Ética Internacional</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div id="triagem-form" className="max-w-3xl mx-auto relative overflow-visible">
          {/* Progress Bar */}
          {step < questions.length && (
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <div className="flex flex-col items-start translate-y-2">
                  <span className="text-imposing-gold font-mono text-[10px] uppercase tracking-[0.5em] font-black opacity-60">Status do Mapeamento</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-imposing-black font-black text-2xl md:text-3xl tracking-tighter">Pergunta</span>
                    <span className="text-imposing-gold font-black text-4xl md:text-5xl tracking-tighter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">{step + 1}</span>
                    <span className="text-imposing-black/40 font-bold text-lg md:text-xl italic font-serif">de {questions.length}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-imposing-black font-black text-3xl md:text-4xl tracking-tighter">{Math.round(progress)}%</span>
                  <span className="text-imposing-gold font-mono text-[9px] uppercase tracking-[0.3em] font-bold">Completo</span>
                </div>
              </div>
              
              <div className="h-[3px] w-full bg-black/5 relative rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="absolute h-full bg-gradient-to-r from-imposing-gold/80 to-imposing-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-full"
                />
              </div>
            </div>
          )}

          <div className="relative min-h-[450px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full max-w-xl p-12 bg-imposing-black rounded-[2.5rem] border border-imposing-gold/30 shadow-2xl flex flex-col items-center"
                >
                  <div className="relative w-32 h-32 mb-10">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t-2 border-r-2 border-imposing-gold rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border-b-2 border-l-2 border-white/20 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Brain className="w-10 h-10 text-imposing-gold animate-pulse" />
                    </div>
                  </div>
                  
                  <h3 className="text-imposing-gold font-mono text-[10px] uppercase tracking-[0.5em] font-black mb-4">Análise em Progresso</h3>
                  <div className="h-6 overflow-hidden w-full">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={analysisText}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-white text-sm font-light tracking-wide italic"
                      >
                        {analysisText || "Iniciando processamento..."}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-8 w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                      animate={{ left: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 w-1/2 bg-imposing-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    />
                  </div>
                </motion.div>
              ) : step < questions.length ? (
                <motion.div 
                  key={step}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="bg-imposing-black border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] relative group overflow-hidden">
                    {/* Decorative geometric accent */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-imposing-gold/5 rounded-full blur-3xl group-hover:bg-imposing-gold/10 transition-colors duration-700" />
                    
                    <div className="absolute top-0 right-0 p-8">
                       <ClipboardList className="w-12 h-12 text-imposing-gold/20" />
                    </div>

                    <div className="mb-12 text-left relative z-10">
                       <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-4 text-white">
                          <span className="w-8 h-8 rounded-full border border-imposing-gold flex items-center justify-center text-xs font-mono text-imposing-gold italic">0{step + 1}</span>
                          {questions[step].question}
                       </h3>
                       <p className="text-gray-400 font-light">{questions[step].description}</p>
                    </div>

                    <div className="relative z-10">
                      {questions[step].type === "text" ? (
                        <div className="space-y-8">
                          <input 
                            type="text"
                            value={answers[questions[step].id as keyof typeof answers]}
                            onChange={(e) => setAnswers({ ...answers, [questions[step].id]: e.target.value })}
                            placeholder={questions[step].placeholder}
                            className="w-full bg-transparent border-b-2 border-white/10 focus:border-imposing-gold py-4 text-xl md:text-2xl outline-none transition-all placeholder:text-white/10 text-white"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && answers[questions[step].id as keyof typeof answers] && handleNext()}
                          />
                          <div className="flex justify-between items-center">
                            <button 
                              onClick={handleBack} 
                              disabled={step === 0}
                              className={`flex items-center gap-2 text-sm font-mono uppercase tracking-widest ${step === 0 ? 'opacity-0' : 'text-gray-500 hover:text-white'} transition-colors`}
                            >
                              <ChevronLeft className="w-4 h-4" /> Voltar
                            </button>
                            <motion.button 
                              disabled={!answers[questions[step].id as keyof typeof answers]}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleNext}
                              className={`px-10 py-4 bg-imposing-gold text-imposing-black font-black uppercase text-xs tracking-[0.2em] shadow-xl disabled:opacity-30 disabled:grayscale transition-all`}
                            >
                              Próxima
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {questions[step].options?.map((option, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ x: 10, backgroundColor: "rgba(212, 175, 55, 0.05)", borderColor: "rgba(212, 175, 55, 0.3)" }}
                              onClick={() => handleOptionSelect(option)}
                              className={`p-5 text-left border rounded-2xl transition-all flex justify-between items-center group/btn ${
                                answers[questions[step].id as keyof typeof answers] === option 
                                  ? "border-imposing-gold bg-imposing-gold/10 text-white" 
                                  : "border-white/5 hover:border-white/20 text-gray-400 hover:text-white"
                              }`}
                            >
                              <span className="text-sm md:text-base font-light">{option}</span>
                              <div className={`w-2 h-2 rounded-full transition-all ${
                                answers[questions[step].id as keyof typeof answers] === option 
                                  ? "bg-imposing-gold scale-125 shadow-[0_0_10px_rgba(212,175,55,1)]" 
                                  : "bg-white/10 group-hover/btn:bg-imposing-gold/50"
                              }`} />
                            </motion.button>
                          ))}
                          <div className="col-span-full mt-8 pt-8 border-t border-white/5">
                            <button 
                              onClick={handleBack} 
                              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                            >
                              <ChevronLeft className="w-3 h-3" /> Voltar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-full text-center p-12 md:p-20 bg-imposing-black border border-imposing-gold/30 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-imposing-gold/[0.05] to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 bg-imposing-gold rounded-full mx-auto flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(212,175,55,0.4)]"
                    >
                      <CheckCircle2 className="w-12 h-12 text-imposing-black" />
                    </motion.div>
                    
                    <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-white">Tudo pronto,<br/> <span className="text-imposing-gold font-serif lowercase italic font-light italic">{answers.nome.split(' ')[0]}</span></h3>
                    
                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
                      Sua pré-triagem foi concluída com sucesso. Agora, clique no botão abaixo para encaminhar seus dados com prioridade para o WhatsApp dGabriel Rocha e iniciar seu agendamento.
                    </p>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 211, 102, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendToWhatsApp}
                      className="flex items-center gap-4 px-12 py-5 bg-[#25D366] text-white rounded-full mx-auto font-black uppercase tracking-[0.2em] text-sm group shadow-lg"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Enviar via WhatsApp
                    </motion.button>
                    
                    <p className="mt-8 text-xs font-mono text-gray-500 uppercase tracking-[0.3em] font-medium">Ambiente seguro e ético</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const questions = [
    {
      question: "Como funciona a triagem digital?",
      answer: "A triagem digital é um mapeamento técnico silencioso. Através de perguntas estruturadas, o sistema coleta dados cruciais sobre seu estado emocional atual, que são criptografados e entregues exclusivamente a Gabriel Rocha para análise prévia à consulta."
    },
    {
      question: "As sessões podem ser realizadas de forma remota?",
      answer: "Sim. O Gabriel Rocha realiza atendimentos online através de plataformas seguras que garantem o sigilo profissional, permitindo que pacientes de qualquer lugar do mundo tenham acesso à sua metodologia."
    },
    {
      question: "Qual a duração média do processo terapêutico?",
      answer: "A duração é subjetiva e depende da complexidade de cada caso. No entanto, a abordagem de Gabriel foca em resultados concretos e no desenvolvimento de autonomia, evitando processos excessivamente longos sem objetivos claros."
    },
    {
      question: "O Gabriel Rocha atende convênios médicos?",
      answer: "Sim. O Gabriel Rocha atende os planos Saúde Caixa, Saúde Petrobras, CASSI, Fachesf, Fundação Assefaz e Pro-Social TRF1."
    },
    {
      question: "O que é a técnica de EMDR mencionada no site?",
      answer: "O EMDR (Eye Movement Desensitization and Reprocessing) é uma abordagem terapêutica eficaz, reconhecida pela OMS, para o tratamento de traumas e experiências dolorosas através da estimulação bilateral dos hemisférios cerebrais."
    }
  ];

  return (
    <section id="faq" className="bg-imposing-black py-32 md:py-40 relative overflow-hidden">
      {/* Background architectural details and stripes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Slanted Stripes Inspired by Hero */}
        <div className="absolute top-0 right-[15%] w-px h-full bg-imposing-gold/20 -rotate-12 transform origin-top" />
        <div className="absolute top-0 right-[15.5%] w-1.5 h-full bg-imposing-gold/30 -rotate-12 transform origin-top shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
        <div className="absolute top-0 right-[16%] w-px h-full bg-white/5 -rotate-12 transform origin-top" />
        
        <div className="absolute bottom-0 left-[20%] w-px h-full bg-imposing-gold/10 rotate-12 transform origin-bottom" />
        <div className="absolute bottom-0 left-[21%] w-[2px] h-full bg-imposing-gold/20 rotate-12 transform origin-bottom" />
        <div className="absolute bottom-0 left-[21.5%] w-px h-full bg-white/5 rotate-12 transform origin-bottom" />

        {/* Wide Decorative Diagonal Band */}
        <div className="absolute top-0 right-[30%] w-[100px] h-[150%] bg-imposing-gold/[0.03] -rotate-[15deg] transform origin-top border-x border-imposing-gold/5" />
        
        {/* Small detail strip */}
        <div className="absolute top-1/2 left-0 w-48 h-[1px] bg-gradient-to-r from-imposing-gold/60 to-transparent" />
        <div className="absolute top-[52%] left-0 w-32 h-[1px] bg-gradient-to-r from-imposing-gold/40 to-transparent" />

        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-imposing-gold/[0.05] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-imposing-gold/30" />
                <span className="text-imposing-gold font-mono text-[10px] uppercase tracking-[0.8em] font-black">Esclarecimentos Técnicos</span>
                <div className="h-[1px] w-12 bg-imposing-gold/30" />
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                Dúvidas <br /> <span className="text-imposing-gold font-serif italic lowercase font-light">frequentes</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {questions.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div 
                  className={`group relative transition-all duration-500 rounded-[2rem] overflow-hidden ${activeIndex === idx ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    className={`w-full px-8 md:px-10 py-6 md:py-8 flex items-center justify-between text-left transition-all duration-500 border rounded-[2rem] ${activeIndex === idx ? 'bg-imposing-gold border-imposing-gold shadow-[0_0_40px_rgba(212,175,55,0.25)]' : 'bg-transparent border-white/10 hover:border-imposing-gold/40'}`}
                  >
                    <span className={`text-xl md:text-2xl font-black uppercase tracking-tight leading-tight transition-colors duration-500 ${activeIndex === idx ? 'text-imposing-black' : 'text-white group-hover:text-imposing-gold'}`}>
                      {item.question}
                    </span>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${activeIndex === idx ? 'bg-imposing-black border-imposing-black text-white rotate-180' : 'bg-white/5 border-white/10 text-white/40 group-hover:border-imposing-gold/50 group-hover:text-imposing-gold'}`}>
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                      >
                        <div className="px-10 pb-10 text-white leading-relaxed font-light text-lg md:text-xl opacity-80 pt-6">
                          <div className="h-[2px] w-12 bg-imposing-gold mb-6" />
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const Footer = () => (
  <footer id="contato" className="bg-white py-40 border-t border-black/5 relative overflow-hidden text-imposing-black">
    {/* Intense Gold Decorative Stripes */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-[10%] w-px h-full bg-imposing-gold/40" />
      <div className="absolute top-0 left-[11%] w-1.5 h-full bg-imposing-gold/60" />
      <div className="absolute top-0 left-[12%] w-[2px] h-full bg-imposing-gold/20" />
      
      <div className="absolute top-0 right-[5%] w-32 h-full bg-imposing-gold/[0.03] -skew-x-12" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-imposing-gold/30 -skew-x-12" />
      
      {/* Background Text Accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full text-right pointer-events-none opacity-[0.03] pr-20">
        <h2 className="text-[400px] font-black leading-none select-none tracking-tighter">CONTACT</h2>
      </div>
    </div>

    <div className="container mx-auto px-10 relative z-10">
      {/* Integrated Final CTA into Footer */}
      <div className="mb-32 text-center relative">
        {/* Decorative background glow Behind Title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-imposing-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <Reveal>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-imposing-black uppercase tracking-tighter leading-[0.85] mb-12 overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 whileInView={{ y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                 className="block"
               >
                 Inicie sua
               </motion.span>
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, delay: 0.3 }}
                 className="text-imposing-gold font-serif italic lowercase font-light block my-2"
               >
                 jornada
               </motion.span>
               <motion.span 
                 initial={{ y: "100%" }}
                 whileInView={{ y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                 className="block"
               >
                 hoje.
               </motion.span>
            </h2>
            
            <p className="text-imposing-black/60 font-light text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed border-t border-imposing-black/5 pt-8">
              A reconstrução da sua identidade começa com um único passo técnico e corajoso. Permita-se esta transformação clínica.
            </p>

            <motion.a 
              href="#triagem-form"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-6 px-16 py-7 bg-imposing-gold text-imposing-black rounded-full font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all group overflow-hidden relative"
            >
               <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[35deg]"
              />
              <span className="relative z-10">Agendar Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </motion.a>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col lg:flex-row gap-24">
        <div className="flex-1">
          <Reveal>
            <div className="border-l-4 border-imposing-gold pl-12 transition-none">
              <span className="text-imposing-gold font-mono text-[10px] uppercase tracking-[0.8em] font-black mb-6 block">Contato Direto</span>
              <motion.a 
                whileHover={{ scale: 1.02, x: 10 }}
                href="mailto:gabrielrocha.psicologia@gmail.com" 
                className="text-4xl md:text-5xl font-black hover:text-imposing-gold transition-colors mb-4 block origin-left tracking-tighter break-all md:break-normal"
              >
                gabrielrocha.psicologia@gmail.com
              </motion.a>
              <motion.p 
                whileHover={{ scale: 1.02, x: 10 }}
                className="text-4xl md:text-6xl font-black mb-16 origin-left cursor-default hover:text-imposing-gold transition-colors tracking-tighter"
              >
                (71) 9622-8759
              </motion.p>
              
              <div className="flex gap-8 mb-24">
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "#D4AF37", color: "#0A0A0A", borderColor: "#D4AF37" }}
                  href="https://www.instagram.com/gabrielrocha.psi/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 px-8 py-4 rounded-full border-2 border-imposing-gold text-imposing-black bg-imposing-gold font-black uppercase tracking-[0.2em] text-xs shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all overflow-hidden"
                >
                  {/* Internal Glow Effect */}
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg]"
                  />
                  
                  <Instagram className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Siga no Instagram</span>
                  
                  {/* Pulsing Aura */}
                  <div className="absolute inset-0 rounded-full bg-imposing-gold animate-ping opacity-20 pointer-events-none group-hover:block hidden" />
                </motion.a>
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[10px] uppercase tracking-[0.3em] font-black text-imposing-black/40">
            <motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-all">Privacidade</motion.a>
            <motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-all">Termos</motion.a>
            <motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-all">Cookies</motion.a>
            <motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-all text-imposing-black/20">CRP 03-34761</motion.a>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <Reveal x={50}>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-imposing-gold" />
                <h3 className="text-3xl font-black uppercase tracking-tight">Atendimento Presencial</h3>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-3xl bg-imposing-gold/10 flex items-center justify-center text-imposing-gold flex-shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="text-xl font-black text-imposing-black uppercase tracking-tight mb-2">Consultório Particular</p>
                    <a 
                      href="https://www.google.com/maps/place/Edif%C3%ADcio+Torre+da+Ilha+da+Madeira+Empresarial/@-13.0033791,-38.4614807,1152m/data=!3m2!1e3!4b1!4m6!3m5!1s0x7161b44760914b3:0x15cde5c865b27394!8m2!3d-13.0033843!4d-38.4589058!16s%2Fg%2F11gvqr44dx?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-imposing-black/60 text-lg leading-relaxed hover:text-imposing-gold transition-colors block"
                    >
                      Rua Rio Grande do Sul, 332 - Pituba <br /> 
                      Edf. Torre da Ilha da Madeira
                    </a>
                  </div>
                  <div>
                    <p className="text-xl font-black text-imposing-black uppercase tracking-tight mb-2">Clínica Vidapsi</p>
                    <a 
                      href="https://www.google.com/maps/place/Edif%C3%ADcio+ITC+-+International+Trade+Center+-+Rua+Arthur+de+Azev%C3%AAdo+Machado,+1459+-+Pituba,+Salvador+-+BA,+41770-790/@-12.9875569,-38.4519378,1152m/data=!3m2!1e3!4b1!4m6!3m5!1s0x7161b0ec078a26f:0x2c51fc4cbb432370!8m2!3d-12.9875621!4d-38.4493629!16s%2Fg%2F11xd8s5ffq?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-imposing-black/60 text-lg leading-relaxed hover:text-imposing-gold transition-colors block"
                    >
                      Edifício ITC Sala 811 <br /> 
                      Rua Arthur de Azevêdo Machado, 1459 - Stiep
                    </a>
                  </div>
                  <div>
                    <p className="text-xl font-black text-imposing-black uppercase tracking-tight mb-2">Clínica Vitae</p>
                    <a 
                      href="https://www.google.com/maps/place/Ed.+ATL%C3%82NTICO+EMPRESARIAL/@-13.0050473,-38.4569543,1152m/data=!3m2!1e3!4b1!4m6!3m5!1s0x7161b587f503611:0x249f5daea8941e77!8m2!3d-13.0050525!4d-38.4543794!16s%2Fg%2F11qyp0wt4x?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-imposing-black/60 text-lg leading-relaxed hover:text-imposing-gold transition-colors block"
                    >
                      Rua Paraná, 29 <br /> 
                      Condomínio Edifício Atlântico Empresarial, Pituba
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-40 pt-10 border-t border-imposing-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.4em] text-imposing-black/20">
        <p>© 2026 Gabriel Rocha. Elevando a consciência humana.</p>
        <p>Developed with Pure Excellence.</p>
      </div>
    </div>
  </footer>
);

const FloatingCTA = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  return (
    <motion.a
      href="#triagem-form"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.8)" }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-[110] flex items-center gap-3 bg-imposing-black/90 backdrop-blur-md text-imposing-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] border-2 border-imposing-gold transition-all duration-500 rounded-full group bottom-10 right-10 px-8 py-5"
    >
      <Calendar className="w-5 h-5 md:w-6 md:h-6 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
      <span className="font-black uppercase tracking-[0.2em] text-[11px] md:text-sm drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
        Iniciar Agendamento
      </span>
      
      {/* Neon Border Glow Overlay */}
      <div className="absolute inset-0 rounded-full border-2 border-imposing-gold/50 blur-[2px] pointer-events-none" />
    </motion.a>
  );
};

const MobileBottomNav = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  const navItems = [
    { name: "Sobre", href: "#sobre", icon: <User className="w-5 h-5" /> },
    { name: "Saber Mais", href: "#manifesto", icon: <Brain className="w-5 h-5" /> },
    { name: "FAQ", href: "#faq", icon: <HelpCircle className="w-5 h-5" /> },
    { name: "Agendar", href: "#triagem-form", icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-3 md:hidden"
    >
      <div className="bg-imposing-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex justify-between items-center px-6 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-imposing-gold/50">
        {navItems.map((item) => (
          <a 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-all active:scale-95 group ${
              item.name === "Agendar" ? "text-imposing-gold" : "text-white/50 hover:text-imposing-gold"
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              item.name === "Agendar" ? "bg-imposing-gold/20" : "group-hover:bg-imposing-gold/10"
            }`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider">{item.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

const AdminPortal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check existing Supabase Auth session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsCheckingAuth(false);
    };
    checkSession();

    // Listen for auth state changes (login/logout/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingDetails, setViewingDetails] = useState<{title: string, content: string} | null>(null);
  
  // Calendário e Filtro de Data
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewDate, setViewDate] = useState(new Date());
  
  // Metas e Estatísticas
  const [monthlyGoal, setMonthlyGoal] = useState(() => Number(localStorage.getItem('admin_monthly_goal')) || 100);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(monthlyGoal);
  
  // Novo Estado para Agenda Completa
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  
  // Filtro de Mês para Pacientes
  const [filterMonth, setFilterMonth] = useState<number | 'all'>('all');
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());

  // Estado dos Pacientes (Supabase)
  const [patients, setPatients] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'clientes_fixos' | 'agendamento'>('overview');

  const fetchPatients = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.from('patients').select('*').order('created_at', { ascending: false });
      if (data) {
        setPatients(data);
        setLastUpdated(new Date());
      }
    } finally {
      // Pequeno delay para feedback visual do botão girando
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchPatients();
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    nome: "", 
    idade: "", 
    telefone: "", 
    motivo: "", 
    dataSugerida: "", 
    horarioSugerido: "",
    valor_sessao: 0,
    periodicidade: "Semanal",
    dia_hora_fixo: "",
    origem: "Quiz",
    pauta_proxima: "",
    especialidade: "Geral"
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (patient: any) => {
    setEditingId(patient.id);
    const timeParts = patient.horario ? patient.horario.split(' ') : ["", ""];
    setFormData({
      nome: patient.nome,
      idade: patient.idade || "",
      telefone: patient.telefone || "",
      motivo: patient.triagem || "",
      dataSugerida: timeParts[0] || "",
      horarioSugerido: timeParts[1] || "",
      valor_sessao: patient.valor_sessao || 0,
      periodicidade: patient.periodicidade || "Semanal",
      dia_hora_fixo: patient.dia_hora_fixo || "",
      origem: patient.origem || "Quiz",
      pauta_proxima: patient.pauta_proxima || "",
      especialidade: patient.especialidade || "Geral"
    });
    setActiveTab('agendamento');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (authError) {
        setError("Acesso negado. Credenciais administrativas inválidas.");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem('admin_portal_open');
    onClose();
  };


  const deletePatient = async (id: number) => {
    if(confirm("Deseja realmente excluir este paciente?")) {
      await supabase.from('patients').delete().eq('id', id);
      fetchPatients();
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const updateData: any = { status: newStatus };
    if (newStatus === 'Finalizado') {
      updateData.ultima_sessao = new Date().toISOString();
    }
    await supabase.from('patients').update(updateData).eq('id', id);
    fetchPatients();
  };

  const handleWhatsApp = (patient: any) => {
    const cleanedPhone = patient.telefone.replace(/\D/g, '');
    const msg = `Olá ${patient.nome.split(' ')[0]}, aqui é Gabriel. Confirmando nossa sessão de hoje às ${patient.horario}. Tudo certo por aí?`;
    window.open(`https://api.whatsapp.com/send?phone=${cleanedPhone}&text=${encodeURIComponent(msg)}`, "_blank");
  };

  const copyToProntuario = (patient: any) => {
    const text = `📋 REGISTRO DE TRIAGEM - Gabriel Rocha\n` +
      `----------------------------------------\n` +
      `👤 PACIENTE: ${patient.nome}\n` +
      `📅 ESPECIALIDADE: ${patient.especialidade}\n` +
      `🚩 QUEIXA: ${patient.dor}\n\n` +
      `📝 DETALHES DA TRIAGEM:\n${patient.triagem}\n` +
      `----------------------------------------\n` +
      `Gerado via Portal GR Administrativo`;
    
    navigator.clipboard.writeText(text);
    alert("Prontuário copiado com sucesso para o sistema oficial.");
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.nome.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = false;
    if (!selectedDate) {
      matchesDate = true;
    } else {
      if (p.horario && p.horario.startsWith(selectedDate)) {
        matchesDate = true;
      } else if (p.periodicidade === 'Fixo' && p.dia_hora_fixo) {
        try {
          const parts = selectedDate.split('-');
          const selectedDayOfWeek = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).getDay();
          const parsed = JSON.parse(p.dia_hora_fixo);
          if (parsed.dia === selectedDayOfWeek) matchesDate = true;
        } catch (e) {}
      }
    }
    
    // Filtro por mês/ano (se não houver data específica selecionada)
    let matchesMonth = true;
    if (!selectedDate && filterMonth !== 'all') {
      if (p.periodicidade === 'Fixo') {
        matchesMonth = true;
      } else if (p.horario) {
        const pDate = new Date(p.horario);
        matchesMonth = pDate.getMonth() === filterMonth && pDate.getFullYear() === filterYear;
      } else {
        matchesMonth = false;
      }
    }
    
    return matchesSearch && (selectedDate ? matchesDate : matchesMonth);
  });

  const togglePayment = async (id: number, currentStatus: boolean) => {
    await supabase.from('patients').update({ status_pagamento: !currentStatus }).eq('id', id);
    fetchPatients();
  };

  const updatePauta = async (id: number, text: string) => {
    await supabase.from('patients').update({ pauta_proxima: text }).eq('id', id);
    fetchPatients();
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-imposing-black flex overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 fixed" />
      
      {isAuthenticated && (
        <motion.aside 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-24 md:w-72 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-10 z-50"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-imposing-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-16">
            <span className="text-imposing-black font-black text-2xl">GR</span>
          </div>

          <nav className="flex-1 w-full px-4 space-y-4">
            {[
              { id: 'overview', label: 'Visão Geral', icon: <LayoutDashboard className="w-5 h-5" /> },
              { id: 'patients', label: 'Pacientes', icon: <User className="w-5 h-5" /> },
              { id: 'clientes_fixos', label: 'Clientes Fixos', icon: <Calendar className="w-5 h-5" /> },
              { id: 'agendamento', label: 'Novo Registro', icon: <Plus className="w-5 h-5" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  if (item.id === 'patients') {
                    setFilterMonth('all');
                    setSelectedDate("");
                  }
                }}
                className={`w-full flex flex-col md:flex-row items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                  activeTab === item.id 
                    ? 'bg-imposing-gold text-imposing-black shadow-[0_10px_25px_rgba(212,175,55,0.2)]' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTab === item.id ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                  {item.icon}
                </div>
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div layoutId="nav-indicator" className="hidden md:block ml-auto w-1.5 h-1.5 bg-black rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto px-4 w-full">
            <button 
              onClick={handleLogout}
              className="w-full flex flex-col md:flex-row items-center gap-4 px-4 py-4 rounded-2xl text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all"
            >
              <ZapOff className="w-5 h-5" />
              <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Sair</span>
            </button>
          </div>
        </motion.aside>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <header className="sticky top-0 z-40 bg-imposing-black/60 backdrop-blur-xl border-b border-white/5 px-8 py-6">
          <div className="container mx-auto flex justify-between items-center gap-8">
            <div className="flex-1 max-w-xl">
              {isAuthenticated && (
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-imposing-gold transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar pacientes..." 
                    className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-14 pr-6 text-sm text-white placeholder:text-white/10 focus:border-imposing-gold focus:bg-white/[0.05] transition-all outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-8">
               {isAuthenticated && (
                 <div className="hidden md:flex items-center gap-6">
                    <button 
                      onClick={() => fetchPatients()}
                      disabled={isRefreshing}
                      className={`flex items-center gap-3 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <RotateCcw className={`w-3.5 h-3.5 text-imposing-gold transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                      <div className="text-left">
                        <p className="text-[8px] text-white/40 font-black uppercase tracking-widest leading-none mb-0.5">Atualizar</p>
                        <p className="text-[9px] text-white/80 font-black uppercase tracking-widest">Sincronizar</p>
                      </div>
                    </button>

                    <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                       <div className="text-right">
                         <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none mb-1">Status</p>
                         <p className="text-[11px] text-green-500 font-black uppercase tracking-widest">Servidor Online</p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                       </div>
                    </div>
                 </div>
               )}
               <div className="w-px h-8 bg-white/5 mx-2" />
               <motion.div whileHover={{ scale: 1.05 }} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <User className="w-5 h-5 text-imposing-gold" />
               </motion.div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12">
          {isCheckingAuth ? (
            <div className="flex items-center justify-center mt-40">
              <div className="flex flex-col items-center gap-6">
                <RotateCcw className="w-8 h-8 text-imposing-gold animate-spin" />
                <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Verificando sessão...</p>
              </div>
            </div>
          ) : !isAuthenticated ? (
            <div className="max-w-md mx-auto mt-20 relative">
              <button 
                onClick={onClose} 
                className="absolute -top-12 right-0 text-white/40 hover:text-imposing-gold flex items-center gap-2 uppercase text-[10px] font-black tracking-widest transition-colors"
              >
                Retornar ao Site <X className="w-4 h-4" />
              </button>
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/[0.02] border border-white/5 p-12 backdrop-blur-3xl rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-imposing-gold" />
                 <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-imposing-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-imposing-gold/20">
                      <Lock className="w-8 h-8 text-imposing-gold" />
                    </div>
                    <h2 className="text-3xl font-black uppercase text-white tracking-tighter leading-none mb-2">Restrito</h2>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Identificação Necessária</p>
                 </div>
                 <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-black text-imposing-gold ml-1">E-mail Administrativo</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white text-sm focus:border-imposing-gold outline-none transition-all" placeholder="gabriel@exemplo.com" required />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-black text-imposing-gold ml-1">Senha de Acesso</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white text-sm focus:border-imposing-gold outline-none transition-all" placeholder="••••••••" required />
                    </div>
                    <button disabled={isLoggingIn} className={`w-full bg-imposing-gold text-imposing-black py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {isLoggingIn ? <><RotateCcw className="w-4 h-4 animate-spin" /> Autenticando...</> : 'Autenticar Sistema'}
                    </button>
                    {error && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-red-500 text-[9px] uppercase font-bold text-center flex items-center justify-center gap-2 tracking-widest"><AlertCircle className="w-3 h-3" /> {error}</p>
                      </motion.div>
                    )}
                 </form>
              </motion.div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-2">Painel de <span className="text-imposing-gold">Controle</span></h2>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.4em]">Performance e Métricas Clínicas</p>
                    </div>
                    <div className="flex gap-4">
                       {/* Botão de Relatórios removido a pedido do usuário */}
                    </div>
                  </div>

                  {/* Stat Cards Refined */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div whileHover={{ y: -10 }} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                         <ZapOff className="w-32 h-32 text-white" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-6">Faturamento Acumulado</p>
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-black text-green-500/50 mb-1.5">R$</span>
                        <p className="text-6xl font-black text-white leading-none">
                          {patients.filter(p => p.status_pagamento).reduce((acc, p) => acc + Number(p.valor_sessao || 0), 0).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 w-fit px-3 py-1.5 rounded-full border border-green-500/20">
                        Total líquido recebido
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -10 }} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                         <Target className="w-32 h-32 text-white" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-6">Meta de Atendimentos</p>
                      <div className="flex items-end gap-4">
                        <p className="text-6xl font-black text-imposing-gold leading-none">
                          {monthlyGoal > 0 ? Math.round((patients.filter(p => p.status === 'Finalizado').length / monthlyGoal) * 100) : 0}%
                        </p>
                        <div className="mb-1">
                           <p className="text-[10px] font-black text-white uppercase tracking-widest">{patients.filter(p => p.status === 'Finalizado').length} de {monthlyGoal}</p>
                           <div className="w-24 h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((patients.filter(p => p.status === 'Finalizado').length / monthlyGoal) * 100, 100)}%` }} className="h-full bg-imposing-gold" />
                           </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setTempGoal(monthlyGoal);
                          setIsEditingGoal(true);
                        }} 
                        className="mt-8 text-[9px] font-black text-white/20 hover:text-imposing-gold uppercase tracking-widest transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-3 h-3" /> Ajustar Meta Mensal
                      </button>
                    </motion.div>

                    <motion.div whileHover={{ y: -10 }} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden shadow-2xl col-span-1 md:col-span-2 lg:col-span-1">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                         <User className="w-32 h-32 text-white" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 mb-6">Total de Pacientes</p>
                      <p className="text-6xl font-black text-white leading-none">{patients.length}</p>
                      <div className="mt-8 flex gap-2">
                        {['Quiz', 'Indicação', 'Instagram'].map(source => (
                          <div key={source} className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 text-[9px] font-black uppercase text-white/40">
                            {source}: {patients.filter(p => p.origem === source).length}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                       <div className="flex justify-between items-center mb-10">
                          <div>
                            <h4 className="text-white text-xs uppercase font-black tracking-widest mb-1">Distribuição Mensal de Atendimentos</h4>
                            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Visualização por dia</p>
                          </div>
                          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
                            <select 
                              value={viewDate.getMonth()} 
                              onChange={(e) => {
                                const newDate = new Date(viewDate);
                                newDate.setMonth(Number(e.target.value));
                                setViewDate(newDate);
                              }}
                              className="bg-transparent text-[10px] font-black text-white uppercase border-none outline-none p-2 cursor-pointer"
                            >
                              {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((m, i) => (
                                <option key={m} value={i} className="bg-imposing-black">{m}</option>
                              ))}
                            </select>
                            <div className="w-px h-4 bg-white/10" />
                            <input 
                              type="number"
                              value={viewDate.getFullYear()}
                              onChange={(e) => {
                                const newDate = new Date(viewDate);
                                newDate.setFullYear(Number(e.target.value));
                                setViewDate(newDate);
                              }}
                              className="bg-transparent text-[10px] font-black text-white uppercase border-none outline-none p-2 w-16 text-center focus:text-imposing-gold transition-colors"
                            />
                          </div>
                       </div>
                       
                       <div className="flex items-end gap-1.5 h-64 mb-14 relative">
                           {/* Linhas de Grade de Fundo */}
                           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                              {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-full border-t border-white/10 h-px" />
                              ))}
                           </div>
                          {(() => {
                            const year = viewDate.getFullYear();
                            const month = viewDate.getMonth();
                            const daysInMonth = new Date(year, month + 1, 0).getDate();
                            const bars = [];
                            for (let d = 1; d <= daysInMonth; d++) {
                              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                              const currentDayOfWeek = new Date(year, month, d).getDay();
                              const dayPatients = patients.filter(p => {
                                if (p.horario && p.horario.startsWith(dateStr)) return true;
                                if (p.periodicidade === 'Fixo' && p.dia_hora_fixo) {
                                  try {
                                    const parsed = JSON.parse(p.dia_hora_fixo);
                                    if (parsed.dia === currentDayOfWeek) return true;
                                  } catch (e) { }
                                }
                                return false;
                              });
                              const count = dayPatients.length;
                              const isSelected = selectedDate === dateStr;
                              bars.push(
                                <div key={d} className="flex-1 flex flex-col items-center h-full group">
                                   <motion.div 
                                     initial={{ height: 0 }}
                                     animate={{ height: `${Math.min(count * 12 + 5, 100)}%` }}
                                     onClick={() => {
                                       setSelectedDate(dateStr);
                                       setActiveTab('patients');
                                     }}
                                     className={`w-full rounded-full cursor-pointer transition-all relative z-10 ${
                                       isSelected ? 'bg-imposing-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 
                                       count > 0 ? 'bg-white/20 hover:bg-imposing-gold/40' : 'bg-white/[0.02] hover:bg-white/10'
                                     }`}
                                   >
                                     {count > 0 && (
                                       <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-imposing-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-[8px] font-black text-imposing-gold opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap z-50 shadow-2xl ring-1 ring-white/5">
                                         {count} {count === 1 ? 'Consulta' : 'Consultas'}
                                       </div>
                                     )}
                                   </motion.div>
                                   <span className={`text-[7px] font-black mt-4 transition-all ${isSelected ? 'text-imposing-gold' : (d % 5 === 0 || d === 1) ? 'text-white/20' : 'opacity-0'}`}>
                                     {d}
                                   </span>
                                </div>
                              );
                            }
                            return bars;
                          })()}
                       </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                       <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                          <h4 className="text-white text-xs uppercase font-black tracking-widest mb-8 pb-6 border-b border-white/5">Agenda Hoje</h4>
                          <div className="space-y-4 max-h-[250px] overflow-y-auto custom-scrollbar pr-4">
                            {(() => {
                              const today = new Date().toISOString().split('T')[0];
                              const currentDayOfWeek = new Date().getDay();
                              
                              const todayPatients = patients.filter(p => {
                                if (p.horario && p.horario.startsWith(today)) return true;
                                if (p.periodicidade === 'Fixo' && p.dia_hora_fixo) {
                                  try {
                                    const parsed = JSON.parse(p.dia_hora_fixo);
                                    if (parsed.dia === currentDayOfWeek) return true;
                                  } catch (e) { }
                                }
                                return false;
                              }).map(p => {
                                if (p.periodicidade === 'Fixo' && p.dia_hora_fixo) {
                                  try {
                                    const parsed = JSON.parse(p.dia_hora_fixo);
                                    return { ...p, horarioVirtual: `${today} ${parsed.hora}` };
                                  } catch (e) { }
                                }
                                return { ...p, horarioVirtual: p.horario };
                              });
                              
                              if (todayPatients.length === 0) return <p className="text-[10px] text-white/20 uppercase font-black text-center py-10 tracking-widest">Nenhuma consulta hoje</p>;
                              
                              return todayPatients.sort((a,b) => (a.horarioVirtual || "").localeCompare(b.horarioVirtual || "")).map((p, index) => (
                                <div key={p.id || `fixo-${index}`} className="flex items-center justify-between p-4 rounded-2xl border bg-imposing-gold/10 border-imposing-gold/30">
                                  <span className="text-[10px] font-mono font-black text-white/40">{(p.horarioVirtual || "").split(' ')[1]}</span>
                                  <span className="text-[11px] font-black text-imposing-gold uppercase truncate max-w-[150px]">{p.nome}</span>
                                </div>
                              ));
                            })()}
                          </div>
                          <button 
                            onClick={() => setIsAgendaModalOpen(true)}
                            className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black text-white/40 uppercase tracking-widest transition-all"
                          >
                            Ver Agenda Completa (24h)
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'patients' && (
                <motion.div 
                  key="patients"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex items-center gap-8">
                      <div>
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-2">Base de <span className="text-imposing-gold">Pacientes</span></h2>
                        <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.4em]">Gestão de Prontuários e Histórico</p>
                      </div>
                      
                      <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/5 p-2 rounded-2xl">
                         <select 
                           value={filterMonth} 
                           onChange={(e) => {
                             const val = e.target.value;
                             setFilterMonth(val === 'all' ? 'all' : Number(val));
                             setSelectedDate(""); 
                           }}
                           className="bg-transparent text-[10px] font-black text-white uppercase border-none outline-none p-2 cursor-pointer"
                         >
                           <option value="all" className="bg-imposing-black">Todos os Meses</option>
                           {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((m, i) => (
                             <option key={m} value={i} className="bg-imposing-black">{m}</option>
                           ))}
                         </select>
                         <div className="w-px h-4 bg-white/10" />
                         <input 
                           type="number"
                           value={filterYear} 
                           onChange={(e) => setFilterYear(Number(e.target.value))}
                           className="bg-transparent text-[10px] font-black text-white uppercase border-none outline-none p-2 w-16 text-center focus:text-imposing-gold transition-colors"
                           placeholder="Ano"
                         />
                      </div>

                      {selectedDate && (
                        <button 
                          onClick={() => setSelectedDate("")}
                          className="text-[9px] font-black text-imposing-gold uppercase bg-imposing-gold/10 px-4 py-2 rounded-full border border-imposing-gold/20 flex items-center gap-2"
                        >
                          <X className="w-3 h-3" /> Limpar Filtro de Dia ({selectedDate})
                        </button>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ nome: "", idade: "", telefone: "", motivo: "", dataSugerida: "", horarioSugerido: "", valor_sessao: 0, periodicidade: "Semanal", origem: "Quiz", pauta_proxima: "", especialidade: "Geral" });
                        setActiveTab('agendamento');
                      }} 
                      className="bg-imposing-gold text-imposing-black px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-2xl flex items-center gap-3"
                    >
                      <Plus className="w-5 h-5" /> Adicionar Paciente
                    </button>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Identificação</th>
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Documentação</th>
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Agendamento</th>
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Última Sessão</th>
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30 text-center">Pagamento</th>
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Status</th>
                          <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/30 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {filteredPatients.length > 0 ? filteredPatients.map((p, idx) => (
                          <motion.tr 
                            key={p.id} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="hover:bg-white/[0.03] transition-all group"
                          >
                            <td className="p-8">
                              <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-imposing-gold/10 flex items-center justify-center text-imposing-gold font-black text-sm border border-imposing-gold/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                                  {p.nome.split(' ').map((n:any)=>n[0]).join('').substring(0,2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-white font-bold text-lg tracking-tight group-hover:text-imposing-gold transition-colors">{p.nome}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                     <span className="text-[9px] uppercase tracking-widest font-black text-white/20">ID: #{p.id}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-8">
                                <div className="flex items-center gap-3">
                                   <button 
                                     onClick={() => setViewingDetails({ title: "Relato de Triagem", content: p.triagem })}
                                     className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-imposing-gold hover:text-black transition-all group/btn"
                                     title="Ver Triagem"
                                   >
                                     <FileText className="w-5 h-5 text-white/20 group-hover/btn:text-black" />
                                   </button>
                                   <button 
                                     onClick={() => setViewingDetails({ title: "Pauta Próxima Sessão", content: p.pauta_proxima || "Nenhuma pauta definida." })}
                                     className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-green-500 hover:text-black transition-all group/btn"
                                     title="Ver Pauta"
                                   >
                                     <NotebookPen className="w-5 h-5 text-white/20 group-hover/btn:text-black" />
                                   </button>
                                </div>
                             </td>
                            <td className="p-8">
                               <div className="space-y-1.5">
                                 <div className="flex items-center gap-3">
                                   <Calendar className="w-4 h-4 text-imposing-gold" />
                                   <span className="text-sm font-mono font-black text-white/90">{p.horario}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">{p.origem}</span>
                                   <div className="w-1 h-1 bg-white/10 rounded-full" />
                                   <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">{p.periodicidade}</span>
                                 </div>
                               </div>
                            </td>
                            <td className="p-8">
                               {p.ultima_sessao ? (
                                 <div className="space-y-1">
                                   <p className="text-sm font-mono font-black text-imposing-gold">
                                     {new Date(p.ultima_sessao).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                   </p>
                                   <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">
                                     às {new Date(p.ultima_sessao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                   </p>
                                 </div>
                               ) : (
                                 <span className="text-[9px] text-white/10 uppercase font-black tracking-widest">Nenhuma</span>
                               )}
                             </td>
                            <td className="p-8 text-center">
                               <button 
                                 onClick={() => togglePayment(p.id, p.status_pagamento)}
                                 className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto transition-all border ${p.status_pagamento ? 'bg-green-500 border-green-500 text-black shadow-[0_10px_25px_rgba(34,197,94,0.3)]' : 'bg-white/5 border-white/5 text-white/10 hover:border-green-500/30'}`}
                               >
                                  <Check className="w-7 h-7" />
                               </button>
                            </td>
                            <td className="p-8">
                               <select 
                                  value={p.status}
                                  onChange={(e) => updateStatus(p.id, e.target.value)}
                                  className={`text-[10px] font-black uppercase tracking-widest px-5 py-3.5 bg-black/40 border rounded-2xl focus:ring-4 outline-none transition-all cursor-pointer ${
                                    p.status === 'Aguardando consulta' ? 'border-imposing-gold/30 text-imposing-gold focus:ring-imposing-gold/10' :
                                    p.status === 'Finalizado' ? 'border-green-500/30 text-green-500 focus:ring-green-500/10' :
                                    'border-red-500/30 text-red-500 focus:ring-red-500/10'
                                  }`}
                               >
                                  <option value="Aguardando consulta">Aguardando</option>
                                  <option value="Finalizado">Finalizado</option>
                                  <option value="Faltou">Faltou</option>
                               </select>
                            </td>
                            <td className="p-8 text-right">
                              <div className="flex justify-end items-center gap-3">
                                 <button onClick={() => handleWhatsApp(p)} className="p-4 bg-white/5 hover:bg-green-500/10 border border-white/5 hover:border-green-500/20 text-white/20 hover:text-green-500 rounded-2xl transition-all"><MessageCircle className="w-5 h-5" /></button>
                                 <button onClick={() => copyToProntuario(p)} className="p-4 bg-white/5 hover:bg-imposing-gold/10 border border-white/5 hover:border-imposing-gold/20 text-white/20 hover:text-imposing-gold rounded-2xl transition-all"><Copy className="w-5 h-5" /></button>
                                 <button onClick={() => startEdit(p)} className="p-4 bg-white/5 hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/20 text-white/20 hover:text-blue-500 rounded-2xl transition-all"><Edit className="w-5 h-5" /></button>
                                 <button onClick={() => deletePatient(p.id)} className="p-4 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-white/20 hover:text-red-500 rounded-2xl transition-all"><Trash2 className="w-5 h-5" /></button>
                              </div>
                            </td>
                          </motion.tr>
                        )) : (
                          <tr>
                            <td colSpan={6} className="p-32 text-center">
                              <div className="flex flex-col items-center gap-6 opacity-10">
                                <Search className="w-20 h-20" />
                                <p className="text-sm font-black uppercase tracking-[0.5em]">Nenhum registro encontrado</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'clientes_fixos' && (
                <motion.div 
                  key="clientes_fixos"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex items-center gap-8">
                      <div>
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-2">Clientes <span className="text-imposing-gold">Fixos</span></h2>
                        <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.4em]">Gestão de Agendamentos Recorrentes</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/[0.02] border-b border-white/10">
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Paciente</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Dia da Semana</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Horário</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Última Sessão</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.filter(p => p.periodicidade === 'Fixo').map(p => {
                          let diaTexto = "Desconhecido";
                          let horaTexto = "--:--";
                          if (p.dia_hora_fixo) {
                            try {
                              const parsed = JSON.parse(p.dia_hora_fixo);
                              const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
                              diaTexto = dias[parsed.dia] || "Desconhecido";
                              horaTexto = parsed.hora || "--:--";
                            } catch(e) {}
                          }
                          return (
                          <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <td className="p-6">
                              <p className="text-sm font-black text-white group-hover:text-imposing-gold transition-colors">{p.nome}</p>
                              <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1">{p.telefone}</p>
                            </td>
                            <td className="p-6">
                              <span className="bg-imposing-gold/10 text-imposing-gold px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-imposing-gold/20">
                                {diaTexto}
                              </span>
                            </td>
                            <td className="p-6">
                              <span className="text-xs font-mono font-bold text-white/70">{horaTexto}</span>
                            </td>
                            <td className="p-6">
                              {p.ultima_sessao ? (
                                <div className="space-y-1">
                                  <p className="text-[11px] font-black text-imposing-gold">
                                    {new Date(p.ultima_sessao).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                  </p>
                                  <p className="text-[8px] text-white/20 uppercase font-black tracking-widest">
                                    {new Date(p.ultima_sessao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-[8px] text-white/10 uppercase font-black tracking-widest">Pendente</span>
                              )}
                            </td>
                            <td className="p-6 text-right">
                              <div className="flex justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(p)} className="p-2.5 bg-white/5 hover:bg-imposing-gold hover:text-imposing-black rounded-xl transition-all" title="Editar">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleWhatsApp(p)} className="p-2.5 bg-white/5 hover:bg-green-500 hover:text-white rounded-xl transition-all" title="WhatsApp">
                                  <MessageCircle className="w-4 h-4" />
                                </button>
                                <button onClick={() => deletePatient(p.id)} className="p-2.5 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all" title="Excluir">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )})}
                        {patients.filter(p => p.periodicidade === 'Fixo').length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-32 text-center">
                              <div className="flex flex-col items-center gap-6 opacity-10">
                                <Calendar className="w-20 h-20" />
                                <p className="text-sm font-black uppercase tracking-[0.5em]">Nenhum cliente fixo registrado</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <p className="text-[9px] text-center text-white/5 uppercase tracking-[0.8em] font-black py-20">
           Sistema de Gestão Clínica · Gabriel Rocha · Versão 4.0
        </p>
      </div>

      {/* Tela de Novo Agendamento (Overlay) */}
      <AnimatePresence>
        {activeTab === 'agendamento' && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            className="fixed inset-0 z-[250] bg-imposing-black overflow-y-auto"
          >
             <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 p-12 md:p-16 rounded-3xl relative shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                  <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-10">
                     <div className="space-y-2 text-left">
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">Novo Registro</h2>
                        <p className="text-imposing-gold text-xs uppercase font-black tracking-widest opacity-60">Integração de Prontuário</p>
                     </div>
                     <button 
                        onClick={() => {
                          if (editingId) {
                            setActiveTab('patients');
                          } else {
                            setActiveTab('overview');
                          }
                          setEditingId(null);
                        }} 
                        className="p-5 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-all text-white/30 border border-white/10"
                      >
                        <X className="w-7 h-7" />
                      </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-16 text-left">
                    <div className="space-y-10">
                       <div className="flex items-center gap-4 border-l-4 border-imposing-gold pl-6">
                          <span className="text-3xl font-black text-imposing-gold/20">01</span>
                          <h4 className="text-white text-[11px] uppercase font-black tracking-[0.3em]">Perfil do Paciente</h4>
                       </div>
                       <div className="space-y-6">
                         <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Nome Completo</label>
                            <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" placeholder="Ex: Rodrigo M. Oliveira" />
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                               <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Idade</label>
                               <input type="text" value={formData.idade} onChange={(e) => setFormData({...formData, idade: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" placeholder="Ex: 34" />
                            </div>
                            <div className="space-y-3">
                               <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Telefone</label>
                               <input type="text" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" placeholder="55719..." />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Relato de Triagem</label>
                            <textarea value={formData.motivo} onChange={(e) => setFormData({...formData, motivo: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none h-44 rounded-xl resize-none" placeholder="Quais são as queixas principais e dores relatadas?" />
                         </div>
                       </div>
                    </div>

                    <div className="space-y-10">
                       <div className="flex items-center gap-4 border-l-4 border-imposing-gold pl-6">
                          <span className="text-3xl font-black text-imposing-gold/20">02</span>
                          <h4 className="text-white text-[11px] uppercase font-black tracking-[0.3em]">Agenda</h4>
                       </div>
                       <div className="space-y-6 pt-4">
                            <div className="space-y-3">
                               <label className="text-xs uppercase tracking-widest font-black text-gray-500 ml-1">Pauta para a Próxima Semana</label>
                               <textarea 
                                 value={formData.pauta_proxima} 
                                 onChange={(e) => setFormData({...formData, pauta_proxima: e.target.value})} 
                                 className="w-full bg-black border border-white/10 px-6 py-6 text-white font-medium focus:border-imposing-gold outline-none rounded-2xl min-h-[120px] resize-none" 
                                 placeholder="Descreva os pontos principais para a próxima sessão..."
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-3">
                               <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Data</label>
                               <input type="date" value={formData.dataSugerida} onChange={(e) => setFormData({...formData, dataSugerida: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" />
                            </div>
                            <div className="space-y-3">
                               <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Horário</label>
                               <input type="time" value={formData.horarioSugerido} onChange={(e) => setFormData({...formData, horarioSugerido: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" />
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="space-y-3">
                               <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Valor da Sessão (R$)</label>
                               <input type="number" value={formData.valor_sessao} onChange={(e) => setFormData({...formData, valor_sessao: Number(e.target.value)})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" placeholder="Valor da sessão..." />
                            </div>
                            <div className="space-y-3">
                               <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Periodicidade</label>
                               <select value={formData.periodicidade} onChange={(e) => setFormData({...formData, periodicidade: e.target.value})} className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl cursor-pointer">
                                  <option value="Semanal">Semanal</option>
                                  <option value="Quinzenal">Quinzenal</option>
                                  <option value="Mensal">Mensal</option>
                                  <option value="Avulso">Avulso</option>
                                  <option value="Fixo">Fixo (Semanal Fixo)</option>
                               </select>
                            </div>
                         </div>

                         {formData.periodicidade === 'Fixo' && (
                           <div className="grid grid-cols-2 gap-6 pt-4">
                             <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Dia da Semana Fixo</label>
                                <select 
                                  value={formData.dia_hora_fixo ? JSON.parse(formData.dia_hora_fixo).dia : "1"} 
                                  onChange={(e) => {
                                    const parsed = formData.dia_hora_fixo ? JSON.parse(formData.dia_hora_fixo) : { dia: 1, hora: "08:00" };
                                    setFormData({...formData, dia_hora_fixo: JSON.stringify({...parsed, dia: Number(e.target.value)})});
                                  }} 
                                  className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl cursor-pointer"
                                >
                                  <option value="1">Segunda-feira</option>
                                  <option value="2">Terça-feira</option>
                                  <option value="3">Quarta-feira</option>
                                  <option value="4">Quinta-feira</option>
                                  <option value="5">Sexta-feira</option>
                                  <option value="6">Sábado</option>
                                  <option value="0">Domingo</option>
                                </select>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Horário Fixo</label>
                                <input 
                                  type="time" 
                                  value={formData.dia_hora_fixo ? JSON.parse(formData.dia_hora_fixo).hora : "08:00"} 
                                  onChange={(e) => {
                                    const parsed = formData.dia_hora_fixo ? JSON.parse(formData.dia_hora_fixo) : { dia: 1, hora: "08:00" };
                                    setFormData({...formData, dia_hora_fixo: JSON.stringify({...parsed, hora: e.target.value})});
                                  }} 
                                  className="w-full bg-black border border-white/10 px-5 py-5 text-white font-medium focus:border-imposing-gold outline-none rounded-xl" 
                                />
                             </div>
                           </div>
                         )}

                         <div className="space-y-3 pt-4">
                            <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Origem do Paciente</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                               {['Quiz', 'Indicação', 'Instagram', 'Orgânico'].map(o => (
                                 <button key={o} type="button" onClick={() => setFormData({...formData, origem: o})} className={`py-3 border text-[9px] font-black uppercase transition-all rounded-xl ${formData.origem === o ? 'bg-imposing-gold/20 border-imposing-gold text-imposing-gold' : 'bg-white/5 border-white/10 text-gray-400 hover:border-imposing-gold hover:text-white'}`}>{o}</button>
                               ))}
                            </div>
                         </div>
                         <div className="pt-12">
                            <button 
                              onClick={async () => {
                                const horario = formData.dataSugerida || formData.horarioSugerido ? `${formData.dataSugerida} ${formData.horarioSugerido}` : "";
                                const dia_hora_fixo = formData.periodicidade === 'Fixo' ? (formData.dia_hora_fixo || JSON.stringify({ dia: 1, hora: "08:00" })) : "";
                                
                                if (editingId) {
                                  await supabase.from('patients').update({
                                    nome: formData.nome,
                                    idade: formData.idade,
                                    telefone: formData.telefone,
                                    triagem: formData.motivo,
                                    horario: horario,
                                    valor_sessao: formData.valor_sessao,
                                    periodicidade: formData.periodicidade,
                                    dia_hora_fixo: dia_hora_fixo,
                                    origem: formData.origem,
                                    pauta_proxima: formData.pauta_proxima
                                  }).eq('id', editingId);
                                  alert("Informações atualizadas com sucesso!");
                                } else {
                                  await supabase.from('patients').insert([{
                                    nome: formData.nome,
                                    idade: formData.idade,
                                    telefone: formData.telefone,
                                    dor: 'Registro Manual',
                                    especialidade: 'Geral',
                                    triagem: formData.motivo,
                                    horario: horario,
                                    valor_sessao: formData.valor_sessao,
                                    periodicidade: formData.periodicidade,
                                    dia_hora_fixo: dia_hora_fixo,
                                    origem: formData.origem,
                                    pauta_proxima: formData.pauta_proxima,
                                    status_pagamento: false
                                  }]);
                                  alert("Paciente cadastrado com sucesso!");
                                }
                                
                                fetchPatients();
                                setEditingId(null);
                                if (activeTab === 'agendamento' && !editingId) {
                                  setActiveTab('overview');
                                } else {
                                  setActiveTab('patients');
                                }
                                setFormData({ nome: "", idade: "", telefone: "", motivo: "", dataSugerida: "", horarioSugerido: "", valor_sessao: 0, periodicidade: "Semanal", dia_hora_fixo: "", origem: "Quiz", pauta_proxima: "", especialidade: "Geral" });
                              }}
                              className="w-full py-7 bg-imposing-gold text-imposing-black font-black uppercase tracking-[0.5em] text-[11px] shadow-[0_20px_50px_rgba(212,175,55,0.4)] hover:bg-white transition-all rounded-2xl"
                            >
                              {editingId ? "Salvar Alterações" : "Cadastrar Paciente"}
                            </button>
                         </div>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detalhes do Paciente (Triagem / Pauta) */}
      <AnimatePresence>
        {viewingDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setViewingDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-imposing-black border border-white/10 p-10 rounded-3xl max-w-xl w-full shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setViewingDetails(null)}
                className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-l-4 border-imposing-gold pl-6">
                  <h4 className="text-white text-xs uppercase font-black tracking-[0.3em]">{viewingDetails.title}</h4>
                </div>
                
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl min-h-[200px] max-h-[500px] overflow-y-auto custom-scrollbar">
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {viewingDetails.content}
                  </p>
                </div>
                
                <button 
                  onClick={() => setViewingDetails(null)}
                  className="w-full py-5 bg-white/5 hover:bg-imposing-gold hover:text-imposing-black border border-white/10 hover:border-imposing-gold text-white font-black uppercase tracking-[0.4em] text-[10px] transition-all rounded-xl"
                >
                  Fechar Visualização
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Meta Mensal */}
      <AnimatePresence>
        {isEditingGoal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-imposing-black border border-white/10 p-12 rounded-[2.5rem] max-w-sm w-full shadow-2xl text-center">
               <h4 className="text-white text-lg font-black uppercase tracking-widest mb-8">Definir Meta Mensal</h4>
               <div className="mb-8">
                 <input 
                   type="number" 
                   value={tempGoal} 
                   onChange={(e) => setTempGoal(Number(e.target.value))}
                   className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white text-3xl font-black text-center focus:border-imposing-gold outline-none"
                 />
               </div>
               <div className="flex gap-4">
                  <button onClick={() => setIsEditingGoal(false)} className="flex-1 py-4 bg-white/5 text-white/40 font-black uppercase text-[10px] rounded-xl hover:bg-white/10 transition-all">Cancelar</button>
                  <button onClick={() => {
                    setMonthlyGoal(tempGoal);
                    localStorage.setItem('admin_monthly_goal', tempGoal.toString());
                    setIsEditingGoal(false);
                  }} className="flex-1 py-4 bg-imposing-gold text-imposing-black font-black uppercase text-[10px] rounded-xl hover:bg-white transition-all">Salvar</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Agenda Completa (24h) */}
      <AnimatePresence>
        {isAgendaModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-imposing-black border border-white/10 p-10 rounded-[3rem] max-w-2xl w-full h-[80vh] flex flex-col shadow-2xl relative">
               <button onClick={() => setIsAgendaModalOpen(false)} className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/40"><X className="w-6 h-6" /></button>
               
               <div className="mb-10">
                 <h4 className="text-white text-2xl font-black uppercase tracking-tighter">Agenda Completa <span className="text-imposing-gold">24h</span></h4>
                 <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mt-2">Hoje: {new Date().toLocaleDateString('pt-BR')}</p>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-3">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const h = String(i).padStart(2, '0');
                    const hour = `${h}:00`;
                    const today = new Date().toISOString().split('T')[0];
                    const currentDayOfWeek = new Date().getDay();
                    
                    const patient = patients.find(p => {
                      if (p.horario && p.horario.startsWith(today) && p.horario.includes(` ${h}:`)) return true;
                      if (p.periodicidade === 'Fixo' && p.dia_hora_fixo) {
                        try {
                          const parsed = JSON.parse(p.dia_hora_fixo);
                          if (parsed.dia === currentDayOfWeek && parsed.hora.startsWith(`${h}:`)) return true;
                        } catch (e) { }
                      }
                      return false;
                    });
                    
                    let displayHorario = patient?.horario;
                    if (patient && patient.periodicidade === 'Fixo' && patient.dia_hora_fixo) {
                       try {
                         const parsed = JSON.parse(patient.dia_hora_fixo);
                         displayHorario = `${today} ${parsed.hora}`;
                       } catch (e) { }
                    }
                    
                    return (
                      <div key={hour} className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${patient ? 'bg-imposing-gold border-imposing-gold text-imposing-black' : 'bg-white/[0.02] border-white/5 opacity-30 hover:opacity-100 hover:bg-white/[0.05]'}`}>
                         <div className="flex items-center gap-6">
                            <span className="text-sm font-mono font-black">{hour}</span>
                            {patient && (
                              <div>
                                <p className="text-lg font-black uppercase tracking-tight">{patient.nome}</p>
                                <p className="text-[9px] font-bold uppercase opacity-60">{displayHorario?.split(' ')[1]} · {patient.origem}</p>
                              </div>
                            )}
                         </div>
                         {patient ? (
                           <div className="flex gap-2">
                              <button onClick={() => handleWhatsApp(patient)} className="p-3 bg-black/10 rounded-xl hover:bg-black/20 transition-all"><MessageCircle className="w-5 h-5" /></button>
                           </div>
                         ) : (
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-20">Livre</span>
                         )}
                      </div>
                    );
                  })}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const App = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(() => localStorage.getItem('admin_portal_open') === 'true');

  useEffect(() => {
    localStorage.setItem('admin_portal_open', isAdminOpen.toString());
  }, [isAdminOpen]);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top on mount/reload
    window.scrollTo(0, 0);
    
    // Clear hash from URL to ensure clean start
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-imposing-gold selection:text-imposing-black pb-28 md:pb-0">
      <AnimatePresence>
        {isAdminOpen && <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />}
      </AnimatePresence>
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      <MobileBottomNav />
      <FloatingCTA />
      <Hero />
      <PainIdentification />
      <SectionDivider />
      <Bio />
      <Approach />
      <TriagemDigital />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;
