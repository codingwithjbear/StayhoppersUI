import React, { useEffect, useState, FC } from 'react';
import logo from './logo.svg';
import './App.css';

interface Data {
  price: any;
  bedrooms: any;
  bathrooms: any;
  sqft: any;
  photo: string | undefined;
  list_date: any;
  description: string;
  id: number;
  title: string;
  // Add other properties here
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/listings/grid');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
   <div>
    <h1>Listing Data</h1>
    {data.map(listing => (
      <div key={listing.id}>
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>Price: ${listing.price}</p>
        <p>Bedrooms: {listing.bedrooms}</p>
        <p>Bathrooms: {listing.bathrooms}</p>
        <p>Sqft: {listing.sqft}</p>
        <img src={listing.photo} alt={listing.title} />
        <p>List Date: {listing.list_date}</p>
      </div>
    ))}
  </div>
  );
};

export default MyComponent;