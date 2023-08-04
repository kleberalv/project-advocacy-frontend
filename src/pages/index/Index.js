import * as React from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
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
import imageAdv from '../../images/adv.jpg';
import QuemSomos1 from '../../images/QuemSomos1.png';
import QuemSomos2 from '../../images/QuemSomos2.png';
import QuemSomos3 from '../../images/QuemSomos3.png';
import Copyright from '../theme/Copyright';
import Navbar from '../theme/Navbar'
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const useStyles = makeStyles((theme) => ({
  media: {
    height: 10,
    paddingTop: '56.25%',
    marginTop: '30'
  }
}));

const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const tamanhoTelaAcesso = window.screen.width;

const tiers = [
  {
    image: QuemSomos1,
    title: 'Uma filosofia moderna de gestão juntamente com a tecnologia',
    subtitle: 'Sedimentado em uma atuação profissional, inovadora e dinâmica.',
    description: [
      'A organização do escritório está em consonância com os mais modernos modelos de gestão da advocacia internacional, ',
      'segmentado em bancas de atuação, assim como as grandes firmas, que permite uma excelente atuação visando sempre o melhor.',
      'para o cliente'
    ],
    buttonText: 'Agende uma reunião',
    buttonVariant: 'outlined',
  },
  {
    image: QuemSomos2,
    title: 'Pontualidade e seriedade dos compromissos com seus clientes',
    // subheader: 'Most popular',
    subtitle: 'O atendimento é realizado por um profissional capacitado na área.',
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
      <div id='id0'>
        <Navbar />
      </div>

      {/* Início do site */}
      <Grid
        container
        style={{
          backgroundColor: '#111736',
          color: '#BC953D',
          height: tamanhoTelaAcesso >= 600 ? '93vh' : '85vh'
        }}
        data-aos='zoom-in'
        component="main"
        justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: tamanhoTelaAcesso >= 600 ? '75%' : '200%',
            backgroundPosition: 'center',
            backgroundColor: '#111736'
          }}
          className={tamanhoTelaAcesso >= '600' ? 'BackgroundImageIndex' : 'BackgroundImageUsers'}
        />

        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ padding: '0 10px' }}
        >
          <Typography variant="h5" color="#FFFFFF" component="p" style={{ textAlign: tamanhoTelaAcesso >= 600 ? false : 'center' }}>
            {'Profissionalismo liberal, graduado em direito e autorizado pelas instituições competentes de cada país a exercer o jus postulandi, ou'}
            {' seja, a representação dos legítimos interesses das pessoas físicas ou jurídicas em juízo ou fora dele, quer entre si, quer ante o Estado.'}
          </Typography>

        </Grid>
      </Grid>

      {/* Slides */}
      {/* <div data-aos="fade-up">
        <ResponsiveCarousel />
      </div> */}

      {/* Cards */}
      <div id='id1'>
        <div data-aos="fade-up" >
          <div>
            <ResponsiveCards
              props={tiers}
            />
          </div>
        </div>
      </div>

      {/* Quem sou eu */}
      <div id='id2'>
        <Grid
          container
          style={{
            marginTop: '30px',
            backgroundColor: '#111736',
            color: '#BC953D',
            height: tamanhoTelaAcesso >= 600 ? '65vh' : '105vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data-aos='fade-up'
          component="main"
        >
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            style={{
              padding: '0 20px',
            }}
          >
            <Typography
              variant="h5"
              color="#FFFFFF"
              component="p"
              style={{
              }}
            >
              {'Meu nome é Kleber Alves Bezerra, e sou apaixonado pelo direito e por fazer a diferença na vida das pessoas.'}
              {'Minha trajetória é marcada por uma determinação inabalável e uma busca incansável pelos meus sonhos.'}
            </Typography>

            <Typography
              variant="h5"
              color="#FFFFFF"
              component="p"
              style={{
                marginTop: '10px'
              }}
            >
              {'Sou formado pela Universidade Católica de Brasília - UCB e atuo como advogado por volta de 5 anos.'}
              {'Tenho experiência em diversas áreas do direito, incluindo Civil, Trabalhista, Comercial, Tributário, Família e Administrativo.'}
            </Typography>
          </Grid>

          <Grid
            sm={2}
            md={2}
          />

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              borderRadius: '25px',
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            <img
              src={imageAdv}
              alt="Imagem arredondada"
              style={{
                width: '70%',
                // height: '70%',
                objectFit: 'cover',
                borderRadius: '25px',
                border: '5px solid #BC953D'
              }}
            />
          </Grid>
        </Grid>
      </div>

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
          position: 'relative',
          mb: tamanhoTelaAcesso >= 600 ? '' : '50px',
        }}
      >

        <IconButton
          className="floating-button"
          sx={{
            position: 'absolute',
            bottom: tamanhoTelaAcesso >= 600 ? '30px' : '70px',
            right: '30px',
            zIndex: '999',
            backgroundColor: '#111736',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#252e5c',
            },
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => smoothScrollTo('id0')}
        >
          <ArrowUpwardIcon />
        </IconButton>

        <Grid
          container
          data-aos="fade-down"
          spacing={4}
          justifyContent="space-evenly"
        >
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

    </React.Fragment >
  );
}

export default function Index() {
  return <TelaInicial />;
}