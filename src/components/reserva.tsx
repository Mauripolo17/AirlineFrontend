import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export function Reserva() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: null,
    fechaNacimiento: null,
    sexo: "",
  });

  const [nReservas, setNReservas] = useState(1);
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e: DropdownChangeEvent) => {
    const name = e.target.name;
    name === "nReservas"
      ? setNReservas(e.value)
      : setFormData((prevState) => ({
          ...prevState,
          [name]: e.value,
        }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a una API o manejar el envío como desees
    console.log("Formulario enviado:", formData);
  };

  const documentType = [
    "Cedula de ciudadania",
    "Pasaporte",
    "Cedula extranjera",
  ];

  const sexoType = ["Masculino", "Femenino", "Otro"];
  const numeroDeReservas = [1, 2, 3, 4, 5];


  function formReserva(index: number) {
    return (
      <div className="nForm">
        <hr/>
        <h5 className="font-bold block mb-2">Pasajero {index+1}</h5>
        <br />
        <div className="divFormCol">
        
          <div>
            <label className="font-bold block mb-2">Nombre</label>
            <InputText
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-bold block mb-2 ">Apellido</label>
            <InputText
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="divFormCol">
          <div>
            <div>
              <label className="font-bold block mb-2 ">
                Tipo de documento
              </label>
              <Dropdown
                value={formData.tipoDocumento}
                name="tipoDocumento"
                onChange={handleDropdownChange}
                options={documentType}
                optionLabel="tipoDocumento"
                className="w-full md:w-13rem"
              />
            </div>
          </div>
          <div>
            <label className="font-bold block mb-2 ">
              Numero de documento
            </label>
            <InputText
              keyfilter="int"
              name="numeroDocumento"
              id="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="divFormCol">
          <div>
            <label className="font-bold block mb-2 ">
              Fecha de Nacimiento:
            </label>
            <Calendar
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="w-full md:w-13rem"
            />
          </div>
          <div>
            <label className="font-bold block mb-2 ">Sexo</label>
            <Dropdown
              value={formData.sexo}
              name="sexo"
              onChange={handleDropdownChange}
              options={sexoType}
              className="w-full md:w-13rem"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div id="divReserva">
      <div className="FormularioReserva">
        <form onSubmit={handleSubmit}>
          <div className="nReserva ms-auto">
            <h2 className="font-bold block mb-2 position-absolute start-50 translate-middle-x">
              Haz tu reserva
            </h2>
            <Dropdown
              value={nReservas}
              onChange={handleDropdownChange}
              options={numeroDeReservas}
              name="nReservas"
              optionLabel="numero de reservas"
              placeholder="1"
              className="w-full md:w-4rem "
            />
          </div>
          { Array.from({length: nReservas}, (_,index) =>(
            formReserva(index)
          ))}
          <Button label="Reservar" />
        </form>
      </div>
    </div>
  );
}
