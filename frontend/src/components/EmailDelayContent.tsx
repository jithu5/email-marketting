import { emailTemplateStore } from "../store/emailStore";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import NewTemplate from "./NewTemplate";

function EmailDelayContent({ type, setSelectedTemplate, setDelayTime }: { type: string, setSelectedTemplate: Function, setDelayTime: Function }) {

    const emailTemplates = emailTemplateStore((state) => state.emailTemplates)
    const [time, setTime] = useState<number>(0)
    const [delayType, setDelayType] = useState<string>("")

    useEffect(() => {
        setDelayTime(`${time} ${delayType}`)
    }, [time, delayType])

    return (
        <>
            <div className="w-full px-10">
                {
                    type.toLowerCase() === "email" ?
                        <>
                            <div className="w-full flex justify-between items-center">
                                {/* Button aligned to the right */}
                                <NewTemplate />
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
                        </>
                        :
                        <div className="flex flex-col gap-2 p-4 w-full">
                            <Label className="font-medium text-center">Delay Time</Label>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col w-full">
                                    <Input
                                        type="number"
                                        value={time}
                                        onChange={(e) => setTime(parseInt(e.target.value))}
                                    />
                                </div>
                                <Select onValueChange={(value) => setDelayType(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a delay" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>

                                            <SelectItem value="seconds">seconds</SelectItem>
                                            <SelectItem value="minutes">minutes</SelectItem>
                                            <SelectItem value="hours">hours</SelectItem>
                                            <SelectItem value="days">days</SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                }
            </div>
        </>
    );
}

export default EmailDelayContent;
