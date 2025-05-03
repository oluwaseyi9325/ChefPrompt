'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { nigeriaStates } from '@/lib/constants'

interface StateSelectProps {
  value: string
  onChange: (value: string) => void
}

export function StateSelect({ value, onChange }: StateSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedState = nigeriaStates.find((state) => state.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl className="h-12">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedState ? selectedState.label : 'Select State'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search state..." />
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {nigeriaStates.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={() => {
                    onChange(state.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === state.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {state.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
