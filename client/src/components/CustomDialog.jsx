import React from "react";
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
import { Mail, Plus, Clock, Clock1 } from "lucide-react";

function CustomDialog({ data }) {
  return (
    <div className="relative p-4 border border-gray-300 rounded-lg bg-white shadow-lg w-80">
      <Handle
        type="target"
        position={Position.Top}
        className="bg-gray-500 w-3 h-3 rounded-full"
      />

      <Dialog>
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
            {/* Cold Email Block */}
            <Button
              variant="outline"
              className="flex items-center gap-4 p-4 w-full border-gray-300 hover:bg-gray-100 transition-all rounded-md h-24"
            >
              <Mail size={32} strokeWidth={1.75} className="text-blue-600" />
              <span className="text-lg font-medium">Cold Email</span>
            </Button>

            {/* Add Delay Block */}
            <Button
              variant="outline"
              type="submit"
              className="flex items-center gap-4 p-4 w-full border-gray-300 hover:bg-gray-100 transition-all rounded-md h-24"
            >
              <Clock1 size={32} strokeWidth={1.75} className="text-green-600" />
              <span className="text-lg font-medium">Add Delay</span>
            </Button>
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
