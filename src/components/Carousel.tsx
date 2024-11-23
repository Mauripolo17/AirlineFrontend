import Carousel from "react-bootstrap/Carousel";
import ciudades from "../assets/images/ciudades.tsx";
function CarouselComponent() {
    return(
        <Carousel fade>
        <Carousel.Item id="carouselItem" interval={4000}>
          <img
            src={ciudades.medellin}
            className="d-block w-100"
            style={{ width: "80%" }}
          />
          <Carousel.Caption>
            <h3>Medellin</h3>
            <p>La cuidad de la eterna primavera</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id="carouselItem" interval={4000}>
          <img
            src={ciudades.santaMarta}
            className="d-block w-100"
            style={{ width: "80%" }}
          />
          <Carousel.Caption>
            <h3>Santa Marta</h3>
            <p>Un pueblo hecho cuidad</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id="carouselItem" interval={4000}>
          <img
            src={ciudades.madrid}
            className="d-block w-100"
            style={{ width: "80%" }}
          />
          <Carousel.Caption>
            <h3>Madrid</h3>
            <p>En españa</p>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}

export default CarouselComponent;