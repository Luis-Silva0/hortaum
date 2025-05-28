"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button, Input } from "@heroui/react"
import { Plus, Minus } from "lucide-react"

interface EditCardProps {
  title: string
  currentValue: number
  unit?: string
  isOpen: boolean
  onClose: () => void
  onSave: (newValue: number) => void
}

export default function EditCard({ title, currentValue, unit = "", isOpen, onClose, onSave }: EditCardProps) {
  const [value, setValue] = useState(currentValue)

  const handleIncrement = () => {
    setValue((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(newValue)
    } else if (e.target.value === "") {
      setValue(0)
    }
  }

  const handleSave = () => {
    onSave(value)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar {title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-center space-x-4">
            <Button variant="bordered" size="icon" onClick={handleDecrement} className="h-10 w-10 rounded-full">
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <Input type="text" value={value.toString()} onChange={handleChange} className="w-24 text-center text-lg font-bold" />
              {unit && <span className="ml-2 text-lg font-medium">{unit}</span>}
            </div>
            <Button variant="bordered" size="icon" onClick={handleIncrement} className="h-10 w-10 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
