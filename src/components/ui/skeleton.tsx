import { cn } from "@/lib/utils"
import { ShadowInnerIcon } from "@radix-ui/react-icons"
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/20 flex justify-center items-center", className)}
      {...props}
    >
      <ShadowInnerIcon height={30} width={30} className="animate-spin background-muted"/>
    </div>
  )
}

export { Skeleton }
