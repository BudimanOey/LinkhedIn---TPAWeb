import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contextProvider/userContext';

export function UnAuth({children}: any) {
  const userCtx = useContext(UserContext);
  const user = userCtx.user
  if(Object.keys(user).length !== 0){
    return <Navigate to="/home"/>
  }

  return children;
}

export function Auth({children}: any) {
  const userCtx = useContext(UserContext);
  const user = userCtx.user
  if(Object.keys(user).length === 0){
    return <Navigate to="/"/>
  }

  return children;
}