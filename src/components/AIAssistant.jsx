'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Phone, Mail, MapPin, Calendar } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm Luna, your personal guide to Serenity Living! 🌙✨ I'm here to help answer any questions about our upcoming senior living community. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const commonQuestions = [
    {
      question: "Are you open now?",
      answer: "Serenity Living is open and welcoming residents! 🌸 Our beautiful facility is ready to provide exceptional assisted living services. Would you like to schedule a tour or learn more about our available suites and services?"
    },
    {
      question: "What services do you offer?",
      answer: "Serenity Living offers comprehensive senior care services including:\n• Assisted Living with 24/7 care\n• Memory Care specialized programs\n• Personal Care services\n• Rehabilitation services\n• Wellness and activity programs\n• Restaurant-style dining\n• Housekeeping and maintenance\n\nWhat specific service interests you most?"
    },
    {
      question: "Where are you located?",
      answer: "We're located at 120 Rice Dr, Gilbert, SC 29054! 📍 It's a beautiful, peaceful area perfect for our senior living community. We're easily accessible and close to medical facilities, shopping, and family gathering spots. Would you like directions or more information about our neighborhood?"
    },
    {
      question: "How can I schedule a tour?",
      answer: "I'd love to help you schedule a tour! 🏡 We offer comprehensive tours of our beautiful facility. You can:\n\n📞 Call us at (839) 329-6084\n📧 Email us at serenitylivingoflexington@gmail.com\n📅 Use our online booking system\n\nWould you prefer to speak with someone directly about scheduling?"
    },
    {
      question: "What are your prices?",
      answer: "Our pricing is competitive with the area while offering exceptional value! 💰 We have different pricing tiers based on:\n• Level of care needed\n• Apartment size and amenities\n• Services included\n\nI'd recommend speaking with our admissions team for detailed pricing information. They can provide quotes based on your specific needs and discuss any available options. Would you like me to connect you with them?"
    },
    {
      question: "How do I reserve a spot?",
      answer: "Great question! You can secure your new home with us today! 🏠✨\n\nHere's how to get started:\n1. Schedule a tour and consultation\n2. Discuss your care needs and preferences\n3. Choose your preferred apartment and care level\n4. Complete the admission process\n\nWe have several suites available now! Would you like to start the process or speak with someone about our current availability?"
    }
  ]

  const getContactInfo = () => {
    return "For more detailed information or to speak with a human, here are the best ways to reach us:\n\n📞 Phone: (839) 329-6084\n📧 Email: serenitylivingoflexington@gmail.com\n🏠 Address: 120 Rice Dr, Gilbert, SC 29054\n🌐 Visit our website for virtual tours and updates\n\nOur team is available Monday-Friday 9AM-6PM, and weekends 10AM-4PM. We'd love to hear from you!"
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Check for common questions
    for (const qa of commonQuestions) {
      if (message.includes(qa.question.toLowerCase().split(' ')[0]) || 
          message.includes(qa.question.toLowerCase().split(' ')[1]) ||
          message.includes('open') && qa.question.includes('open') ||
          message.includes('service') && qa.question.includes('services') ||
          message.includes('location') && qa.question.includes('located') ||
          message.includes('where') && qa.question.includes('located') ||
          message.includes('tour') && qa.question.includes('tour') ||
          message.includes('visit') && qa.question.includes('tour') ||
          message.includes('price') && qa.question.includes('prices') ||
          message.includes('cost') && qa.question.includes('prices') ||
          message.includes('reserve') && qa.question.includes('reserve') ||
          message.includes('book') && qa.question.includes('reserve')) {
        return qa.answer
      }
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      return "Hello there! 👋 It's wonderful to meet you! I'm Luna, and I'm here to help you learn about Serenity Living. What brings you to our website today? Are you looking for senior living options for yourself or a loved one?"
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're so welcome! 😊 I'm happy to help! Is there anything else you'd like to know about Serenity Living? I love sharing information about our upcoming community!"
    }

    // Goodbye responses
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return "Thank you so much for chatting with me! 👋 Please don&apos;t hesitate to reach out anytime. We're always here to help, and I'm excited about the possibility of welcoming you to the Serenity Living family! Have a wonderful day! ✨"
    }

    // Additional question handling
    if (message.includes('staff') || message.includes('nurse') || message.includes('doctor') || message.includes('medical')) {
      return "Great question about our medical care! 👩‍⚕️ Serenity Living will have:\n• 24/7 licensed nursing staff\n• On-call physicians\n• Medication management\n• Health monitoring services\n• Coordination with local hospitals and specialists\n\nOur team will work closely with your existing doctors and can help coordinate all your healthcare needs!"
    }

    if (message.includes('food') || message.includes('meal') || message.includes('dining') || message.includes('restaurant') || message.includes('kitchen')) {
      return "You'll love our dining experience! 🍽️ We're planning:\n• Restaurant-style dining with chef-prepared meals\n• Multiple meal options daily\n• Special dietary accommodations\n• Beautiful dining rooms with great atmosphere\n• Room service available\n• Snacks and beverages throughout the day\n\nNutrition is so important for healthy aging, and our culinary team will make sure every meal is both delicious and nutritious!"
    }

    if (message.includes('activity') || message.includes('activities') || message.includes('fun') || message.includes('entertainment') || message.includes('social')) {
      return "We believe in active, engaging lifestyles! 🎨🎵 Our activity program will include:\n• Arts and crafts workshops\n• Music therapy and entertainment\n• Exercise and wellness classes\n• Game nights and social hours\n• Educational programs and guest speakers\n• Gardening and outdoor activities\n• Religious and spiritual services\n• Transportation for community outings\n\nThere will always be something fun happening at Serenity Living!"
    }

    if (message.includes('apartment') || message.includes('room') || message.includes('unit') || message.includes('space') || message.includes('size')) {
      return "Our apartments will be designed for comfort and independence! 🏠 We'll offer:\n• Studio, one-bedroom, and two-bedroom options\n• Private bathrooms with safety features\n• Kitchenettes in select units\n• Emergency call systems\n• Beautiful views and natural lighting\n• Individual climate control\n• Ample storage space\n\nEach apartment will feel like home while providing the care and support you need!"
    }

    if (message.includes('insurance') || message.includes('medicare') || message.includes('medicaid') || message.includes('payment') || message.includes('financing')) {
      return "We understand healthcare financing can be complex! 💳 We'll work with:\n• Private pay options\n• Long-term care insurance\n• Veterans benefits (for qualifying veterans)\n• We're exploring Medicare and Medicaid acceptance\n\nOur admissions team specializes in helping families understand their options and find the best financial solution. They can review your specific situation and insurance benefits!"
    }

    if (message.includes('memory') || message.includes('alzheimer') || message.includes('dementia') || message.includes('cognitive')) {
      return "We'll have specialized memory care services! 🧠💙 Our memory care will feature:\n• Secure, specially designed environment\n• Trained memory care specialists\n• Structured daily routines and activities\n• Family support and education programs\n• Safe outdoor spaces for walking\n• Person-centered care approaches\n\nMemory care requires special expertise, and our team will be specially trained to provide compassionate, dignified care for residents with cognitive challenges."
    }

    if (message.includes('pet') || message.includes('dog') || message.includes('cat') || message.includes('animal')) {
      return "We love furry family members! 🐕🐱 Our pet policy will be:\n• Small pets welcome (with some restrictions)\n• Pet-friendly common areas\n• Assistance with pet care when needed\n• Beautiful grounds for walking dogs\n• Pet therapy programs\n\nWe know how important pets are for emotional well-being and companionship!"
    }

    if (message.includes('family') || message.includes('visitor') || message.includes('visit') || message.includes('guest')) {
      return "Family is so important to us! 👨‍👩‍👧‍👦 We'll have:\n• Open visiting hours (within reason)\n• Beautiful common areas for family gatherings\n• Guest dining options\n• Family education and support programs\n• Regular family communication about care\n• Special event spaces for celebrations\n\nWe encourage family involvement and want everyone to feel welcome at Serenity Living!"
    }

    if (message.includes('safety') || message.includes('security') || message.includes('emergency')) {
      return "Safety is our top priority! 🛡️ Our security features will include:\n• 24/7 staffed facility\n• Emergency call systems in every room\n• Secure building access\n• Well-lit pathways and common areas\n• Emergency preparedness procedures\n• Medical emergency response protocols\n• Fire safety systems throughout\n\nYour peace of mind and safety are paramount to us!"
    }

    if (message.includes('transportation') || message.includes('drive') || message.includes('car') || message.includes('shopping') || message.includes('appointment')) {
      return "We'll help you stay connected to the community! 🚐 Our transportation services will include:\n• Scheduled trips to shopping centers\n• Medical appointment transportation\n• Social outings and entertainment\n• Religious services transportation\n• Pharmacy and grocery runs\n\nYou won't need to worry about driving or getting around - we've got you covered!"
    }

    // Default response with contact info
    return `That's a wonderful question! While I try to cover the most common topics, every situation is unique and deserves personalized attention. 🤗\n\n${getContactInfo()}\n\nIs there anything else I can help you with in the meantime?`
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: generateBotResponse(inputMessage.trim()),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickReplies = [
    "Are you open now?",
    "What services do you offer?",
    "How much does it cost?",
    "Can I schedule a tour?",
    "Where are you located?"
  ]

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 2 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open chat with Luna"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
            <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </div>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md lg:max-w-lg h-[70vh] sm:h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Luna</h3>
                  <p className="text-xs opacity-90">Your Serenity Living Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-primary-600' : 'bg-secondary-100'}`}>
                      {message.type === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-secondary-600" />}
                    </div>
                    <div className={`rounded-2xl p-3 ${message.type === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                      <Bot size={16} className="text-secondary-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 mb-3">Quick questions to get started:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(reply)}
                      className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-200 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                For detailed information, contact us at (839) 329-6084
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}