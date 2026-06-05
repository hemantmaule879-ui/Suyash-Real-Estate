"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { propertiesDb, leadsDb, adminDb } from '@/lib/db';
import { loginAdmin, logoutAdmin, isAuthenticated } from '@/lib/auth';

// 1. Contact Form Lead Submission Action
export async function submitLeadAction(prevState, formData) {
  const name = formData.get("name")?.trim();
  const mobile = formData.get("mobile")?.trim();
  const email = formData.get("email")?.trim();
  const message = formData.get("message")?.trim();
  const propertyId = formData.get("propertyId")?.trim() || "";
  const propertyTitle = formData.get("propertyTitle")?.trim() || "";

  if (!name || !mobile) {
    return { success: false, error: "Name and Mobile Number are required fields." };
  }

  try {
    leadsDb.add({
      name,
      mobile,
      email,
      propertyId,
      propertyTitle,
      message: message || "No message provided."
    });
    return { success: true, message: "Thank you! Your enquiry has been received. Our broker will contact you shortly." };
  } catch (err) {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

// 2. Admin Login Action
export async function loginAdminAction(prevState, formData) {
  // Password check is bypassed for development. Simply issue the admin session.
  await loginAdmin();
  return { success: true };
}

// 3. Admin Logout Action
export async function logoutAdminAction() {
  await logoutAdmin();
  revalidatePath('/');
  revalidatePath('/admin/dashboard');
}

// Helper to save uploaded files to public/uploads
async function saveUploadedFiles(files) {
  const savedPaths = [];
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  for (const file of files) {
    if (file && file.size > 0 && file.name) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // Make filename unique and safe
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueName = `${Date.now()}_${cleanName}`;
        const filePath = path.join(uploadsDir, uniqueName);
        
        fs.writeFileSync(filePath, buffer);
        savedPaths.push(`/uploads/${uniqueName}`);
      } catch (err) {
        console.error("Failed to save file:", file.name, err);
      }
    }
  }
  return savedPaths;
}

// 4. Admin Add Property Action
export async function addPropertyAction(formData) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const title = formData.get("title")?.trim();
  const category = formData.get("category");
  const type = formData.get("type");
  const price = parseFloat(formData.get("price") || "0");
  const address = formData.get("address")?.trim();
  const city = formData.get("city")?.trim();
  const locality = formData.get("locality")?.trim();
  const area = parseFloat(formData.get("area") || "0");
  const bedrooms = parseInt(formData.get("bedrooms") || "0");
  const bathrooms = parseInt(formData.get("bathrooms") || "0");
  const parking = formData.get("parking")?.trim() || "NA";
  const amenitiesStr = formData.get("amenities")?.trim() || "";
  const description = formData.get("description")?.trim();
  const googleMapLocation = formData.get("googleMapLocation")?.trim() || "";
  const featured = formData.get("featured") === "on";
  const status = formData.get("status") || "Available";

  // Parse amenities
  const amenities = amenitiesStr
    .split(",")
    .map(a => a.trim())
    .filter(a => a.length > 0);

  // Parse and save uploaded files
  const fileFields = formData.getAll("propertyImages");
  const imagePaths = await saveUploadedFiles(fileFields);

  const newProperty = {
    title,
    category,
    type,
    price,
    address,
    city,
    locality,
    area,
    bedrooms,
    bathrooms,
    parking,
    amenities,
    description,
    googleMapLocation,
    images: imagePaths.length > 0 ? imagePaths : ["/placeholder.jpg"],
    featured,
    status
  };

  propertiesDb.add(newProperty);
  
  revalidatePath('/');
  revalidatePath('/properties');
  revalidatePath('/admin/dashboard');
}

// 5. Admin Update Property Action
export async function updatePropertyAction(id, formData) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const title = formData.get("title")?.trim();
  const category = formData.get("category");
  const type = formData.get("type");
  const price = parseFloat(formData.get("price") || "0");
  const address = formData.get("address")?.trim();
  const city = formData.get("city")?.trim();
  const locality = formData.get("locality")?.trim();
  const area = parseFloat(formData.get("area") || "0");
  const bedrooms = parseInt(formData.get("bedrooms") || "0");
  const bathrooms = parseInt(formData.get("bathrooms") || "0");
  const parking = formData.get("parking")?.trim() || "NA";
  const amenitiesStr = formData.get("amenities")?.trim() || "";
  const description = formData.get("description")?.trim();
  const googleMapLocation = formData.get("googleMapLocation")?.trim() || "";
  const featured = formData.get("featured") === "on";
  const status = formData.get("status") || "Available";

  // Parse amenities
  const amenities = amenitiesStr
    .split(",")
    .map(a => a.trim())
    .filter(a => a.length > 0);

  // Upload new images
  const fileFields = formData.getAll("propertyImages");
  const newImagePaths = await saveUploadedFiles(fileFields);

  // Keep existing images or append new ones
  const existingProp = propertiesDb.getById(id);
  if (!existingProp) throw new Error("Property not found");

  let finalImages = existingProp.images || [];
  if (newImagePaths.length > 0) {
    // If files are uploaded, we append them, or if we want to replace, we replace.
    // Let's append them to existing list.
    finalImages = [...finalImages, ...newImagePaths];
  }

  // Handle image deletions if any are passed
  const deleteImages = formData.getAll("deleteImages");
  if (deleteImages && deleteImages.length > 0) {
    finalImages = finalImages.filter(img => !deleteImages.includes(img));
  }

  if (finalImages.length === 0) {
    finalImages = ["/placeholder.jpg"];
  }

  propertiesDb.update(id, {
    title,
    category,
    type,
    price,
    address,
    city,
    locality,
    area,
    bedrooms,
    bathrooms,
    parking,
    amenities,
    description,
    googleMapLocation,
    images: finalImages,
    featured,
    status
  });

  revalidatePath('/');
  revalidatePath(`/properties/${id}`);
  revalidatePath('/properties');
  revalidatePath('/admin/dashboard');
}

// 6. Admin Delete Property Action
export async function deletePropertyAction(id) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const success = propertiesDb.delete(id);
  if (success) {
    revalidatePath('/');
    revalidatePath('/properties');
    revalidatePath('/admin/dashboard');
  }
  return success;
}

// 7. Admin Delete Lead Action
export async function deleteLeadAction(id) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const success = leadsDb.delete(id);
  if (success) {
    revalidatePath('/admin/dashboard');
  }
  return success;
}
