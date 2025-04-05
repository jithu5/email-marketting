import nodeStore from "../store/emailStore"
import { getConnectedEdges, getIncomers, getOutgoers, Handle, Position, useReactFlow } from "@xyflow/react"
import { Mail, Trash2 } from "lucide-react"
import {type Edge,type Node} from "reactflow"

function EmailNode({id,data}: {id:string,data:{ label: string, value: any}}) {
    const { deleteNode } = nodeStore();
    const { getNodes, getEdges, setEdges } = useReactFlow();

    const handleDelete = () => {
        const flowNodes = getNodes();
        const flowEdges = getEdges();

        const nodeToDelete = flowNodes.find((n:Node) => n.id === id);
        if (!nodeToDelete) return;

        const incomers = getIncomers(nodeToDelete, flowNodes, flowEdges);
        const outgoers = getOutgoers(nodeToDelete, flowNodes, flowEdges);
        const connectedEdges = getConnectedEdges([nodeToDelete], flowEdges);

        let updatedEdges = flowEdges.filter(
            (edge:Edge) => !connectedEdges.includes(edge)
        );

        const newEdges = incomers.flatMap(({ id: source }:Node) =>
            outgoers.map(({ id: target }: Node) => ({
                id: `${source}->${target}`,
                source,
                target,
                animated: true,
                type: "default",
            }))
        );

        setEdges([...updatedEdges, ...newEdges]);
        deleteNode(id); // Zustand update
    };

    return (
        <>
            <div className="relative px-4 py-6 border border-gray-300 rounded-lg bg-white shadow-lg w-64">
                <Handle
                    type="target"
                    position={Position.Top}
                    className="bg-gray-500 w-3 h-3 rounded-full" />
                <div className="flex items-start justify-center gap-4">
                    <div className="h-14 w-32 rounded-sm bg-violet-400 flex justify-center items-center">
                        <button
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 cursor-pointer absolute top-2 right-2"
                            title="Delete Node"
                        >
                            <Trash2 size={18} />
                        </button>

                    <Mail className="text-violet-600 text-xl"/>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-start">
                        <h1 className="text-2xl font-semibold">Email</h1>
                        <p className="text-sm">Template: {data.label}</p>
                    </div>
                </div>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="bg-gray-500 w-3 h-3 rounded-full" />
            </div>
        </>
    )
}

export default EmailNode
