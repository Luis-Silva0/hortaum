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
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import { FaRegTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import AtributeList from "@/components/AtributeList";

const columns = [
  { key: "designation", label: "Designação", allowsSorting: true },
  { key:"scientific_name", label:"Nome Científico", allowsSorting: true },
  { key:"n_specimens", label:"Nº Exemplares", allowsSorting: true },
  { key:"species", label:"Espécie", allowsSorting: true },
  { key:"description", label:"Descrição", allowsSorting: true },
  { key: "actions", label: "Opções", allowsSorting: false },
];

const initialFakeData = [
  { _id: "0", designation: "Tomate", scientific_name: "Solanum lycopersicum", species: "Tomate", n_specimens: 10, description: "It's a tomato" },
  { _id: "1", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 15, description: "It's lettuce" },
  { _id: "2", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 5, description: "It's lettuce" },
  { _id: "3", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 2, description: "It's lettuce" },
  { _id: "4", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 25, description: "It's lettuce" },
];

// Adicionar ID para cada familia, para identificar cada uma, familia "Lactuca sativa" id = 0

export default function Plants() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "name", direction:"ascending"});
  const [search, setSearch] = useState("");
  const [plantId, setPlantId] = useState<string>("");
  const [data, setData] = useState(initialFakeData);

  const renderCell = (item: any, columnKey: any) => {
    switch(columnKey) {
      case "actions":
        return (
          <div className="flex flex-row justify-center gap-3 text-[#4D789B] px-4">
            <button onClick={() => setPlantId(item._id)}> <FaEye size={25}/> </button>
            <button> <MdModeEdit size={25}/> </button>
            <button> <FaRegTrashAlt size={25}
            //onClick={() => 
              // Apagar a planta
            //}
            />
            
            </button>
          </div>
        );
      default:
        return (
          <div className="relative flex items-center gap-2 py-4 text-[#4D789B] px-4 text-wrap"> 
            {getKeyValue(item, columnKey)}
          </div>
        );
    }
  };

  const filteredItems = useMemo(() => {
    return data.filter((a) => a.designation.toLowerCase().includes(search.toLowerCase()));
  }, [search, data]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as any;
      const second = b[sortDescriptor.column as keyof typeof b] as any;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  return (
    <>
      {plantId === "" ? (
        <div className="pt-12 flex flex-col gap-6 flex-1">
          <div className="flex flex-row items-center justify-between px-8">
            <h1 className="text-3xl text-black">Gestão de Plantas</h1>
            <div className="flex gap-4 items-center">
              <Input
                type="search"
                variant="bordered"
                size="lg"
                className="w-[300px] text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Procura..."
                classNames={{
                  input: ["rounded-none", "text-black", "text-md", "placeholder:text-gray-500", "h-full", "text-xl", "indent-4"],
                  innerWrapper: ["bg-transparent"],
                  inputWrapper: ["!cursor-text", "h-full", "border-b-2", "border-gray-500"]
                }}
                endContent={<PiMagnifyingGlassBold size={25} />}
              />
              <button
                className="flex bg-[#19684a] px-4 py-4 rounded-lg"
                onClick={() => {
                  const designation = prompt("Designação (obrigatório):");
                  if (!designation) return;
                  const scientific_name = prompt("Nome Científico (obrigatório):");
                  if (!scientific_name) return;
                  const species = prompt("Espécie (opcional):") || "";
                  const n_specimens = Number(prompt("Nº Exemplares (opcional):") || 0);
                  const description = prompt("Descrição (opcional):") || "";

                  // If opcional meter o valor NaN

                  setData(prev => [
                    ...prev,
                    {
                      _id: String(prev.length),
                      designation,
                      scientific_name,
                      species,
                      n_specimens,
                      description,
                    }
                  ]);
                }}
              >  <FaPlus size={25}/>
              </button>
            </div>
          </div>

          <Table
            aria-label="Example static collection table"
            className="box-content w-full"
            classNames={{ thead: ["bg-[#4D789B]"], th: ["w-[5%]"] }}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  align={column.key === "actions" ? "center" : "start"}
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
      ) : (
        <AtributeList id={plantId}/>
      )}
    </>
  );
}
