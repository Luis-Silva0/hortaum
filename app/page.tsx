"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import axios from "axios"

export default function Dashboard() {
  const [formData, setFormData] = useState<{username: string, password:string}>({username: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post("/api/login", formData);
            router.push("/dashboard");
            
        } catch (error:any) {
            console.log("Login failed", error.response.data.error);
            setError(true);
            
        }finally {
            setLoading(false);
        }
    }


  return (
    <div className="bg-[#F7F7F7] flex flex-col items-center min-h-screen py-52 gap-10">
        <h1 className="text-black text-4xl"> HortaUM </h1>
        <h1 className="text-black text-2xl"> {loading ? "Processing" : "Login"} </h1>
        <Input
          type="text"
          placeholder="username"
          labelPlacement="outside"
          className="w-[300px] mt-5 text-black border border-black"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          color="primary"
          variant="bordered"
          size="lg"
          />
        <Input
          type="password"
          placeholder="********"
          labelPlacement="outside"
          className="w-[300px] mt-2 text-black border border-black"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          color="primary"
          variant="bordered"
          size="lg"
        />
        <button className="text-black" onClick={() => onLogin()}> Sign in </button>
        {error && <div className="bg-red-500 p-2 text-white mt-3 rounded">Credenciais inválidas</div>}
    </div>
  )
}