import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default async () => {
  const { default: UnoCss } = await import('unocss/vite')

  return defineConfig({
    build: {
      sourcemap: process.env.NODE_ENV === 'development',
    },
    plugins: [
      uni(),
      UnoCss(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'uni-app',
          'pinia',
        ],
        dts: 'typings/auto-imports.d.ts',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'legacy-js-api', 'if-function'],
        },
      },
    },
  })
}
