import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  updatePlan,
  readPlans,
  deletePlan,
  clearPlan,
  readOnePlan,
  createsPlan,
} from '../../redux/actions/plans';

import _objO from '../../utils/_objO';
import _objI from '../../utils/_objI';
import { readServices } from '../../redux/actions/services';
import { RiCloseCircleFill } from 'react-icons/ri';
import Spinner from '../../components/Spinner';
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const plansReducer = useSelector(state => state.plansReducer);
  const servicesReducer = useSelector(state => state.servicesReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    price: '',
    note: '',
    period: '',
    services: [],
  });

  const [serviceData, setServiceData] = useState({
    count: '',
    service: '',
  });
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(readOnePlan(match.params.id))
        .then(res => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data });
        })
        .catch(err => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readPlans());
    dispatch(readServices());
  }, []);
  //   useEffect(() => {
  //     setErrorValidation({});
  //   }, []);
  //   useEffect(() => {
  //     if (!match.params.id || formData.password.length > 0) {
  //       validator(
  //         creteSchema,
  //         {
  //           userName: formData.userName,
  //           email: formData.email,
  //           password: formData.password,
  //           passwordConfirmation: formData.passwordConfirmation,
  //         },
  //         setErrorValidation
  //       );
  //     } else if (match.params.id) {
  //       validator(
  //         editSchema,
  //         {
  //           // userName: formData.userName,
  //           email: formData.email,
  //         },
  //         setErrorValidation
  //       );
  //     }
  //   }, [formData, match.params.id]);
  console.log({ formData });
  const onUserSubmit = async e => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createsPlan({
          name: formData.name,
          label: formData.label,
          price: formData.price,
          note: formData.note,
          services: formData.services,
          period: formData.period,
        })
      ).then(res => history.push(`/admin/plans`));
    } else if (match.params.id) {
      dispatch(
        updatePlan({
          _id: match.params.id,
          name: formData.name,
          label: formData.label,
          price: formData.price,
          note: formData.note,
          services: formData.services,
          period: formData.period,
        })
      ).then(res => history.push(`/admin/plans`));
    } else {
      console.log('error');
    }
  };
  if (plansReducer.loading) {
    return (
      <Layout>
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout parentClassName={' '}>
        <div
          style={{ backgroundColor: '#F8F8F8' }}
          className='w-full h-full p-10 transition-all'>
          <div className='flex flex-wrap items-center justify-between w-full transition-all select-none'>
            <div className='flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all '>
              Plans
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Plans
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  New Plan
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className='py-16 bg-white border rounded shadow-md hover:shadow-lg px-14 '>
            <div className='my-5'>
              <input
                placeholder={'Name'}
                value={formData.name}
                type='text'
                name='name'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'></small>
            </div>
            <div className='my-5'>
              <input
                name='label'
                value={formData.label}
                type='email'
                placeholder={'Label'}
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'></small>
            </div>
            <div className='my-5'>
              <input
                type='text'
                name='price'
                value={formData.price}
                placeholder='Price'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'></small>
            </div>
            <div className='my-5'>
              <input
                type='text'
                name='period'
                value={formData.period}
                placeholder='Period'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'></small>
            </div>

            <div className='flex my-5'>
              {/* <select
                name="service"
                value={serviceData.service}
                placeholder="Service"
                onChange={(e) => {
                  setServiceData({ ...serviceData, service: e.target.value });
                }}
                className="w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none"
              >
                {servicesReducer.services.map((service) => (
                  <option value={service._id}>{service.name}</option>
                ))}
              </select> */}
              <input
                type='text'
                name='note'
                value={formData.note}
                placeholder='Note'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'></small>
            </div>

            <div className='flex flex-wrap justify-between my-5'>
              <div className='flex flex-grow my-1 '>
                <select
                  name='service'
                  value={serviceData.service}
                  placeholder='Service'
                  onChange={e => {
                    setServiceData({ ...serviceData, service: e.target.value });
                  }}
                  className='w-full p-4 mr-1 font-normal text-gray-600 border rounded-md shadow outline-none sm:w-6/12 focus:outline-none'>
                  <option value=''>Select Service</option>
                  {servicesReducer.services.map(service => (
                    <option value={service._id}>{service.name}</option>
                  ))}
                </select>
                <input
                  type='number'
                  name='count'
                  value={serviceData.count}
                  placeholder='Count'
                  onChange={e => {
                    setServiceData({ ...serviceData, count: e.target.value });
                  }}
                  className='w-full p-4 ml-1 font-normal text-center text-gray-600 border rounded-md shadow outline-none sm:w-6/12 md:mr-2 focus:outline-none sm:text-left'
                />
              </div>
              <div
                onClick={e =>
                  setFormData({
                    ...formData,
                    services: [...formData.services, serviceData],
                  })
                }
                className={`w-full flex items-center justify-center md:w-5/12 text-white py-3 px-4 text-center font-medium rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 my-1`}>
                Add
              </div>
            </div>
            <div className='flex flex-wrap w-full'>
              {formData.services.map(service => (
                <div className='relative px-3 py-3 pr-6 my-2 mr-2 text-xs text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600'>
                  <span className='mx-2'>
                    name:
                    {servicesReducer.services.find(
                      serv => serv._id === service.service
                    )
                      ? servicesReducer.services.find(
                          serv => serv._id === service.service
                        ).name
                      : ''}{' '}
                  </span>
                  <span className='mx-2'>count: {service.count}</span>
                  <div
                    className='absolute text-xl top-1 right-1'
                    onClick={() =>
                      setFormData({
                        ...formData,
                        services: formData.services.filter(
                          serv => serv.service !== service.service
                        ),
                      })
                    }>
                    <RiCloseCircleFill className='text-white' />
                  </div>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-center w-full'>
              <div
                // disabled={_objI(errorValidation)}
                onClick={e => onUserSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? '#666' : '#212121',
                  borderColor: '#212121',
                }}
                className={` ${plansReducer.loading ? `animate-pulse` : ``} 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}>
                {plansReducer.loading ? (
                  <svg
                    className='absolute w-5 h-5 mr-3 border-r-2 border-white rounded-full animate-spin left-3'
                    viewBox='0 0 24 24'></svg>
                ) : (
                  ''
                )}
                Save
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
