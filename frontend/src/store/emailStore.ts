import { create } from "zustand";
import { type Node } from "@xyflow/react"
import { emailTemplates } from "../constants/index";

// Define Zustand store
interface INodeStore {
    nodes: Node[];
    addNodes: (newNode: Node) => void;
    updateNodes: (id: string, updatedNode: Node) => void;
    deleteNode: (id: string) => void;
}

// Zustand store creation
const nodeStore = create<INodeStore>((set) => ({
    nodes: [
        {
            id: "1",
            position: { x: 138, y: 0 },
            type: "customNode",
            data: { label: "Add items" }
        },
        {
            id: "2",
            data: { label: "sequence start point" },
            position: { x: 100, y: 200 },
        },
        {
            id: "3",
            position: { x: 138, y: 350 },
            type: "customNode",
            data: { label: "Add items" }
        },
    ],

    addNodes: (newNode) =>
        set((state) => ({
            nodes: [...state.nodes, newNode],
        })),
    updateNodes: (id, updatedNode) =>
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, ...updatedNode } : node
            ),
        })),


    deleteNode: (id) =>
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
        })),
}));

export interface IemailTemplates {
    subject: string,
    name: string,
    body: string
}

interface IEmailTemplatesStore {
    emailTemplates: IemailTemplates[];
    addEmailTemplates: (newTemplate: IemailTemplates) => void;
}

const emailTemplateStore = create<IEmailTemplatesStore>((set) => ({
    emailTemplates: [...emailTemplates],
    addEmailTemplates: (newTemplate) => set((state) => ({
        emailTemplates: [...state.emailTemplates, newTemplate]
    }))
}))

export { emailTemplateStore };
export default nodeStore;
