import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, props) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.e();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, props]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
