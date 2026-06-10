export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-stone-900 overflow-x-hidden">
      {children}
    </div>
  )
}
