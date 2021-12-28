import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function LoadingBox() {
  return (
    <div className="loading">
      <CircularProgress color="info"/>
		<i>Loading...</i>
    </div>
  );
}