import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useReservaContext } from "../context/ReservaContext";
import { Pasajero, pasajeroService } from "../api/pasajeroService";
import { reservaService } from "../api/reservasService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Reserva() {
  const [formData, setFormData] = useState<Pasajero[]>([
    {
      nombre: "",
      apellido: "",
      tipoDocumento: "",
      numeroDocumento: 0,
      fechaDeNacimiento: "",
      sexo: "",
      reserva: 0,
    },
  ]);
  const { flightSelected } = useReservaContext();
  const [nReservas, setNReservas] = useState<number>(1);
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const navigation = useNavigate();
  const handleChange = (
    e: { target: { name: any; value: any } },
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newFormData = [...prevState]; // Hacemos una copia del arreglo de pasajeros
      if (name == "fechaDeNacimiento") {
        newFormData[index] = {
          ...newFormData[index],
          [name]: value.toISOString().slice(0, 10),
        }; // Actualizamos el pasajero correspondiente
      } else {
        newFormData[index] = { ...newFormData[index], [name]: value }; // Actualizamos el pasajero correspondiente
      }
      return newFormData;
    });
  };

  const handleChangeDate = (e: any, index: number) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newFormData = [...prevState]; // Hacemos una copia del arreglo de pasajeros
      newFormData[index] = {
        ...newFormData[index],
        [name]: value.toISOString().slice(0, 10),
      }; // Actualizamos el pasajero correspondiente
      return newFormData;
    });
  };

  // useEffect(() => {
  //   console.log(flightSelected);
  // }, [flightSelected]);
  const handleDropdownChange = (e: DropdownChangeEvent, index: number) => {
    const name = e.target.name;
    const value = e.value;
    setFormData((prevState) => {
      const newFormData = [...prevState]; // Hacemos una copia del arreglo de pasajeros
      newFormData[index] = { ...newFormData[index], [name]: value }; // Actualizamos el pasajero correspondiente
      return newFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idReserva = await createReserva();
    console.log(idReserva?.id);

    //   const formDataWithISODate = formData.map((pasajero) => ({
    //   ...pasajero,
    //   fechaNacimiento: pasajero.fechaNacimiento
    //     ? pasajero.fechaNacimiento.toISOString().slice(0, 10)
    //     : null,
    // }));
    console.log(formData);
    const response = await pasajeroService.savePasajeros(formData);
    if (idReserva) {
      idReserva.pasajeros = response;
    }
    // const response2 = await reservaService.updateReserva(idReserva, idReserva?.id ?? 0);
    // console.log("Reserva acualizada", response2);
    console.log(response);
    // setFormData(formDataWithISODate);

    console.log("Formulario enviado:", formData);
    setTimeout(() => {
      navigation("/");
    }, 2000);
  };

  const createReserva = async () => {
    const reserva = {
      fechaReserva: new Date().toISOString().slice(0, 10),
      cliente: user?.id ?? 0,
      pasajeros: [],
      vuelos: [],
    };
    reserva.vuelos?.push(flightSelected);
    const response = await reservaService.createReserva(reserva);
    if (response) {
      setSuccessMessage("Reserva creada exitosamente");
    }else{
      setSuccessMessage("Error al crear la reserva");
    }
    setReservaPasajeros(response?.id ?? 0);
    console.log(response);

    return response;
  };

  const setReservaPasajeros = (idReserva: number) => {
    formData.map((pasajero) => {
      pasajero.reserva = idReserva;
    });
    console.log("Pasajeros enviados SIIIII:", formData);
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
        <hr />
        <h5 className="font-bold block mb-2">Pasajero {index + 1}</h5>
        <br />
        <div className="divFormCol">
          <div>
            <label className="font-bold block mb-2">Nombre</label>
            <InputText
              id="nombre"
              name="nombre"
              value={formData[index].nombre}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
          </div>

          <div>
            <label className="font-bold block mb-2 ">Apellido</label>
            <InputText
              id="apellido"
              name="apellido"
              value={formData[index].apellido}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
          </div>
        </div>
        <div className="divFormCol">
          <div>
            <div>
              <label className="font-bold block mb-2 ">Tipo de documento</label>
              <Dropdown
                value={formData[index].tipoDocumento}
                name="tipoDocumento"
                onChange={(e) => {
                  handleDropdownChange(e, index);
                }}
                options={documentType}
                optionLabel="tipoDocumento"
                className="w-full md:w-13rem"
              />
            </div>
          </div>
          <div>
            <label className="font-bold block mb-2 ">Numero de documento</label>
            <InputText
              keyfilter="int"
              name="numeroDocumento"
              id="numeroDocumento"
              value={formData[index].numeroDocumento.toString()}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
          </div>
        </div>
        <div className="divFormCol">
          <div>
            <label className="font-bold block mb-2 ">
              Fecha de Nacimiento:
            </label>
            <Calendar
              dateFormat="yy-mm-dd"
              name="fechaDeNacimiento"
              value={formData[index].fechaDeNacimiento}
              onChange={(e) => {
                handleChangeDate(e, index);
              }}
              className="w-full md:w-13rem"
            />
          </div>
          <div>
            <label className="font-bold block mb-2 ">Sexo</label>
            <Dropdown
              value={formData[index].sexo}
              name="sexo"
              onChange={(e) => {
                handleDropdownChange(e, index);
              }}
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
              onChange={(e) => {
                setFormData(
                  Array.from({ length: e.value }, (_, index) => ({
                    nombre: "",
                    apellido: "",
                    tipoDocumento: "",
                    numeroDocumento: 0,
                    fechaDeNacimiento: "",
                    sexo: "",
                    reserva: 0,
                  }))
                );
                setNReservas(e.value);
              }}
              options={numeroDeReservas}
              name="nReservas"
              optionLabel="numero de reservas"
              placeholder="1"
              className="w-full md:w-4rem "
            />
          </div>
          {Array.from({ length: nReservas }, (_, index) => formReserva(index))}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <Button label="Reservar" />
        </form>
      </div>
    </div>
  );
}

// apellido: "Polo"
// fechaDeNacimiento: ""
// fechaNacimiento: "2024-10-06"
// nombre: "Maurricio"
// numeroDocumento:
// "123123"
// reserva: 302
// sexo:
// "Masculino"
// tipoDocumento:"Cedula de ciudadania"
