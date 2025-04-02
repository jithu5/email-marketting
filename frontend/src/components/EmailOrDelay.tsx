import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Clock1, Mail } from "lucide-react";

function EmailOrDelay({ type, closeMainDialog }:{type:string,closeMainDialog:Function}) {
    const [subDialogOpen, setSubDialogOpen] = useState(false);

    return (
        <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-4 p-4 w-full border-gray-300 hover:bg-gray-100 transition-all rounded-md h-24"
                >
                    {type.toLocaleLowerCase() === "email" ? (
                        <>
                            <Mail size={32} strokeWidth={1.75} className="text-blue-600" />
                            <span className="text-lg font-medium">Cold Email</span>
                        </>
                    ) : (
                        <>
                            <Clock1 size={32} strokeWidth={1.75} className="text-green-600" />
                            <span className="text-lg font-medium">Add Delay</span>
                        </>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px] h-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {type.toLocaleLowerCase() === "email" ? "Configure Email Block" : "Set Delay"}
                    </DialogTitle>
                    <DialogDescription>
                        {type.toLocaleLowerCase() === "email"
                            ? "Configure your email settings here."
                            : "Set the delay time for the sequence."}
                    </DialogDescription>
                </DialogHeader>



                <DialogFooter>
                    <Button onClick={() => setSubDialogOpen(false)}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EmailOrDelay;
