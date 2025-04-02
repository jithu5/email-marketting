import emailStore, { emailTemplateStore, IemailTemplates } from "../store/emailStore";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function EmailDelayContent({ type, setSelectedTemplate }: { type: string, setSelectedTemplate: Function}) {
    const [isEmailNode, setIsEmailNode] = useState(false);
    const emailTemplates = emailTemplateStore((state) => state.emailTemplates)

    const nodes = emailStore((state) => state.nodes);

    useEffect(() => {
        const emailExists = nodes.find(
            (singleNode) => singleNode.data?.label === "email"
        );
        // check if emailExists
        emailExists ? setIsEmailNode(true) : setIsEmailNode(false);
    }, [nodes]);

    return (
        <>
            <div className="w-full px-10">
                {
                    type.toLowerCase() === "email" ?
                        <>
                            <div className="w-full flex justify-between items-center">
                                {/* Button aligned to the right */}
                                <Button variant={"secondary"} className="ml-auto">Create Template</Button>
                            </div>
                            <div className="w-full flex justify-center mt-4">
                                <Select onValueChange={(value) => setSelectedTemplate(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Templates</SelectLabel>
                                            {
                                                emailTemplates.map((email) => (
                                                    <SelectItem key={email.name} value={email.name}>{email.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            {
                                isEmailNode && <div>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Templates</SelectLabel>
                                                {
                                                    emailTemplates.map((email) => (
                                                        <SelectItem key={email.name} value={email.name}>{email.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            }
                        </>
                        :
                        <div className="flex flex-col gap-2 p-4 w-full">
                            {/* <Label className="font-medium text-center">Delay Time</Label> */}

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col w-full">
                                    <Label htmlFor="days">Days</Label>
                                    <Input id="days" type="number" placeholder="0" className="w-full" min="0" />
                                </div>

                                <div className="flex flex-col w-full">
                                    <Label htmlFor="hours">Hours</Label>
                                    <Input id="hours" type="number" placeholder="0" className="w-full" min="0" max="23" />
                                </div>

                                <div className="flex flex-col w-full">
                                    <Label htmlFor="minutes">Minutes</Label>
                                    <Input id="minutes" type="number" placeholder="0" className="w-full" min="0" max="59" />
                                </div>
                            </div>
                        </div>

                }
            </div>
        </>
    );
}

export default EmailDelayContent;
