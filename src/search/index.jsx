import Header from '@/components/Header'
import Search from '@/components/Search'
import { CarImages, CarListing } from './../../configs/schema';
import { eq } from 'drizzle-orm';
import { db } from './../../configs';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { index } from 'drizzle-orm/mysql-core';
import CarItem from '@/components/CarItem';
import Service from '@/Shared/Service';

function SearchByCategory() {
    const {category} = useParams();
    const [carList, setCarList] = useState([]);

    useEffect(()=>{
        GetCarList();
    }, [])

    const GetCarList=async()=>{
        const result = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.category, category))
        const resp = Service.FormatResult(result);
        setCarList(resp);
    }

  return (
    <div>
        <Header/>
        <div className="p-16 bg-black flex justify-center">
            <Search/>
        </div>
        <div className='p-10 md:px-20'>
            <h2 className='font-bold text-4xl'>{category}</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                {/**Car list */}
                {carList?.length>0?carList.map((item, index)=>(
                    <div key={index}>
                        <CarItem car={item} />
                    </div>
                )):
                //Adding skeleton
                [1, 2, 3, 4, 5, 6].map((item, index)=>(
                    <div className='h-[320px] rounded-xl bg-slate-200 animate-pulse'>
                    </div>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default SearchByCategory