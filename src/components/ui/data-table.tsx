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
} from "@/components/ui/dialog"


import { Input } from "@/components/ui/input"

import { Toggle } from "@/components/ui/toggle"

import * as React from "react"

import type { Job } from "@/app/page"

import { useEffect } from "react"
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  openRowById?: number
}

export function DataTable<TData extends { id?: number }, TValue>({
  columns,
  data,
  openRowById,
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [isFilterLoading, setIsFilterLoading] = React.useState(false)
  const [dialogContent, setDialogContent] = React.useState<Job>()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }
  const handleDialogOpen = (content: Job) => {
    window.history.pushState({}, null, '?job_id=' + content.id)
    setDialogContent(content)
    setDialogOpen(true)
  }
  const onDialogClose = () => {
    setDialogOpen(false)
    window.history.pushState({}, null, '/')
  }
  useEffect(() => {
    if (openRowById) {
      const row = data.find((r) => {
        return r.id === openRowById
      })
      if (row) {
        handleDialogOpen(row as unknown as Job)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
            // Do we need this?
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleDialogOpen(row.original as unknown as Job)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {isFilterLoading ?
                        <Skeleton key={Math.random() * 10000} className="h-5 m-1 w-100 rounded-full" />
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
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
      <Dialog modal={true} open={dialogOpen} onOpenChange={() => onDialogClose()}>
        <DialogContent>
          <DialogHeader className="text-left w-100 items-start">
            <h2>{dialogContent?.title}</h2>
            <h4>{dialogContent?.companyName}</h4>
            <p>{dialogContent?.location}</p>
            <p>💼: {dialogContent?.minimumExperience} years</p>
            <Toggle
              className="w-full"
              size="lg"
              variant={copiedLink ? 'default' : 'outline'}
              disabled={copiedLink}
              aria-label="Copy Link"
              onClick={() => copyLink()}
            >
              {copiedLink ? <CheckIcon /> : <CopyIcon />}
              Share This Job
            </Toggle>
          </DialogHeader>
          <DialogDescription className="items-start">
            {dialogContent?.description}
          </DialogDescription>
          <DialogFooter className="space-x-0 sm:space-y-0 space-y-2 flex-col">
            { dialogContent?.applicationUrl &&
              <Button className="text-center" asChild>
                <a target="_blank" href={dialogContent.applicationUrl}>
                  Apply Here
                </a>
              </Button>
            }
            { dialogContent?.applicationEmail &&
            <Button className="text-center" asChild>
              <a target="_blank" href={'mailto:' + dialogContent.applicationEmail}>
                Send a mail at {dialogContent.applicationEmail}
              </a>
            </Button>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
