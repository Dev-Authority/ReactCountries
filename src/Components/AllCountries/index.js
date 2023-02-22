import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { apiURL } from "../util/api";
import SearchInput from "../SearchCountry";
import FilterCountry from "../FilterCountry";
import "./style.css"

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';




const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries1 = async () => {
    try { 
      var countriess;
      await axios.get(`${apiURL}/all`).then(res => {
        countriess = res.data;
        console.log(countriess);
        setCountries(countriess);
      })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  // const getAllCountries = async () => {
  //   try {
  //     const res = await fetch(`${apiURL}/all`);

  //     if (!res.ok) throw new Error("Something went wrong!");

  //     const data = await res.json();

  //     //console.log(data);

  //     setCountries(data);

  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError(error.message);
  //   }
  // };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    if(regionName === "all"){
      try {
        const res = await fetch(`${apiURL}/${regionName}`);

        if (!res.ok) throw new Error("Failed..........");

        const data = await res.json();
        setCountries(data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(false);
      }
    }else{
      try {
        const res = await fetch(`${apiURL}/region/${regionName}`);

        if (!res.ok) throw new Error("Failed..........");

        const data = await res.json();
        setCountries(data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(false);
      }
    }
  };

  useEffect(() => {
    //getAllCountries();
    getAllCountries1();
  }, []);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">

        <div style={{marginLeft:"30px"}}>
          <Box width={200}>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </Box>
        </div>

        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>

        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>

        
      </div>

      <div className="country__bottom">
        {isLoading && !error && <h4>Loading........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <div>
          <Link to={`/country/${country.name.common}`}>
          <div className="country__img">
                <img src={country.flags.png} alt="" />
              </div>
          </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AllCountries;
