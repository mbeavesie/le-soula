import { lazy, Suspense } from 'react'

// Lazy-load Sanity Studio to keep main bundle small.
const StudioRoot = lazy(async () => {
  const [{ Studio }, configMod] = await Promise.all([
    import('sanity'),
    import('../../../sanity.config'),
  ])
  const config = (configMod as any).default
  return {
    default: function StudioPage() {
      return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
          <Studio config={config} />
        </div>
      )
    },
  }
})

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'sans-serif' }}>
          Loading Studio…
        </div>
      }
    >
      <StudioRoot />
    </Suspense>
  )
}
