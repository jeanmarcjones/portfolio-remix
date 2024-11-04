import { type ReactNode } from 'react'

const year = new Date().getFullYear()

function Tmp({ children }: { children?: ReactNode }) {
  return <span className="text-xs 2xl:text-sm">{children}</span>
}

export default function SiteFooter() {
  return (
    <footer className="pb-6 pt-11">
      <div className="container flex items-center justify-center gap-2.5 text-emerald-700 dark:text-indigo-100">
        <Tmp>© {year}</Tmp>
        <Tmp>•</Tmp>
        <Tmp>Jean-Marc Jones</Tmp>
      </div>
    </footer>
  )
}
