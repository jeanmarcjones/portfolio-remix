const year = new Date().getFullYear()

export default function SiteFooter() {
  return (
    <footer className="py-9">
      <div className="container flex items-center justify-center gap-2.5 text-emerald-700 dark:text-indigo-100">
        <span>© {year}</span>
        <span>•</span>
        <span>Jean-Marc Jones</span>
      </div>
    </footer>
  )
}
