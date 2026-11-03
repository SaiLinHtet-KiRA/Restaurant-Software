export default function Spinner({ color = "white" }: { color?: string }) {
  return (
    <div className="flex flex-1 justify-center items-center py-10">
      <div
        className="block size-10 rounded-full border-4 border-white/30 animate-spin"
        style={{ borderTopColor: color }}
      />
    </div>
  );
}
