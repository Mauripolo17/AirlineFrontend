import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

export function SignUp() {

    const [date, setDate] = useState<Date | undefined>(new Date());


  return (
    <div className="flex align-items-center justify-content-center">
      <div className="flex flex-column align-items-center mb-4">
        <img src="/avion.png" alt="Logo" className="w-6rem h-6rem mb-2" />
        <h1 className="text-2xl font-bold text-900 mb-2">Despegala.com</h1>
      </div>
      <form className="flex flex-column gap-3 p-5">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-text"></i>
          </span>
          <InputText placeholder="Name" required />
          <span className="p-inputgroup-addon">
            <i className="pi pi-text"></i>
          </span>
          <InputText placeholder="Lastname" required />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-number"></i>
          </span>
          <InputText placeholder="Numero de cédula" required />
          <span className="p-inputgroup-addon">
            <i className="pi pi-text"></i>
          </span>
          <InputText placeholder="Télefono" required />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-text"></i>
          </span>
          <InputText type="email" placeholder="em@despega.com" required />
          
        </div>
        <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
            <i className="pi pi-text"></i>
          </span>
          <Calendar placeholder="Fecha de nacimiento" value={date} onChange={(e) => setDate(e.value ?? undefined)} showButtonBar />

        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-text"></i>
          </span>
          <InputText type="address" placeholder="Cr.5 Cl-11 #D5-20" required />
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
            required
          />
          <Password
            placeholder="Confirm password"
            feedback={false}
            toggleMask
            inputClassName="w-full"
            className="w-full"
            panelClassName="hidden"
            required
          />
        </div>
        <Button label="Registrarme" className="w-full" />
      </form>
    </div>
  );
}
