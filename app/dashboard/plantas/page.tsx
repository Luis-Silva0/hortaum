"use client"

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow, 
  TableCell,
  getKeyValue,
  SortDescriptor,
  Button,
  Input
} from "@nextui-org/react"
import { useState, useMemo } from "react";
import { FaRegTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import AtributeList from "@/components/AtributeList";

const columns = [
  {
    key: "designation",
    label: "Designação",
    allowsSorting: true,
  },
  {
    key:"scientific_name",
    label:"Nome Científico",
    allowsSorting: true,
  },
  {
    key:"n_specimens",
    label:"Nº Exemplares",
    allowsSorting: true,
  },
  {
    key:"species",
    label:"Espécie",
    allowsSorting: true,
  },
  {
    key:"description",
    label:"Descrição",
    allowsSorting: true,
  },
  {
    key: "actions",
    label: "Opções",
    allowsSorting: false,
  },
]

const colunas = [
  {
    key: "profile",
    label: "DATA",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "accredited",
    label: "ACCREDITED",
  },
  {
    key: "graduation",
    label: "COURSE",
  },
  {
    key: "points",
    label: "POINTS",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

const fakeData = [
  {
    _id: "0",
    designation: "Tomate",
    scientific_name: "Solanum lycopersicum",
    species: "Tomate",
    n_specimens: 10,
    description: "It's a tomato",
  },
  {
    _id: "1",
    designation: "Alface",
    scientific_name: "Lactuca sativa",
    species: "Alface",
    n_specimens: 15,
    description: "It's lettuce",
  },
  {
    _id: "2",
    designation: "Alface",
    scientific_name: "Lactuca sativa",
    species: "Alface",
    n_specimens: 5,
    description: "It's lettuce",
  },
  {
    _id: "3",
    designation: "Alface",
    scientific_name: "Lactuca sativa",
    species: "Alface",
    n_specimens: 2,
    description: "It's lettuce",
  },
  {
    _id: "4",
    designation: "Alface",
    scientific_name: "Lactuca sativa",
    species: "Alface",
    n_specimens: 25,
    description: "It's lettuce",
  }
]

const data = [{
    key: "actions",
    label: "ACTIONS",
  },]

export default function Plants() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "name", direction:"ascending"});
  const [search, setSearch] = useState("");
  const [plantId, setPlantId] = useState<string>("");

  const renderCell = (item: any, columnKey: any) => {

    switch(columnKey) {
      case "actions":
        return(
          <div className="flex flex-row justify-center gap-3 text-[#4D789B] px-4">
            <button onClick={() => setPlantId(item._id)}> <FaEye size={25}/> </button>
            <button> <MdModeEdit size={25}/> </button>
            <button> <FaRegTrashAlt size={25}/> </button>
          </div>
        )

      default:
        return(
          <>
            <div className="relative flex items-center gap-2 py-4 text-[#4D789B] px-4 text-wrap"> 
              {getKeyValue(item,columnKey)}
            </div>
          </>
        )
    }
  }
  const filteredItems = useMemo(() => {
    return [...fakeData].filter((a: any) => {
      return a.designation.includes(search);
    });
  }, [search, fakeData]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column] as number;
      const second = b[sortDescriptor.column] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);


  return (
    <>
      {plantId == "" ? (
        <div className="pt-12 flex flex-col gap-6 flex-1">
          <div className="flex flex-row">
            <h1 className="text-3xl ml-8 text-black">
              Gestão de Plantas
            </h1>
            <div className="flex flex-row mr-8 gap-16 flex-1 justify-end">
              <Input type="search" variant="bordered" size="lg" className="w-[50%]" 
              classNames={{
                input: [
                  "rounded-none",
                  "text-black",
                  "text-md",
                  "placeholder:text-gray-500",
                  "h-full",
                  "text-xl",
                  "indent-4"
                ],
                innerWrapper: ["bg-transparent"],
                inputWrapper: [
                  "!cursor-text",
                  "flex",
                  "border-b-2",
                  "border-gray-500"
                ],
                mainWrapper: [
                  "flex",
                  "flex-row",
                ]
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              color="primary" placeholder="Procura ..."/>
              <Button className="flex bg-[#2A3F54] px-8 py-6 rounded-lg"> <FaPlus size={30}/> </Button>
            </div>
          </div>
          <Table aria-label="Example static collection table" className="box-content w-full" classNames={{thead: ["bg-[#4D789B]"], th: ["w-[5%]",""]}} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
            <TableHeader columns={columns}>
              {(column) => (
              <TableColumn key={column.key} align={column.key == "actions" ? "center" : "start"} className={column.key == "actions" ? "" : "indent-4"} maxWidth={15}>{column.label}</TableColumn>
            )}
            </TableHeader>
            <TableBody emptyContent={"No data selected"} items={sortedItems}>
              {(item: any) => (
                <TableRow key={item._id} className="odd:bg-gray-100 even:bg-white">
                  {(columnKey) => (
                    <TableCell>{renderCell(item,columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody> 
          </Table>
        </div>
      ) : ( 
        <AtributeList id={plantId}/> 
      )}
    </>
  );
}