import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai';

import { readCars } from '../../redux/actions/cars';
import { readAllUsers } from '../../redux/actions/user';

import _objI from '../../utils/_objI';
import Layout from '../../components/Layout';
import {
  readOrders,
  deleteOrder,
  clearOrder,
} from '../../redux/actions/orders';
import { readServices } from '../../redux/actions/services';
import Spinner from '../../components/Spinner';
import { readPlans } from './../../redux/actions/plans';
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
  const [searchValue, setSearchValue] = useState([{}]);
  const [model, setModel] = useState({});
  const [modelCar, setModelCar] = useState({});
  const dispatch = useDispatch();
  const ordersReducer = useSelector(state => state.ordersReducer);
  const servicesReducer = useSelector(state => state.servicesReducer);
  const carsReducer = useSelector(state => state.carsReducer);
  const userReducer = useSelector(state => state.userReducer);
  const plansReducer = useSelector(state => state.plansReducer);

  console.log({ searchValue });
  useEffect(() => {
    dispatch(readOrders());
    dispatch(readServices());
    dispatch(readAllUsers());
    dispatch(readCars());
    dispatch(readPlans());
  }, []);
  if (
    ordersReducer.loading ||
    servicesReducer.loading ||
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
            <div className='relative z-50 w-auto p-6 border rounded shadow max-w-10/12 bg-gray-50'>
              <span
                onClick={() => {
                  setModel({});
                  setModelCar({});
                }}>
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
                    key !== '__v' &&
                    key !== 'permissions' &&
                    key !== 'roles' &&
                    key !== 'services'
                  ) {
                    return (
                      <div className='flex w-full py-1'>
                        <span className='mr-3 text-sm font-semibold'>
                          {key}:
                        </span>
                        <span>
                          {typeof value === 'object' && value !== null
                            ? value.name
                            : value}
                        </span>
                      </div>
                    );
                  }
                })}
              </span>
            </div>
          </div>
        )}

        {_objI(modelCar) && (
          <div
            style={{ zIndex: 1001 }}
            className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60'>
            <div className='relative z-50 w-auto p-6 border rounded shadow max-w-10/12 bg-gray-50'>
              <span
                onClick={() => {
                  setModel({});
                  setModelCar({});
                }}>
                <AiOutlineCloseCircle className='absolute text-2xl text-red-600 cursor-pointer top-3 right-3 hover:text-red-700' />
              </span>
              <div className='flex flex-wrap w-full py-3'>
                <div className='flex w-full py-1'>
                  <span className='mr-3 text-sm font-semibold'>Days:</span>
                  {modelCar.days.map(day =>
                    days.find(d => d.number === day) ? (
                      <span className='mx-1 text-sm'>
                        {days.find(d => d.number === day).name}
                      </span>
                    ) : (
                      ''
                    )
                  )}
                </div>

                <div className='flex w-full py-1'>
                  <span className='mr-3 text-sm font-semibold'>Plan:</span>
                  {plansReducer.plans.find(p => p._id === modelCar.plan) ? (
                    <span className='mx-1 text-sm'>
                      {
                        plansReducer.plans.find(p => p._id === modelCar.plan)
                          .name
                      }
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div className='flex flex-col w-full py-1'>
                  <span className='mr-3 text-sm font-semibold'>
                    Extra Services:
                  </span>
                  {modelCar.services.map(service => (
                    <div className='flex justify-between w-full'>
                      {servicesReducer.services.find(
                        s => s._id === service.service
                      ) ? (
                        <span className='mx-1 text-sm'>
                          {
                            servicesReducer.services.find(
                              s => s._id === service.service
                            ).name
                          }
                        </span>
                      ) : (
                        ''
                      )}
                      <span className='mx-1 text-sm'>{service.count}</span>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col w-full py-1'>
                  <span className='mr-3 text-sm font-semibold'>
                    Services Left:
                  </span>
                  {modelCar.userServices.map(service => (
                    <div className='flex justify-between w-full'>
                      {servicesReducer.services.find(
                        s => s._id === service.service
                      ) ? (
                        <span className='mx-1 text-sm'>
                          {
                            servicesReducer.services.find(
                              s => s._id === service.service
                            ).name
                          }
                        </span>
                      ) : (
                        ''
                      )}
                      <span className='mx-1 text-sm'>{service.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{ backgroundColor: '#F8F8F8' }}
          className='flex flex-col items-center w-full h-screen p-10 pb-20 transition-all '>
          <div className='flex flex-wrap items-center justify-between w-full transition-all select-none'>
            <div className='flex-grow my-10 text-4xl font-normal text-left text-gray-500 transition-all '>
              Orders
              <div className='flex items-center w-full mt-4 text-sm text-left text-gray-500 transition-all'>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Dashboard
                </div>
                <div className='px-3 font-medium'>{`->`}</div>
                <div className='font-medium transition-all duration-100 transform cursor-pointer hover:text-gray-600 hover:scale-110'>
                  Orders
                </div>
              </div>
            </div>
            {/* <div
              onClick={() => history.push("/admin/orders/new")}
              style={{ backgroundColor: "#212121" }}
              className="px-4 py-3 my-10 transition-all rounded-md shadow-md cursor-pointer hover:shadow-lg"
            >
              <div className="text-sm text-center text-white transition-all">
                Add new order
              </div>
            </div> */}
          </div>

          <table className='w-full border-collapse shadow-lg table-auto hover:shadow-lg '>
            <thead>
              <tr>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  #
                </th>

                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Status
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Type
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Total paid
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Car
                </th>
                <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  User
                </th>

                {/* <th className='hidden p-3 font-bold text-gray-600 uppercase bg-gray-200 border border-gray-300 lg:table-cell'>
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {ordersReducer.orders.map((order, index) => (
                <tr className='flex flex-row flex-wrap mb-10 bg-white lg:hover:bg-gray-100 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0'>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      #
                    </span>
                    {index + 1}
                  </td>

                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Status
                    </span>
                    {order.status}
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Type
                    </span>
                    <span
                      className={`rounded ${
                        order.type === 'plan'
                          ? `text-red-400`
                          : `text-purple-400`
                      } py-1 px-3 text-xs font-bold`}>
                      {order.type}
                    </span>
                  </td>

                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Total price
                    </span>
                    <span
                      className={`rounded py-1 px-3 text-xs font-semibold text-gray-500`}>
                      {order.price}
                    </span>
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Cars
                    </span>
                    {order.cars.map(car => (
                      <p
                        className='px-3 py-2 text-xs font-bold text-gray-500 rounded cursor-pointer'
                        onClick={() =>
                          setModelCar({ ...car, plan: order.plan })
                        }>
                        {carsReducer.cars.find(car => order.car === car.carId)
                          ? carsReducer.cars.find(
                              car => order.car === car.carId
                            ).model
                          : ''}{' '}
                      </p>
                    ))}
                  </td>
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      User
                    </span>
                    {userReducer.users.find(
                      user => order.createdBy === user._id
                    ) ? (
                      <p
                        className='px-3 py-1 text-xs font-bold text-gray-500 rounded cursor-pointer'
                        onClick={() =>
                          setModel(
                            userReducer.users.find(
                              user => order.createdBy === user._id
                            )
                          )
                        }>
                        {
                          userReducer.users.find(
                            user => order.createdBy === user._id
                          ).email
                        }
                      </p>
                    ) : (
                      ''
                    )}
                  </td>
                  {/* 
                  <td className='relative block w-full p-3 text-center text-gray-800 border border-b lg:w-auto lg:table-cell lg:static'>
                    <span className='absolute top-0 left-0 px-2 py-1 text-xs font-bold uppercase bg-blue-200 lg:hidden'>
                      Actions
                    </span>
                    <div className='flex items-center justify-evenly'>
            
                      <div
                        onClick={() => {
                          dispatch(clearOrder());
                          dispatch(deleteOrder(order._id));
                        }}
                        className='text-red-500 underline cursor-pointer hover:text-red-500'>
                        <AiOutlineDelete size='1.8rem' />
                      </div>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
