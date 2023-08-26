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
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
  },
]
