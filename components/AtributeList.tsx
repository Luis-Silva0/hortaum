"use client"

import { useState } from "react";
import axios from "axios";
import { Spinner } from "@heroui/react";

export default function AtributeList(props: any){
    const [plant, setPlant] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const back = props.back;

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

    return loading ? (<div> <Spinner/> </div>) : (
        <div className="pt-12 flex flex-col gap-6 flex-1">
            <div className="flex flex-row items-center justify-between px-8">
            <h1 className="text-3xl text-black"></h1>
            <div className="flex gap-4 items-center">
                <button
                className="flex bg-[#19684a] px-4 py-4 rounded-lg"
                onClick={() => back()}
                >  <FaPlus size={25}/>
                </button>
            </div>
            </div>

            <Table
            aria-label="Example static collection table"
            className="box-content"
            classNames={{ thead: ["bg-[#4D789B]"], th: ["w-[5%]"] }}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            >
            <TableHeader columns={columns}>
                {(column) => (
                <TableColumn
                    key={column.key}
                    className={column.key === "actions" ? "" : "indent-4"}
                >
                    {column.label}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No data selected"} items={sortedItems}>
                {(item) => (
                <TableRow key={item._id} className="odd:bg-gray-100 even:bg-white">
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        )
}