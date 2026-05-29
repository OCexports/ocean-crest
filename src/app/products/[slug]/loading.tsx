// Skeleton for product-detail route. Two-column gallery + content shell so
// the visual chrome appears instantly while the page chunk loads.
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-square rounded-[var(--radius-lg)] bg-stone-200/70 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-stone-200/70 animate-pulse" />
          <div className="h-10 w-3/4 rounded bg-stone-200/70 animate-pulse" />
          <div className="h-4 w-full rounded bg-stone-200/60 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-stone-200/60 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-stone-200/60 animate-pulse" />
          <div className="mt-6 h-12 w-40 rounded-full bg-stone-200/70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
