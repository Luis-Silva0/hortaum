"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Table, TableBody, TableHeader, TableColumn, TableCell, TableRow, Button } from "@heroui/react";
import { MdEdit } from "react-icons/md";

const columns = [
    {key: "atribute", label:"Caracteristíca"},
    {key: "value", label:"Valor"},
    {key: "edit", label:"Edit"}
]

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
            console.log(response);
            //setPlant(response)
            
        } catch (error:any) {
            console.log("Couldn't find plant", error.response.data.error);
            setError(true);
            
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPlant();
    }, []);

    return loading ? (<div> <Spinner/> </div>) : (
        <div className="pt-12 flex flex-col gap-6 flex-1">
            <div className="flex flex-row items-center justify-between px-8">
                <h1 className="text-3xl text-black"> {plant?.designation} </h1>
            </div>

            <Table
            aria-label="Example static collection table"
            className="box-content"
            hideHeader
            isStriped
            removeWrapper
            >
            <TableHeader columns={columns}>
                {(column) => (
                <TableColumn
                    key={column.key}
                    className="indent-4"
                >
                    {column.label}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No data selected"} items={[{key: "boas", value: "funciona"},{key: "funciona", value: "simmmmmmmmmmm mmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmm mm"}]}>
                {(item) => (
                <TableRow key={item.key} className="odd:bg-gray-100 even:bg-white text-black">
                    {(columnKey) => <TableCell>{columnKey == "value" ? item.value : ( columnKey == "atribute" ? item.key : <button> <MdEdit/> </button>)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        )
}