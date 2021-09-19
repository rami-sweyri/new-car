import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createsFile, readOneFile } from '../redux/actions/file';
import _objI from '../utils/_objI';
export default function ImageViewr({ id, width, height }) {
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState('');

  const getFileData = id => {
    dispatch(readOneFile(id)).then(res => {
      if (res.status === 200) {
        setFileData(res.data);
      }
    });
  };
  useEffect(() => {
    if (id) {
      getFileData(id);
    }
  }, [id]);
  return (
    <img
      src={_objI(fileData) ? `/${fileData.data.path}` : ''}
      className={`${width ? width : `w-64`}`}
    />
  );
}
