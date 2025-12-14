import React from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import StaggeredMenu from './ui/StaggeredMenu';

const Navbar: React.FC = () => {
  // Mapeando os links do projeto para o formato do novo menu
  const menuItems = NAV_LINKS.map(link => ({
    label: link.name,
    link: link.href,
    ariaLabel: `Ir para ${link.name}`
  }));

  const socialItems = CONTACT_INFO.socials.map(social => ({
    label: social.name,
    link: social.url
  }));

  return (
    // O StaggeredMenu atua como Header fixo e Overlay
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      // Configuração de Cores para coincidir com o tema do portfólio
      menuButtonColor="#0B232E"     // Cor do texto/botão quando fechado
      openMenuButtonColor="#F2F4F6" // Cor do texto/botão quando aberto (sobre fundo escuro)
      changeMenuColorOnOpen={true}
      // Camadas de transição (Tons de Petrol)
      colors={['#153A48', '#1E3A45', '#0B232E']}
      accentColor="#78909C" // Electric Blue/Silver para hover
      logoText="V"
    />
  );
};

export default Navbar;
