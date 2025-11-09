# Real-Time Photo Filter Application

A Python application that applies real-time filters to webcam video or loaded images.

## Features

- **Real-time webcam capture** with live video display
- **Multiple filters**: Gaussian Blur (adjustable), Box Blur (convolution), Sharpen, Edge Detection
- **Adjustable Gaussian blur** with real-time kernel size and sigma control
- **Interactive legend** displaying all available commands and filters
- **Keyboard controls** for easy filter switching and parameter adjustment
- **Convolution-based filtering** with custom kernels

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Run the application:
```bash
python photo_filter.py
```

### Keyboard Controls

#### Filters
- **'0'** - No filter (original)
- **'1'** - Simple blur filter (fixed parameters)
- **'g'** - **Gaussian blur filter (adjustable parameters)**
- **'b'** - Box blur filter (5×5 convolution kernel, all values = 1/25)
- **'2'** - Sharpen filter
- **'3'** - Edge detection

#### Gaussian Blur Controls (Real-Time Preview)
- **'+'** - Increase kernel size (range: 3-51, odd numbers only)
- **'-'** - Decrease kernel size
- **']'** - Increase sigma value
- **'['** - Decrease sigma value (minimum: 0 for auto-calculation)

**Side-by-Side Preview**: When adjusting parameters, the display automatically switches to a split-screen view:
- **Left side**: Original (unfiltered) video
- **Right side**: Filtered video with current parameters
- **Labels**: "ORIGINAL" and "FILTERED" at the top
- **Parameter display**: Current value shown at bottom center
- **Dividing line**: Cyan vertical line separating the views
- **Auto-fade**: Returns to normal view after 2 seconds

#### Other Controls
- **'l'** - Toggle legend display on/off
- **'s'** - Save current frame (automatically saved to Downloads folder)
- **'q'** or **ESC** - Quit application

### Saving Frames

When you press **'S'**, the current filtered frame is automatically saved to your **Downloads folder** with a descriptive filename:

- **Format**: `photo_filter_[filter-name]_[timestamp].png`
- **Gaussian blur**: `photo_filter_gaussian_k[size]_s[sigma]_[timestamp].png`
- **Example**: `photo_filter_gaussian_k15_s5_20251108_202345.png`
- **Location**: `~/Downloads/`

### On-Screen Menu

The application features a clean drop-down menu system:

- **Menu Open**: Press **'L'** to display the full controls menu with organized sections
- **Menu Closed**: Shows a small hint tab "Press 'L' for Menu" at the top-left
- **Design**: Modern UI with button-style keys, color-coded sections, and semi-transparent background
- **Sections**: 
  - FILTERS - All available filter options
  - GAUSSIAN CONTROLS - Parameter adjustment keys
  - COMMANDS - Save, menu toggle, and quit options

## Requirements

- Python 3.7+
- Webcam (for live video capture)
- OpenCV
- NumPy
