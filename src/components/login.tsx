import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { loginRequest } from '../api/authService';
import {  useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

export function Login() {

  const [loginRequest, setLoginRequest] = useState<loginRequest>({
    username: "",
    password: ""
  });

  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigate();

  const toast = useRef<Toast>(null);
  const showError = (error:string) => {
    toast.current?.show({severity:'error', summary: 'Error', detail:`${error}`, life: 3000});
}

  const {login, isAuthenticated} = useAuth();

  useEffect(()=>{
    if(isAuthenticated){
      navigation('/dashboard');
    }
  },[isAuthenticated]);

  const handleButtonLogin = async ()=>{
      try {
          await login(loginRequest);
      } catch (error:any) {
          setError("Error al iniciar sesión, verifica las credenciales");
          showError('Error al iniciar sesión, verifica las credenciales');
          setTimeout(()=>{
              setError(null);
          }, 5000);
      }
  }

  

  return (
    <div className="containerLogin">
      <div className="flex align-items-center justify-content-center" id='containerFormLogin'>
        <div className="flex flex-column align-items-center mb-4">
          <img src="/avion.png" alt="Logo" className="w-6rem h-6rem mb-2" />
          <h1 className="text-2xl font-bold text-900 mb-2">Despegala.com</h1>
        </div>
        <div className='flex flex-column align-items-center justify-content-center'>
        <form className="flex flex-column gap-3 p-5">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" 
            name='username' 
            value={loginRequest.username}
            required
            onChange={(e)=>{setLoginRequest({...loginRequest, username:e.target.value})}}/>
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <Password 
              placeholder="Password" 
              feedback={false} 
              toggleMask 
              required
              inputClassName="w-full" 
              className="w-full" 
              panelClassName="hidden"
              name='password' 
              value={loginRequest.password}
              onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
            />
          </div>          
          <a href="#" className="text-center">¿Olvidaste tu contraseña?</a>
        </form>
        <Button label="Iniciar sesión" className='buttomFormAuth' onClick={handleButtonLogin}/>
        <Toast ref={toast} />
        <hr />
        <Button label="Registrarse" className='buttomFormAuth2' onClick={()=>navigation('/signUp')}/></div>
        
    </div>
    </div>
  );
}