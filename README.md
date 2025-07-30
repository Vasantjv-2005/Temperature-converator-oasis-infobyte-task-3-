# 🌡️ Temperature Converter

A modern, interactive temperature conversion web application built with Next.js, React, and TypeScript. Experience the future of temperature conversion with beautiful animations, dark/light theme support, and real-time calculations.



## ✨ Features

- **🌡️ Multi-Unit Conversion**: Convert between Celsius, Fahrenheit, and Kelvin
- **🎨 Beautiful UI/UX**: Modern gradient design with glassmorphism effects
- **🌙 Dark/Light Theme**: Toggle between dark and light modes
- **✨ Interactive Animations**: Particle effects and smooth transitions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Real-time Validation**: Input validation with helpful error messages
- **🎯 Absolute Zero Protection**: Prevents invalid temperature inputs
- **📚 Reference Guide**: Built-in temperature reference points



## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Theme**: next-themes
- **Animations**: CSS animations with Tailwind




## 🎯 Usage

1. **Enter Temperature**: Input a numeric temperature value
2. **Select Unit**: Choose your input unit (Celsius, Fahrenheit, or Kelvin)
3. **Convert**: Click the "Convert Temperature" button
4. **View Results**: See conversions across all three temperature scales

### Supported Conversions

| From | To | Formula |
|------|----|---------|
| Celsius | Fahrenheit | °F = (°C × 9/5) + 32 |
| Celsius | Kelvin | K = °C + 273.15 |
| Fahrenheit | Celsius | °C = (°F - 32) × 5/9 |
| Fahrenheit | Kelvin | K = (°F - 32) × 5/9 + 273.15 |
| Kelvin | Celsius | °C = K - 273.15 |
| Kelvin | Fahrenheit | °F = (K - 273.15) × 9/5 + 32 |

## 🏗️ Project Structure

```
temperature-converter/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # UI components (Radix UI)
│   ├── theme-provider.tsx # Theme context
│   └── theme-toggle.tsx  # Theme toggle component
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── temperature-converter.tsx # Main converter component
├── package.json          # Dependencies and scripts
└── tailwind.config.ts    # Tailwind configuration
```

## 🎨 Features in Detail

### Interactive Design
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Dynamic color gradients
- **Particle Animations**: Floating particles on conversion
- **Smooth Transitions**: CSS transitions for all interactions

### Temperature Validation
- **Numeric Input**: Ensures valid number entry
- **Absolute Zero Protection**: Prevents impossible temperatures
- **Unit-Specific Validation**: Different limits for each scale
- **Real-time Feedback**: Immediate error messages

### Theme System
- **Dark Mode**: Elegant dark theme with purple accents
- **Light Mode**: Clean light theme with subtle gradients
- **System Preference**: Automatically detects user preference
- **Manual Toggle**: User-controlled theme switching

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌟 Key Features

### Temperature Conversion
- **Celsius (°C)**: Standard metric temperature scale
- **Fahrenheit (°F)**: Imperial temperature scale
- **Kelvin (K)**: Absolute temperature scale

### User Experience
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized animations and fast calculations
- **Error Handling**: Comprehensive input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ using Next.js, React, and TypeScript** 
