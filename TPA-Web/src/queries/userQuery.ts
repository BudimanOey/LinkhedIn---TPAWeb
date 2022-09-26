import { gql } from "@apollo/client/core"

export const REGISTER_USER = gql`
  mutation RegisterUser(
  $firstName: String!, 
  $lastName: String!, 
  $email:String!, 
  $password:String!,
  $profilePic: String!,
  $backgroundPic: String!)
  {
  registerUser(
    input:{
      firstName:$firstName,
      lastName:$lastName,
      email:$email, 
      password:$password,
      profilePicture: $profilePic,
    }
    backgroundPicture: $backgroundPic
  )
}
`

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!){
    loginUser(email: $email, password: $password)
  }
`

export const LOGIN_BY_GMAIL = gql`
  mutation loginUserByGmail($email: String!){
    loginUserByGmail(email: $email)
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
      backgroundPicture,
      activated,
      connectRequest,
      requestConnectTo,
      connectedUser,
      followedUser,
      blockedUser
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

export const UPDATE_BACKGROUND_PICTURE = gql`
  mutation updateBackPic($id: String!, $url: String!){
    updateBackgroundPicture(id:$id, imgURL:$url)
  }
`

export const FOLLOW_USER = gql`
  mutation follow($userID: String!, $recepient: String!){
    followUser(userID: $userID, recepient: $recepient)
  }
`
export const UNFOLLOW_USER = gql`
  mutation unfoll($userID: String!, $recepient: String!){
    unfollowUser(userID: $userID, recepient: $recepient)
  }
`

export const BLOCK_USER = gql`
  mutation block($userID: String!, $recepient: String!){
    blockUser(UserID: $userID, recepient: $recepient)
  }
`

export const UNBLOCK_USER = gql`
  mutation unblock($userID:String!, $recepient: String!){
    unblockUser(UserID: $userID, recepient: $recepient)
  }
`
