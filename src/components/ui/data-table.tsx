"use client"
import { Skeleton } from "@/components/ui/skeleton"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Input } from "@/components/ui/input"

import * as React from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [isFilterLoading, setIsFilterLoading] = React.useState(false)

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
              setIsFilterLoading(true)
              setTimeout(() => setIsFilterLoading(false), 500)
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Dialog key={row.id}>
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <DialogTrigger key={cell.id}>
                    <TableCell>
                      
                      {isFilterLoading ? 
                        <Skeleton key={Math.random() * 10000} className="h-5 m-1 w-100 rounded-full"/>
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    </DialogTrigger>
                  ))}
                </TableRow>
                <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    {row.getValue("description")}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Confirm</Button>
                </DialogFooter>
              </DialogContent>
                </Dialog>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
