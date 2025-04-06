import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

function NewTemplate() {
  return ( 
    <>
          <Dialog>
              <DialogTrigger asChild>
          <Button variant={"secondary"} className="ml-auto">Create Template</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[950px] h-[700px]">
                  <DialogHeader>
                      <DialogTitle>Create New Template</DialogTitle>
                      <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                              Name
                          </Label>
                          <Input id="name" value="Pedro Duarte" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                              subject
                          </Label>
                          <Input id="subject" name="subject" value="@peduarte" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                              Body
                          </Label>
                          <div className="w-[600px] col-span-3 ">

                          <Textarea
                              placeholder="Type your message here."
                              rows={70}
                              autoSave="true"
                              className="w-full resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              </div>
                      </div>
                  </div>
                  <DialogFooter>
                      <Button type="submit">Save changes</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
    </>
  )
}

export default NewTemplate
