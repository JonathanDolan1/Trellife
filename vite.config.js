import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [react()],
		build: {
			outDir: '../backend/public',
			emptyOutDir: true,
			assetsDir: 'assets',
			// No source maps in the public build: they publish the original source.
			sourcemap: false,
		},
	}
})