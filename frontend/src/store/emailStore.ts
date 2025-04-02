import { create } from "zustand";
import { type Node} from "@xyflow/react"


// Define Zustand store
interface EmailStore {
    nodes: Node[];
    addNodes: (newNode: Node) => void;
    deleteNode: (id: string) => void;
}

// Zustand store creation
const emailStore = create<EmailStore>((set) => ({
    nodes: [
        {
            id: "1",
            position: { x: 138, y: 0 },
            type: "customNode",
            data:{label:"Add items"}
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
            data:{label:"Add items"}
        },
    ],

    addNodes: (newNode) =>
        set((state) => ({
            nodes: [...state.nodes, newNode],
        })),

    deleteNode: (id) =>
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
        })),
}));

export default emailStore;
