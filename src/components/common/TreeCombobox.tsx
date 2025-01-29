"use client"

import * as React from "react"
import { ChevronsUpDown, ChevronRight, ChevronDown, ListFilter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { TreeComboboxProps, TreeItem } from "@/types/common/TreeComboboxFilterTypes"



const TreeCombobox: React.FC<TreeComboboxProps> = ({ items, multiSelect, defaultValues, selectChildren, onSelectionChange }) => {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])
  const [search, setSearch] = React.useState("")
  const [expanded, setExpanded] = React.useState<string[]>([])

  React.useEffect(() => {
    if(defaultValues) {
      setSelected(defaultValues)
    }
  }, [defaultValues])

  const getAllChildrenIds = (item: TreeItem): string[] => {
    let ids: string[] = []
    if (item.children) {
      item.children.forEach((child) => {
        ids.push(child.id)
        ids = [...ids, ...getAllChildrenIds(child)]
      })
    }
    return ids
  }

  const handleSelect = (item: TreeItem) => {
    setSelected((prev) => {
      let newSelected: string[]

      if (multiSelect) {
        if (prev.includes(item.id)) {
          newSelected = prev.filter((id) => id !== item.id)
          if (selectChildren && item.children) {
            newSelected = newSelected.filter((id) => !getAllChildrenIds(item).includes(id))
          }
        } else {
          newSelected = [...prev, item.id]
          if (selectChildren && item.children) {
            newSelected = [...newSelected, ...getAllChildrenIds(item)]
          }
        }
      } else {
        newSelected = [item.id]
      }

      onSelectionChange(newSelected)
      return newSelected
    })
  }

  const toggleExpand = (itemId: string) => {
    setExpanded((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }



  const renderTreeItems = (items: TreeItem[], level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <CommandItem
          value={item.label}
          onSelect={() => handleSelect(item)}
          className={cn("flex items-center gap-2", level > 0 && "ml-4")}
        >
          {item.children && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(item.id)
              }}
              className="mr-1"
            >
              {expanded.includes(item.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          {!item.children && <span className="w-5 mr-5" />}
          <Checkbox checked={selected.includes(item.id)} />
          {item.label}
        </CommandItem>
        {item.children && expanded.includes(item.id) && renderTreeItems(item.children, level + 1)}
      </React.Fragment>
    ))
  }

  const clearSelection = () => {
    setSelected([])
    onSelectionChange([])
  }

  const filteredItems = React.useMemo(() => {
    const filterItems = (items: TreeItem[]): TreeItem[] => {
      return items.reduce((acc: TreeItem[], item) => {
        if (item.label.toLowerCase().includes(search.toLowerCase())) {
          acc.push(item)
        } else if (item.children) {
          const filteredChildren = filterItems(item.children)
          if (filteredChildren.length > 0) {
            acc.push({ ...item, children: filteredChildren })
          }
        }
        return acc
      }, [])
    }

    return filterItems(items)
  }, [items, search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <ListFilter />
          {selected.length > 0 ? `${selected.length} selected` : "Filtre"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Horizon..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>Aucun élément.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-72">{renderTreeItems(filteredItems)}</ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
        <div
          onClick={clearSelection}
          className="flex justify-center border-t-2 cursor-pointer py-2 px-2 rounded-md hover:bg-gray-50"
        >
          <p className="text-sm">Clear filters</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TreeCombobox

