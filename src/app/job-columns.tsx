"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Job = {
    id: string
    title: string
    description: string
    dateAdded: string
    applicationLink: string
  }

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Tilte",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const value = row.getValue("description") as string
      const formatted = value.substring(0, 50) + "..."
      return formatted
    },
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ row }) => {
      const value = row.getValue("dateAdded") as string
      const formatted = new Date(value).toLocaleString('en-US', { timeZone: 'UTC' })
      return formatted
    },
  },
]
