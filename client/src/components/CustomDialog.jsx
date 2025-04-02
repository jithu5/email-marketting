import React from 'react'
import { Handle, Position } from "@xyflow/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Mail, Plus } from 'lucide-react';
import { Input } from './ui/input';

function CustomDialog({data}) {
  return (
    <>
      <div className="p-4 border border-gray-300 rounded-md bg-white shadow-md">
        <Handle type="target" position={Position.Top} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="text-2xl" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Blocks</DialogTitle>
              <DialogDescription>
                Click on a block to configure and add it in sequence.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Button
                  variant={"outline"}
                  className="flex items-center justify-center gap-4 py-6 px-4 w-fit"
                >
                  <Mail size={15}/>
                  <div>
                    <h1 className='text-3xl font-medium'>Cold Email</h1>
                  </div>
                </Button>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
}

export default CustomDialog
