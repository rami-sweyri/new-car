import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  updateBuilding,
  readBuildings,
  deleteBuilding,
  clearBuilding,
  readOneBuilding,
  createsBuilding,
} from '../../redux/actions/building';

import _objO from '../../utils/_objO';
import _objI from '../../utils/_objI';
import Spinner from '../../components/Spinner';
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const buildingsReducer = useSelector(state => state.buildingsReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    description: '',
  });
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (match.params.id) {
      dispatch(readOneBuilding(match.params.id))
        .then(res => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data.data });
        })
        .catch(err => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readBuildings());
  }, []);

  const onUserSubmit = async e => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createsBuilding({
          name: formData.name,
          label: formData.label,
          description: formData.description,
        })
      ).then(res => history.push(`/admin/buildings`));
    } else if (match.params.id) {
      dispatch(
        updateBuilding({
          _id: match.params.id,
          name: formData.name,
          label: formData.label,
          description: formData.description,
        })
      ).then(res => history.push(`/admin/buildings`));
    } else {
      console.log('error');
    }
  };
  if (buildingsReducer.loading) {
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
              Buildings
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Buildings
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  New building
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
                name='description'
                value={formData.description}
                type='text'
                placeholder={'Description'}
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'></small>
            </div>

            <div className='flex items-center justify-center w-full'>
              <div
                // disabled={_objI(errorValidation)}
                onClick={e => onUserSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? '#666' : '#212121',
                  borderColor: '#212121',
                }}
                className={` ${buildingsReducer.loading ? `animate-pulse` : ``} 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}>
                {buildingsReducer.loading ? (
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
