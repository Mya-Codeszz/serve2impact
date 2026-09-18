export default function PageShell({
  children,
  narrow = false,
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className={`mx-auto px-6 py-12 ${narrow ? 'max-w-md' : 'max-w-6xl'}`}>{children}</div>
  );
}
