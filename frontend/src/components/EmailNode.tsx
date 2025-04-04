import { Handle, Position } from "@xyflow/react"
import { Mail } from "lucide-react"

function EmailNode({data}: {data:{ label: string, value: any}}) {
    return (
        <>
            <div className="relative px-4 py-6 border border-gray-300 rounded-lg bg-white shadow-lg w-64">
                <Handle
                    type="target"
                    position={Position.Top}
                    className="bg-gray-500 w-3 h-3 rounded-full" />
                <div className="flex items-start justify-center gap-4">
                    <div className="h-14 w-32 rounded-sm bg-violet-400 flex justify-center items-center">

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
