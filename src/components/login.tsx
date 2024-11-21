import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
// import { InputNumber } from 'primereact/inputnumber';

export function Login() {
  return (
    <div>
      <form action="">
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText placeholder="Username" />
      </div>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-key"></i>
        </span>
        <Password feedback={false} tabIndex={1} />
      </div>
      
      </form>
    </div>
  );
}
