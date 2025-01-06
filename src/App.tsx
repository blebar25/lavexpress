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
  Linkedin 
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface Location {
  name: string
  city: string
  zip: string
  lat: number
  lng: number
  images: string[]
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

const customIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const locations: Location[] = [
  { 
    name: '30 rue Pinel',
    city: 'Saint Denis',
    zip: '93200',
    lat: 48.9362,
    lng: 2.3574,
    images: [
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f',
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c',
      'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80'
    ]
  },
  { 
    name: '27 rue Ramey',
    city: 'Paris',
    zip: '75018',
    lat: 48.8878,
    lng: 2.3476,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '20 rue de Lancry',
    city: 'Paris',
    zip: '75010',
    lat: 48.8697,
    lng: 2.3628,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '12 rue Popincourt',
    city: 'Paris',
    zip: '75011',
    lat: 48.8589,
    lng: 2.3747,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '3 rue Thiers',
    city: 'Marseille',
    zip: '13001',
    lat: 43.2965,
    lng: 5.3698,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '52 rue des Gravilliers',
    city: 'Paris',
    zip: '75004',
    lat: 48.8637,
    lng: 2.3542,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '122 avenue de Flandre',
    city: 'Paris',
    zip: '75019',
    lat: 48.8912,
    lng: 2.3769,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '14 boulevard de la Fédération',
    city: 'Marseille',
    zip: '13004',
    lat: 43.3017,
    lng: 5.3931,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '3 rue de Douai',
    city: 'Lille',
    zip: '59000',
    lat: 50.6292,
    lng: 3.0573,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: "61 place de l'Hôtel de Ville",
    city: "Villeneuve d'Ascq",
    zip: '59650',
    lat: 50.6192,
    lng: 3.1319,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
  },
  { 
    name: '45 Place de la Victoire',
    city: 'Tourcoing',
    zip: '59200',
    lat: 50.7249,
    lng: 3.1613,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553',
      'https://images.unsplash.com/photo-1574538298279-26973f60efa3'
    ]
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
    <div className="relative h-48">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={`${images[currentImage]}?auto=format&fit=crop&q=80&w=800`}
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

function getGoogleMapsUrl(location: { lat: number; lng: number }) {
  return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
}

function MapComponent() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden relative z-0 mb-16">
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
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
            icon={customIcon}
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="relative w-40 h-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                  +33 01 76 35 06 11
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className={`w-4 h-4 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
                <a
                  href="mailto:lavexpress9@gmail.com"
                  className={`text-sm hover:text-blue-600 transition-colors ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  lavexpress9@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <motion.img
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2942&ixlib=rb-4.0.3"
                alt="Laverie moderne"
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
                Profitez de machines à laver et séchoir Electrolux, adaptés à vos besoins et à des prix compétitifs
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              {[
                { type: 'Machine à laver', capacity: '7 kg', price: '5,00 €', icon: Droplets },
                { type: 'Machine à laver', capacity: '11 kg', price: '7,80 €', icon: Droplets },
                { type: 'Machine à laver', capacity: '18 kg', price: '10,00 €', icon: Droplets },
                { type: 'Séchoir', capacity: '9 minutes', price: '1,50 €', icon: Wind },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                >
                  <div className="relative group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-center space-y-2 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{item.type}</h3>
                        <p className="text-xl font-semibold text-gray-900">{item.capacity}</p>
                      </div>
                      <p className="text-3xl font-bold text-center text-blue-600">{item.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <LocationCarousel images={location.images} />
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{location.name}</p>
                          <p className="text-gray-600">
                            {location.city}, {location.zip}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-16 text-center text-white overflow-hidden relative border border-white/20"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2942&ixlib=rb-4.0.3')] mix-blend-overlay opacity-10"></div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div 
                  className="flex justify-center mb-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 bg-white/20 rounded-full">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
                <motion.h2 
                  className="text-4xl font-bold mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Vous souhaitez ouvrir votre propre laverie ?
                </motion.h2>
                <motion.p 
                  className="text-xl mb-12 max-w-2xl mx-auto text-blue-100"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Nous vous accompagnons durant les différentes étapes de votre projet entrepreneurial. Découvrez nos services et rejoignez un réseau de laveries en pleine expansion.
                </motion.p>
                <motion.a 
                  href="https://market-j.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-8 py-4 bg-white text-[#2563EB] rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <footer className="bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo et Description */}
              <div className="space-y-6">
                <motion.div 
                  className="relative w-40 h-12"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                  Votre laverie automatique de confiance, disponible 24h/24 et 7j/7 pour répondre à tous vos besoins de lavage.
                </p>
              </div>
              
              {/* Navigation */}
              <div>
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
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Contactez-nous</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="tel:+33176350611" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>+33 01 76 35 06 11</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:lavexpress9@gmail.com" className="text-blue-100 hover:text-white transition-colors inline-flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>lavexpress9@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Horaires */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Horaires</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>Ouvert 24h/24</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span>7 jours sur 7</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-blue-800">
              <div className="flex justify-center">
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
