import React, { useState, useEffect } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineDashboard,
} from 'react-icons/ai';
import { RiDashboardLine, RiLogoutBoxLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { GrServices } from 'react-icons/gr';
import { SiOpenaccess } from 'react-icons/si';
import { BiBuildingHouse } from 'react-icons/bi';
import { VscGitPullRequest } from 'react-icons/vsc';
import { GiModernCity, GiRegeneration } from 'react-icons/gi';
import { Fa500Px, FaCriticalRole } from 'react-icons/fa';
import { mainColor, background } from '../styles/mainColors';
import { logout } from '../redux/actions/auth';

const Layout = ({ children, parentClassName, isAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isMenuopen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    console.log({ isAuthenticated });
    if (!isAuthenticated) {
      history.push('/admin/auth');
    }
  }, [isAuthenticated]);
  return (
    <>
      <div
        style={{ backgroundColor: mainColor }}
        onClick={() => setIsMenuOpen(!isMenuopen)}
        className={`bg-green-700 p-1 rounded-lg ${
          isMenuopen ? `hidden absolute` : `block fixed`
        } opacity-50 select-none hover:opacity-100 shadow-md hover:shadow-lg cursor-pointer left-8 top-8 w-9 h-9 text-white transition-all duration-200 transform hover:scale-105 z-50 overflow-x-hidden`}>
        <AiOutlineMenuUnfold size='1.7rem' className='text-white ' />
      </div>
      <div className='relative flex overflow-x-hidden transition duration-1000 '>
        <div
          style={{ backgroundColor: mainColor }}
          className={`bg-green-700 min-h-screen shadow-md hover:shadow-lg ${
            isMenuopen ? `w-64 px-4 py-7` : `w-0 p-0`
          } transform-gpu transition-all duration-1000 flex-none select-none overflow-y-auto text-white fixed`}>
          <div className='flex items-center justify-between pb-4 font-semibold text-white border-b '>
            <div
              className='flex items-center transform cursor-pointer hover:scale-105'
              onClick={() => history.push('/admin/')}>
              <RiDashboardLine size='1.6rem' className='text-white ' />
              <div className='pl-1 '>Dashboard</div>
            </div>

            <div
              className='transform cursor-pointer hover:scale-105 '
              onClick={() => setIsMenuOpen(!isMenuopen)}>
              <AiOutlineMenuFold size='1.7rem' className='text-white' />
            </div>
          </div>

          <div className='h-screen pt-2 pb-8 overflow-hidden overflow-y-auto'>
            {/* content start */}
            <div
              onClick={() => {
                history.push('/admin/users');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition-transform bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <AiOutlineUser size='1.6rem' className={mainColor} />
              <div className='pl-2'>Users</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/services');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <GrServices size='1.6rem' color={mainColor} />
              <div className='pl-2'>Services</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/plans');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <Fa500Px size='1.6rem' color={mainColor} />
              <div className='pl-2'>Plans</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/orders');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <VscGitPullRequest size='1.6rem' color={mainColor} />
              <div className='pl-2'>Orders</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/scheduledWashes');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <VscGitPullRequest size='1.6rem' color={mainColor} />
              <div className='pl-2'>Scheduled Washes</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/roles');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <FaCriticalRole size='1.6rem' color={mainColor} />
              <div className='pl-2'>Roles</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/permissions');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <SiOpenaccess size='1.6rem' color={mainColor} />
              <div className='pl-2'>Permissions</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/city');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <GiModernCity size='1.6rem' color={mainColor} />
              <div className='pl-2'>Cities</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/buildings');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <BiBuildingHouse size='1.6rem' color={mainColor} />
              <div className='pl-2'>Buildings</div>
            </div>
            <div
              onClick={() => {
                history.push('/admin/intro');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <GiRegeneration size='1.6rem' color={mainColor} />
              <div className='pl-2'>Mobile Intro</div>
            </div>
            <div
              onClick={() => {
                dispatch(logout());
                history.push('/admin/auth');
              }}
              style={{ color: mainColor, backgroundColor: background }}
              className='flex items-center px-2 py-2 my-2 font-semibold text-green-700 transition bg-white rounded shadow-md cursor-pointer hover:shadow-lg transform-gpu hover:scale-105'>
              <RiLogoutBoxLine size='1.6rem' color={mainColor} />
              <div className='pl-2'>Logout</div>
            </div>
          </div>
        </div>

        <div
          className={`w-full transition-all duration-1000 ${
            isMenuopen ? 'ml-64' : 'ml-0'
          } ${
            parentClassName && parentClassName.length > 0
              ? `${parentClassName}`
              : ``
          }`}>
          {children}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, null)(Layout);
