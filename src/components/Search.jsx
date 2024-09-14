import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CiSearch } from "react-icons/ci";
import Data from '@/Shared/Data';
  

function Search() {
  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]">
        <Select>
            <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                <SelectValue placeholder="Cars" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">New</SelectItem>
                <SelectItem value="dark">Used</SelectItem>
            </SelectContent>
            </Select>
            <Separator orientation="vertical" className="hidden md:block"/>
            <Select>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Data.CarMakes.map((maker, index)=>(
                            <SelectItem value={maker.name}>{maker.name}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Separator orientation="vertical"  className="hidden md:block"/>
            <Select>
                <SelectTrigger className="w-full outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Data.Pricing.map((price, index)=>(
                            <SelectItem value={price.amount}>{price.amount}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <div>
                <CiSearch className='text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 cursor-pointer'/>
            </div>
            
    </div>
  )
}

export default Search