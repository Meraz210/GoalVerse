type DetailCardProps = {
  label: string;
  value: string | number;
};

export function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div className="rounded border border-border bg-panel p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-black text-white">{value}</p>
    </div>
  );
}
