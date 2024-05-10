"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/form.css";
import DND from '@/public/drag-and-drop.png'
import xLogo from '@/public/twitter.png'
import telegramLogo from '@/public/telegram.png'
import webLogo from '@/public/world-wide-web.png'
import Image from "next/image";
type SocialLinks = {
  twitter: string;
  telegram: string;
  website: string;
};

interface FormState {
  name: string;
  ticker: string;
  description: string;
  image: File | null;
  socialLinks: SocialLinks;
}

const Form = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    ticker: "",
    description: "",
    image: null,
    socialLinks: {
      twitter: "",
      telegram: "",
      website: "",
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onDrop = (acceptedFiles: File[]) => {
    setForm({ ...form, image: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in form.socialLinks) {
      setForm({
        ...form,
        socialLinks: {
          ...form.socialLinks,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};

    if (!form.name) newErrors.name = "Name is required.";
    if (!form.ticker) newErrors.ticker = "Ticker is required.";
    if (!form.description) newErrors.description = "Description is required.";
    if (!form.image) newErrors.image = "Image is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
      <label htmlFor="name" className="block text-[#48d7ff]">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Your Username"
          className="w-full p-2 border border-gray-300 rounded bg-[#050e1a9e]"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div>
      <label htmlFor="name" className="block text-[#48d7ff]">Ticker</label>
        <input
          type="text"
          name="ticker"
          value={form.ticker}
          onChange={handleChange}
          placeholder="Specify Ticker"
          className="w-full p-2 border border-gray-300 rounded bg-[#050e1a9e]"
        />
        {errors.ticker && (
          <p className="text-red-500 text-xs mt-1">{errors.ticker}</p>
        )}
      </div>
      <div>
      <label htmlFor="name" className="block text-[#48d7ff]">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Tell us more about your coin"
          className="w-full p-2 border border-gray-300 rounded bg-[#050e1a9e]"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>
      <div>
      <label htmlFor="name" className="block text-[#48d7ff]">Image</label>
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center p-5 border-dashed bg-[#4b6a7d7d] border border-gray-300 text-gray-400 rounded"
      >
        <input {...getInputProps()} />
        <Image src={DND} alt="drag and drop" className=" size-[4rem]"/>
        <p className="ml-2">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop Image, or click to select Image"}
        </p>
      </div>
      </div>
      
      {errors.image && (
        <p className="text-red-500 text-xs mt-1">{errors.image}</p>
      )}
      <div className=" flex gap-5 items-center">
        <Image src={xLogo} alt="X" className=" size-6 "/>
        <input
          type="text"
          name="twitter"
          value={form.socialLinks.twitter}
          onChange={handleChange}
          placeholder="Link Twitter"
          className="w-full p-2 border border-gray-300 rounded bg-[#050e1a9e] text-gray-400 "
        />
      </div>
      <div className=" flex gap-5 items-center">
        <Image src={telegramLogo} alt="telegram" className=" size-6 "/>
        <input
          type="text"
          name="telegram"
          value={form.socialLinks.telegram}
          onChange={handleChange}
          placeholder="Link Telegram"
          className="w-full p-2 border border-gray-300 rounded bg-[#050e1a9e] text-gray-400 -z                                                                                                                            "
        />
      </div>
      <div className=" flex gap-5 items-center">
        <Image src={webLogo} alt="web" className=" size-6 "/>
        <input
          type="text"
          name="website"
          value={form.socialLinks.website}
          onChange={handleChange}
          placeholder="Link Website"
          className="w-full p-2 border border-gray-300 rounded bg-[#050e1a9e] text-gray-400 "
        />
      </div>
      <button
        type="submit"
        className="btn p-2 hover:text-[#5ea9ff] hover:bg-[#5db6ff42] text-white rounded w-full md:w-1/2 mx-auto block"
      >
        Create Coin
      </button>
    </form>
  );
};

export default Form;
