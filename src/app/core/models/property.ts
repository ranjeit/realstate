export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status: string;
   listingType: 'SALE' | 'RENT';
}