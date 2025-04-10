import { useCallback, useEffect } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Background,
    Controls,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    type Connection,
} from "@xyflow/react";
import { type Node, type Edge } from "reactflow"
import "@xyflow/react/dist/style.css";
import CustomDialog from "./CustomDialog";
import nodeStore, { INode } from "../store/emailStore"; // Adjust path based on actual location
import EmailNode from "./EmailNode";
import DelayNode from "./DelayNode";
import toast from "react-hot-toast";
import axios from "axios";

function Canvas() {
    // Zustand store access
    const { nodes, edges: edgeFromStore, setNodes:setNodesInStore } = nodeStore(); // Adjust path based on actual location

    // React Flow state management
    const [flowNodes, setNodes, onNodesChange] = useNodesState<INode[]>(nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(edgeFromStore);

    useEffect(() => {
        async function fetchNodes() {
            try {
                const { data } = await axios.get('http://localhost:5000/api/node/get', {
                    withCredentials: true,
                });

                setNodesInStore(data.data); // Zustand update
                setNodes(data.data); // React Flow state update (direct)

                toast.success(data.message);
            } catch (error: any) {
                toast.error(error?.response?.data?.message);
            }
        }
        fetchNodes();
    }, []);

    console.log(nodes)
    useEffect(() => {
        async function fetchEdges() {
            try {
                const { data } = await axios.get('http://localhost:5000/api/edge/get', {
                    withCredentials: true,
                })
                if (data.data.length > 0) {

                    addEdge(data.data);
                }
                toast.success(data.message)
            } catch (error: any) {
                toast.error(error?.response?.data?.message)
            }
        }
        fetchEdges()
    }, [])

    // Handle new edge connections
    const onConnect = useCallback(
        (connection: Connection) => {
            const edges = { ...connection, animated: true }
            setEdges((prev: Edge[]) => addEdge(edges, prev)); // Automatically add edge

        }, [setEdges, nodes]
    );

    const onNodesDelete = useCallback(
        (deletedNodes: Node[]) => {
            setEdges((prevEdges: Edge[]) => {
                let updatedEdges = [...prevEdges];

                deletedNodes.forEach((node) => {
                    const incomers = getIncomers(node, flowNodes, prevEdges);
                    const outgoers = getOutgoers(node, flowNodes, prevEdges);
                    const connectedEdges = getConnectedEdges([node], prevEdges);

                    // Remove edges that were connected to the deleted node
                    updatedEdges = updatedEdges.filter(
                        (edge) => !connectedEdges.includes(edge)
                    );

                    // Connect the node's incomers to its outgoers
                    const newEdges: Edge[] = incomers.flatMap(({ id: source }: Node) =>
                        outgoers.map(({ id: target }: Node) => ({
                            id: `${source}->${target}`,
                            source,
                            target,
                            animated: true,
                            type: 'default',
                        }))
                    );

                    updatedEdges = [...updatedEdges, ...newEdges];
                });

                return updatedEdges;
            });
        },
        [flowNodes, setEdges]
    );

    const nodeTypes = {
        customNode: CustomDialog,
        emailNode: EmailNode,
        delayNode: DelayNode
    };

    return (
        <main className="h-[85vh] w-[90vw] mx-auto flex flex-col">
            <ReactFlow
                nodes={flowNodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onNodesDelete} // ← plug it in here
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
