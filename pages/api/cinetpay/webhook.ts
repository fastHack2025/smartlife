// pages/api/cinetpay/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const CINETPAY_API_KEY = '40344860067f7e68ada0983.52997688';
const CINETPAY_SITE_ID = '105891914';
const CINETPAY_SECRET_KEY = '182923678467f7e6e101ece5.24596428';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const {
      cpm_trans_id,
      cpm_amount,
      signature,
      cpm_custom,
      payment_status,
    } = req.body;

    // ✅ Étape 1 : Vérifier la signature (sécurité)
    const hash = crypto
      .createHmac('sha512', CINETPAY_SECRET_KEY)
      .update(`${cpm_trans_id}${cpm_amount}`)
      .digest('hex');

    if (hash !== signature) {
      console.warn('❌ Signature invalide');
      return res.status(403).json({ error: 'Signature invalide' });
    }

    // ✅ Étape 2 : Statut accepté
    if (payment_status === 'ACCEPTED') {
      console.log(`✅ Paiement accepté pour ${cpm_custom} (transaction: ${cpm_trans_id})`);

      // 👉 À PERSONNALISER : activer le compte Premium ici
      // Exemple :
      // await db.user.update({
      //   where: { email: cpm_custom },
      //   data: { premium: true, paidAt: new Date() },
      // });

      return res.status(200).json({ success: true });
    }

    console.warn(`⚠️ Paiement non finalisé : ${payment_status}`);
    return res.status(200).json({ status: payment_status });
  } catch (err: any) {
    console.error('❌ Erreur webhook CinetPay :', err.message);
    return res.status(500).json({ error: 'Erreur interne serveur' });
  }
}
