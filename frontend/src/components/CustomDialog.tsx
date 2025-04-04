import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import EmailOrDelay from "./EmailOrDelay";

function CustomDialog() {
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(false)
    }

    return (
        <div className="relative p-4 border border-gray-300 rounded-lg bg-white shadow-lg w-80">
            <Handle
                    type="target"
            position={Position.Top}
                className="bg-gray-500 w-3 h-3 rounded-full"
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white py-2 rounded-md">
                        <Plus size={18} />
                        Add Block
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md h-[420px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Add Blocks
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Click on a block to configure and add it in sequence.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-4 py-4">
                        <EmailOrDelay type="email" closeMainDialog={handleClose} />
                        <EmailOrDelay type="delay" closeMainDialog={handleClose} />
                    </div>
                </DialogContent>
            </Dialog>

            <Handle
                type="source"
                position={Position.Bottom}
                className="bg-gray-500 w-3 h-3 rounded-full"
            />
        </div>
    );
}

export default CustomDialog;
