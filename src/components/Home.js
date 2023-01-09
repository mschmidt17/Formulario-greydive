import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";



function Home() {

  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get("data.json")
    setData(response.data.items)
  } 

  useEffect(()=>{
    getData()
  },[])
  
  var i = 0;
  const [input, setInput] = useState({ 
    full_name: "",
    email: "",
    birth_date:"",
    country_of_origin: "",
    terms_and_conditions: false
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); 
  };

  function handleCheckbox(e) {
    setInput({
      ...input,
      [e.target.name]: !e.target.checked,
    }); 
  };

  function handleSelect(e) {
    setInput({
    ...input,
    country_of_origin: input.country_of_origin.includes(e.target.value)
        ? input.country_of_origin
        : [...input.country_of_origin, e.target.value],
    });
  };

    
    return (
        <div className='home-container'>
            <h1> FORMULARIO </h1>
            <form className='card-container'>
              {
                data.length > 0 ?
                data.map((e) => { 
                  return(
                    <div className="item" key={i++}>
                        {
                          e.type === "select" ? 
                          <div>
                            <label className="label"> {e.label} </label>
                            <select className="inputCreate" defaultValue="Select" onChange={(e) => handleSelect(e)}>
                              <option disabled>Select</option>
                                {e.options?.map((e) => (<option className="select" value={e.value} key={e.label}> {e.label} </option>))}
                            </select>
                          </div>
                          :
                            e.type === "submit" ? 
                              <button onClick={() => console.log(input)}>{e.label}</button>
                            :
                              e.type === "checkbox" ?
                                <div>
                                  <label className="label"> {e.label} </label>
                                  <input
                                      className="inputCreate"
                                      type={e.type}
                                      name={e.name}
                                      required={e.required}
                                      checked={input.name}
                                      onChange={(e) => handleCheckbox(e)}
                                  />
                                </div> 
                              :
                                <div>
                                  <label className="label"> {e.label} </label>
                                  <input
                                      className="inputCreate"
                                      type={e.type}
                                      name={e.name}
                                      value={input.name}
                                      required={e.required}
                                      placeholder={e.label}
                                      onChange={(e) => handleChange(e)}
                                  />
                                </div>   
                        }
                    </div>
                  )  
                })
                :
                <p> Error 404 Not Found </p>
              }
            </form>
        </div>
  );
}

export default Home;