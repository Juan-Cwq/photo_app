# Photo Filter Application - Feature Guide

## Gaussian Blur Filter

The Gaussian blur filter is a powerful smoothing filter that uses adjustable parameters for fine-tuned control.

### Parameters

1. **Kernel Size** (K)
   - Range: 3 to 51 (odd numbers only)
   - Default: 15
   - Controls the size of the blur effect
   - Larger values = stronger blur

2. **Sigma** (S)
   - Range: 0 to infinity (practical range: 0-20)
   - Default: 0 (auto-calculated from kernel size)
   - Controls the standard deviation of the Gaussian distribution
   - Higher values = wider blur spread

### How to Use

1. Press **'G'** to activate the Gaussian blur filter
2. Adjust parameters in real-time:
   - **'+'** / **'-'** : Increase/decrease kernel size
   - **']'** / **'['** : Increase/decrease sigma value
3. **Real-Time Preview**: A large overlay appears in the center showing the parameter value
4. The current parameters are always displayed in the top-right corner

### Side-by-Side Preview Feature

When you adjust Gaussian blur parameters, the display automatically switches to a **split-screen comparison view**:

**Layout:**
```
┌─────────────────────┬─────────────────────┐
│ [ORIGINAL]          │ [FILTERED]          │
│                     │                     │
│  Unfiltered         │  With current       │
│  video feed         │  Gaussian blur      │
│                     │                     │
│                     ║                     │
│                     ║ Cyan dividing line  │
│                     ║                     │
│                     │                     │
│      [Kernel Size: 21]                    │
└─────────────────────┴─────────────────────┘
```

**Features:**
- **Left side**: Original unfiltered video (labeled "ORIGINAL")
- **Right side**: Filtered video with current parameters (labeled "FILTERED")
- **Cyan dividing line**: Clear visual separation between views
- **Parameter display**: Current value shown at bottom center with fade effect
- **Auto-fade**: Returns to normal full-screen view after ~2 seconds
- **Immediate comparison** - see the exact difference the parameter makes

**Visual Design:**
- Labels have dark backgrounds with borders (gray for original, green for filtered)
- Parameter text has semi-transparent background with cyan fading border
- Both sides maintain full height, resized to half width
- Smooth transition back to normal view

Example parameter displays:
- `Kernel Size: 21`
- `Sigma: 5`

### Mathematical Background

The Gaussian blur uses a 2D Gaussian function:

```
G(x, y) = (1 / 2πσ²) * e^(-(x² + y²) / 2σ²)
```

Where:
- σ (sigma) is the standard deviation
- x, y are distances from the center pixel

## Drop-Down Menu System

The application features a modern, easy-to-read drop-down menu that displays all controls in an organized format.

### Menu Features

- **Clean Design**: Button-style keyboard shortcuts with labels
- **Organized Sections**: Three clearly separated sections
- **Semi-transparent Background**: Dark overlay (85% opacity) for readability
- **Color-Coded Elements**:
  - Cyan header and border
  - Light blue section titles
  - Green highlight for Gaussian blur (featured filter)
  - Orange for Gaussian controls
  - Gray for standard options
- **Minimized State**: Shows small "Press 'L' for Menu" tab when closed
- **Toggle on/off** with the 'L' key

### Menu Layout

When open, the menu displays:

```
╔═══════════════════════════════════════╗
║ CONTROLS MENU                         ║
╠═══════════════════════════════════════╣
║ FILTERS                               ║
║ ┌───┐ No Filter                       ║
║ │ 0 │                                 ║
║ └───┘                                 ║
║ ┌───┐ Simple Blur                     ║
║ │ 1 │                                 ║
║ └───┘                                 ║
║ ┌───┐ Gaussian Blur ★                 ║
║ │ G │                                 ║
║ └───┘                                 ║
║ ┌───┐ Box Blur                        ║
║ │ B │                                 ║
║ └───┘                                 ║
║ ┌───┐ Sharpen                         ║
║ │ 2 │                                 ║
║ └───┘                                 ║
║ ┌───┐ Edge Detection                  ║
║ │ 3 │                                 ║
║ └───┘                                 ║
║                                       ║
║ GAUSSIAN CONTROLS                     ║
║ ┌─────┐ Kernel Size                   ║
║ │ +/- │                               ║
║ └─────┘                               ║
║ ┌─────┐ Sigma Value                   ║
║ │ [ ] │                               ║
║ └─────┘                               ║
║                                       ║
║ COMMANDS                              ║
║ ┌───┐ Toggle Menu                     ║
║ │ L │                                 ║
║ └───┘                                 ║
║ ┌───┐ Save Frame                      ║
║ │ S │                                 ║
║ └───┘                                 ║
║ ┌───┐ Quit                            ║
║ │ Q │                                 ║
║ └───┘                                 ║
╚═══════════════════════════════════════╝
```

### Minimized State

When closed (press 'L'), only a small tab appears:

```
┌─────────────────────┐
│ Press 'L' for Menu  │
└─────────────────────┘
```

## Filter Comparison

| Filter | Type | Adjustable | Use Case |
|--------|------|------------|----------|
| Simple Blur (1) | Gaussian | No | Quick smoothing |
| Gaussian Blur (G) | Gaussian | Yes | Precise control, noise reduction |
| Box Blur (B) | Convolution | No | Fast averaging, uniform blur |
| Sharpen (2) | Convolution | No | Edge enhancement |
| Edge Detection (3) | Canny | No | Find edges, outlines |

## Tips

1. **Start with default values** when activating Gaussian blur
2. **Increase kernel size** for stronger blur effects
3. **Adjust sigma** for fine-tuning the blur distribution
4. **Toggle legend off** (press 'L') when you need full screen view
5. **Save interesting results** with 'S' key
6. **Experiment** with different parameter combinations in real-time!
