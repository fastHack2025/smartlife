// src/api/sendCinetSms.ts
import axios from 'axios';

const CINETPAY_API_KEY = '40344860067f7e68ada0983.52997688';
const CINETPAY_SITE_ID = '105891914';
const CINETPAY_SECRET_KEY = '182923678467f7e6e101ece5.24596428';

export const sendCinetSms = async (to: string, message: string) => {
  try {
    const response = await axios.post(
      'https://client.cinetpay.com/v1/sms/send',
      {
        apikey: CINETPAY_API_KEY,
        site_id: CINETPAY_SITE_ID,
        message: message,
        phone: to,
        sender_id: 'SmartLife',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Erreur envoi SMS via CinetPay:', error.response?.data || error.message);
    throw new Error('Échec envoi SMS');
  }
};
