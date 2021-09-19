import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updatePermission,
  readPermissions,
  readOnePermission,
  createPermission,
} from '../../redux/actions/permissions';

import _objI from '../../utils/_objI';
import Spinner from '../../components/Spinner';
export default function PermissionCrud({ history, match }) {
  const dispatch = useDispatch();
  const permissionsReducer = useSelector(state => state.permissionsReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    label: '',
  });
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(readOnePermission(match.params.id))
        .then(res => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data });
        })
        .catch(err => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readPermissions());
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

  const onUserSubmit = async e => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createPermission({
          name: formData.name,
          label: formData.label,
        })
      ).then(res => history.push(`/admin/permissions`));
    } else if (match.params.id) {
      dispatch(
        updatePermission({
          _id: match.params.id,
          name: formData.name,
          label: formData.label,
        })
      ).then(res => history.push(`/admin/permissions`));
    } else {
      console.log('error');
    }
  };
  if (permissionsReducer.loading) {
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
              Services
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Services
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  New service
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

            <div className='flex items-center justify-center w-full'>
              <div
                // disabled={_objI(errorValidation)}
                onClick={e => onUserSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? '#666' : '#212121',
                  borderColor: '#212121',
                }}
                className={` ${
                  permissionsReducer.loading ? `animate-pulse` : ``
                } 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}>
                {permissionsReducer.loading ? (
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
