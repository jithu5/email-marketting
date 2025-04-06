import { useCallback, useState } from "react";
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
import nodeStore, { emailTemplateStore, INode } from "../store/emailStore";
import { useReactFlow } from "@xyflow/react";
import { type Edge, type Node } from "reactflow";
import axios from "axios";

function EmailOrDelay({ type, closeMainDialog }: { type: string, closeMainDialog: Function }) {
    const [subDialogOpen, setSubDialogOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string>("")
    const [delayTime, setDelayTime] = useState<string>("0 seconds")
    const { addNodes, nodes, updateNodes, addEdge, edges } = nodeStore()
    const { emailTemplates } = emailTemplateStore()
    const { setNodes, setEdges } = useReactFlow();

    const addNewEmailNode = useCallback(async (emailTemplate: string) => {
        if (!emailTemplate) return;

        const template = emailTemplates.find(email => email.name === emailTemplate);
        if (!template) {
            console.error("Template not found");
            return;
        }
        console.log(nodes)
        const lastNode:INode = nodes[nodes.length - 1];
        const newNodeId = (nodes.length).toString();
        const lastNodeId = (nodes.length).toString();
        console.log(lastNode)

        const newNode = {
            id: newNodeId,
            position: {
                x: lastNode.position.x,
                y: lastNode.position.y + 150
            },
            data: { label: 'Welcome template', value: template },
            type: "emailNode",
        };

        updateNodes(lastNodeId, {
            id: (Number(lastNodeId) + 1).toString(),
            position: {
                x: lastNode.position.x,
                y: lastNode.position.y + 400
            }
        });
        const updateRes = await axios.put("http://localhost:5000/api/node/update", {
            nodeId: lastNode._id,
            node: lastNode
        }, { withCredentials: true });
        console.log(updateRes.data.message);

        addNodes(newNode);
        const addRes = await axios.post("http://localhost:5000/api/node/add", { node: newNode }, {
            withCredentials: true
        });
        console.log(addRes.data.message);
        setNodes((prev: Node[]) => [...prev, newNode]); // for React Flow rendering

        const newEdge = {
            id: `e${newNodeId}-${Number(newNodeId) + 1}`,
            source: newNodeId,
            target: (Number(newNodeId) + 1).toString(),
            animated: true,
            type: 'default'
        };

        addEdge(newEdge); // for your store
        setEdges((prev: Edge[]) => [...prev, newEdge]); // for React Flow rendering

        console.log('changing')
    }, [nodes, addNodes, updateNodes, addEdge, setEdges]);

    const addDelayNode = useCallback((time: string) => {
        if (!time) return;
        const lastNode = nodes[nodes.length - 1];
        const newNodeId = (nodes.length).toString();
        const lastNodeId = (nodes.length).toString();

        const newNode = {
            id: newNodeId,
            position: {
                x: lastNode.position.x,
                y: lastNode.position.y + 150
            },
            data: { label: 'Delay', value: time },
            type: "delayNode",
        };
        updateNodes(lastNodeId, {
            id: (Number(lastNodeId) + 1).toString(),
            position: {
                x: lastNode.position.x,
                y: lastNode.position.y + 400
            }
        });
        addNodes(newNode);

        setNodes((prev: Node[]) => [...prev, newNode]); // for React Flow rendering

        const newEdge = {
            id: `e${newNodeId}-${Number(newNodeId) + 1}`,
            source: newNodeId,
            target: (Number(newNodeId) + 1).toString(),
            animated: true,
            type: 'default'
        };
        addEdge(newEdge); // for your store
        setEdges((prev: Edge[]) => [...prev, newEdge]); // for React Flow rendering

        console.log('changing')
    }, [nodes, addNodes, updateNodes, addEdge, setEdges])



    console.log(nodes)
    console.log(edges)

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

                {type.toLocaleLowerCase() === "email" ? <EmailDelayContent type="email" setSelectedTemplate={setSelectedTemplate} setDelayTime={setDelayTime} /> :
                    <EmailDelayContent type="delay" setSelectedTemplate={setSelectedTemplate} setDelayTime={setDelayTime} />}

                <DialogFooter>
                    {type.toLocaleLowerCase() === "email" ? <Button onClick={() => {
                        setSubDialogOpen(false)
                        addNewEmailNode(selectedTemplate)
                    }}>Proceed with this template</Button> :
                        <Button onClick={() => {
                            setSubDialogOpen(false)
                            addDelayNode(delayTime)
                        }}>proceed this delay</Button>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EmailOrDelay;
