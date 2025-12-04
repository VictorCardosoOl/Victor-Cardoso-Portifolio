import React from 'react';
import StaggeredMenu from './StaggeredMenu';
import { NAV_LINKS, CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  // Prepara os itens para o StaggeredMenu baseado nas constantes existentes
  const menuItems = NAV_LINKS.map(link => ({
    label: link.name,
    ariaLabel: `Ir para ${link.name}`,
    link: link.href
  }));

  const socialItems = CONTACT_INFO.socials.map(social => ({
    label: social.name,
    link: social.url
  }));

  return (
    <>
      {/* Texto Fixo na Esquerda */}
      <div className="fixed top-0 left-0 p-8 z-50 pointer-events-none mix-blend-difference text-white md:text-offblack md:mix-blend-normal">
        <span className="text-sm md:text-base font-light tracking-wide text-gray-500">
          this is not a portfólio
        </span>
      </div>

      {/* Menu Staggered (O botão 'Menu +' fica fixo na direita pelo próprio componente) */}
      <StaggeredMenu 
        items={menuItems}
        socialItems={socialItems}
        menuButtonColor="#0a0a0a" // Cor preta para o botão quando fechado
        openMenuButtonColor="#ffffff" // Cor branca quando aberto
        accentColor="#B19EEF"
      />
    </>
  );
};

export default Navbar;