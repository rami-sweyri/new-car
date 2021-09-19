import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  readUsers,
  readOneUser,
  updateUser,
  createUser,
} from '../../redux/actions/user';
import { readRoles } from '../../redux/actions/roles';
import _objO from '../../utils/_objO';
import _objI from '../../utils/_objI';
import Spinner from '../../components/Spinner';
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer);
  const rolesReducer = useSelector(state => state.rolesReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    roles: [],
  });
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (match.params.id) {
      dispatch(readOneUser(match.params.id))
        .then(res => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data });
        })
        .catch(err => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readRoles());
  }, []);
  useEffect(() => {
    setErrorValidation({});
  }, []);

  console.log({ userReducer });
  const onUserSubmit = async e => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email.toLowerCase(),
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation,
          roles: formData.roles,
        })
      ).then(res => {
        history.push(`/admin/users`);
      });
    } else if (match.params.id) {
      formData.password.length > 0
        ? dispatch(
            updateUser({
              _id: formData._id,
              firstName: formData.firstName,
              lastName: formData.lastName,
              password: formData.password,
              passwordConfirmation: formData.passwordConfirmation,
              email: formData.email,
              roles: formData.roles,
            })
          ).then(res => history.push(`/admin/users`))
        : dispatch(
            updateUser({
              _id: formData._id,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              roles: formData.roles,
            })
          ).then(res => history.push(`/admin/users`));
    } else {
      alert('error');
    }
  };
  if (userReducer.loading || rolesReducer.loading) {
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
          className='w-full h-screen p-10 transition-all '>
          <div className='flex flex-wrap items-center justify-between w-full transition-all select-none'>
            <div className='flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all '>
              Users
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Users
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  New User
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className='py-16 bg-white border rounded shadow-md hover:shadow-lg px-14 '>
            <div className='my-5'>
              <input
                placeholder={'First Name'}
                value={formData.firstName}
                type='text'
                name='firstName'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'>
                {/* {errorValidation && errorValidation.userName} */}
              </small>
            </div>
            <div className='my-5'>
              <input
                placeholder={'Last Name'}
                value={formData.lastName}
                type='text'
                name='lastName'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'>
                {/* {errorValidation && errorValidation.userName} */}
              </small>
            </div>
            <div className='my-5'>
              <input
                name='email'
                value={formData.email}
                type='email'
                placeholder={'Email'}
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'>
                {errorValidation && errorValidation.email}
              </small>
            </div>
            <div className='my-5'>
              <input
                type='password'
                name='password'
                value={formData.password}
                placeholder='Password'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'>
                {errorValidation && errorValidation.password}
              </small>
            </div>
            <div className='my-5'>
              <input
                type='password'
                name='passwordConfirmation'
                value={formData.passwordConfirmation}
                placeholder='Confirm Password'
                onChange={e => {
                  onChange(e);
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'
              />
              <small className='text-red-600'>
                {errorValidation && errorValidation.passwordConfirmation}
              </small>
            </div>
            <div className='my-5'>
              <select
                value={formData.roles[0]}
                name='roles'
                placeholder='Confirm Password'
                onChange={e => {
                  setFormData({ ...formData, roles: [e.target.value] });
                }}
                className='w-full p-4 font-normal text-gray-600 border rounded-md shadow outline-none focus:outline-none'>
                <option>Select a roles </option>
                {rolesReducer.roles.map(roles => (
                  <option key={roles._id} value={roles._id}>
                    {roles.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center justify-center w-full'>
              <div
                // disabled={_objI(errorValidation)}
                onClick={e => onUserSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? '#666' : '#212121',
                  borderColor: '#212121',
                }}
                className={` ${userReducer.loading ? `animate-pulse` : ``} 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}>
                {userReducer.loading ? (
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
