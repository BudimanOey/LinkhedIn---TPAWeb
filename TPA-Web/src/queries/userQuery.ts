import { gql } from "@apollo/client/core"

export const REGISTER_USER = gql`
  mutation RegisterUser(
  $firstName: String!, 
  $lastName: String!, 
  $email:String!, 
  $password:String!)
  {
  registerUser(
    input:{
      firstName:$firstName,
      lastName:$lastName,
      email:$email, 
      password:$password
    }
  )
}
`

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!){
    loginUser(email: $email, password: $password)
  }
`

export const ACTIVATE_USER = gql`
  mutation activateUser($id: String!){
    activateUser(id: $id)
  }
`

export const GET_USER_BY_EMAIL = gql`
  query getUser($email: String!){
    getUserByEmail(email: $email){
      id
      email
    }
  }
`

export const GET_USER_BY_ID = gql`
  query getUser($id:String!){
    getUserByID(id:$id){
      id,
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      activated,
      connectRequest,
      connectedUser,
      followedUser
    }
  }
`

export const GET_USER_PROFILE_PIC = gql`
  query getUserByID($id: String!){
    getUserByID(id: $id){
      profilePicture
    }
  }
`

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($id:String!, $newPass:String!){
    updateUserPassword(id:$id,newPass:$newPass)
  }
`

export const UPDATE_PROFILE_PICTURE = gql`
  mutation updateProfileImg($id: String!, $imgURL: String!){
    updateProfileImage(id: $id, imgURL: $imgURL)
  }
`

export const REQUEST_CONNECT = gql`
  mutation reqConn($userID: String!, $recepient: String!){
    connectionRequest(userID: $userID, recepient: $recepient)
  }
`