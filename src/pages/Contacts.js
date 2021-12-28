import React from "react";
import Layout from "../components/Layout";
import data from "../data";
import Breadcrumbs from "../components/Breadcrumbs";

const Contacts = () => {
  let dataContacts = data.contacts;
  return (
    <Layout>
      <main className="contacts-page page">
        <div className="contacts">
          <div className="container">
            <h1 className="title contacts__title">Контактная информация</h1>
          </div>
          <div className="contacts__section contacts__section_1">
            <div className="contacts__block contacts__block_1">
              <h3 className="contacts__subtitle subtitle">Телефоны</h3>
              <ul className="contacts__list">
                {dataContacts.tel.map((item, index) => (
                  <li key={index} className="contacts__list-item">
                    <a href={`tel:${item.link}`}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contacts__block contacts__block_2">
              <h3 className="contacts__subtitle subtitle">
                Адрес электронной почты
              </h3>
              <ul className="contacts__list">
                {dataContacts.mail.map((item, index) => (
                  <li key={index} className="contacts__list-item">
                    <a href={`mailto:${item}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="contacts__section contacts__section_2">
            <div className="contacts__block">
              <h3 className="contacts__subtitle subtitle">Адрес компании</h3>
              <ul className="contacts__list">
                {dataContacts.address.map((item, index) => (
                  <li key={index} className="contacts__list-item">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
			<div className="contacts__map">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10163.244606052842!2d30.52489498013274!3d50.44461816305021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce557f7413a1%3A0xd71003a9059cba89!2z0JrRgNGD0YLQuNC5INGD0LfQstGW0LcsIDYvMiwgOSwg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1634561289159!5m2!1sru!2sua"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div className="contacts__block contacts__block_2">
              <h3 className="contacts__subtitle subtitle">Социальные сети</h3>
              <ul className="contacts__list">
                {dataContacts.soc.map((item, index) => (
                  <li key={index} className="contacts__list-item">
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

           
          </div>
        </div>

		<Breadcrumbs/>
      </main>
    </Layout>
  );
};

export default Contacts;
