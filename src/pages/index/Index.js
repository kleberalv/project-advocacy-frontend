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
import Slides from '../../components/ResponsiveCarousel'
import Chat from '../../images/Chat.png';
import { makeStyles } from '@mui/styles';
import FloatingWhatsApp from 'react-floating-whatsapp';
import ResponsiveCards from '../../components/ResponsiveCards';

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
    title: 'Uma filosofia moderna de gestão juntamente com a tecnologia',
    subtitle: 'Sedimentado em uma atuação profissional e inovadora',
    description: [
      'A organização do escritório está em consonância com os mais modernos modelos de gestão da advocacia internacional',
      'segmentado em bancas de atuação, assim como as grandes firmas, que permite atuação com excelência em diversos segmentos',
      'no ramo do Direito Público e Privado.'
    ],
    buttonText: 'Agende uma reunião',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pontualidade e seriedade dos compromissos com seus clientes',
    // subheader: 'Most popular',
    subtitle: 'O atendimento é realizado por 8 (oito) profissionais.',
    description: [
      'Sendo assim, além dos serviços prestados no contencioso jurídico, prestamos assessoria na',
      'administração de procedimentos jurídicos abrangendo as áreas preventiva e consultiva.',
      'Venha conosco! Agende uma reunião com nossa equipe jurídica.',
    ],
    buttonText: 'Agende uma reunião',
    buttonVariant: 'contained',
  },
  {
    title: 'Agregar valores aos negócios por meio do conjunto de informações',
    subtitle: 'Acompanhamento processual eficiente e diferenciado',
    description: [
      'Nosso objetivo é agregar valores aos negócios dos clientes por meio do conjunto de informações',
      'fundamentais que obtemos por um acompanhamento processual eficiente e diferenciado, de modo a ',
      'prestar todo o suporte legal necessário para facilitar a tomada de decisões tempestivas em um ',
      'mundo tão dinâmico.'
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
      <Box style={{ width: "60px", height: "60px", borderRadius: "40px", position: "fixed", bottom: "60px", right: "10px", zIndex: "9999" }} >
        <FloatingWhatsApp
          phoneNumber='+55(61) 98452-3149'
          accountName='Adv Kleber Alves'
          statusMessage='Disponível de Segunda a Sábado, entre 09hrs e 18hrs'
          chatMessage='Olá, como posso ajudar?'
          placeholder='Mensagem:'
          avatar={Chat}
        />
      </Box>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar style={{ backgroundColor: '#2c2c2c' }} sx={{ flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            // color="inherit"
            style={{ color: '#FFFFFF' }}
            noWrap sx={{ flexGrow: 1 }}
          >
            Advocacia Alves Bezerra
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
      {/* Hero unit */}
      <Container data-aos='fade-up' disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Advocacia Alves Bezerra
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisi odio, condimentum eu pulvinar sed, dapibus euismod ipsum.'}
          {'Etiam finibus imperdiet pulvinar. In vel massa pretium, finibus ex scelerisque, lobortis elit. Sed egestas, mi id congue iaculis,'}
          {'magna eros dictum tellus, et sagittis dolor purus in orci. Duis at tortor quis est facilisis luctus nec in nulla.'}
        </Typography>
      </Container>
      {/* End hero unit */}

      {/* Slides */}
      <div data-aos="fade-up">
        <Slides />
      </div>
      <br></br>

      {/* Cards */}
      <ResponsiveCards />

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
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Index() {
  return <TelaInicial />;
}