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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react"
import { useState, useMemo } from "react";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const columns = [
  {
    key: "name",
    label: "Nome",
    allowsSorting: true,
  },
  {
    key:"scientific",
    label:"Nome Científico",
    allowsSorting: true,
  },
  {
    key:"number",
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
    id: 0,
    name: "Tomate",
    scientific: "Solanum lycopersicum",
    species: "Tomate",
    number: 10,
    description: "It's a tomato",
  },
  {
    id: 1,
    name: "Alface",
    scientific: "Lactuca sativa",
    species: "Alface",
    number: 15,
    description: "It's lettuce",
  },
  {
    id: 2,
    name: "Alface",
    scientific: "Lactuca sativa",
    species: "Alface",
    number: 5,
    description: "It's lettuce",
  },
  {
    id: 3,
    name: "Alface",
    scientific: "Lactuca sativa",
    species: "Alface",
    number: 2,
    description: "It's lettuce",
  },
  {
    id: 4,
    name: "Alface",
    scientific: "Lactuca sativa",
    species: "Alface",
    number: 25,
    description: "It's lettuce",
  }
]

const data = [{
    key: "actions",
    label: "ACTIONS",
  },]

export default function Plants() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "name", direction:"ascending"});

  const renderCell = (item: any, columnKey: any) => {

    switch(columnKey) {
      case "actions":
        return(
          <div className="flex flex-row justify-center gap-3 text-[#4D789B]">
            <button> <FaEye/> </button>
            <button> <MdModeEdit/> </button>
            <button> <FaRegTrashAlt/> </button>
          </div>
        )

      default:
        return(
          <>
            <div className="relative flex items-center gap-2 py-4 text-[#4D789B] indent-4"> 
              {getKeyValue(item,columnKey)}
            </div>
          </>
        )
    }
  }

  const sortedItems = useMemo(() => {
    console.log(sortDescriptor);
    return [...fakeData].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column] as number;
      const second = b[sortDescriptor.column] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, fakeData]);


  return (
    <div className="pt-12 flex flex-col gap-6 flex-1">
        <div>
          <h1 className="text-3xl ml-8 text-black">
            Gestão de Plantas
        </h1>

        </div>
        <Table aria-label="Example static collection table" className="box-content w-full" classNames={{thead: ["bg-[#4D789B]"]}} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
          <TableHeader columns={columns}>
            {(column) => (
            <TableColumn key={column.key} align={column.key === "actions" ? "center" : "start"} className="whitespace-nowrap px-4">{column.label}</TableColumn>
          )}
          </TableHeader>
          <TableBody emptyContent={"No data selected"} items={sortedItems}>
            {(item: any) => ( // TODO: Fix this any by checking documentation of TableBody
              <TableRow key={item.id} className="odd:bg-gray-100 even:bg-white">
                {(columnKey) => (
                  <TableCell>{renderCell(item,columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody> 
        </Table>
    </div>
  );
}