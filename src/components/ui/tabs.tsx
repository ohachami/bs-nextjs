"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"
const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
    "inline-flex ",
    {
        variants: {
            variant: {
                default: "items-center justify-center h-10 rounded-md bg-muted p-1 text-muted-foreground",
                link: "bg-background gap-2 p-0 pt-2 pb-1 px-1 font-bold rounded-md shadow-none",
            },
            width: {
                default: "w-full",
                fit: "w-fit",
            },

        },
        defaultVariants: {
            variant: "default",
            width: 'default'
        },
    }
)
const tabsTriggerVariants = cva(
    "inline-flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                link: "bg-background border-b-2 border-background focus:border-primary ring-0 outline-none shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary disabled:opacity-100 data-[state=active]:shadow-none rounded-none m-0 pt-1.5 pb-2 hover:bg-background-muted",
            },
            width:{
                default:"w-full",
                fit:"w-fit"
            }
        },
        defaultVariants: {
            variant: "default",
            width: "default"
        },
    }
)
interface TabsListProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
        VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    TabsListProps
>(({ className, variant, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant, className }))}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
        VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabsTriggerVariants({ variant, className }))}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName


const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
