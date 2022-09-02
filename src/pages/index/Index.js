import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import AOS from 'aos';
import ResponsiveCarousel from '../../components/ResponsiveCarousel'
import { makeStyles } from '@mui/styles';
import ResponsiveCards from '../../components/ResponsiveCards';
import Whatsapp from '../../components/WhatsAppButton';
import PrincipalImage from '../../images/Chat.png';
import QuemSomos1 from '../../images/QuemSomos1.png';
import QuemSomos2 from '../../images/QuemSomos2.png';
import QuemSomos3 from '../../images/QuemSomos3.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Developed by: '}
      <Link color="inherit" href="https://www.linkedin.com/in/kleberalv/">
        Kleber Alves Bezerera Junior
      </Link>
      {' - Sênior Developer '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 10,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30'
  }
}));

const tiers = [
  {
    image: QuemSomos1,
    title: 'Uma filosofia moderna de gestão juntamente com a tecnologia',
    subtitle: 'Sedimentado em uma atuação profissional, inovadora e dinâmica.',
    description: [
      'A organização do escritório está em consonância com os mais modernos modelos de gestão da advocacia internacional, ',
      'segmentado em bancas de atuação, assim como as grandes firmas, que permite uma excelente atuação.'
    ],
    buttonText: 'Agende uma reunião',
    buttonVariant: 'outlined',
  },
  {
    image: QuemSomos2,
    title: 'Pontualidade e seriedade dos compromissos com seus clientes',
    // subheader: 'Most popular',
    subtitle: 'O atendimento é realizado por até 8 (oito) profissionais capacitados na área de atuação.',
    description: [
      'Sendo assim, além dos serviços prestados no contencioso jurídico, prestamos assessoria na ',
      'administração de procedimentos jurídicos abrangendo as áreas preventiva e consultiva.',
      'Agende uma reunião com nossa equipe jurídica.',
    ],
    buttonText: 'Agende uma reunião',
    buttonVariant: 'contained',
  },
  {
    image: QuemSomos3,
    title: 'Agregar valores aos negócios por meio do conjunto de informações',
    subtitle: 'Acompanhamento processual eficiente e diferenciado',
    description: [
      'Nosso objetivo é agregar valores aos negócios dos clientes por meio do conjunto de informações fundamentais que',
      'obtemos por um acompanhamento processual eficiente e diferenciado, de modo a prestar todo o suporte legal necessário.',
    ],
    buttonText: 'Agende uma reunião',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function TelaInicial() {

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  const classes = useStyles();

  return (

    <React.Fragment>

      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      {/* Botão flutuante do Whatsapp */}
      <Whatsapp />

      {/* Menu do sistema */}

      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar style={{ backgroundColor: '#2c2c2c' }} sx={{ flexWrap: 'wrap' }}>
          <a style={{ marginTop: '8px' }} href="/">
            <img style={{ height: '50px' }} src={PrincipalImage} className="image-container" />
          </a>
          <Typography
            variant="h6"
            // color="inherit"
            style={{ marginLeft: '5px', color: '#BC953D' }}
            noWrap sx={{ flexGrow: 1 }}
          >
            <Link
              variant="h6"
              // color="text.secondary"
              style={{ color: '#BC953D', textDecoration: 'none' }}
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Advocacia Alves Bezerra
            </Link>
          </Typography>
          <nav>
            <Link
              variant="button"
              // color="text.primary"
              style={{ color: '#FFFFFF' }}
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Quem sou
            </Link>
            <Link
              variant="button"
              // color="text.secondary"
              style={{ color: '#FFFFFF' }}
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Meus trabalhos
            </Link>
            <Link
              variant="button"
              // color="text.secondary"
              style={{ color: '#FFFFFF' }}
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Agendar uma reunião
            </Link>
          </nav>
          <Button href="/register" style={{ color: '#B08836' }} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Início do site */}

      <Grid container style={{ backgroundColor: '#111736', color: '#BC953D' }} data-aos='fade-up' component="main" sx={{ pt: 8, pb: 6 }}>
        <Grid item xs={12} sm={12}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            // color="text.primary"
            gutterBottom
          >
            Advocacia Alves Bezerra
          </Typography>
        </Grid>

        <div className="vitrine"></div>

        <Grid item align="justify" xs={12} sm={2}>
        </Grid>
        <Grid item align="justify" xs={12} sm={5}>
          <Typography style={{ marginTop: '50px', marginLeft: '25px', marginRight: '25px' }} variant="h5" color="#FFFFFF" component="p">
            {'Profissionalismo liberal, graduado em direito e autorizado pelas instituições competentes de cada país a exercer o jus postulandi, ou'}
            {' seja, a representação dos legítimos interesses das pessoas físicas ou jurídicas em juízo ou fora dele, quer entre si, quer ante o Estado.'}
          </Typography>
        </Grid>

        <Grid item align="center" xs={12} sm={5} style={{ marginTop: '20px' }}>
          <img src={PrincipalImage} className="image-container" />
        </Grid>

        <div className="vitrine"></div>
      </Grid>

      {/* Slides */}
      <div data-aos="fade-up">
        <ResponsiveCarousel />
      </div>

      {/* Cards */}
      <ResponsiveCards
        props={tiers}
      />

      {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <iframe
          item
          width="100%"
          height="600"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=CECAD%20-%20Presid%C3%AAncia%20da%20Rep%C3%BAblica&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0">
        </iframe>
      </Grid> */}


      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container data-aos="fade-down" spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>


    </React.Fragment>
  );
}

export default function Index() {
  return <TelaInicial />;
}