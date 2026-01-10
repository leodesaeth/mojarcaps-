import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Note: I am not using radix-slot yet as I didn't install it, I'll stick to simple button for now
// actually I'll just use standard props.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary/20",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                pulse: "bg-primary text-white hover:bg-primary-600 shadow-xl shadow-primary/30 animate-pulse-slow",
            },
            size: {
                default: "h-12 px-6 py-3 text-base",
                sm: "h-9 rounded-lg px-3",
                lg: "h-14 rounded-2xl px-8 text-lg",
                icon: "h-10 w-10",
            },
            fullWidth: {
                true: "w-full",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            fullWidth: false,
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
