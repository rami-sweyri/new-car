import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Test = () => {
  const [state, setState] = useState([]);

  const [formData, setFormData] = useState({
    color: '',
    model: '',
    parkingNumber: '',
  });
  // rest api
  // create delete update get
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/cars/all', {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhkZTBjZDg2MzI5ODI4ODgxOTg0MDYiLCJpYXQiOjE2MjA3MzM0MTYsImV4cCI6MTYyNjI2MzAxNn0.83zXHar-yvNZEzbe7JgMEqcDLnWBI0sp282uKN4IDQs',
        },
      })
      .then(result => {
        console.log({ result });
        setState(result.data.data);
      })
      .catch(err => {
        console.log({ err });
      });
    return () => {};
  }, []);

  console.log({ state, formData });
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <p style={{ fontSize: 18, color: '#ddd', marginBottom: 15 }}>
          Wlecome to pla pla
        </p>
        <h1 style={{ fontSize: 22, color: 'green', fontWeight: 'bold' }}>
          sdsad
        </h1>
      </div>
      <div className='flex flex-col w-full p-6'>
        {state.length > 0 ? (
          state.map(st => (
            <p className='px-6 py-3 font-mono text-2xl font-semibold text-gray-800 border'>
              {st.model}
            </p>
          ))
        ) : (
          <p>Loading ...</p>
        )}
      </div>
      <div className='flex flex-col m-10'>
        <input
          className='px-3 py-3 my-1 border rounded shadow outline-none appearance-none focus:bg-gray-200'
          placeholder='Color'
          name='color'
          value={formData.color}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />{' '}
        <input
          className='px-3 py-3 my-1 border rounded shadow outline-none appearance-none focus:bg-gray-200'
          placeholder='Model'
          name='model'
          value={formData.model}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          className='px-3 py-3 my-1 border rounded shadow outline-none appearance-none focus:bg-gray-200'
          placeholder='Parking Number'
          name='parkingNumber'
          value={formData.parkingNumber}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button
          className='p-3 my-1 text-white bg-blue-600 border rounded shadow hover:bg-blue-700'
          onClick={e => {
            axios
              .post('http://localhost:4000/api/cars/', formData, {
                headers: {
                  'x-access-token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhkZTBjZDg2MzI5ODI4ODgxOTg0MDYiLCJpYXQiOjE2MjA3MzM0MTYsImV4cCI6MTYyNjI2MzAxNn0.83zXHar-yvNZEzbe7JgMEqcDLnWBI0sp282uKN4IDQs',
                },
              })
              .then(result => {
                console.log({ result });
                setState([...state, result.data.data]);
              })
              .catch(err => {
                console.log({ err });
              });
          }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Test;
