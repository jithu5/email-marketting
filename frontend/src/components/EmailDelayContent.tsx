import emailStore from "@/store/emailStore";
import { useEffect, useState } from "react";

function EmailDelayContent({ type }: { type: string }) {
    const [isEmailNode, setIsEmailNode] = useState(false);

    const nodes = emailStore((state) => state.nodes);

    useEffect(() => {
        const emailExists = nodes.find(
            (singleNode) => singleNode.data?.type === "email"
        );
        // check if emailExists
        emailExists ? setIsEmailNode(true) : setIsEmailNode(false);
    }, [nodes]);

    return (
        <>
            <div className="w-full px-10">
                {
                    type.toLowerCase()
                }
            </div>
        </>
    );
}

export default EmailDelayContent;
