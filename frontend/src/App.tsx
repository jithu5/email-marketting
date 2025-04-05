import Canvas from "./components/Canvas"
import { Button } from "./components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import nodeStore from "./store/emailStore"
import { type Node } from "reactflow"
import axios from "axios"

function App() {

  const { nodes} = nodeStore()

  const onSubmit = async (nodes:Node[])=>{
    console.log("Data", nodes)
    const { data } = await axios.post('http://localhost:5000/api/save-flow', {nodes})
    console.log("Response", data)
  }
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center bg-stone-800">
        <header className="h-[15vh] w-full flex items-center justify-between px-[5vw]">
          <h1 className="text-4xl font-semibold text-white">Email Marketting System</h1>
          <div className="flex items-center justify-center gap-10">
            <Button variant={"secondary"} className="bg-[#5CE55C] px-6 py-3 rounded-md text-white text-lg hover:bg-[#4CAF50]" onClick={()=>onSubmit(nodes)}>Schedule</Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <Canvas />
      </main>
    </>
  )
}

export default App
