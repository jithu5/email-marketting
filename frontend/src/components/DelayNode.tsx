import { Position, Handle } from "@xyflow/react"
import { Clock } from "lucide-react"

function DelayNode({ data }: { data: { label: Date, value: Date } }) {
    function formatDelay(seconds: number) {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return `${days}d ${hours}h ${minutes}m`;
    }

    const delayInSeconds = Math.round((new Date(data.value).getTime() - new Date().getTime()) / 1000);
    const formattedDelay = formatDelay(delayInSeconds);
    return (
        <>
            <div className="relative px-4 py-6 border border-gray-300 rounded-lg bg-white shadow-lg w-64">
                <Handle
                    type="target"
                    position={Position.Top}
                    className="bg-gray-500 w-3 h-3 rounded-full" />
                <div className="flex items-start justify-center gap-4">
                    <div className="h-14 w-32 rounded-sm bg-violet-400 flex justify-center items-center">

                        <Clock className="text-violet-600 text-xl" />
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-start">
                        <h1 className="text-2xl font-semibold">Delay</h1>
                        <p className="text-sm">
                            Time Delay: {
                                formattedDelay
                            }
                        </p>

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

export default DelayNode
