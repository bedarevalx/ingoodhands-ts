import React from 'react';
import FullscreenSpinner from '../components/FullscreenSpinner';

interface ILoaderHocProps {
  isLoading: boolean;
  children: JSX.Element;
}

const LoaderHoc = (props: ILoaderHocProps) => {
  return props.isLoading ? <FullscreenSpinner /> : props.children;
};

export default LoaderHoc;
