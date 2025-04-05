import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./ui/tabs"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import userStore from '../store/userStore'

type SignUpForm = {
    email: string;
    password: string;
    name: string;
};

type SignInForm = {
    email: string;
    password: string;
};
function ProfileAvatar() {
    const {user,setUser} = userStore()
    const [signup, setSignup] = useState<SignUpForm>({
        email: "",
        password: "",
        name: ""
    })
    const [signin, setSignin] = useState<SignInForm>({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState<boolean>(false)


    const onSignInChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setSignin((prev) => ({ ...prev, [name]: value }));
    }
    const onSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value)
        const { name, value } = e.target;
        setSignup((prev) => ({ ...prev, [name]: value }));
    };
    const handleSignUp = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        // call your backend API to sign up user here
        try {
            setLoading(true)
            const { data } = await axios.post('http://localhost:5000/api/user/register', signup,{
                withCredentials: true
            })
            console.log(data)
            if (data.error) {
                toast.error(data.error)
                return
            }
            console.log("Response", data)
            toast.success(data.message)
            setUser(data.data)
        } catch (error:any) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        }
        finally{
            // reset the form fields
            setSignup({ email: "", password: "", name: "" })
            setLoading(false)
        }
    }

    const handleSignIn = async(e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        // call your backend API to sign in user here
        try {
            setLoading(true)
            const { data } = await axios.post('http://localhost:5000/api/user/login', signin,{
                withCredentials: true
            })
            console.log("Response", data)
            toast.success(data.message)
            setUser(data.data)
        } catch (error: any) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        }
        finally{
            // reset the form fields
            setSignin({ email: "", password: "" })
            setLoading(false)
        }
    }

    return (
        <>
            {user && <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>}
            <Dialog>
                <DialogTrigger asChild>
                    {!user && <Button variant={'outline'} className=" px-3 py-2 rounded-md text-black text-lg ">Sign In</Button>}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] h-[500px]">
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                            <DialogHeader className='py-10'>
                                <DialogTitle className='text-4xl font-semibold text-center'>Sign In</DialogTitle>
                                <DialogDescription>Login to existing account</DialogDescription>

                            </DialogHeader >

                            {/* sign in form  */}
                            <form onSubmit={handleSignIn}>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="email" value={signin.email} name='email' onChange={onSignInChange} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                            Password
                                        </Label>
                                        <Input id="password" value={signin.password} name='password' onChange={onSignInChange} type='password' className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter className='w-full pt-10'>
                                    <Button type="submit" className='mx-auto'>{loading?"Signing In...":"Sign In"}</Button>
                                </DialogFooter>
                            </form>
                        </TabsContent>

                        {/* sign up  */}
                        <TabsContent value="signup">
                            <DialogHeader className='py-10'>
                                <DialogTitle className='text-4xl font-semibold text-center'>Sign Up</DialogTitle>
                                <DialogDescription>Create new Account</DialogDescription>

                            </DialogHeader >

                            {/* sign up form */}
                            <form onSubmit={handleSignUp}>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="name" value={signup.name} className="col-span-3" name='name' onChange={onSignUpChange} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="email" value={signup.email} className="col-span-3" name='email' onChange={onSignUpChange} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                            Password
                                        </Label>
                                        <Input id="password" value={signup.password} type='password' name='password' className="col-span-3" onChange={onSignUpChange} />
                                    </div>
                                </div>
                                <DialogFooter className='w-full pt-10'>
                                    <Button type="submit" className='mx-auto'>{loading?"Signing Up...":"Sign Up"}</Button>
                                </DialogFooter>
                            </form>
                        </TabsContent>
                    </Tabs>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default ProfileAvatar
