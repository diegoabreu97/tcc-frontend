import React from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import useAuthStore from '../../shared/store/auth-store';
import useUserStore from '../../shared/store/user-store';
import AdminHome from './components/AdminHome';
import StandardHome from './components/StandardHome';
import GuestHome from './components/GuestHome';
import ImageUploadComponent from './components/ImageUploadComponent';

const HomeScreen = () => {
  //const {logout} = useAuth()
  const {logout, user} = useAuthStore();
  const {tipo, info} = useUserStore();
  const {byPassImage, setByPassImage} = React.useState(false)

  React.useEffect(() => {
      // proibido metodo async
      // metodo().then(resposta => ...).catch(erro => ...)
  }, [])

  if(user && user.registerState == "IMAGE_CREATED" || byPassImage){

  return (
    <div>
      HomeScreen <br  />
      {tipo == "ADMIN" && <AdminHome info={info} />}
      {tipo == "STANDARD" && <StandardHome info={info} />}
      {tipo == "GUEST" && <GuestHome info={info} />}
    </div>
  )
 } else {
  return(
     <div>
     <ImageUploadComponent />
        <button onClick={() => setByPassImage(true)}>Skip Image upload</button>
     </div>
     
  );
  
 }
}

export default HomeScreen