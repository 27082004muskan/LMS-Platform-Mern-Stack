import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setCreatorCourseData } from '../redux/courseSlice';

const useGetCreatorCourses = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userData } = useSelector(state => state.user);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchCreatorCourses = async () => {
      // Only fetch if user is authenticated
      if (!userData || !userData._id) {
        console.log('User not authenticated, skipping creator courses fetch');
        return;
      }

      try {
        // Use withCredentials for cookie-based authentication
        const result = await axios.get(`${serverUrl}/api/course/getcreator`, {
          withCredentials: true
        });
        console.log('Creator courses:', result.data);
        dispatch(setCreatorCourseData(result.data));
        
      } catch (error) {
        console.error('Error fetching creator courses:', error);
        
        if (error.response?.status === 401) {
          console.log('Authentication failed, user may need to login again');
          // Clear any stored data and redirect to login
          dispatch(setCreatorCourseData([]));
        } else {
          console.log('Error fetching courses:', error.message);
        }
      }
    };

    fetchCreatorCourses();
  }, [dispatch, userData]);
};

export default useGetCreatorCourses;
