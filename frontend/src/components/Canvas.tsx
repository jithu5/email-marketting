import { useCallback, useEffect, useState } from "react";
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    type Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomDialog from "./CustomDialog";
import emailStore from "../store/emailStore"; // Adjust path based on actual location

// Initial Edges
const initialEdges = [
    {
        id: "e1-2",
        source: "2",
        target: "3",
        type: "default",
        animated: true,
    },
];

function Canvas() {
    // Zustand store access
    const nodes = emailStore((state) => state.nodes); // Direct access prevents re-renders
    const [prevNodes, setPrevNodes] = useState<Node[]>([]); // Store previous state

    // React Flow state management
    const [flowNodes, setNodes, onNodesChange] = useNodesState<Node>(nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Sync Zustand nodes with React Flow only if the nodes actually changed
    useEffect(() => {
        if (JSON.stringify(prevNodes) !== JSON.stringify(nodes)) {
            setNodes(nodes);
            setPrevNodes(nodes);
        }
    }, [nodes]);

    // Handle new edge connections
    const onConnect = useCallback(
        (params: any) => setEdges((eds: any) => addEdge(params, eds)),
        [setEdges]
    );

    const nodeTypes = {
        customNode: CustomDialog,
    };

    return (
        <main className="h-screen w-full flex flex-col">
            <ReactFlow
                nodes={flowNodes} // Uses local state
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <MiniMap />
                <Background />
                <Controls />
            </ReactFlow>
        </main>
    );
}

export default Canvas;
