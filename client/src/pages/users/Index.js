import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai';
import Layout from '../../components/Layout';
import { readUsers, deleteUser, clearUser } from '../../redux/actions/user';
import { readServices } from '../../redux/actions/services';
import { readRoles } from '../../redux/actions/roles';
import { readCars } from '../../redux/actions/cars';
import _objI from '../../utils/_objI';
import ImageViewer from '../../components/viewImage';
import Spinner from '../../components/Spinner';
export default function Users({ history }) {
  const dispatch = useDispatch();
  const [model, setModel] = useState({});
  const carsReducer = useSelector(state => state.carsReducer);
  const userReducer = useSelector(state => state.userReducer);
  const rolesReducer = useSelector(state => state.rolesReducer);

  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    email: { $in: '' },
    status: { $in: '' },
  });

  const [queryString, setQueryString] = useState({
    page: page,
    limit: limit,
    query: {},
  });
  useEffect(() => {
    dispatch(readRoles());
    dispatch(readCars());
  }, []);
  useEffect(() => {
    dispatch(readUsers(queryString));
  }, [queryString]);

  if (userReducer.loading) {
    return (
      <Layout>
        <div className='flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        {_objI(model) && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-gray-300 bg-opacity-30'>
            <div className='relative z-50 w-6/12 p-6 bg-white border rounded shadow'>
              <span onClick={() => setModel({})}>
                <AiOutlineCloseCircle className='absolute text-2xl text-red-600 cursor-pointer top-3 right-3 hover:text-red-700' />
              </span>
              <span className='flex flex-wrap w-full'>
                {Object.entries(model).map(([key, value]) => {
                  if (
                    key !== 'trash' &&
                    key !== 'createdAt' &&
                    key !== 'updatedAt' &&
                    key !== '_id' &&
                    key !== 'createdBy' &&
                    key !== '__v'
                  ) {
                    return (
                      <div className='flex w-full py-1'>
                        <span className='mr-3 text-sm font-semibold'>
                          {key}:
                        </span>
                        <span>
                          {typeof value === 'object' && value !== null ? (
                            value.name
                          ) : key === 'image' ? (
                            <ImageViewer id={value} />
                          ) : (
                            value
                          )}
                        </span>
                      </div>
                    );
                  }
                })}
              </span>
            </div>
          </div>
        )}
        <div
          style={{ backgroundColor: '#F8F8F8' }}
          className='flex flex-col items-center w-full h-screen p-10 pb-20 transition-all'>
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
              </div>
            </div>
            <div
              onClick={() => history.push('/admin/users/new')}
              style={{ backgroundColor: '#212121' }}
              className='px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg'>
              <div className='text-sm text-center text-white transition-all'>
                Add new user
              </div>
            </div>
          </div>

          <div className='flex justify-start w-full'>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              <p> Email:</p>
              <input
                value={query.email.$in}
                name='$in'
                className='w-20 p-2 py-1 ml-2 border border-r-0 rounded rounded-r-none shadow'
                onChange={e => {
                  setQuery({
                    ...query,
                    email: {
                      $in: e.target.value,
                    },
                  });
                }}
              />{' '}
              <div
                className='p-2 py-1 text-xs border border-l-0 rounded rounded-l-none shadow cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  let newQuery = JSON.parse(JSON.stringify(query));
                  newQuery.email.$in.length === 0 && delete newQuery.email;
                  newQuery.status.$in.length === 0 && delete newQuery.status;
                  setQueryString({ ...queryString, query: newQuery });
                }}>
                Search
              </div>
            </div>

            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              <p> Status:</p>

              <select
                value={query.status.$in}
                name='$in'
                className='w-20 p-2 py-1 ml-2 border border-r-0 rounded rounded-r-none shadow'
                onChange={e => {
                  setQuery({
                    ...query,
                    status: {
                      $in: e.target.value,
                    },
                  });
                }}>
                <option value='active'>Active</option>
                <option value='pending'>Pending</option>
                <option value='rejected'>Rejected</option>
              </select>
              <div
                className='p-2 py-1 text-xs border border-l-0 rounded rounded-l-none shadow cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  let newQuery = JSON.parse(JSON.stringify(query));
                  newQuery.email.$in.length === 0 && delete newQuery.email;
                  newQuery.status.$in.length === 0 && delete newQuery.status;
                  setQueryString({ ...queryString, query: newQuery });
                }}>
                Search
              </div>
            </div>
          </div>
          <div className='flex justify-start w-full'>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Total Count: {userReducer.pagination.totalCount}
            </div>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Total Pages: {userReducer.pagination.totalPages}
            </div>

            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Current Page: {userReducer.pagination.current}
            </div>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Count: {userReducer.pagination.count}
            </div>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              <p> Limit:</p>
              <input
                value={limit}
                type='number'
                name='limit'
                className='w-20 p-2 py-1 ml-2 border border-r-0 rounded rounded-r-none shadow'
                onChange={e => setLimit(Number(e.target.value))}
              />{' '}
              <div
                className='p-2 py-1 text-xs border border-l-0 rounded rounded-l-none shadow cursor-pointer hover:bg-gray-100'
                onClick={() =>
                  setQueryString({ ...queryString, limit: limit })
                }>
                Submit
              </div>
              <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
                <p> Go To:</p>
                <input
                  value={page}
                  type='number'
                  name='page'
                  className='w-20 p-2 py-1 ml-2 border border-r-0 rounded rounded-r-none shadow'
                  onChange={e =>
                    e.target.value > 0 &&
                    e.target.value <= userReducer.pagination.totalPages &&
                    setPage(Number(e.target.value))
                  }
                />{' '}
                <div
                  className='p-2 py-1 text-xs border border-l-0 rounded rounded-l-none shadow cursor-pointer hover:bg-gray-100'
                  onClick={() =>
                    setQueryString({ ...queryString, page: page })
                  }>
                  Submit
                </div>
              </div>
            </div>
          </div>

          {userReducer.users.length > 0 ? (
            <table className='w-full mb-6 border-collapse shadow-lg table-auto hover:shadow-lg'>
              <thead>
                <tr>
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    #
                  </th>
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    Email
                  </th>
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    Phone
                  </th>
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    Role
                  </th>
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    Cars
                  </th>
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    Status
                  </th>{' '}
                  <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                    Actions
                  </th>
                </tr>
              </thead>
              {userReducer.users.map((user, index) => (
                <tbody>
                  <tr className='flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0'>
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        #
                      </span>
                      {index + 1}
                    </td>
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        Email
                      </span>
                      {user.email || (
                        <span className='text-xs text-gray-600'>Empty</span>
                      )}
                    </td>
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        Phone
                      </span>
                      {user.phone || (
                        <span className='text-xs text-gray-600'>Empty</span>
                      )}
                    </td>
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        Role
                      </span>
                      <p className='px-3 py-1 text-xs font-bold text-gray-500 rounded'>
                        {rolesReducer.roles.map(role =>
                          user.roles.find(userRole => userRole === role._id) ? (
                            <span>{role.name}</span>
                          ) : (
                            ''
                          )
                        )}
                      </p>
                    </td>{' '}
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        Cars
                      </span>
                      {carsReducer.cars.map(car =>
                        car.createdBy === user._id ? (
                          <p
                            className='px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer'
                            onClick={() => setModel(car)}>
                            {car.model}
                          </p>
                        ) : (
                          ''
                        )
                      )}
                    </td>
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        Status
                      </span>
                      <span
                        className={`rounded ${
                          user.status === 'active'
                            ? `bg-green-600 hover:bg-green-700`
                            : `bg-red-600 hover:bg-red-700`
                        } py-1 px-3 text-xs font-semibold text-white`}>
                        {user.status}
                      </span>
                    </td>
                    <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                      <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                        Actions
                      </span>
                      <div className='flex items-center justify-evenly'>
                        <div
                          onClick={() => {
                            dispatch(clearUser());
                            history.push(`/admin/users/${user.id}/edit`);
                          }}
                          className='text-blue-400 underline cursor-pointer hover:text-blue-600'>
                          <FaEdit size='1.8rem' />
                        </div>
                        <div
                          onClick={() => {
                            dispatch(clearUser());
                            dispatch(deleteUser(user.id));
                            dispatch(readUsers());
                          }}
                          className='text-red-500 underline cursor-pointer hover:text-red-500'>
                          <AiOutlineDelete size='1.8rem' />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}{' '}
            </table>
          ) : (
            <p className='flex flex-row flex-wrap items-center justify-center p-6 mb-10 text-xl text-red-600'>
              There is no result
            </p>
          )}

          <div className='flex justify-between w-full py-6'>
            <div className='flex items-center justify-start'>
              {userReducer.pagination.previous !== 1 &&
                userReducer.pagination.current !== 1 && (
                  <div
                    className='p-2 px-3 mr-6 text-xs text-gray-700 bg-white border rounded shadow cursor-pointer hover:bg-gray-100'
                    onClick={() =>
                      setQueryString({
                        ...queryString,
                        page: 1,
                      })
                    }>
                    1
                  </div>
                )}

              {userReducer.pagination.previous && (
                <div
                  className='p-2 px-3 mr-2 text-xs text-gray-700 bg-white border rounded shadow cursor-pointer hover:bg-gray-100'
                  onClick={() =>
                    setQueryString({
                      ...queryString,
                      page: userReducer.pagination.previous,
                    })
                  }>
                  {userReducer.pagination.previous}
                </div>
              )}
              <div
                className='p-2 px-3 mr-2 text-xs font-bold text-gray-700 bg-white border rounded shadow cursor-pointer hover:bg-gray-100'
                onClick={() =>
                  setQueryString({
                    ...queryString,
                    page: userReducer.pagination.current,
                  })
                }>
                {userReducer.pagination.current}
              </div>
              {userReducer.pagination.next && (
                <div
                  className='p-2 px-3 mr-2 text-xs text-gray-700 bg-white border rounded shadow cursor-pointer hover:bg-gray-100'
                  onClick={() =>
                    setQueryString({
                      ...queryString,
                      page: userReducer.pagination.next,
                    })
                  }>
                  {userReducer.pagination.next}
                </div>
              )}

              {userReducer.pagination.totalPages !==
                userReducer.pagination.next &&
                userReducer.pagination.totalPages !==
                  userReducer.pagination.current && (
                  <div
                    className='p-2 px-3 mx-6 text-xs text-gray-700 bg-white border rounded shadow cursor-pointer hover:bg-gray-100'
                    onClick={() =>
                      setQueryString({
                        ...queryString,
                        page: userReducer.pagination.totalPages,
                      })
                    }>
                    {userReducer.pagination.totalPages}
                  </div>
                )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
