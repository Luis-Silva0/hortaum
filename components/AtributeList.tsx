"use client"

import { useState } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

export default function AtributeList(props: any){
    const [plant, setPlant] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getPlant = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get("/api/plant", {
                params: {
                    id: props.id
                }
            });
            setPlant(response)
            
        } catch (error:any) {
            console.log("Couldn't find plant", error.response.data.error);
            setError(true);
            
        }finally {
            setLoading(false);
        }
    }

    console.log(plant)

    return loading ? (<div> <Spinner/> </div>) : (<div className="text-black"> Hello </div>)
}