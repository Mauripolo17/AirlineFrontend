import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState, FormEvent, ChangeEvent } from "react";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { useAuth } from "../context/AuthContext";

interface FormData {
  username: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  numeroDocumento: number | null;
  direccion: string;
  telefono: number | null;
  fechaDeNacimiento: Date | null;
}

interface FormProps {
  mode: "signup" | "edit";
  initialData?: FormData;
}

export function FormUsuario({ mode, initialData }: FormProps) {
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      username: "",
      email: "",
      password: "",
      nombre: "",
      apellido: "",
      numeroDocumento: null,
      direccion: "",
      telefono: null,
      fechaDeNacimiento: null,
    }
  );

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { user } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: InputNumberValueChangeEvent, fieldName: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.value }));
  };

  const handleDateChange = (value: Date | null) => {
    setFormData((prev) => ({ ...prev, fechaDeNacimiento: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (mode === "signup" && formData.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const url =
      mode === "signup"
        ? "http://localhost:8080/api/auth/signup"
        : `http://localhost:8080/api/clientes/${user?.id}`;
    const method = mode === "signup" ? "POST" : "PUT";

    const requestData = mode === "signup"
      ? formData
      : {
          email: formData.email,
          nombre: formData.nombre,
          apellido: formData.apellido,
          direccion: formData.direccion,
          telefono: formData.telefono,
          fechaDeNacimiento: formData.fechaDeNacimiento,
        };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error al procesar la solicitud");
      } else {
        setSuccessMessage(
          mode === "signup"
            ? "Cliente registrado exitosamente"
            : "Datos actualizados correctamente"
        );
      }
    } catch (error) {
      setError("Error al procesar la solicitud");
      console.error("Error:", error);
    }
  };

  return (
    <div className="containerLogin">
      <div
        className="flex align-items-center justify-content-center"
        id="containerFormLogin"
      >
        <div className="flex flex-column align-items-center mb-4">
          <img src="/avion.png" alt="Logo" className="w-6rem h-6rem mb-2" />
          <h1 className="text-2xl font-bold text-900 mb-2">Despegala.com</h1>
        </div>
        <div className="flex flex-column align-items-center justify-content-center">
          <form className="flex flex-column gap-3 p-5" onSubmit={handleSubmit}>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Nombre"
                required
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Apellido"
                required
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </div>
            {mode === "signup" && (
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-id-card"></i>
                </span>
                <InputNumber
                  placeholder="Número de Documento"
                  required
                  value={formData.numeroDocumento}
                  onValueChange={(e) => handleNumberChange(e, "numeroDocumento")}
                />
              </div>
            )}
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-phone"></i>
              </span>
              <InputNumber
                placeholder="Número de Teléfono"
                required
                value={formData.telefono}
                onValueChange={(e) => handleNumberChange(e, "telefono")}
              />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-at"></i>
              </span>
              <InputText
                type="email"
                placeholder="em@despega.com"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <Calendar
                placeholder="Fecha de Nacimiento"
                value={formData.fechaDeNacimiento}
                onChange={(e) => handleDateChange(e.value ?? null)}
                showButtonBar
              />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-directions"></i>
              </span>
              <InputText
                placeholder="Cr.5 Cl-11 #D5-20"
                required
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Nombre de usuario"
                required
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            {mode === "signup" && (
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password
                  placeholder="Contraseña"
                  feedback={false}
                  toggleMask
                  inputClassName="w-full"
                  className="w-full"
                  panelClassName="hidden"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password
                  placeholder="Confirmar contraseña"
                  feedback={false}
                  toggleMask
                  inputClassName="w-full"
                  className="w-full"
                  panelClassName="hidden"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <Button
              type="submit"
              label={mode === "signup" ? "Registrarse" : "Actualizar Datos"}
              className="w-full buttomFormAuth"
              icon={mode === "signup" ? "pi pi-user-plus" : "pi pi-save"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
