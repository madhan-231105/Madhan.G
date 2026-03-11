
import React, { useEffect, useRef } from 'react';

interface GridScanProps {
  sensitivity?: number;
  lineThickness?: number;
  linesColor?: string;
  gridScale?: number;
  scanColor?: string;
  scanOpacity?: number;
  enablePost?: boolean;
  bloomIntensity?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
}

const GridScan: React.FC<GridScanProps> = ({
  sensitivity = 0.55,
  lineThickness = 1,
  linesColor = "#392e4e",
  gridScale = 0.1,
  scanColor = "#FF9FFC",
  scanOpacity = 0.4,
  enablePost = true,
  bloomIntensity = 0.6,
  chromaticAberration = 0.002,
  noiseIntensity = 0.01,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_gridScale;
      uniform vec3 u_linesColor;
      uniform vec3 u_scanColor;
      uniform float u_scanOpacity;
      uniform float u_bloom;
      uniform float u_chromatic;
      uniform float u_noise;

      float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 gridUv = gl_FragCoord.xy * u_gridScale;
        
        // Basic Grid
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float line = min(grid.x, grid.y);
        float gridLines = 1.0 - smoothstep(0.0, 1.5, line);
        
        // Scan Line
        float scanPos = fract(u_time * 0.2);
        float scanLine = smoothstep(0.02, 0.0, abs(uv.y - scanPos));
        float scanGlow = smoothstep(0.2, 0.0, abs(uv.y - scanPos)) * u_bloom;
        
        // Colors
        vec3 finalColor = u_linesColor * gridLines;
        finalColor += u_scanColor * (scanLine + scanGlow) * u_scanOpacity;
        
        // Noise
        float noise = (rand(uv + u_time) - 0.5) * u_noise;
        finalColor += noise;

        // Chromatic Aberration Simulation
        if (u_chromatic > 0.0) {
            float r = texture2D(gl_FragColor.rgb, uv + vec2(u_chromatic, 0.0)).r;
            // Simplified for non-texture shader: shift color based on UV
        }

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const gridScaleLoc = gl.getUniformLocation(program, 'u_gridScale');
    const linesColorLoc = gl.getUniformLocation(program, 'u_linesColor');
    const scanColorLoc = gl.getUniformLocation(program, 'u_scanColor');
    const scanOpacityLoc = gl.getUniformLocation(program, 'u_scanOpacity');
    const bloomLoc = gl.getUniformLocation(program, 'u_bloom');
    const chromaticLoc = gl.getUniformLocation(program, 'u_chromatic');
    const noiseLoc = gl.getUniformLocation(program, 'u_noise');

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [1, 1, 1];
    };

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    let animationFrame: number;
    const render = (time: number) => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform1f(gridScaleLoc, gridScale);
      gl.uniform3fv(linesColorLoc, hexToRgb(linesColor));
      gl.uniform3fv(scanColorLoc, hexToRgb(scanColor));
      gl.uniform1f(scanOpacityLoc, scanOpacity);
      gl.uniform1f(bloomLoc, enablePost ? bloomIntensity : 0);
      gl.uniform1f(chromaticLoc, enablePost ? chromaticAberration : 0);
      gl.uniform1f(noiseLoc, enablePost ? noiseIntensity : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [gridScale, linesColor, scanColor, scanOpacity, enablePost, bloomIntensity, chromaticAberration, noiseIntensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block opacity-60"
      style={{ background: 'transparent' }}
    />
  );
};

export default GridScan;
