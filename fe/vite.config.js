import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import theme from './src/config/theme'

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ mode }) => {
    const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd())
    return {
        root: './',
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                _pages: resolve(__dirname, 'src/pages'),
                _components: resolve(__dirname, 'src/components'),
                _assets: resolve(__dirname, 'src/assets'),
            },
        },
        plugins: [
            vue(),
            vitePluginForArco({
                modifyVars: theme,
            }),
        ],
        /*optimizeDeps: {
            include: []
        },*/
        server: {
            port: 4002, // 启动端口
            host: true,
            // https: true
            // force: true
        },
    }
})
