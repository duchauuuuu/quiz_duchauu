import i18next from 'i18next';
import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next'
export const Language = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
  }
  return (
    <>
          <NavDropdown title={i18n.language === 'vi' ? "Việt Nam" : " English"} id="basic-nav-dropdown2" className='languages'>
              <NavDropdown.Item onClick={()=>{handleChangeLanguage('en')}} >English</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{handleChangeLanguage('vi')}} >Việt Nam</NavDropdown.Item>
            </NavDropdown>
    </>
  )
}
