import Header from '@/components/Header';
import React, { useState } from 'react';
import carDetails from './../Shared/carDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from "@/components/ui/separator";
import features from './../Shared/features.json';
import { Button } from '@/components/ui/button';
import { db } from './../../configs';
import { CarListing } from './../../configs/schema';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';

function AddListing() {
    // State to hold form data
    const [formData, setFormData] = useState([]);

    const [featuresData, setFeaturesData] = useState([]);

    // Function to handle input from form
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Set the name and value in the form data
        }));
    };
    //save selected features list got by checkboxes
    const handleFeatureChange = (name, value) => {
        setFeaturesData((prevData)=>({
            ...prevData,
            [name]: value // Set the name and value in the features data
        }))

        console.log(featuresData);
    }

    // Function to handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        console.log(formData);  // Log form data for debugging

        try {
            // Attempt to insert the data into the database
            const result = await db.insert(CarListing).values({
                ...formData,
                features:featuresData
            });
            if (result) {
                console.log("Data Saved");
            }
        } catch (e) {
            console.log('error', e);
        }
    };

    return (
        <div>
            <Header />
            <div className="px-10 md:px-20 my-10">
                <h2 className="font-bold text-4xl">Add New Listing</h2>
                <form className='p-10 border rounded-xl mt-10'>
                    {/* Car Details */}
                    <div>
                        <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {
                                carDetails.carDetails.map((item, index) => (
                                    <div key={index}>
                                        <label className='text-sm flex gap-2 items-center mb-1'>
                                            <IconField icon={item.icon}/>
                                            {item?.label}
                                            {item.required && <span className='text-red-500'>*</span>}
                                        </label>
                                        {/* Render the appropriate input type based on fieldType */}
                                        {item.fieldType === 'text' || item.fieldType === 'number' ?
                                            <InputField item={item} handleInputChange={handleInputChange} /> :
                                            item.fieldType === 'dropdown' ?
                                            <DropdownField item={item} handleInputChange={handleInputChange} /> :
                                            item.fieldType === 'textarea' ?
                                            <TextAreaField item={item} handleInputChange={handleInputChange} /> :
                                            ""
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Separator className="my-6" />
                    {/* Features List */}
                    <div>
                        <h2 className='font-medium text-xl my-6'>Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {features.features.map((item, index) => (
                                <div key={index} className='flex gap-2 items-center'>
                                    <input type="checkbox" onChange={() => handleFeatureChange(item.name, true)} />
                                    <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Submit Button */}
                    <Separator  className="my-6"/>
                    <UploadImages />
                    <div className="mt-10 flex justify-end">
                        <Button type="submit" onClick={(e) => onSubmit(e)}>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddListing;
