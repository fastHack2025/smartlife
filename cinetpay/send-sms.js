// cinetpay/send-sms.js
const axios = require('axios');

const API_KEY = '40344860067f7e68ada0983.52997688';
const SITE_ID = '105891914';
const SECRET_KEY = '182923678467f7e6e101ece5.24596428';

// Exemple d’envoi de SMS via CinetPay (format simulé pour prestataire local CinetPay)

const sendSMS = async () => {
  try {
    const payload = {
      apikey: API_KEY,
      site_id: SITE_ID,
      message: '🔔 Rappel SmartLife : N\'oubliez pas votre tâche d’aujourd’hui !',
      phone: '+237694341586',
      sender_id: 'SmartLife',
    };

    const response = await axios.post('https://client.cinetpay.com/v1/sms/send', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Réponse SMS CinetPay :', response.data);
  } catch (error) {
    console.error('❌ Erreur lors de l’envoi du SMS :', error.response?.data || error.message);
  }
};

sendSMS();
