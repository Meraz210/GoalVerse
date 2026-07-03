type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 rounded border border-border bg-panel/80 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-black text-white">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
