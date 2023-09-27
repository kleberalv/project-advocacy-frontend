import QuemSomos1 from '../images/QuemSomos1.png';
import QuemSomos2 from '../images/QuemSomos2.png';
import QuemSomos3 from '../images/QuemSomos3.png';
import AcomProcessos from '../../src/images/AcompProcesso.jpg';
import GerencPlataforma from '../../src/images/GerencPlataforma.jpg';
import GerencUsuarios from '../../src/images/GerencUsuarios.jpg';
import SolicitarReuniao from '../../src/images/SolicitarReuniao.jpg';
import AlterarPerfil from '../../src/images/AlterarPerfil.jpg';

export const tiers = [
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

export const footers = [
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

export const getTiersBasedOnUserProfile = (user_id_perfil, setFuncionalidade) => {
  if (user_id_perfil === 1) {
    return [
      {
        image: GerencUsuarios,
        subtitle: 'Gerenciamento dos Usuários',
        description: [
          'Siga para o gerenciamento dos usuários. Crie, edite ou inative o usuário desejável.',
        ],
        buttonText: 'Gerenciar Usuários',
        buttonVariant: 'contained',
        clique: () => setFuncionalidade(1)
      },
      {
        image: GerencPlataforma,
        subtitle: 'Configurações da Plataforma',
        description: [
          'Configure o site da forma desejada. Altere as imagens da página principal, textos e etc.',
        ],
        buttonText: 'Configurar Plataforma',
        buttonVariant: 'contained',
        clique: () => setFuncionalidade(2)
      },
      {
        image: AcomProcessos,
        subtitle: 'Acompanhe os Processos',
        description: [
          'Clique e acompanhe o andamento dos processos cadastrados.',
        ],
        buttonText: 'Andamento Processuais',
        buttonVariant: 'outlined',
        clique: () => setFuncionalidade(3)
      }
    ];
  }

  if (user_id_perfil === 2 || user_id_perfil === 3) {
    return [
      {
        image: AcomProcessos,
        subtitle: 'Acompanhe os Processos',
        description: [
          'Clique e acompanhe o andamento dos processos cadastrados.',
        ],
        buttonText: 'Andamento Processuais',
        buttonVariant: 'outlined',
        clique: () => setFuncionalidade(3)
      },
      {
        image: AlterarPerfil,
        subtitle: 'Alterar Perfil',
        description: [
          'Altere e mantenha seus dados atualizados na plataforma.',
        ],
        buttonText: 'Alterar Perfil',
        buttonVariant: 'outlined',
        clique: () => setFuncionalidade(4)
      },
      {
        image: SolicitarReuniao,
        subtitle: 'Solicitar Reunião',
        description: [
          'Solicite reunião com o advogado para retirar dúvidas',
        ],
        buttonText: 'Agendar Reunião',
        buttonVariant: 'outlined',
        clique: () => setFuncionalidade(5)
      }
    ];
  }

  return [];
};
