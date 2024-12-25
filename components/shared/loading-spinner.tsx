export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-primary"></div>
    </div>
  );
}
