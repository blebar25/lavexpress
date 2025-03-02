import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalNoticeProps {
  onClose: () => void;
}

const LegalNotice = ({ onClose }: LegalNoticeProps) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl max-w-4xl h-[90%] mt-[5%] w-full overflow-y-auto relative"        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-8">
          <motion.h1 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mentions Légales
          </motion.h1>

          <motion.div 
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
              <p className="mb-4">
                Le site lavexpress-pro.fr est édité par :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Société : LAV EXPRESS</li>
                <li>Forme juridique : SARL, société à responsabilité limitée</li>
                <li>Capital social : 	40 000,00 €</li>
                <li>Siège social : 7 RUE BENJAMIN FRANKLIN, 75016 PARIS</li>
                <li>SIRET : 81386676100139</li>
                <li>Directeur de la publication : Sacha Russo</li>
              </ul>
            </section>

            <section className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
              <p>
              Le site est hébergé par :
Hostinger International Ltd
Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre
Site web : https://www.hostinger.fr
Téléphone : +33 1 76 54 41 25
              </p>
            </section>

            <section className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
                Toute reproduction ou représentation, totale ou partielle, de ce site ou de son contenu est interdite 
                sans l'autorisation expresse de LAV EXPRESS.
              </p>
            </section>

            <section className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">4. Contact</h2>
              <p>
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse : {' '}
                <a 
                  href="mailto:Lavexpress9@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  Lavexpress9@gmail.com
                </a>
              </p>
            </section>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalNotice;
