import React from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';


function NavbarDefault() {

  const location = useLocation();

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && (
        <nav>
          <Link
            variant="button"
            style={{ color: '#FFFFFF', textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => smoothScrollTo('id1')}
            sx={{ my: 1, mx: 1.5 }}
          >
            Áreas de atuação
          </Link>
          <Link
            variant="button"
            style={{ color: '#FFFFFF', textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => smoothScrollTo('id2')}
            sx={{ my: 1, mx: 1.5 }}
          >
            Quem sou eu
          </Link>
          <Button
            href="/login"
            style={{ color: '#B08836' }}
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
        </nav>
      )}
    </>
  );
}

export default NavbarDefault;
