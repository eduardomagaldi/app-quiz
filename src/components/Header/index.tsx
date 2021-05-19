import React, { Props } from 'react';

interface HeaderProps {
  text?: string;
}

const Header: React.FC<HeaderProps> = ({ text }: HeaderProps) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <a
            href="/"
            className="logo"
          >
            <h1>
              <img
                src="https://uploads-ssl.webflow.com/5fad10eff31430525bd54730/60119d46d6c43627046196b8_Tilda%20Logo%20(1).png"
                alt="Tilda"
                title="Tilda"
              />
              Quizz{text ? ' - ' + text : ''}
            </h1>
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
