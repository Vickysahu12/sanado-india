// Media manifest. Product photos are 3:4 and live in public/media/products as <id>.webp at the
// 720 x 960 (exported from the client high-resolution photos). `-1` is the full look, `-2` a close
// crop of the collar and weave, or a second view. tones.json holds each photo's average colour as a placeholder.
import tones from './tones.json'

export const imageSet = (id) => ({
  id,
  src: `/media/products/${id}.webp`,
  srcSm: `/media/products/${id}.webp`,
  tone: tones[id] ?? 'var(--color-sand)',
})
