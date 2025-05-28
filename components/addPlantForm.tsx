"use client"

import { Form, Input, Button, Select, SelectItem } from "@heroui/react"
import { useEffect, useState } from "react"
import axios from "axios";

export default function AddPlantForm (props: any) {
    const [newSpecies, setNewSpecies] = useState(false);
    const [formData, setFormData] = useState<{designation: string, scientific_name: string, n_specimens: number, species: string, description: string}>({designation:"",scientific_name:"", n_specimens:0, species:"", description:""});
    const [species, setSpecies] = useState<{id: string, label: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const {close, reload} = props;

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

    useEffect(() => {
        getSpecies();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post("/api/plants", formData);
            reload();
            close();
            
        } catch (error:any) {
            console.log("Insert failed", error);
            
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault;
        setFormData({ ...formData, species: e.target.value});
        console.log(formData)
    }

    return(
        <div className="flex self-center text-black w-[35vw] py-10">
            <Form className="flex flex-col gap-10 flex-1" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    errorMessage="Campo obrigatório"
                    label="Designação"
                    labelPlacement="outside"
                    name="designation"
                    placeholder="Ex: Salsa"
                    type="text"
                    value={formData.designation}
                    onChange={(e: any) => setFormData({...formData, designation: e.target.value})}
                    variant="bordered"
                    classNames={{label: "!text-[#2A3F54]"}}
                />
                <Input
                    isRequired
                    errorMessage="Campo obrigatório"
                    label="Nome científico"
                    labelPlacement="outside"
                    name="scientific_name"
                    placeholder="Ex: Petroselinum crispum"
                    type="text"
                    value={formData.scientific_name}
                    onChange={(e: any) => setFormData({...formData, scientific_name: e.target.value})}
                    variant="bordered"
                    classNames={{label: "!text-[#2A3F54]"}}
                />
                {newSpecies ? (
                    <div className="w-full">
                        <Input
                            label="Espécie"
                            labelPlacement="outside"
                            name="species"
                            placeholder="Ex: P. crispum"
                            type="text"
                            value={formData.species}
                            onChange={(e: any) => setFormData({...formData, species: e.target.value})}
                            variant="bordered"
                            classNames={{label: "!text-[#2A3F54]"}}
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
                            selectedKeys={formData.species ? new Set([formData.species]) : new Set()}
                            placeholder="Escolhe uma espécie ou adiciona uma nova"
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0]; 
                                setFormData({ ...formData, species: selectedKey as string });
                            }}
                            variant="bordered"
                            classNames={{label: "!text-[#2A3F54]", listbox: "text-black", trigger: "text-black"}}
                        > 
                            {(species: {id: string, label: string}) => <SelectItem key={species.id} textValue={species.label}> {species.label} </SelectItem>}
                        </Select>
                        <Button 
                            variant="bordered"
                            onPress={() => setNewSpecies(true)}
                            className="mt-2 text-[#4D789B] border-[#4D789B]"
                        > 
                            Adicionar uma espécie nova 
                        </Button>
                    </div>
                )}
                <Input
                    label="Nº de Exemplares"
                    labelPlacement="outside"
                    name="n_specimens"
                    placeholder="Ex: 10"
                    type="number"
                    value={formData.n_specimens.toString()}
                    onChange={(e: any) => setFormData({...formData, n_specimens: e.target.valueAsNumber})}
                    variant="bordered"
                    classNames={{label: "!text-[#2A3F54]"}}
                />
                <Input
                    label="Descrição"
                    labelPlacement="outside"
                    name="description"
                    placeholder="Ex: É uma planta bienal que, no primeiro ano..."
                    type="text"
                    value={formData.description}
                    onChange={(e: any) => setFormData({...formData, description: e.target.value})}
                    variant="bordered"
                    classNames={{label: "!text-[#2A3F54]"}}
                />
                {!loading ? (<Button type="submit" className="bg-[#2A3F54] text-white"> Adicionar </Button>) : (<p> A processar </p>)}
            </Form>
        </div>
    )
}