import React from 'react';
import Spinner from 'react-spinkit';

const Loading = ({full}) => {
  const className = full ? "loading full centralize" : "loading";

  return (
    <div className={className}>
      <Spinner name="cube-grid"/>
    </div>
  );
};

export default Loading;
