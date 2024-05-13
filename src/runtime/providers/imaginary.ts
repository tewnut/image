import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: 'type',
  },
  joinWith: '&',
})

const defaultModifiers = {
  width: '720',
}

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = '/' } = {},
  { options = { format: ['webp'] } },
) => {
  const mergeModifiers = { ...defaultModifiers, ...modifiers }
  const operations = operationsGenerator(mergeModifiers as any)
  const url = operations
      ? joinURL(baseURL, 'imaginary/resize', src + `?${operations}`)
      : joinURL(
          baseURL,
          'imaginary/convert',
          src + `?type=${options.format[0]}`,
        )

  return {
    url,
  }
}
