import React, { useState, useEffect } from 'react';
import { Laptop, Shield, Leaf, DollarSign, Star, Check, Mail, Phone, MapPin, ChevronRight, Menu, X } from 'lucide-react';
import { useCMS } from './hooks/useCMS';
import { EditableText } from './components/EditableText';
import { CMSControls } from './components/CMSControls';
import { getIcon } from './utils/iconMap';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { data, updateData, resetData, isEditing, setIsEditing } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const updateHero = (field: keyof typeof data.hero, value: string) => {
    updateData({
      hero: { ...data.hero, [field]: value }
    });
  };

  const updateNewsletter = (field: keyof typeof data.newsletter, value: string) => {
    updateData({
      newsletter: { ...data.newsletter, [field]: value }
    });
  };

  const updateContact = (field: keyof typeof data.contact, value: string) => {
    updateData({
      contact: { ...data.contact, [field]: value }
    });
  };

  const updateBenefit = (id: string, field: string, value: string) => {
    const updatedBenefits = data.benefits.map(benefit =>
      benefit.id === id ? { ...benefit, [field]: value } : benefit
    );
    updateData({ benefits: updatedBenefits });
  };

  const updateLaptop = (id: string, field: string, value: string | number) => {
    const updatedLaptops = data.laptops.map(laptop =>
      laptop.id === id ? { ...laptop, [field]: value } : laptop
    );
    updateData({ laptops: updatedLaptops });
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    const updatedTestimonials = data.testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
    );
    updateData({ testimonials: updatedTestimonials });
  };

  const updateProcessStep = (id: string, field: string, value: string) => {
    const updatedProcess = data.process.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    );
    updateData({ process: updatedProcess });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* CMS Controls */}
      <CMSControls
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onReset={resetData}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-500 p-2 rounded-xl">
                  <Laptop className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  RenoBook
                </span>
                <div className="text-xs text-emerald-400 font-medium tracking-wider">
                  PREMIUM REFURBISHED
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {data.navigation.sort((a, b) => a.order - b.order).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-200 group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </a>
              ))}
              
              {/* CTA Button */}
              <div className="ml-6">
                <button className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-2">
                    <span>Shop Now</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Menu className="h-6 w-6" />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`}>
                  <X className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl mx-4 mb-4 p-6">
              <div className="space-y-4">
                {data.navigation.sort((a, b) => a.order - b.order).map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ))}
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Shop Now</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <EditableText
                value={data.hero.title.split(' ').slice(0, -1).join(' ')}
                onChange={(value) => updateHero('title', `${value} ${data.hero.subtitle}`)}
                isEditing={isEditing}
                className="inline"
              />
              <span className="text-emerald-400 block">
                <EditableText
                  value={data.hero.subtitle}
                  onChange={(value) => updateHero('subtitle', value)}
                  isEditing={isEditing}
                  className="inline"
                />
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              <EditableText
                value={data.hero.description}
                onChange={(value) => updateHero('description', value)}
                isEditing={isEditing}
                multiline
                className="inline"
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                <EditableText
                  value={data.hero.primaryButtonText}
                  onChange={(value) => updateHero('primaryButtonText', value)}
                  isEditing={isEditing}
                  className="inline"
                />
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-500 hover:text-white transition-colors">
                <EditableText
                  value={data.hero.secondaryButtonText}
                  onChange={(value) => updateHero('secondaryButtonText', value)}
                  isEditing={isEditing}
                  className="inline"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Refurbished?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Make a smart choice for your wallet and the planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.benefits.sort((a, b) => a.order - b.order).map((benefit) => {
              const IconComponent = getIcon(benefit.icon);
              const colorClasses = {
                emerald: 'bg-emerald-500/20 group-hover:bg-emerald-500/30 text-emerald-400',
                green: 'bg-green-500/20 group-hover:bg-green-500/30 text-green-400',
                blue: 'bg-blue-500/20 group-hover:bg-blue-500/30 text-blue-400',
              };

              return (
                <div key={benefit.id} className="text-center group">
                  <div className={`w-16 h-16 ${colorClasses[benefit.color as keyof typeof colorClasses] || colorClasses.emerald} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    <EditableText
                      value={benefit.title}
                      onChange={(value) => updateBenefit(benefit.id, 'title', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    <EditableText
                      value={benefit.description}
                      onChange={(value) => updateBenefit(benefit.id, 'description', value)}
                      isEditing={isEditing}
                      multiline
                      className="inline"
                    />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Laptops */}
      <section id="laptops" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Laptops</h2>
            <p className="text-gray-400">Carefully selected and thoroughly tested</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.laptops.filter(laptop => laptop.featured).sort((a, b) => a.order - b.order).map((laptop) => {
              const colorClasses = {
                gray: 'from-gray-700 to-gray-800 text-gray-500 group-hover:text-gray-300',
                blue: 'from-blue-900/50 to-blue-800/50 text-blue-400 group-hover:text-blue-300',
                purple: 'from-purple-900/50 to-purple-800/50 text-purple-400 group-hover:text-purple-300',
              };

              return (
                <div key={laptop.id} className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-700">
                  <div className={`aspect-w-16 aspect-h-10 bg-gradient-to-br ${colorClasses[laptop.color as keyof typeof colorClasses] || colorClasses.gray} p-8`}>
                    <div className="flex items-center justify-center">
                      <Laptop className="h-24 w-24 transition-colors" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      <EditableText
                        value={laptop.name}
                        onChange={(value) => updateLaptop(laptop.id, 'name', value)}
                        isEditing={isEditing}
                        className="inline"
                      />
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      <EditableText
                        value={laptop.specs}
                        onChange={(value) => updateLaptop(laptop.id, 'specs', value)}
                        isEditing={isEditing}
                        className="inline"
                      />
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-white">
                          $<EditableText
                            value={laptop.price.toString()}
                            onChange={(value) => updateLaptop(laptop.id, 'price', parseInt(value) || 0)}
                            isEditing={isEditing}
                            className="inline"
                          />
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          $<EditableText
                            value={laptop.originalPrice.toString()}
                            onChange={(value) => updateLaptop(laptop.id, 'originalPrice', parseInt(value) || 0)}
                            isEditing={isEditing}
                            className="inline"
                          />
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-emerald-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1">{laptop.rating}</span>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors">
              View All Laptops
            </button>
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Quality Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every laptop goes through our comprehensive 47-point inspection
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {data.process.sort((a, b) => a.order - b.order).map((step) => (
              <div key={step.id} className="text-center">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="font-semibold text-white mb-2">
                  <EditableText
                    value={step.title}
                    onChange={(value) => updateProcessStep(step.id, 'title', value)}
                    isEditing={isEditing}
                    className="inline"
                  />
                </h3>
                <p className="text-gray-400 text-sm">
                  <EditableText
                    value={step.description}
                    onChange={(value) => updateProcessStep(step.id, 'description', value)}
                    isEditing={isEditing}
                    multiline
                    className="inline"
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.sort((a, b) => a.order - b.order).map((testimonial) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
              };

              return (
                <div key={testimonial.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "<EditableText
                      value={testimonial.comment}
                      onChange={(value) => updateTestimonial(testimonial.id, 'comment', value)}
                      isEditing={isEditing}
                      multiline
                      className="inline"
                    />"
                  </p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[testimonial.color as keyof typeof colorClasses] || colorClasses.blue} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                      <EditableText
                        value={testimonial.initials}
                        onChange={(value) => updateTestimonial(testimonial.id, 'initials', value)}
                        isEditing={isEditing}
                        className="inline"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-white">
                        <EditableText
                          value={testimonial.name}
                          onChange={(value) => updateTestimonial(testimonial.id, 'name', value)}
                          isEditing={isEditing}
                          className="inline"
                        />
                      </p>
                      <p className="text-gray-400 text-sm">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            <EditableText
              value={data.newsletter.title}
              onChange={(value) => updateNewsletter('title', value)}
              isEditing={isEditing}
              className="inline"
            />
          </h2>
          <p className="text-gray-400 mb-8">
            <EditableText
              value={data.newsletter.description}
              onChange={(value) => updateNewsletter('description', value)}
              isEditing={isEditing}
              multiline
              className="inline"
            />
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Laptop className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold">RenoBook</span>
              </div>
              <p className="text-gray-400 mb-4">
                Premium refurbished laptops with quality you can trust.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            {data.footer.sort((a, b) => a.order - b.order).map((section) => (
              <div key={section.id}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>
                    <EditableText
                      value={data.contact.phone}
                      onChange={(value) => updateContact('phone', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>
                    <EditableText
                      value={data.contact.email}
                      onChange={(value) => updateContact('email', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    <EditableText
                      value={data.contact.address}
                      onChange={(value) => updateContact('address', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RenoBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;