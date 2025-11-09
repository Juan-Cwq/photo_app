# Photo Filter App - Web Version

A real-time photo filter application built with Next.js that applies filters to your webcam feed directly in the browser.

## 🌟 Features

- **Real-time webcam capture** with browser API
- **Multiple filters**: Gaussian Blur (adjustable), Box Blur, Sharpen, Edge Detection, Grayscale
- **Adjustable Gaussian blur** with real-time kernel size and sigma control
- **Side-by-side preview** comparing original and filtered video
- **Modern UI** with Tailwind CSS and smooth animations
- **Download images** directly from the browser
- **No backend required** - all processing happens client-side

## 🚀 Quick Start

### Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Juan-Cwq/photo_app)

### Manual Deploy

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts** to link your project

## 🎮 How to Use

1. **Grant camera permission** when prompted by your browser
2. **Select a filter** from the control panel on the left
3. **Adjust parameters** for Gaussian blur using the sliders
4. **Toggle side-by-side** to compare original vs filtered
5. **Download** your filtered image with the download button

## 🎨 Available Filters

| Filter | Description | Adjustable |
|--------|-------------|------------|
| **Gaussian Blur** | Smooth blur with adjustable kernel and sigma | ✅ Yes |
| **Box Blur** | Fast averaging blur (5×5 kernel) | ❌ No |
| **Sharpen** | Edge enhancement filter | ❌ No |
| **Edge Detection** | Sobel edge detection | ❌ No |
| **Grayscale** | Convert to black and white | ❌ No |

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Processing**: Canvas API
- **Deployment**: Vercel

## 📱 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Requires HTTPS for webcam access (except localhost)

## 🔒 Privacy

- All processing happens **locally in your browser**
- **No data is sent to any server**
- **No images are stored** (except when you download)
- Webcam access is **only active while using the app**

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is the web version of the Photo Filter App. For the desktop Python version, see `photo_filter.py`.
