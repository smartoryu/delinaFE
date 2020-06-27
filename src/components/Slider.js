import React from "react";
import model1 from "../image/model1.jpg";
import model2 from "../image/model2.jpg";
import model3 from "../image/model3.jpg";
import { Carousel } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";

const Slider = () => {
  return (
    <div>
      <Zoom>
        <Carousel>
          <Carousel.Item style={{ width: "100%", height: "100vh" }}>
            <img className="gambar1" src={model1} alt="gambar" />

            <Carousel.Caption>
              <div>
                <h1>Delina Muslim Fashion</h1>
                <p>Must have items for daily and formal muslim fashion</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%", height: "100vh" }}>
            <img className="gambar1" src={model2} alt="gambar" />
            <Carousel.Caption>
              <div>
                <h1>Delina Muslim Fashion</h1>
                <p>Must have items for daily and formal muslim fashion</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%", height: "100vh" }}>
            <img className="gambar1" src={model3} alt="gambar" />
            <Carousel.Caption>
              <div>
                <h1>Delina Muslim Fashion</h1>
                <p>Must have items for daily and formal muslim fashion</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Zoom>
    </div>
  );
};

export default Slider;
