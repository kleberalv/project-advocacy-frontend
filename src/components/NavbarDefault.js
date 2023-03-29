import React from 'react';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';


function NavbarDefault() {

  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && (
        <nav>
          <Link
            variant="button"
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
            href="#id1"
            sx={{ my: 1, mx: 1.5 }}
          >
            Quem sou
          </Link>
          <Link
            variant="button"
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
            href="#id2"
            sx={{ my: 1, mx: 1.5 }}
          >
            Como chegar
          </Link>
        </nav>
      )}
      <Button
        href="/login"
        style={{ color: '#B08836' }}
        variant="outlined"
        sx={{ my: 1, mx: 1.5 }}
      >
        Login
      </Button>
    </>
  );
}

export default NavbarDefault;
