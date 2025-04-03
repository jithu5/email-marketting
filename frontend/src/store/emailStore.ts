import { create } from "zustand";
import { type Node, addEdge } from "@xyflow/react"
import { emailTemplates } from "../constants/index";

// Define Zustand store
interface INodeStore {
    nodes: Node[];
    edges: IEdge[];
    addNodes: (newNode: Node) => void;
    updateNodes: (id: string, updatedNode: Node) => void;
    deleteNode: (id: string) => void;
    addEdge: ( edges: any) => void;
}

interface IEdge {
    id: string;
    source: string;
    target: string;
    type: string;
    animated?: boolean;
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
    edges: [{
        id: "e1-2",
        source: "2",
        target: "3",
        type: "default",
        animated: true,
    },],

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
    addEdge: (newEdge) =>
        set((state) => ({
            edges: addEdge(newEdge, state.edges),
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
