import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Container, TextField, Typography, Box } from '@mui/material';

import { Input } from "@/components/ui/input"
import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { FadeText } from '@/components/ui/fade-text';
import ShinyButton from "@/components/ui/shiny-button";
import ShineBorder from "@/components/ui/shine-border";
import ShimmerButton from "@/components/ui/shimmer-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import BlurFade from "@/components/ui/blur-fade";


const Home = () => {
    const [image, setImage] = useState<File | null>(null);
    const [symptoms, setSymptoms] = useState<string>('');
    const [prediction, setPrediction] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<number | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    // Ref for the file input
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Function to handle image upload
    // Function to handle image upload
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };




    // Function to open the file input dialog
    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Function to handle symptoms input
    const handleSymptomsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSymptoms(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!image) {
            alert('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        if (symptoms) {
            formData.append('symptoms', symptoms);
        }

        try {
            // Make a POST request to your backend API
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { predicted_class, confidence } = response.data;
            setPrediction(predicted_class);
            setConfidence(confidence);

        } catch (error) {
            console.error('Error making prediction:', error);
            alert('An error occurred while predicting.');
        }
    };

    return (
        <div className='relative w-full h-full bg-background flex flex-col items-center py-20 px-28 space-y-7'>
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />

            <div className='w-full flex flex-col items-center justify-center space-y-3'>
                <FadeText
                    className="text-5xl font-semibold"
                    direction="up"
                    framerProps={{
                        show: { transition: { delay: 0.5 } },
                    }}
                    text="Corn Leaf Disease Prediction"
                />
                <div className=' text-center'>
                    <FadeText
                        className="text-sm text-slate-500 font-medium w-32 tracking-wide"
                        direction="up"
                        framerProps={{
                            show: { transition: { delay: 0.9 } },
                        }}
                        text="Please Upload an image and symptoms(if any) to get the disease predicted."
                    />
                </div>
            </div>


            <div className='w-full grid grid-cols-2 gap-24'>
                <BlurFade delay={0.25*5} inView>
                    <ShineBorder
                        className="relative flex h-96 col-span-1 p-7 w-full flex-col items-center justify-center space-y-3 overflow-hidden rounded-lg border bg-background md:shadow-xl"
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    >
                        <form onSubmit={handleSubmit} className=' space-y-5 w-full flex  flex-col items-center justify-center'>
                            <RainbowButton
                                className='text-white bg-slate-300'
                                type="button"
                                onClick={handleUploadButtonClick}
                            >
                                Upload Image
                            </RainbowButton>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                            <Input
                                type="text"
                                placeholder="Symptoms (Optional)"
                                className='border border-slate-400 rounded-xl px-5 py-5 z-10 text-primary w-64'
                                value={symptoms}
                                onChange={handleSymptomsChange}
                            />
                            <ShimmerButton className="shadow-2xl" type="submit">
                                <span className="whitespace-pre-wrap text-center text-md font-medium leading-none tracking-wide text-white dark:from-white dark:to-slate-900/10">
                                    Predict Disease
                                </span>
                            </ShimmerButton>
                        </form>
                    </ShineBorder>
                </BlurFade>
                <BlurFade delay={0.25*5} inView>
                    <ShineBorder
                        className="relative flex  h-96 text-primary col-span-1 p-7 w-full flex-col items-center justify-center space-y-3 overflow-hidden rounded-lg border bg-background md:shadow-xl"
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    >
                        {imagePreview && (
                            <Box mt={4}>
                                <Typography variant="h6">Uploaded Image:</Typography>
                                <img src={imagePreview} alt="Uploaded" className="mt-2 border border-slate-200 p-1 rounded-xl w-52 h-52" />
                            </Box>
                        )}

                        {prediction && (
                            <Box mt={4}>
                                <Typography variant="h6">Predicted Disease: {prediction}</Typography>
                                <Typography variant="h6">Confidence: {confidence}%</Typography>
                            </Box>
                        )}
                    </ShineBorder>
                </BlurFade>

            </div>
        </div>
    )
}

export default Home;
