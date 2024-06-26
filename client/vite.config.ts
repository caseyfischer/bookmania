import { defineConfig } from 'vite'
import { resolve } from "path"
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "~": resolve(__dirname, "src/"), 
        }
    },
    server: {
        hmr: true,
        proxy: {
            '/api': "http://localhost:8080"
        }
    }
})
