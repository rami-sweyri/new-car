import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  updateIntro,
  readIntro,
  deleteIntro,
  clearIntro,
  readOneIntro,
  createsIntro,
} from '../../redux/actions/intro';
import axios from 'axios';
import { createsFile, readOneFile } from '../../redux/actions/file';
import _objO from '../../utils/_objO';
import _objI from '../../utils/_objI';
import Spinner from '../../components/Spinner';
export default function UserCrud({ history, match }) {
  const dispatch = useDispatch();
  const introReducer = useSelector(state => state.introReducer);
  const [errorValidation, setErrorValidation] = useState({});
  const [fileData, setFileData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    image: '',
    description: '',
  });
  const onChange = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = e => {
    const fileData = e.target.files[0];
    console.log(fileData);
    const data = new FormData();
    data.append('file', fileData);
    dispatch(createsFile(data))
      .then(result => {
        if (result.status === 201) {
          setFileData(result.data);
          setFormData({ ...formData, image: result.data.data._id });
        } else {
          alert('faild');
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  console.log({ fileData });
  useEffect(() => {
    if (match.params.id) {
      dispatch(readOneIntro(match.params.id))
        .then(res => {
          setFormData({ ...formData, ...res.data.data });
          console.log({ res: res.data.data });
        })
        .catch(err => {});
    }
  }, [match.params.id]);
  useEffect(() => {
    dispatch(readIntro());
  }, []);
  useEffect(() => {
    if (formData.image !== '') {
      dispatch(readOneFile(formData.image)).then(res => {
        if (res.status === 200) {
          setFileData(res.data);
        }
      });
    }
  }, [formData.image]);

  const onIntroSubmit = async e => {
    e.preventDefault();
    if (!match.params.id) {
      dispatch(
        createsIntro({
          name: formData.name,
          label: formData.label,
          description: formData.description,
          image: formData.image,
        })
      ).then(res => history.push(`/admin/intro`));
    } else if (match.params.id) {
      dispatch(
        updateIntro({
          _id: match.params.id,
          name: formData.name,
          label: formData.label,
          image: formData.image,
          description: formData.description,
        })
      ).then(res => history.push(`/admin/intro`));
    } else {
      console.log('error');
    }
  };
  if (introReducer.loading) {
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
              Mobile Intro
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Mobile Intro
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  New Intro
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className='p-8 bg-white border rounded shadow-md hover:shadow-lg sm:px-14 sm:py-16 '>
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

            <div className='my-5'>
              <input
                name='file'
                id='file'
                type='file'
                placeholder='file'
                onChange={e => {
                  onFileChange(e);
                }}
                className='hidden'
              />
              <div
                onClick={() => document.getElementById('file').click()}
                className='flex items-center justify-center w-full p-4 text-xl font-normal text-gray-400 border-2 border-dashed rounded-md shadow outline-none cursor-pointer h-36 focus:outline-none'>
                Click to upload an Image
              </div>
              <small className='text-red-600'></small>
            </div>
            <div className='flex items-center justify-center w-full'>
              <img
                src={fileData.data ? `/${fileData.data.path}` : ''}
                className='w-60 sm:w-72'
              />
            </div>
            <div className='flex items-center justify-center w-full'>
              <div
                // disabled={_objI(errorValidation)}
                onClick={e => onIntroSubmit(e)}
                style={{
                  backgroundColor: _objI(errorValidation) ? '#666' : '#212121',
                  borderColor: '#212121',
                }}
                className={` ${introReducer.loading ? `animate-pulse` : ``} 
               
                  w-full text-white py-3 px-4 text-center font-medium rounded-lg mt-16 cursor-pointer hover:bg-black `}>
                {introReducer.loading ? (
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
