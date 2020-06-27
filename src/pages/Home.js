import React, { Component } from "react";
import Slider from "../components/Slider";
import Gallery from "../components/Gallery";
import Footer from "../components/footer";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Slider />
        <Gallery />
        <Footer />
      </div>
    );
  }
}

export default Home;
