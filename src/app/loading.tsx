export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="h-96 animate-pulse rounded border border-border bg-panel" />
        <div className="grid gap-4">
          <div className="h-44 animate-pulse rounded border border-border bg-panel" />
          <div className="h-44 animate-pulse rounded border border-border bg-panel" />
        </div>
      </div>
    </section>
  );
}
