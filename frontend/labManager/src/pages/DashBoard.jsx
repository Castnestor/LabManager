import { useEffect} from 'react'
import { useUserContext } from '../context/UserContext'
import { NavLink, useNavigate } from "react-router-dom";

export default function DashBoard() {
  const currentUser = useUserContext();
  console.log(currentUser.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.currentUser.userName) {
      navigate('/login');
    }
  }, [currentUser, navigate]);


  return (
    <div>Under Construction</div>
  )
}
