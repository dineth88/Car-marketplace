import FakeData from '@/Shared/FakeData'
import React, { useEffect,useState } from 'react'
import CarItem from './CarItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { CarImages, CarListing } from './../../configs/schema'
import {db} from './../../configs';
import { desc, eq } from 'drizzle-orm'
import Service from '@/Shared/Service'

function MostSearchCar() {

  const [carList, setCarList] = useState([]);

  useEffect(()=>{
    GetPopularCarList();
  }, [])

  const GetPopularCarList=async()=>{
    const result = await db.select().from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .orderBy(desc(CarListing.id))
        .limit(10)

        const resp = Service.FormatResult(result)
        console.log(resp);
        setCarList(resp);
  }

  return (
    <div className='mx-36'>
        <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Cars</h2>
        <Carousel>
            <CarouselContent>
                {
                carList.map((car, index)=>(
                    <CarouselItem key={index} className='basis-1/4'>
                        <CarItem car={car} key={index} />
                    </CarouselItem>
                    
                ))
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        
    </div>
  )
}

export default MostSearchCar