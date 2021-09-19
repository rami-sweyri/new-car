import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Layout from '../../components/Layout';
import { readScheduledWashes } from '../../redux/actions/scheduledWashes';
import { readCities } from '../../redux/actions/city';
import { readCars } from '../../redux/actions/cars';
import { readAllUsers } from '../../redux/actions/user';
import { readBuildings } from '../../redux/actions/building';
import { readServices } from '../../redux/actions/services';
import Spinner from '../../components/Spinner';
import PopOver from '../../components/PopOver';
import _objI from '../../utils/_objI';
import ImageViewer from '../../components/viewImage';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Services({ history }) {
  let days = [
    { name: 'Sa', number: 6 },
    { name: 'Su', number: 0 },
    { name: 'Mo', number: 1 },
    { name: 'Tu', number: 2 },
    { name: 'We', number: 3 },
    { name: 'Th', number: 4 },
    { name: 'Fr', number: 5 },
  ];
  let currentDay = new Date().getDay();

  const dispatch = useDispatch();
  const scheduledWashesReducer = useSelector(
    state => state.scheduledWashesReducer
  );
  const [model, setModel] = useState({});
  const servicesReducer = useSelector(state => state.servicesReducer);
  const citiesReducer = useSelector(state => state.citiesReducer);
  const buildingsReducer = useSelector(state => state.buildingsReducer);
  const userReducer = useSelector(state => state.userReducer);
  const carsReducer = useSelector(state => state.carsReducer);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date('2014/02/08'));
  const [endDate, setEndDate] = useState(new Date('2014/02/10'));

  const [query, setQuery] = useState({
    date: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    },
    'cars.services.status': { $in: 'all' },
    'cars.carId.city': 'all',
  });

  const [queryString, setQueryString] = useState({
    page: page,
    limit: limit,
    query: {
      date: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    },
  });
  useEffect(() => {
    dispatch(readServices());
    dispatch(readCities());
    dispatch(readBuildings());
    dispatch(readAllUsers());
    dispatch(readCars());
  }, []);
  useEffect(() => {
    // let newQuery = JSON.parse(JSON.stringify(queryString.query));
    // newQuery['cars.services.status'].$in === 'all' &&
    //   delete newQuery['cars.services.status'];
    // newQuery['cars.carId.city'].$in === 'all' &&
    //   delete newQuery['cars.carId.city'];

    dispatch(readScheduledWashes({ ...queryString }));
  }, [queryString]);

  // const [query, setQuery] = useState({
  //   service: 'all',
  //   city: 'all',
  //   building: 'all',
  //   status: 'all',
  // });
  console.log({ model, query });
  if (
    scheduledWashesReducer.loading ||
    servicesReducer.loading ||
    citiesReducer.loading ||
    buildingsReducer.loading ||
    carsReducer.loading ||
    userReducer.loading
  ) {
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
          <div
            style={{ zIndex: 1001 }}
            className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60'>
            <div className='relative z-50 w-6/12 p-6 border rounded shadow bg-gray-50'>
              <span onClick={() => setModel({})}>
                <AiOutlineCloseCircle className='absolute text-2xl text-red-600 cursor-pointer top-3 right-3 hover:text-red-700' />
              </span>
              <span className='flex flex-wrap w-full'>
                {Array.isArray(model)
                  ? JSON.stringify(model)
                  : Object.entries(model).map(([key, value]) => {
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
          className='flex flex-col items-center w-full h-screen p-10 pb-20 overflow-y-scroll transition-all'>
          <div className='flex flex-wrap items-center justify-between w-full transition-all select-none'>
            <div className='flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all '>
              Scheduled Washes
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Scheduled Washes
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-start w-full'>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              <p> Date:</p>

              <DatePicker
                className='w-20 p-2 py-1 ml-2 border rounded shadow'
                selected={query.date.$gte}
                onChange={date =>
                  setQuery({
                    ...query,
                    date: { ...query.date, $gte: startOfDay(date) },
                  })
                }
                selectsStart
                startDate={query.date.$gte}
                endDate={query.date.$lte}
              />
              <DatePicker
                className='w-20 p-2 py-1 ml-2 border rounded shadow'
                selected={query.date.$lte}
                onChange={date =>
                  setQuery({
                    ...query,
                    date: { ...query.date, $lte: endOfDay(date) },
                  })
                }
                selectsEnd
                startDate={query.date.$gte}
                endDate={query.date.$lte}
                minDate={query.date.$gte}
              />
              <div
                className='p-2 py-1 ml-2 text-xs border rounded shadow cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  let newQuery = JSON.parse(JSON.stringify(query));
                  newQuery['cars.services.status'].$in === 'all' &&
                    delete newQuery['cars.services.status'];
                  newQuery['cars.carId.city'].includes('all') &&
                    delete newQuery['cars.carId.city'];
                  setQueryString({ ...queryString, query: newQuery });
                }}>
                Search
              </div>
            </div>

            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              <p> City:</p>

              <select
                value={query['cars.carId.city']}
                name='$in'
                className='w-24 p-2 py-1 ml-2 border border-r-0 rounded rounded-r-none shadow'
                onChange={e => {
                  setQuery({
                    ...query,
                    'cars.carId.city': e.target.value,
                  });
                }}>
                <option value='all'>All</option>
                {citiesReducer.cities.map(city => (
                  <option key={city._id} value={city._id}>
                    {city.label}
                  </option>
                ))}
              </select>

              <div
                className='p-2 py-1 text-xs border border-l-0 rounded rounded-l-none shadow cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  let newQuery = JSON.parse(JSON.stringify(query));
                  newQuery['cars.services.status'].$in === 'all' &&
                    delete newQuery['cars.services.status'];
                  newQuery['cars.carId.city'].includes('all') &&
                    delete newQuery['cars.carId.city'];
                  setQueryString({ ...queryString, query: newQuery });
                }}>
                Search
              </div>
            </div>

            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              <p> Status:</p>

              <select
                value={query['cars.services.status'].$in}
                name='$in'
                className='w-24 p-2 py-1 ml-2 border border-r-0 rounded rounded-r-none shadow'
                onChange={e => {
                  setQuery({
                    ...query,
                    'cars.services.status': {
                      $in: e.target.value,
                    },
                  });
                }}>
                <option value='all'>All</option>
                <option value='accepted'>Accepted</option>
                <option value='pending'>Pending</option>
                <option value='rejected'>Rejected</option>{' '}
                <option value='completed'>Completed</option>
                <option value='progress'>Progress</option>
                <option value='notFound'>Not Found</option>
              </select>

              <div
                className='p-2 py-1 text-xs border border-l-0 rounded rounded-l-none shadow cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  let newQuery = JSON.parse(JSON.stringify(query));
                  newQuery['cars.services.status'].$in === 'all' &&
                    delete newQuery['cars.services.status'];
                  newQuery['cars.carId.city'].$in.includes('all') &&
                    delete newQuery['cars.carId.city'];
                  setQueryString({ ...queryString, query: newQuery });
                }}>
                Search
              </div>
            </div>
          </div>
          <div className='flex justify-start w-full'>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Total Count: {scheduledWashesReducer.pagination.totalCount}
            </div>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Total Pages: {scheduledWashesReducer.pagination.totalPages}
            </div>

            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Current Page: {scheduledWashesReducer.pagination.current}
            </div>
            <div className='flex items-center p-2 px-3 text-xs text-gray-700'>
              Count: {scheduledWashesReducer.pagination.count}
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
                    e.target.value <=
                      scheduledWashesReducer.pagination.totalPages &&
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

          <table className='w-full border-collapse shadow-lg table-auto hover:shadow-lg '>
            <thead>
              <tr>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  #
                </th>

                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Cars
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  User
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Date & Time
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Day
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduledWashesReducer.scheduledWashes.map(
                (scheduledWash, index) => {
                  return (
                    <tr
                      className='flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0'
                      key={scheduledWash._id}>
                      <td className='relative block w-full p-3 text-center text-gray-700 border border-b lg:w-auto lg:table-cell lg:static '>
                        <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                          #
                        </span>

                        <div>{index + 1}</div>
                      </td>

                      <td className='relative block w-full p-3 text-center text-gray-700 border border-b lg:w-auto lg:table-cell lg:static '>
                        <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                          Cars
                        </span>

                        <div className='flex flex-col px-3 py-1 text-sm font-bold text-gray-500 rounded cursor-pointer'>
                          {scheduledWash.cars.map(car => (
                            <div className='flex flex-col items-start justify-start p-3 mb-6 border'>
                              <div className='flex flex-wrap justify-between p-3 mb-3 text-sm'>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>Model:</span>{' '}
                                  {car.carId.model}
                                </div>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>Maker:</span>{' '}
                                  {car.carId.maker}
                                </div>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>Color:</span>{' '}
                                  {car.carId.color}
                                </div>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>
                                    parkingNumber:
                                  </span>{' '}
                                  {car.carId.parkingNumber}
                                </div>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>Plate:</span>{' '}
                                  {car.carId.plate}
                                </div>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>Building:</span>{' '}
                                  {carsReducer.cars.find(
                                    c => c._id === car.carId._id
                                  )
                                    ? carsReducer.cars.find(
                                        c => c._id === car.carId._id
                                      ).building.name
                                    : ''}
                                </div>
                                <div className='mr-4 font-semibold text-gray-700'>
                                  <span className='font-bold'>City:</span>{' '}
                                  {carsReducer.cars.find(
                                    c => c._id === car.carId._id
                                  )
                                    ? carsReducer.cars.find(
                                        c => c._id === car.carId._id
                                      ).city.name
                                    : ''}
                                </div>
                              </div>
                              {car.services.map((service, si) => (
                                <div
                                  className={`flex w-full items-center justify-between text-center py-2 border-b border-gray-300 bg-gray-50 ${
                                    si === 0 ? 'border-t' : ''
                                  }`}>
                                  <div className='flex justify-start w-4/12 p-3'>
                                    <span className='mr-2 font-bold text-gray-700 capitalize'>
                                      service:
                                    </span>{' '}
                                    {servicesReducer.services.find(
                                      s => s._id === service.service
                                    )
                                      ? servicesReducer.services.find(
                                          s => s._id === service.service
                                        ).name
                                      : ''}
                                  </div>
                                  <div className='flex justify-start w-2/12 p-3'>
                                    {' '}
                                    <span className='mr-2 font-bold text-gray-700 capitalize'>
                                      count:
                                    </span>{' '}
                                    {service.count}
                                  </div>
                                  <div className='flex justify-start w-3/12 p-3'>
                                    {' '}
                                    <span className='mr-2 font-bold text-gray-700 capitalize'>
                                      status:
                                    </span>{' '}
                                    {service.status}
                                  </div>
                                  <span
                                    className={`rounded  p-3 py-1 px-3 text-xs font-semibold text-gray-500 flex justify-end items-center w-3/12`}>
                                    <PopOver
                                      scheduledWash={scheduledWash}
                                      serviceId={service.service}
                                      carId={car.carId}
                                    />
                                  </span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className='relative block w-full p-3 text-center text-gray-700 border border-b lg:w-auto lg:table-cell lg:static '>
                        <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                          User
                        </span>

                        <div>
                          {userReducer.users.map(user =>
                            scheduledWash.createdBy === user._id ? (
                              <p
                                className='px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer'
                                onClick={() => setModel(user)}>
                                Info
                              </p>
                            ) : (
                              ''
                            )
                          )}
                        </div>
                      </td>
                      <td className='relative block w-full p-3 text-center text-gray-700 border border-b lg:w-auto lg:table-cell lg:static'>
                        <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                          Date & Time
                        </span>
                        <span
                          className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}>
                          {new Date(scheduledWash.date).toLocaleDateString()}
                          {/* -{' '}
                        {new Date(scheduledWash.date).toLocaleTimeString()} */}
                        </span>
                      </td>
                      <td className='relative block w-full p-3 text-center text-gray-700 border border-b lg:w-auto lg:table-cell lg:static'>
                        <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                          Day{' '}
                        </span>
                        <span
                          className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}>
                          {days.find(d => d.number === scheduledWash.day).name}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
