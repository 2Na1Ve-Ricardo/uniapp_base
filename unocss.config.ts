import { presetAttributify, presetUno } from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const isH5 = process.env.UNI_PLATFORM === 'h5'

export default {
  presets: isH5
    ? [presetUno(), presetAttributify()]
    : [
        presetWeapp({
          platform: 'uniapp',
          // prefix: 'u-',
          // whRpx: true,
          // preflight: true,
          // arbitraryVariants: true,
        }),
      ],
  transformers: isH5 ? [] : [transformerAttributify(), transformerClass()],
  shortcuts: [{ center: 'flex items-center justify-center' }],
}
