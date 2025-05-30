export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-14 min-h-[calc(100vh-6rem)]">
      {children}
    </div>
  );
} 