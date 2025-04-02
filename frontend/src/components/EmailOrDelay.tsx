import { useState } from "react";
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
import { Clock1, Mail } from "lucide-react";
import EmailDelayContent from "./EmailDelayContent";
import nodeStore, { emailTemplateStore } from "../store/emailStore";

function EmailOrDelay({ type, closeMainDialog }: { type: string, closeMainDialog: Function }) {
    const [subDialogOpen, setSubDialogOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>("")
    const { addNodes, nodes, updateNodes } = nodeStore()
    const { emailTemplates } = emailTemplateStore()

    const addNewNode = (emailTemplate: string) => {
        if (!emailTemplate) return;

        const template = emailTemplates.find(email => email.name === emailTemplate);
        if (!template) {
            console.error("Template not found");
            return;
        }

        const lastNode = nodes[nodes.length - 1]; // Get the last node
        const newNodeId = (nodes.length + 1).toString(); // Ensure unique ID

        const newNode = {
            id: newNodeId,
            position: {
                x:  lastNode.position.x,
                y: lastNode.position.y + 150 
            },
            data: { label: 'email', value: template }
        };

        addNodes(newNode); // Add new node

        // Update the last node to ensure smooth linking
        if (lastNode) {
            updateNodes(lastNode.id, { position: { x: lastNode.position.x, y: lastNode.position.y+300 } });
        }
    };

    console.log(nodes)
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

                {type.toLocaleLowerCase() === "email" ? <EmailDelayContent type="email" setSelectedTemplate={setSelectedTemplate} /> :
                    <EmailDelayContent type="delay" setSelectedTemplate={setSelectedTemplate} />}

                <DialogFooter>
                    {type.toLocaleLowerCase() === "email" ? <Button onClick={() => {
                        setSubDialogOpen(false)
                        addNewNode(selectedTemplate)
                    }}>Proceed with this template</Button> :
                        <Button onClick={() => setSubDialogOpen(false)}>proceed this delay</Button>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EmailOrDelay;
