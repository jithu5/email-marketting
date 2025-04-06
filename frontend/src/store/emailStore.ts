import { create } from "zustand";
import { addEdge } from "@xyflow/react";
import { type Node, type Edge } from "reactflow";
import { emailTemplates } from "../constants/index";

export interface INode extends Node {
    _id?: string,
    userId?: string,
    __v?: number,
    createdAt?: Date,
    updatedAt?: Date
}

type UpdateNode = Partial<INode>;
// Define Zustand store
interface INodeStore {
    nodes: INode[];
    edges: Edge[];
    setNodes(nodes: INode[]): void;
    addNodes: (newNode: INode) => void;
    updateNodes: (id: string, updatedNode: UpdateNode) => void;
    deleteNode: (id: string) => void;
    setEdges(edges: Edge[]): void;
    addEdge: (edges: any) => void;
}

// Zustand store creation
const nodeStore = create<INodeStore>((set) => ({
    nodes: [],
    edges: [{
        id: "e1-2",
        source: "2",
        target: "3",
        type: "default",
        animated: true,
    },],
    // Set all nodes (overwrites)
    setNodes: (nodes) => {
        console.log('Setting nodes:', nodes); // ✅ Log safely here
        set({ nodes });
    },
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


    deleteNode: (nodeId: string) => {
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== nodeId),
            edges: state.edges.filter(
                (edge) => edge.source !== nodeId && edge.target !== nodeId
            ),
        }));
    },
    setEdges: (edges) => set(() => ({
        edges
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
