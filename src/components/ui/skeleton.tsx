import { cn } from "@/lib/utils"
import { ShadowInnerIcon } from "@radix-ui/react-icons"
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/20", className)}
      {...props}
    />
  )
}

export { Skeleton }
