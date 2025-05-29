"use client"

import { use, useEffect, useState } from "react";
import axios from "axios";
import { 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem
} from "@heroui/react";
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const columns = [
  { key: "id", label: "Id"},
  { key: "designation", label: "Designação"},
  { key:"scientific_name", label:"Nome Científico"},
  { key:"n_specimens", label:"Nº Exemplares"},
  { key:"species", label:"Espécie"},
  { key:"description", label:"Descrição"},
  { key:"kingdom", label:"Reino"},
  { key:"order", label:"Ordem"},
  { key:"division", label:"Filo"},
  { key:"class", label:"Classe"},
  { key:"family", label:"Família"},
  { key:"genus", label:"Género"},
  { key:"place", label:"Talhão"},
];

const customOrder = ["id", "designation", "scientific_name", "n_specimens", "species", "description", "kingdom", "division", "class", "order", "family", "genus","place"];



export default function AtributeList(props: any){
    const [plant, setPlant] = useState<{key: string, value: any}[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [edit, setEdit] = useState({label: "", value: ""});
    const [species, setSpecies] = useState<{id: string, label: string}[]>([]);
    const [newSpecies, setNewSpecies] = useState(false);
    const back = props.back;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const alterValue = async () => {
        try {
            const key = columns.find(col => col.label == edit.label);
            if (key) await axios.put("/api/plants", {data: {id: props.id, key: key.key, value: edit.value}});
            getPlant();
            
        } catch (error:any) {
            console.log("Failed to update plant", error.response.data.error);   
        }
    }

    const getSpecies = async () => {
        try {
            const response = await axios.get("/api/plants/species");

            const removeDups = (arr: {species: string}[]): {species: string}[] => {
                return arr.filter((item,
                    index) => arr.indexOf(item) === index);
            }
            setSpecies(removeDups(response.data.species).map(item => ({ id: item.species, label: item.species })));
            
        } catch (error:any) {
            console.log("Couldn't get plant species", error);
            
        }
    }

    const getPlant = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`/api/plants?id=${props.id}`, {
                params: {
                    id: props.id
                }
            });
            const transformed = Object.entries(response.data.plant).map(([key, value]) => ({ key, value }));
            const transformedOrdered = transformed.sort((a, b) => customOrder.indexOf(a.key) - customOrder.indexOf(b.key));

            setPlant(transformedOrdered);
            setName(response.data.plant.designation);
            //setAtributes(Object.keys(plant));
            
        } catch (error:any) {
            console.log("Couldn't find plant", error.response.data.error);
            setError(true);
            
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPlant();
        getSpecies();
    }, []);

    return loading ? (<></>) : (
        <div className="pt-12 flex flex-col gap-6 flex-1 px-8">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-3xl text-black"> {name} </h1>
                <Button
                    color="danger"
                    className="flex rounded-lg text-white"
                    size="lg"
                    onPress={back}
                > <IoMdClose size={25}/>
                </Button>
            </div>
            <div className="flex flex-col text-[#2A3F54] border-[#2A3F54]">
                {plant?.map((item) => {
                    const key = columns.find(col => col.key == item.key);
                    return (item.key != "_id" && key) && (
                        <div key={item.key} className="odd:bg-gray-100 even:bg-white text-black py-4 px-2 flex flex-row">
                            <div className="w-[15vw]"> {key.label}: </div>
                            <div className={`justify-between flex flex-row flex-1 gap-4 ${item.value != "" ? "text-black" : "text-white"} `}> 
                                {item.value != "" ? item.value : "1"} {key.key != "id" && (
                                    <button className="bg-transparent pr-6 text-black" onClick={() => {
                                        onOpen(); 
                                        setEdit({label:key.label, value: item.value})}}
                                        > <MdEdit size={20}/> 
                                    </button>
                                )} 
                            </div>
                        </div>
                )})}
            </div>
            <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-black"> Editar {edit.label} </ModalHeader>
                        <ModalBody>
                            {edit.label == "Espécie" ? (
                                            newSpecies ? (
                                                <div className="w-full">
                                                    <Input
                                                        label="Espécie"
                                                        labelPlacement="outside"
                                                        name="species"
                                                        placeholder="Ex: P. crispum"
                                                        type="text"
                                                        value={edit.value}
                                                        onChange={(e: any) => setEdit({...edit, value: e.target.value})}
                                                        variant="bordered"
                                                        classNames={{label: "!text-[#22c55e]"}}
                                                        className="text-black"
                                                    />
                                                    <Button 
                                                        color="danger"
                                                        variant="bordered"
                                                        onPress={() => setNewSpecies(false)}
                                                        className="mt-2"
                                                    > 
                                                        Cancelar 
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="w-full">
                                                    <Select
                                                        label="Espécie"
                                                        name="species"
                                                        labelPlacement="outside"
                                                        items={species}
                                                        selectedKeys={edit.value ? new Set([edit.value]) : new Set()}
                                                        placeholder="Escolhe uma espécie ou adiciona uma nova"
                                                        onSelectionChange={(keys) => {
                                                            const selectedKey = Array.from(keys)[0]; 
                                                            setEdit({ ...edit, value: selectedKey as string });
                                                        }}
                                                        variant="bordered"
                                                        classNames={{label: "!text-[#22c55e]", listbox: "text-black", trigger: "text-black"}}
                                                    > 
                                                        {(species: {id: string, label: string}) => <SelectItem key={species.id} textValue={species.label}> {species.label} </SelectItem>}
                                                    </Select>
                                                    <Button 
                                                        variant="bordered"
                                                        onPress={() => setNewSpecies(true)}
                                                        className="mt-2 text-[#22c55e] border-[#1a9648]"
                                                    > 
                                                        Adicionar uma espécie nova 
                                                    </Button>
                                                </div>
                            )) : (
                                edit.label == "Nº Exemplares" ? (
                                    <div>
                                        <Input
                                        value={edit.value}
                                        type="number"
                                        onChange={(e) => {
                                            setEdit({...edit, value:e.target.value})
                                        }}
                                    />
                                    </div>
                                ) : (
                                    <Input
                                        value={edit.value}
                                        type="text"
                                        onChange={(e) => {
                                            setEdit({...edit, value:e.target.value})
                                        }}
                                    />
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button className="bg-[#22c55e] text-white" onPress={() => {
                                alterValue();
                                setEdit({label: "", value: ""});
                                setNewSpecies(false);
                                onClose();
                            }}> Alterar </Button>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
                </Modal>
        </div>
        )
}