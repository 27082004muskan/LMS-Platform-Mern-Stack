import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

// ✅ Custom hook
const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/user/getcurrentUser",
          { withCredentials: true }
        );
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log('Authentication error:', error);
        // Only set userData to null if it's a 401 error (unauthorized)
        if (error.response?.status === 401) {
          console.log('User not authenticated');
          dispatch(setUserData(null));
        } else {
          console.log('Other error occurred:', error.message);
        }
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetCurrentUser;
