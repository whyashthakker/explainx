export function BasicLayout(props: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0A0A0A]">
      <main className="isolate">
        {props.children}
      </main>
    </div>
  );
}
