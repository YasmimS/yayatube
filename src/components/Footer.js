import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  .footer {
    text-align: center;
    margin: 50px 0 50px 0;
  }
  .footer p a {
    color: #d10068;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p className="footer">
        Made by <strong><a href="https://github.com/YasmimS">Yasmim Sancha</a></strong><small> © 2022 </small>
      </p>
    </StyledFooter>
  );
};

export default Footer;