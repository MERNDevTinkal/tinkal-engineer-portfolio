
"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton" // Import Skeleton

export function ThemeToggle() {
  const { setTheme } = useTheme() // theme variable is not used, so removed to prevent lint warning
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a skeleton or placeholder while not mounted
    // This matches the size of the actual button
    return <Skeleton className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-[1.2rem] w-[1.2rem] rounded-full")} />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <span className="flex items-center">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <span className="flex items-center">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span className="flex items-center">
            <Laptop className="mr-2 h-4 w-4" />
            System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
