import React from 'react';
import Box from '@mui/material/Box';
import FloatingWhatsApp from 'react-floating-whatsapp';
import Chat from '../images/Chat.png';

function WhatsApp() {
    return (
        <Box style={{ width: "60px", height: "60px", borderRadius: "40px", position: "fixed", bottom: "60px", right: "10px", zIndex: "9999" }} >
            <FloatingWhatsApp
                phoneNumber='+55(61) 98452-3149'
                accountName='Adv Kleber Alves'
                statusMessage='Disponível de segunda a sábado, das 09:00 as 18:00'
                chatMessage='Olá, como posso ajudar?'
                placeholder='Mensagem:'
                avatar={Chat}
            />
        </Box>
    );
}

export default function WhatsAppButton() {
    return WhatsApp();
}
