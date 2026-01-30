"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RowsPerPageSelect({ value }: { value: string }) {
  function onChange(limit: string) {
    const url = new URL(window.location.href)
    url.searchParams.set("limit", limit)
    url.searchParams.set("page", "1")
    window.location.href = url.toString()
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-20">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" position="popper" sideOffset={4}>
        <SelectGroup>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
