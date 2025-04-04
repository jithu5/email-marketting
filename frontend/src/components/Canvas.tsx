import { useCallback, useEffect } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Background,
    Controls,
    type Connection,
} from "@xyflow/react";
import {  type Node, type Edge } from "reactflow"
import "@xyflow/react/dist/style.css";
import CustomDialog from "./CustomDialog";
import nodeStore from "../store/emailStore"; // Adjust path based on actual location
import EmailNode from "./EmailNode";
import DelayNode from "./DelayNode";

function Canvas() {
    // Zustand store access
    const { nodes, edges: edgeFromStore } = nodeStore(); // Adjust path based on actual location

    // React Flow state management
    const [flowNodes, setNodes, onNodesChange] = useNodesState<Node[]>(nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(edgeFromStore);

    // Sync Zustand nodes with React Flow only if the nodes actually changed
    useEffect(() => {
        setNodes(nodes)
    }, [nodes, setNodes]);

    // Handle new edge connections
    const onConnect = useCallback(
        (connection: Connection) => {
            const edges = { ...connection, animated: true }
            setEdges((prev: Edge[]) => addEdge(edges, prev)); // Automatically add edge

        }, [setEdges, nodes]
    );

    const nodeTypes = {
        customNode: CustomDialog,
        emailNode:EmailNode,
        delayNode:DelayNode
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

            >
                <MiniMap />
                <Background />
                <Controls />
            </ReactFlow>
        </main>
    );
}

export default Canvas;
