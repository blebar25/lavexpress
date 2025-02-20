import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowDown, 
  ArrowRight, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Droplets, 
  Mail, 
  MapPin, 
  Phone, 
  Wind, 
  Navigation, 
  Menu, 
  Facebook, 
  Instagram, 
  Linkedin,
  FileText
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import LegalNotice from './components/LegalNotice'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  name: string
  city: string
  zip: string
  lat: number
  lng: number
  images: string[]
  has6kgMachines: boolean
}

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8
    }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const locations: Location[] = [
  { 
    name: '30 rue Pinel',
    city: 'Saint Denis',
    zip: '93200',
    lat: 48.9310795,
    lng: 2.3582699,
    images: [
      new URL('./assets/images/Pinel/Pinel1.jpeg', import.meta.url).href,
      new URL('./assets/images/Pinel/Pinel2.jpeg', import.meta.url).href,
      new URL('./assets/images/Pinel/Pinel3.jpeg', import.meta.url).href,
      new URL('./assets/images/Pinel/Pinel4.jpeg', import.meta.url).href,
      new URL('./assets/images/Pinel/Pinel5.jpeg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '27 rue Ramey',
    city: 'Paris',
    zip: '75018',
    lat: 48.888606,
    lng: 2.346681,
    images: [
      new URL('./assets/images/Ramey/Ramey_1.jpeg', import.meta.url).href,
      new URL('./assets/images/Ramey/Ramey_2.jpeg', import.meta.url).href,
      new URL('./assets/images/Ramey/Ramey_3.jpeg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '20 rue de Lancry',
    city: 'Paris',
    zip: '75010',
    lat: 48.8699915,
    lng: 2.3609963,
    images: [
      new URL('./assets/images/Lancry/Lancry_1.jpeg', import.meta.url).href,
      new URL('./assets/images/Lancry/Lancry_2.jpeg', import.meta.url).href,
      new URL('./assets/images/Lancry/Lancry_3.jpeg', import.meta.url).href,
      new URL('./assets/images/Lancry/Lancry_4.jpeg', import.meta.url).href,
      new URL('./assets/images/Lancry/Lancry_5.jpeg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '12 rue Popincourt',
    city: 'Paris',
    zip: '75011',
    lat: 48.8573974,
    lng: 2.3774104,
    images: [
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ],
    has6kgMachines: false
  },
  { 
    name: '3 rue Thiers',
    city: 'Marseille',
    zip: '13001',
    lat: 43.2991812,
    lng: 5.3848223,
    images: [
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ],
    has6kgMachines: false
  },
  { 
    name: '52 rue des Gravilliers',
    city: 'Paris',
    zip: '75004',
    lat: 48.8643283,
    lng: 2.3556424,
    images: [
      new URL('./assets/images/Gravilliers/GRAVILLIERS_06.jpg', import.meta.url).href,
      new URL('./assets/images/Gravilliers/GRAVILLIERS_07.jpg', import.meta.url).href,
      new URL('./assets/images/Gravilliers/GRAVILLIERS_10.jpg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '122 avenue de Flandre',
    city: 'Paris',
    zip: '75019',
    lat: 48.8924342,
    lng: 2.3795358,
    images: [
      new URL('./assets/images/Flandre/Flandre_1.jpeg', import.meta.url).href,
      new URL('./assets/images/Flandre/Flandre_2.jpeg', import.meta.url).href,
      new URL('./assets/images/Flandre/Flandre_3.jpeg', import.meta.url).href,
      new URL('./assets/images/Flandre/Flandre_4.jpeg', import.meta.url).href,
      new URL('./assets/images/Flandre/Flandre_5.jpeg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '14 boulevard de la Fédération',
    city: 'Marseille',
    zip: '13004',
    lat: 43.3110358,
    lng: 5.4023875,
    images: [
      new URL('./assets/images/Fédération/Fédé_1.jpeg', import.meta.url).href,
      new URL('./assets/images/Fédération/Fédé_2.jpeg', import.meta.url).href,
      new URL('./assets/images/Fédération/Fédé_3.jpeg', import.meta.url).href,
      new URL('./assets/images/Fédération/Fédé_4.jpeg', import.meta.url).href,
      new URL('./assets/images/Fédération/Fédé_5.jpeg', import.meta.url).href,
      new URL('./assets/images/Fédération/Fédé_6.jpeg', import.meta.url).href,
      new URL('./assets/images/Fédération/Fédé_7.jpeg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '3 rue de Douai',
    city: 'Lille',
    zip: '59000',
    lat: 50.624145,
    lng: 3.0685508,
    images: [
      new URL('./assets/images/Douai/IMG_2083.JPG', import.meta.url).href,
      new URL('./assets/images/Douai/IMG_2084.JPG', import.meta.url).href,
      new URL('./assets/images/Douai/IMG_2085.JPG', import.meta.url).href,
      new URL('./assets/images/Douai/IMG_2086.JPG', import.meta.url).href,
      new URL('./assets/images/Douai/IMG_2087.JPG', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: "61 place de l'Hôtel de Ville",
    city: "Villeneuve d'Ascq",
    zip: '59650',
    lat: 50.6199,
    lng: 3.130538,
    images: [
      new URL('./assets/images/V2/V2_1.jpeg', import.meta.url).href,
      new URL('./assets/images/V2/V2_2.jpeg', import.meta.url).href,
      new URL('./assets/images/V2/V2_3.jpeg', import.meta.url).href,
      new URL('./assets/images/V2/V2_4.jpeg', import.meta.url).href
    ],
    has6kgMachines: false
  },
  { 
    name: '45 Place de la Victoire',
    city: 'Tourcoing',
    zip: '59200',
    lat: 50.7172396,
    lng: 3.1570098,
    images: [
      new URL('./assets/images/Victoire/IMG_2117.jpg', import.meta.url).href,
      new URL('./assets/images/Victoire/IMG_2118.jpg', import.meta.url).href,
      new URL('./assets/images/Victoire/IMG_2119.jpg', import.meta.url).href,
      new URL('./assets/images/Victoire/IMG_2120.jpg', import.meta.url).href,
      new URL('./assets/images/Victoire/IMG_2121.jpg', import.meta.url).href,
      new URL('./assets/images/Victoire/IMG_2122.jpg', import.meta.url).href
    ],
    has6kgMachines: false
  },
]

interface LocationCarouselProps {
  images: string[]
}

function LocationCarousel({ images }: LocationCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-40 sm:h-48 md:h-56">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Laverie"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button 
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImage ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function getGoogleMapsUrl(location: Location) {
  const address = encodeURIComponent(`${location.name}, ${location.zip} ${location.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${address}`;
}

function MapComponent() {
  return (
    <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden relative z-0 mb-8 sm:mb-16">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
                <p className="text-gray-600 mb-3">{location.city}, {location.zip}</p>
                <motion.a
                  href={getGoogleMapsUrl(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#2563EB] !text-white px-4 py-2 rounded-lg hover:bg-[#2563EB]/90 transition-colors [&>*]:!text-white"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Itinéraire</span>
                </motion.a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [showLegalNotice, setShowLegalNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {showLegalNotice && (
          <LegalNotice onClose={() => setShowLegalNotice(false)} />
        )}
      </AnimatePresence>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="relative w-40 h-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl rotate-3 opacity-70" />
              <div className="absolute inset-0 bg-white rounded-xl -rotate-3" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lav Express
                </span>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
                <span className={`text-sm whitespace-pre-line ${scrolled ? 'text-gray-600' : 'text-white'}`}>
                  7H - 22H
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className={`w-4 h-4 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
                <a
                  href="tel:+33176350611"
                  className={`text-sm hover:text-blue-600 transition-colors ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  01 76 35 06 11
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className={`w-4 h-4 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
                <a
                  href="mailto:Lavexpress9@gmail.com"
                  className={`text-sm hover:text-blue-600 transition-colors ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  Lavexpress9@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center py-32 sm:py-40">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <motion.img
                src="/lavexpress/images/laverie.jpg"
                alt="Lav Express"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
            </div>
          </div>
          <motion.div 
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-6xl font-bold text-white mb-8"
              variants={fadeInUp}
            >
              Bienvenue chez{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lav Express
              </span>
            </motion.h1>
            <motion.p 
              className="text-2xl text-blue-100 max-w-3xl mx-auto mb-12"
              variants={fadeInUp}
            >
              Votre laverie automatique, proche de chez vous,
              <br />
              ouverte de 7h00 à 22h00, 7J/7
            </motion.p>
            <motion.div 
              className="inline-flex space-x-4"
              variants={fadeInUp}
            >
              <a
                href="#locations"
                className="px-8 py-4 bg-white text-[#2563EB] rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300"
              >
                Trouver une laverie
              </a>
              <a
                href="#prices"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Voir les tarifs
              </a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="text-white animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>
          </motion.div>
        </section>

        <section className="py-32 bg-white relative overflow-hidden" id="prices">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nos tarifs
                </span>
              </h2>
              <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                Profitez de machines à laver <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xl font-medium bg-blue-500 text-white">rapides et super essorantes</span>, ainsi que de séchoirs Electrolux, adaptés à vos besoins et à des prix compétitifs
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8"
              variants={staggerContainer}
            >
              {[
                { type: 'Machine à laver', capacity: '6 kg', price: '3,80 €', icon: Droplets },
                { type: 'Machine à laver', capacity: '7 kg', price: '5,00 €', icon: Droplets },
                { type: 'Machine à laver', capacity: '11 kg', price: '7,80 €', icon: Droplets },
                { type: 'Machine à laver', capacity: '18 kg', price: '11,90 €', icon: Droplets },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                >
                  <div className="relative group bg-[#F8FBFF] rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-blue-100 h-full">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#EDF3FF] p-4 rounded-full mb-4">
                        <item.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-center mb-1">{item.type}</h3>
                      <p className="text-gray-600 text-center mb-4 text-sm md:text-base">{item.capacity}</p>
                      <p className="text-2xl md:text-3xl font-bold text-blue-600">{item.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="flex justify-center"
              variants={fadeInUp}
            >
              <div className="w-full max-w-sm">
                <div className="relative group bg-[#F8FBFF] rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#EDF3FF] p-4 rounded-full mb-4">
                      <Wind className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-1">Séchoir</h3>
                    <p className="text-gray-600 text-center mb-4">9 minutes</p>
                    <p className="text-3xl font-bold text-blue-600">1,50 €</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section 
          id="locations" 
          className="py-32 bg-gray-50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nos laveries
                </span>
              </h2>
              <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                Trouvez la laverie la plus proche de chez vous
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <MapComponent />
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
              variants={staggerContainer}
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <LocationCarousel images={location.images} />
                      {location.has6kgMachines && (
                        <div className="absolute top-2 left-2 z-10">
                          {/* <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Machines 6kg
                          </span> */}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <p style={{ fontSize: '12px' }} className="font-semibold text-gray-900">{location.name}</p>
                          <p style={{ fontSize: '12px' }} className="text-gray-600">
                            {location.city}
                          </p>
                          <p style={{ fontSize: '12px' }} className="text-gray-600">
                            {location.zip}
                          </p>
                        </div>
                      </div>
                      <a
                        href={getGoogleMapsUrl(location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center space-x-2 w-full justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Itinéraire</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          id="entrepreneur" 
          className="py-32 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
            </div>
          </div>
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4 relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.5
                }}
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{
                  color: "white",
                  backgroundImage: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
                  backgroundSize: "100%",
                  backgroundRepeat: "repeat",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none"
                }}
              >
                Ouvrir votre propre laverie
              </motion.h2>
              <motion.p 
                className="text-xl text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                Investissez dans un secteur en pleine croissance avec un accompagnement personnalisé à chaque étape de votre projet.
              </motion.p>
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div 
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 relative overflow-hidden group"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                  delay: 0.2
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mb-6 text-blue-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Étude personnalisée</h3>
                  <p className="text-blue-100">Analyse approfondie de l'emplacement et étude de marché détaillée pour maximiser votre réussite.</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 relative overflow-hidden group"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                  delay: 0.4
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mb-6 text-blue-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Formation complète</h3>
                  <p className="text-blue-100">Support technique, formation à la gestion et accompagnement continu pour votre réussite.</p>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 relative overflow-hidden group"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                  delay: 0.6
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mb-6 text-blue-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Business plan adapté</h3>
                  <p className="text-blue-100">Un modèle économique éprouvé avec un retour sur investissement attractif.</p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.a
                href="mailto:contact@laveriexpert.com?subject=Discuter de votre projet"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 ease-in-out rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-10 group-hover:rotate-90 ease"></span>
                <span className="relative flex items-center">
                  Discuter de votre projet
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </motion.a>

              <motion.a
                href="mailto:contact@laveriexpert.com?subject=En savoir plus"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition-all duration-200 ease-in-out rounded-full overflow-hidden bg-transparent"
              >
                <span className="absolute inset-0 w-full h-full border-2 border-white rounded-full"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-10 group-hover:rotate-90 ease"></span>
                <span className="relative flex items-center text-white">
                  En savoir plus
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </motion.a>

              {/* <motion.a
                href="https://www.linkedin.com/company/laveriexpert"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 ease-in-out rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-[#0077b5]"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-10 group-hover:rotate-90 ease"></span>
                <span className="relative flex items-center">
                  LinkedIn
                  <svg className="w-5 h-5 ml-2" fill="#0077b5" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </span>
              </motion.a> */}

            </motion.div>
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <div className="relative h-32">
              <div className="absolute bottom-0 w-full">
                {/* Premier niveau de vagues */}
                <svg className="w-full h-24 fill-current text-white/10" viewBox="0 0 1440 120" preserveAspectRatio="none">
                  <path d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z"></path>
                </svg>
                {/* Troisième niveau de vagues */}
                <svg className="absolute bottom-0 w-full h-24 fill-current text-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
                  <path d="M0,120 L1440,120 L1440,60 C1320,90 1200,90 1080,60 C960,30 840,30 720,60 C600,90 480,90 360,60 C240,30 120,30 0,60 Z"></path>
                </svg>
              </div>
              {/* Particules décoratives */}
              <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-float" style={{ left: '10%', bottom: '40%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float-delayed" style={{ left: '20%', bottom: '60%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-40 animate-float" style={{ left: '30%', bottom: '50%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-float-delayed" style={{ left: '40%', bottom: '30%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-float" style={{ left: '60%', bottom: '40%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float-delayed" style={{ left: '70%', bottom: '60%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-40 animate-float" style={{ left: '80%', bottom: '50%' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-float-delayed" style={{ left: '90%', bottom: '30%' }}></div>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Logo et Description */}
              <div className="space-y-4 sm:space-y-6">
                <motion.div 
                  className="relative w-32 sm:w-40 h-10 sm:h-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl rotate-3 opacity-70" />
                  <div className="absolute inset-0 bg-white rounded-xl -rotate-3" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Lav Express
                    </span>
                  </div>
                </motion.div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Votre laverie automatique de confiance, ouverte 7j/7 pour répondre à tous vos besoins de lavage.
                </p>
              </div>

              {/* Navigation */}
              <div className="mt-8 sm:mt-0">
                <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#prices" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Nos tarifs</span>
                    </a>
                  </li>
                  <li>
                    <a href="#locations" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Nos laveries</span>
                    </a>
                  </li>
                  <li>
                    <a href="#entrepreneur" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4" />
                      <span>Ouvrir une laverie</span>
                    </a>
                  </li>
                  <li>
                  <button
                      onClick={() => setShowLegalNotice(true)}
                      className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>Mentions légales</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="mt-8 sm:mt-0">
                <h3 className="text-lg font-semibold text-white mb-6">Contactez-nous</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="tel:+33176350611" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>01 76 35 06 11</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:Lavexpress9@gmail.com" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Lavexpress9@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Horaires */}
              <div className="mt-8 sm:mt-0">
                <h3 className="text-lg font-semibold text-white mb-6">Horaires</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>Ouvert de 7H00 à 22H00</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span>7 jours sur 7</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-blue-800">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
                <p className="text-blue-100 text-sm">
                  &copy; {new Date().getFullYear()} Lav Express. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
