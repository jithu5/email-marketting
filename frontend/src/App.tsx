import Canvas from "./components/Canvas"
import { Button } from "./components/ui/button"
import { Toaster } from "react-hot-toast"
import nodeStore from "./store/emailStore"
import { type Node } from "reactflow"
import axios from "axios"
import ProfileAvatar from "./components/Avatar"
import { useEffect } from "react"
import userStore from "./store/userStore"

function App() {

  const { nodes} = nodeStore()
  const { setUser, user } = userStore()
  console.log(user)
  useEffect(() => {
    console.log("Mounted"); // Add this to confirm useEffect is running

    async function fetchUser() {
      try {
        console.log("Inside fetchUser"); // You should see this
        const { data } = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true,
        });

        setUser(data.data);
        console.log(data.message);
      } catch (error) {
        console.error("Error fetching user");
        console.error(error);
      }
    }

    fetchUser();
  }, []);


  const onSubmit = async (nodes: Node[]) => {
    console.log("Data", nodes)
    const { data } = await axios.post('http://localhost:5000/api/save-flow', { nodes })
    console.log("Response", data)
  }
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center bg-stone-800">
        <Toaster />
        <header className="h-[15vh] w-full flex items-center justify-between px-[5vw]">
          <h1 className="text-4xl font-semibold text-white">Email Marketting System</h1>
          <div className="flex items-center justify-center gap-10">
            <Button variant={"secondary"} className="bg-[#5CE55C] px-6 py-3 rounded-md text-white text-lg hover:bg-[#4CAF50]" onClick={() => onSubmit(nodes)}>Schedule</Button>
            <ProfileAvatar />
          </div>
        </header>
        <Canvas />
      </main>
    </>
  )
}

export default App
