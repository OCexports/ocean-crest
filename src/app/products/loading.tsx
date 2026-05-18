// Route-level skeleton shown while /products streams in. Mirrors the grid
// shell so the layout doesn't shift when the real content arrives.
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
      <div className="h-8 w-48 rounded-md bg-stone-200/70 animate-pulse" />
      <div className="mt-3 h-4 w-72 rounded bg-stone-200/60 animate-pulse" />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-[var(--radius-lg)] bg-stone-200/60 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
