import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export function Login() {
  return (
    <div className="flex align-items-center justify-content-center">
        <div className="flex flex-column align-items-center mb-4">
          <img src="/avion.png" alt="Logo" className="w-6rem h-6rem mb-2" />
          <h1 className="text-2xl font-bold text-900 mb-2">Despegala.com</h1>
        </div>
        <form className="flex flex-column gap-3 p-5">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <Password 
              placeholder="Password" 
              feedback={false} 
              toggleMask 
              inputClassName="w-full" 
              className="w-full" 
              panelClassName="hidden"
            />
          </div>
          <Button label="Iniciar sesión" className="w-full" />
        </form>
    </div>
  );
}