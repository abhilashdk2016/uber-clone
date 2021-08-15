import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddPlaceInput = {
  name?: Maybe<Scalars['String']>;
  isFav?: Maybe<Scalars['Boolean']>;
  address?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  messages: Array<Message>;
  ride: Ride;
  rideId?: Maybe<Scalars['Int']>;
  passengerId: Scalars['Int'];
  driverId: Scalars['Int'];
  passenger: User;
  driver: User;
  pickUpAddress: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CompleteEmailVerificationInput = {
  key: Scalars['String'];
};

export type CompletePhoneVerificationInput = {
  phone: Scalars['String'];
  key: Scalars['String'];
};

export type EditPlaceInput = {
  name?: Maybe<Scalars['String']>;
  isFav?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type EmailSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EmailSignUpInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  profilePhoto: Scalars['String'];
  age: Scalars['Float'];
  phoneNumber: Scalars['String'];
};

export type FaceBookConnectInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  fbId: Scalars['String'];
};

export type GetChatInput = {
  id: Scalars['ID'];
};

export type GetChatResponse = {
  __typename?: 'GetChatResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  chat?: Maybe<Chat>;
};

export type GetMyPlaceResponse = {
  __typename?: 'GetMyPlaceResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  places?: Maybe<Array<Place>>;
};

export type GetMyProfileResponse = {
  __typename?: 'GetMyProfileResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type GetNearByRidesResponse = {
  __typename?: 'GetNearByRidesResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  rides?: Maybe<Ride>;
};

export type GetNearbyDriversResponse = {
  __typename?: 'GetNearbyDriversResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  drivers?: Maybe<Array<User>>;
};

