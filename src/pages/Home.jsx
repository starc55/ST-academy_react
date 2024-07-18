import './Page.css'
import SideBarHome from '../pag/SideBarHome'
import { Navigate } from 'react-router-dom'


export default function Home(){
    const isAuthenticated = localStorage.getItem("user") && localStorage.getItem("token")

    if (!isAuthenticated){
        return <Navigate to='/entry'/>
    }
    return( 
        <div>
            <SideBarHome />
        </div>
    )
}