"use client"

import { PiLeafBold } from "react-icons/pi";
import { Leaf } from "lucide-react"
import { RiHome5Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar () {

    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/logout');
            router.push('/')
        } catch (error: any) {
            console.log(error.message)
            
        }

    }

    return(
        <div className="bg-[#22c55e] h-screen w-[10vw] min-w-[200px] flex-col justify-between md:flex hidden text-white pt-2">
            <div className="flex flex-col gap-40">
                <div className="h-[5vh] flex items-center justify-center gap-4">
                <Leaf size={40}/>
                <h1 className="text-xl"> 
                    HortUM 
                </h1>
            </div>

            <div className="flex flex-col pl-10 gap-10">
                {/* Main dashboard */}
                <div className="flex flex-row items-end gap-4">
                    <RiHome5Line size={30}/> 
                    <Link
                        className="text-lg transition-colors duration-200 hover:text-green-900"
                        href={"/dashboard"}
                    >
                        Home
                    </Link>
                </div>

                {/* Plant list */}
                <div className="flex flex-row items-end gap-4">
                    <PiLeafBold size={30}/>
                    <Link className="text-lg transition-colors duration-200 hover:text-green-900" 
                    href={"/dashboard/plantas"}
                    >
                     Plantas 
                     </Link>
                </div>
            </div>
            </div>

            <div className="flex flex-row items-end gap-4 pl-10 pb-10">
                <BiLogOut size={30}/> 
                <button className="text-lg transition-colors duration-200 hover:text-green-900"
                 onClick={() => logout()}
                 > 
                 Logout
                 </button>
            </div>
        </div>
    )
}