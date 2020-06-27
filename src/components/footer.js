import React, { Component } from "react";
import Instagram from "../image/instagramLogo.jpg";
import Shopee from "../image/shopee.jpeg";
import Tokopedia from "../image/tokopedia.jpg";
import { MdCopyright } from "react-icons/md";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        <div className="footer1">
          <a href="https://www.instagram.com/delinamuslimfashion/">
            <img className="logoFooter" src={Instagram} alt="instagram" />
          </a>
          <a href="/">
            <img className="logoFooter" src={Shopee} alt="shopee" />
          </a>
          <a href="/">
            <img className="logoFooter" src={Tokopedia} alt="tokopedia" />
          </a>
        </div>
        <div className="footer2">
          <p>
            Copy Right <MdCopyright /> 2020 by Delina Hijab
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
