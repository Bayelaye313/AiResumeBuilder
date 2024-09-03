import { PlusSquare } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
  
function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
  return (
    <div>
        <div className="py-24 p-14 items-center flex justify-center 
        bg-secondary rounded-lg h-[280px] 
        cursor-pointer hover:scale-105 transition-all hover:shadow-md 
        border-dashed" onClick = {()=> setOpenDialog(true)} >
            <PlusSquare/>
        </div>

        <Dialog open = {openDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create a new Resume</DialogTitle>
            <DialogDescription>
                <p>Add a new Title.</p>
                <Input className = 'mt-2'
                 />
            </DialogDescription>
            <div className="flex justify-end gap-5">
                <button variant='ghost' >Cancel</button>
                <button>Create</button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>

    
  )
}

export default AddResume