export type GetRideInput = {
  id: Scalars['ID'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  chat: Chat;
  chatId?: Maybe<Scalars['Int']>;
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  FaceBookConnect: ResponseWithToken;
  EmailConnect: ResponseWithToken;
  PhoneVerification: Response;
  CompletePhoneVerification: ResponseWithToken;
  EmailSignUp: ResponseWithToken;
  CompleteEmailVerification: ResponseWithToken;
  UpdateProfile: Response;
  ToggleDrivingMode: Response;
  ReportMovement: Response;
  AddPlace: Response;
  EditPlace: Response;
  DeletePlace: Response;
  NearByRides: GetNearByRidesResponse;
  RequestRide: RequestRideResponse;
  UpdateRide: Response;
};


export type MutationFaceBookConnectArgs = {
  data: FaceBookConnectInput;
};


export type MutationEmailConnectArgs = {
  data: EmailSignInInput;
};


export type MutationPhoneVerificationArgs = {
  data: PhoneVerificationInput;
};


export type MutationCompletePhoneVerificationArgs = {
  data: CompletePhoneVerificationInput;
};


export type MutationEmailSignUpArgs = {
  data: EmailSignUpInput;
};


export type MutationCompleteEmailVerificationArgs = {
  data: CompleteEmailVerificationInput;
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationReportMovementArgs = {
  data: ReportMovementInput;
};


export type MutationAddPlaceArgs = {
  data: AddPlaceInput;
};


export type MutationEditPlaceArgs = {
  data: EditPlaceInput;
};


export type MutationDeletePlaceArgs = {
  data: EditPlaceInput;
};


export type MutationRequestRideArgs = {
  data: RequestRideInput;
};


export type MutationUpdateRideArgs = {
  data: UpdateRideInput;
};

export type PhoneVerificationInput = {
  phone: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  name: Scalars['String'];
  isFav: Scalars['Boolean'];
  address: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  returnHello: Scalars['String'];
  GetMyProfile: GetMyProfileResponse;
  RequestEmailVerification: Response;
  GetMyPlaces: GetMyPlaceResponse;
  SendChat: SendChatResponse;
  GetChat: GetChatResponse;
  GetNearbyDrivers: GetNearbyDriversResponse;
  GetRide: RequestRideResponse;
};


export type QueryReturnHelloArgs = {
  name: Scalars['String'];
};


export type QuerySendChatArgs = {
  data: SendChatInput;
};


export type QueryGetChatArgs = {
  data: GetChatInput;
};


export type QueryGetRideArgs = {
  data: GetRideInput;
};

export type ReportMovementInput = {
  lastOrientation?: Maybe<Scalars['Float']>;
  lastLatitude?: Maybe<Scalars['Float']>;
  lastLongitude?: Maybe<Scalars['Float']>;
};

export type RequestRideInput = {
  duration: Scalars['String'];
  distance: Scalars['String'];
  pickUpAddress: Scalars['String'];
  dropOffAddress: Scalars['String'];
  pickUpLatitude: Scalars['Float'];
  pickUpLongitude: Scalars['Float'];
  dropOffLatitude: Scalars['Float'];
  dropOffLongitude: Scalars['Float'];
  price: Scalars['Float'];
};

export type RequestRideResponse = {
  __typename?: 'RequestRideResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  ride?: Maybe<Ride>;
};

export type Response = {
  __typename?: 'Response';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type ResponseWithToken = {
  __typename?: 'ResponseWithToken';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Ride = {
  __typename?: 'Ride';
  id: Scalars['ID'];
  status: Scalars['String'];
  duration: Scalars['String'];
  distance: Scalars['String'];
  pickUpAddress: Scalars['String'];
  dropOffAddress: Scalars['String'];
  pickUpLatitude: Scalars['Float'];
  pickUpLongitude: Scalars['Float'];
  dropOffLatitude: Scalars['Float'];
  dropOffLongitude: Scalars['Float'];
  price: Scalars['Float'];
  driverId?: Maybe<Scalars['Int']>;
  driver?: Maybe<User>;
  passengerId?: Maybe<Scalars['Int']>;
  passenger: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  chat?: Maybe<Chat>;
  chatId?: Maybe<Scalars['Int']>;
};

export type SendChatInput = {
  message: Scalars['String'];
  id: Scalars['Float'];
};

export type SendChatResponse = {
  __typename?: 'SendChatResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Message>;
};

export type Subscription = {
  __typename?: 'Subscription';
  driverUpdate: User;
  nearByRide: Ride;
  rideStatus: Ride;
  chatRoom: Message;
};

export type UpdateProfileInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profilePhoto?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
};

export type UpdateRideInput = {
  status?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  verifiedEmail: Scalars['Boolean'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  age: Scalars['Int'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  verifiedPoneNumber: Scalars['Boolean'];
  profilePhoto: Scalars['String'];
  fbId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isDriving: Scalars['Boolean'];
  isRiding: Scalars['Boolean'];
  isTaken: Scalars['Boolean'];
  lastLongitude: Scalars['Float'];
  lastLatitude: Scalars['Float'];
  lastOrientation: Scalars['Float'];
  chatsAsPassenger: Array<Chat>;
  chatsAsDriver: Array<Chat>;
  messages: Array<Message>;
  ridesAsPassenger: Array<Ride>;
  ridesAsDriver: Array<Ride>;
  places: Array<Place>;
};

export type UpdateProfileMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profilePhoto?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', UpdateProfile: { __typename?: 'Response', ok: boolean, error?: Maybe<string> } };

export type GetPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesQuery = { __typename?: 'Query', GetMyPlaces: { __typename?: 'GetMyPlaceResponse', ok: boolean, error?: Maybe<string>, places?: Maybe<Array<{ __typename?: 'Place', id: string, name: string, address: string, isFav: boolean }>> } };

export type PhoneVerificationMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type PhoneVerificationMutation = { __typename?: 'Mutation', PhoneVerification: { __typename?: 'Response', ok: boolean, error?: Maybe<string> } };

export type ToggleDrivingMutationVariables = Exact<{ [key: string]: never; }>;


export type ToggleDrivingMutation = { __typename?: 'Mutation', ToggleDrivingMode: { __typename?: 'Response', ok: boolean, error?: Maybe<string> } };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', GetMyProfile: { __typename?: 'GetMyProfileResponse', ok: boolean, error?: Maybe<string>, user?: Maybe<{ __typename?: 'User', profilePhoto: string, firstName: string, lastName: string, email: string, phoneNumber: string, isDriving: boolean }> } };

export type VerifyPhoneMutationVariables = Exact<{
  phone: Scalars['String'];
  key: Scalars['String'];
}>;


export type VerifyPhoneMutation = { __typename?: 'Mutation', CompletePhoneVerification: { __typename?: 'ResponseWithToken', ok: boolean, error?: Maybe<string>, token?: Maybe<string> } };


export const UpdateProfileDocument = gql`
    mutation updateProfile($firstName: String, $lastName: String, $email: String, $password: String, $profilePhoto: String, $age: Float) {
  UpdateProfile(
    data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, profilePhoto: $profilePhoto, age: $age}
  ) {
    ok
    error
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      profilePhoto: // value for 'profilePhoto'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetPlacesDocument = gql`
    query getPlaces {
  GetMyPlaces {
    ok
    error
    places {
      id
      name
      address
      isFav
    }
  }
}
    `;

/**
 * __useGetPlacesQuery__
 *
 * To run a query within a React component, call `useGetPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, options);
      }
export function useGetPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, options);
        }
export type GetPlacesQueryHookResult = ReturnType<typeof useGetPlacesQuery>;
export type GetPlacesLazyQueryHookResult = ReturnType<typeof useGetPlacesLazyQuery>;
export type GetPlacesQueryResult = Apollo.QueryResult<GetPlacesQuery, GetPlacesQueryVariables>;
export const PhoneVerificationDocument = gql`
    mutation phoneVerification($phone: String!) {
  PhoneVerification(data: {phone: $phone}) {
    ok
    error
  }
}
    `;
export type PhoneVerificationMutationFn = Apollo.MutationFunction<PhoneVerificationMutation, PhoneVerificationMutationVariables>;

/**
 * __usePhoneVerificationMutation__
 *
 * To run a mutation, you first call `usePhoneVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePhoneVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [phoneVerificationMutation, { data, loading, error }] = usePhoneVerificationMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function usePhoneVerificationMutation(baseOptions?: Apollo.MutationHookOptions<PhoneVerificationMutation, PhoneVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PhoneVerificationMutation, PhoneVerificationMutationVariables>(PhoneVerificationDocument, options);
      }
export type PhoneVerificationMutationHookResult = ReturnType<typeof usePhoneVerificationMutation>;
export type PhoneVerificationMutationResult = Apollo.MutationResult<PhoneVerificationMutation>;
export type PhoneVerificationMutationOptions = Apollo.BaseMutationOptions<PhoneVerificationMutation, PhoneVerificationMutationVariables>;
export const ToggleDrivingDocument = gql`
    mutation toggleDriving {
  ToggleDrivingMode {
    ok
    error
  }
}
    `;
export type ToggleDrivingMutationFn = Apollo.MutationFunction<ToggleDrivingMutation, ToggleDrivingMutationVariables>;

/**
 * __useToggleDrivingMutation__
 *
 * To run a mutation, you first call `useToggleDrivingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleDrivingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleDrivingMutation, { data, loading, error }] = useToggleDrivingMutation({
 *   variables: {
 *   },
 * });
 */
export function useToggleDrivingMutation(baseOptions?: Apollo.MutationHookOptions<ToggleDrivingMutation, ToggleDrivingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleDrivingMutation, ToggleDrivingMutationVariables>(ToggleDrivingDocument, options);
      }
export type ToggleDrivingMutationHookResult = ReturnType<typeof useToggleDrivingMutation>;
export type ToggleDrivingMutationResult = Apollo.MutationResult<ToggleDrivingMutation>;
export type ToggleDrivingMutationOptions = Apollo.BaseMutationOptions<ToggleDrivingMutation, ToggleDrivingMutationVariables>;
export const UserProfileDocument = gql`
    query userProfile {
  GetMyProfile {
    ok
    error
    user {
      profilePhoto
      firstName
      lastName
      email
      phoneNumber
      isDriving
    }
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const VerifyPhoneDocument = gql`
    mutation verifyPhone($phone: String!, $key: String!) {
  CompletePhoneVerification(data: {phone: $phone, key: $key}) {
    ok
    error
    token
  }
}
    `;
export type VerifyPhoneMutationFn = Apollo.MutationFunction<VerifyPhoneMutation, VerifyPhoneMutationVariables>;

/**
 * __useVerifyPhoneMutation__
 *
 * To run a mutation, you first call `useVerifyPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPhoneMutation, { data, loading, error }] = useVerifyPhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useVerifyPhoneMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPhoneMutation, VerifyPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPhoneMutation, VerifyPhoneMutationVariables>(VerifyPhoneDocument, options);
      }
export type VerifyPhoneMutationHookResult = ReturnType<typeof useVerifyPhoneMutation>;
export type VerifyPhoneMutationResult = Apollo.MutationResult<VerifyPhoneMutation>;
export type VerifyPhoneMutationOptions = Apollo.BaseMutationOptions<VerifyPhoneMutation, VerifyPhoneMutationVariables>;