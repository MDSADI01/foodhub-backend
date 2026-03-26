import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server/server.ts"], 
  format: ["esm"],               
  target: "esnext",               
  outDir: "dist",
  clean: true,                 
  sourcemap: true,                
  splitting: false,               
  bundle: true,                   
  banner: {
    js: `
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    
    `
  }
});