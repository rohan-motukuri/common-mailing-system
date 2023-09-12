import { useContext } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../CSS/Downbar.css"

import { SideDownBarContext } from '../Display';

function Downbar() {

  return (<>
    <div className='SideBar_Main'>
      <ul>
        <li className='SideBar_List'>
          <DeleteIcon/> 
        </li>
        <li className='SideBar_List'>
          <StarIcon/> 
        </li>
        <li className='SideBar_List'>
          <MoreVertIcon/>
        </li>
      </ul>
    </div>
  </>)
}

export default Downbar