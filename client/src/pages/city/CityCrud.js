import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  updateCity,
  readCities,
  deleteCity,
  clearCity,
  readOneCity,
  createsCity,
} from '../../redux/actions/city';
import { readBuildings } from '../../redux/actions/building';
import { IoIosClose } from 'react-icons/io';
import _objO from '../../utils/_objO';
import _objI from '../../utils/_objI';
import Spinner from '../../components/Spinner';
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const citiesReducer = useSelector(state => state.citiesReducer);
  const buildingsReducer = useSelector(state => state.buildingsReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    buildings: [],
  });
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSelectChange = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: [...formData.buildings, e.target.value],
    });
  };
  useEffect(() => {
    if (match.params.id) {
      dispatch(readOneCity(match.params.id))
        .then(res => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data.data });
        })
        .catch(err => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readCities());
  }, []);
  useEffect(() => {
    dispatch(readBuildings());
  }, []);

  const onUserSubmit = async e => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createsCity({
          name: formData.name,
          label: formData.label,
          buildings: formData.buildings,
        })
      ).then(res => history.push(`/admin/city`));
    } else if (match.params.id) {
      dispatch(
        updateCity({
          _id: match.params.id,
          name: formData.name,
          label: formData.label,
          buildings: formData.buildings,
        })
      ).then(res => history.push(`/admin/city`));
    } else {
      console.log('error');
    }
  };
  useEffect(() => {}, [formData.buildings]);
  const deleteBuilding = e =>
    setFormData(
      {
        ...formData,
        buildings: formData.buildings.filter(building => building !== e),
      },
      formData.buildings
    );
  if (citiesReducer.loading || buildingsReducer.loading) {
    return (
      <Layout>
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>{' '}
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
              Cities
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Cities
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  New city
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
              <select
                name='buildings'
                type='text'
                placeholder='buildings'
                onChange={e => {
                  onSelectChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'>
                <option>Select a buildings </option>
                {buildingsReducer.buildings.map((building, index) => {
                  if (
                    formData.buildings.find(
                      item => item.toString() === building._id.toString()
                    )
                  )
                    return null;
                  else
                    return (
                      <option key={index} value={building._id}>
                        {building.label}
                      </option>
                    );
                })}
              </select>
              <div className='flex flex-wrap w-full my-8 bg-gray-100 rounded flex-between '>
                {formData.buildings.map(building =>
                  buildingsReducer.buildings.find(
                    item => building === item._id
                  ) ? (
                    <div className='flex items-center justify-between px-2 py-2 mx-2 my-2 text-white bg-black rounded-lg min-w-96 bg-opacity-60 '>
                      <div className='mr-6'>
                        {
                          buildingsReducer.buildings.find(
                            item => building === item._id
                          ).label
                        }
                      </div>
                      <div onClick={e => deleteBuilding(building)}>
                        <IoIosClose
                          className='text-white cursor-pointer '
                          size='1.4em'
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )
                )}
              </div>
            </div>
            <div className='flex items-center justify-center w-full'>
              <div
                // disabled={_objI(errorValidation)}
                onClick={e => onUserSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? '#666' : '#212121',
                  borderColor: '#212121',
                }}
                className={` ${citiesReducer.loading ? `animate-pulse` : ``} 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}>
                {citiesReducer.loading ? (
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
