import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { CarImages, CarListing } from './../../../configs/schema'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {db} from './../../../configs'
import { desc, eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import CarItem from '@/components/CarItem'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

function MyListing() {

    const {user} = useUser();
    const [carList, setCarList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        user&&GetUsercarListing();
    }, [user])

    const GetUsercarListing = async()=>{
        const result = await db.select().from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(CarListing.id))

        const resp = Service.FormatResult(result)
        console.log(resp);
        setCarList(resp);
    }

    const handleDelete = async (id) => {
        setIsDialogOpen(false);
        setLoader(true);
    
        try {
            // Step 1: Delete associated records in CarImages
            await db.delete(CarImages)
                .where(eq(CarImages.carListingId, id));
    
            // Step 2: Delete the main record in CarListing
            const result = await db.delete(CarListing)
                .where(eq(CarListing.id, id))
                .returning({ id: CarListing.id });
    
            console.log(result);
    
            // Update the carList to remove the deleted item
            setCarList(prevList => prevList.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting listing:", error);
        } finally {
            setLoader(false);
        }
    };    

    const openDeleteDialog = (id) => {
        setSelectedItemId(id);
        setIsDialogOpen(true);
    };

  return (
    <div className="mt-6">
        <div className="flex justify-between items-center">
            <h2 className="font-bold text-4xl">My Listing</h2>
            <Link to={'/add-listing'}>
                <Button>+ Add New Listing</Button>
            </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
            {carList.map((item, index)=>(
                <div key={index}>
                    <CarItem car={item}/>
                    <div className="p-2 bg-gray-50 rouded-lg flex justify-between gap-3">
                        <Link to={'/add-listing?mode=edit&id='+item?.id} className="w-full">
                            <Button className="w-full" variant="outline">
                                Edit
                            </Button>
                        </Link>
                        <Button
                                variant="destructive"
                                onClick={() => openDeleteDialog(item.id)}
                                className="w-full flex items-center justify-center"
                            >
                                <FaTrashAlt />
                        </Button>
                    </div>
                </div>
            ))}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your item from our database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={() => handleDelete(selectedItemId)} variant="destructive">
                            Continue
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default MyListing