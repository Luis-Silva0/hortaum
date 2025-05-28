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
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { useState, useMemo, useEffect } from "react";
import { FaRegTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import AtributeList from "@/components/AtributeList";
import AddPlantForm from "@/components/addPlantForm";
import axios from "axios";

const columns = [
  { key: "id", label: "Id", allowsSorting: true},
  { key: "designation", label: "Designação", allowsSorting: true },
  { key:"scientific_name", label:"Nome Científico", allowsSorting: true },
  { key:"n_specimens", label:"Nº Exemplares", allowsSorting: true },
  { key:"species", label:"Espécie", allowsSorting: true },
  { key:"description", label:"Descrição", allowsSorting: true },
  { key: "actions", label: "Opções", allowsSorting: false },
];

const initialFakeData = [
  { id: "0", designation: "Tomate", scientific_name: "Solanum lycopersicum", species: "Tomate", n_specimens: 10, description: "It's a tomato" },
  { id: "1", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 15, description: "It's lettuce" },
  { id: "2", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 5, description: "It's lettuce" },
  { id: "3", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 2, description: "It's lettuce" },
  { id: "4", designation: "Alface", scientific_name: "Lactuca sativa", species: "Alface", n_specimens: 25, description: "It's lettuce" },
];

// Adicionar ID para cada familia, para identificar cada uma, familia "Lactuca sativa" id = 0

export default function Plants() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "name", direction:"ascending"});
  const [search, setSearch] = useState("");
  const [plantId, setPlantId] = useState<string>("");
  const [data, setData] = useState(initialFakeData);
  const [loading, setLoading] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const deletePlant = async (pId: number) => {
      try {
            const response = await axios.delete("/api/plants", {data: {id: pId}});
            getPlants();
            
        } catch (error:any) {
            console.log("Failed to delete plant", error.response.data.error);   
        }
  }

  const renderCell = (item: any, columnKey: any) => {
    switch(columnKey) {
      case "actions":
        return (
          <div className="flex flex-row justify-center gap-3 text-[#4D789B] px-4">
            <button onClick={() => setPlantId(item.id)}> <FaEye size={25}/> </button>
            <button> <MdModeEdit size={25}/> </button>
            <button> <FaRegTrashAlt size={25}
            onClick={() => deletePlant(item.id)} 
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

  const getPlants = async () => {
      try {
            setLoading(true);
            const response = await axios.get("/api/plants/all");
            setData(response.data.plants);
            
        } catch (error:any) {
            console.log("Failed to get plants", error.response.data.error);
            
        } finally {
            setLoading(false);
        }
  }

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <>
      {plantId === "" ? (
        <div className="pt-12 flex flex-col gap-6 flex-1">
          <div className="flex flex-row items-center justify-between px-8">
            <h1 className="text-3xl text-black">Gestão de Plantas</h1>
            <div className="flex gap-4 items-center">
              <Input
                type="search"
                variant="underlined"
                size="lg"
                className="w-[25vw] text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Procura..."
                classNames={{
                  input: ["rounded-none", "text-md", "h-full", "text-xl", "indent-4", "!text-gray-500"],
                  innerWrapper: ["bg-transparent"],
                  inputWrapper: ["h-full", "border-b-2", "border-gray-500"],
                }}
              />
              <Button
                className="flex bg-[#19684a] rounded-lg text-white"
                size="lg"
                onPress={onOpen}
              >  <FaPlus size={25}/>
              </Button>
            </div>
          </div>
          <Table
            aria-label="Example static collection table"
            className="box-content"
            classNames={{thead: [""], th: ["w-[5%]", "bg-[#4D789B]", "text-white", "text-md"], tr: ["text-md"]}}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            removeWrapper
            isStriped
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  allowsSorting={column.allowsSorting}
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
                <TableRow key={item.id} className="odd:bg-gray-100 even:bg-white">
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <AtributeList id={plantId}/>
      )}
      <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Adicionar Planta</ModalHeader>
              <ModalBody>
                <AddPlantForm close={onClose} reload={getPlants}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}