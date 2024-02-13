import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from '@mui/material'
import axios from 'axios';
function OrganizationStructure({ chartdata }) {

  const [data, setData] = useState(chartdata);
  const [userData, setUserData] = useState([])

  useEffect(() => {

    const callChartData = async () => {
      
      try {

        const response = await axios.post('http://localhost:4000/api/getorgchart', {
          
        });

        if (response.status === 200) {
          //navigate('/chart')
        } else {
          throw new Error("some internal error")
        }

        console.log('login respoinse', response);
        console.log('API call successful', response.data);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    callChartData()

  }, [])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = data

  const searchTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const OptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div>

      <div className="container-fluid">
        <div className="row" style={{ backgroundColor: "#E2E2E2" }} >
          <div className='col-md-3 col-sm-12 py-2'><i class="fa-solid fa-sitemap" style={{ fontSize: '2.5rem' }}></i></div>
          <div className=' col-md-6 py-2 col-sm-12'><Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Select a user"
            filter valueTemplate={searchTemplate} itemTemplate={OptionTemplate} className="w-full md:w-14rem" style={{ width: "100%" }} /></div>
          <div className='col-md-3 col-sm-12 py-2' style={{ display: 'flex', justifyContent: 'flex-end' }}><button type="button" class="btn btn-outline-dark" style={{ right: "7%" }}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button></div>
        </div></div>


      <div className="org-chart" style={{ backgroundColor: '#F1F1F1' }}>
        {userData.map((item, index) => (

          <div>
            {index !== 0 && <div id='line'></div>}
            <div key={index} className="node">

              <div className="details">
                <Avatar style={{ height: '2.8rem', width: '2.8rem', borderRadius: "3rem", marginLeft: '42%', marginBottom: '0.7rem', backgroundColor: "lightblue", color: "grey", borderStyle: 'solid' }}>{item.name.charAt(0).toUpperCase()}</Avatar>
                <div className='text'>
                  <p >Name: {capitalizeFirstLetter(item.name)}</p>
                  <p>Role: {item.role}</p>
                </div>
              </div>

            </div> </div>
        ))}
      </div>
    </div>
  );
}

export default OrganizationStructure;