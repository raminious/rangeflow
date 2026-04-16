import { memo } from 'react'

export const DateTickers = memo(() => {
  return (
    <div className="absolute top-0 left-0 flex w-full justify-between">
      {Array.from({ length: 80 }).map((_, index) => (
        <div key={index} className="h-3 w-0.5 rounded-xs bg-slate-300"></div>
      ))}
    </div>
  )
})
