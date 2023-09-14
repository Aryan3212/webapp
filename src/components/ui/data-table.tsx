"use client"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
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
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import * as React from "react"
import type { Job } from "@/app/page"
import { useEffect } from "react"
import { CopyIcon, CheckIcon, BackpackIcon } from "@radix-ui/react-icons"
import { getJobs } from "@/app/api";
import { useQuery } from "@tanstack/react-query"
import { ShadowInnerIcon } from "@radix-ui/react-icons";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  showJobDetails?: Job
}

export function DataTable<TData, TValue>({
  columns,
  showJobDetails,
}: DataTableProps<TData, TValue>) {
  const [dialogContent, setDialogContent] = React.useState<Job>()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [search, setSearch] = React.useState<string>('')

  const [{ pageIndex, pageSize }, setPagination] =
  React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  })
  const fetchDataOptions = {
    pageIndex,
    pageSize,
    search,
    sorting
  }
  const {data, isLoading, isFetching} = useQuery(
    ['jobs', fetchDataOptions],
    () => {
      const order = sorting.length > 0 ? sorting[0].desc ? '-' + sorting[0].id : sorting[0].id : ''
      return getJobs({ pageIndex, pageSize, filter: search, order})},
    { keepPreviousData: true }
  )
  
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
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
    if (showJobDetails) {
        handleDialogOpen(showJobDetails as unknown as Job)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    manualSorting: true,
    pageCount: data?.count || -1,
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      sorting,
      pagination
    },
  })

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          defaultValue={search}
          onChange={(event) => {
            setPagination({ pageIndex: 0, pageSize: 100 })
            setSearch(event.target.value)
          }
          }
          className="max-w-sm mr-1"
        />
        {
          search.length > 0 && search.length < 4 ? <span className='text-red-400 text-sm'>Type some more to filter...</span> : null
        }
        <div className="flex items-center justify-self-end space-x-2 py-4 mx-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || search.length > 3}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || search.length > 3}
        >
          Next
        </Button>
      </div>
      <span>{isFetching && <ShadowInnerIcon width={20} height={20} className="animate-spin"/>}</span>
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
                      {isLoading ?
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || search.length > 3}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || search.length > 3}
        >
          Next
        </Button>
      </div>
      <Dialog modal={true} open={dialogOpen} onOpenChange={() => onDialogClose()}>
        <DialogContent>
          <DialogHeader className="text-left w-100 items-start">
            <h3>{dialogContent?.title}</h3>
            <h4>{dialogContent?.companyName}</h4>
            <p>{dialogContent?.location}</p>
            <p><BackpackIcon className="inline" width={14} height={14} />: {dialogContent?.minimumExperience} years</p>
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
          <div dangerouslySetInnerHTML={{__html : dialogContent?.description}} className="text-sm overflow-y-auto  scrollbar-track-neutral-500  scrollbar-thumb-neutral-900 scrollbar-thin max-h-[250px] items-start"/>
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
