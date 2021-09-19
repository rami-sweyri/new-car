import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createsFile, readOneFile } from '../../redux/actions/file';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import Layout from '../../components/Layout';
import ViewImage from '../../components/viewImage';
import { readIntro, deleteIntro, clearIntro } from '../../redux/actions/intro';
import Spinner from '../../components/Spinner';
// import { readServices } from "../../redux/actions/services";
export default function Services({ history }) {
  const dispatch = useDispatch();
  const introReducer = useSelector(state => state.introReducer);
  console.log({ introReducer });
  useEffect(() => {
    dispatch(readIntro());
  }, []);
  if (introReducer.loading) {
    return (
      <Layout>
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>{' '}
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div
          style={{ backgroundColor: '#F8F8F8' }}
          className='flex flex-col items-center w-full h-screen p-10 pb-20 transition-all '>
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
              </div>
            </div>
            <div
              onClick={() => history.push('/admin/intro/new')}
              style={{ backgroundColor: '#212121' }}
              className='px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg'>
              <div className='text-sm text-center text-white transition-all'>
                Add new intro
              </div>
            </div>
          </div>

          <table className='w-full border-collapse shadow-lg table-auto hover:shadow-lg '>
            <thead>
              <tr>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  #
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Name
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Label
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Description
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Image
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {introReducer.intros.map((intro, index) => (
                <tr className='flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0'>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      #
                    </span>
                    {index + 1}
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Name
                    </span>
                    {intro.name}
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Label
                    </span>
                    <span className='px-3 py-1 text-xs font-bold text-gray-500 rounded'>
                      {intro.label}
                    </span>
                  </td>

                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Description
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}>
                      {intro.description}
                    </span>
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Image
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}>
                      <div className='flex items-center justify-center w-full'>
                        <ViewImage id={intro.image} width='w-20' />
                      </div>
                    </span>
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Actions
                    </span>
                    <div className='flex items-center justify-evenly'>
                      <div
                        onClick={() => {
                          dispatch(clearIntro());
                          history.push(`/admin/intro/${intro._id}/edit`);
                        }}
                        className='text-blue-400 underline cursor-pointer hover:text-blue-600'>
                        <FaEdit size='1.8rem' />
                      </div>
                      <div
                        onClick={() => {
                          dispatch(clearIntro());
                          dispatch(deleteIntro(intro._id));
                        }}
                        className='text-red-500 underline cursor-pointer hover:text-red-500'>
                        <AiOutlineDelete size='1.8rem' />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
