import cv2
import numpy as np
from pathlib import Path
from datetime import datetime
import os


class PhotoFilterApp:
    """Real-time photo filter application with webcam capture and image loading."""
    
    def __init__(self):
        """Initialize the photo filter application."""
        self.cap = None
        self.current_filter = 'none'
        self.static_image = None
        self.window_name = 'Photo Filter App'
        
        # Gaussian blur parameters
        self.gaussian_kernel_size = 15  # Must be odd number
        self.gaussian_sigma = 0  # 0 means auto-calculate from kernel size
        
        # Legend display toggle
        self.show_legend = True
        
        # Parameter change preview
        self.show_param_preview = False
        self.preview_message = ""
        self.preview_timer = 0
        
    def initialize_camera(self):
        """Initialize the webcam capture."""
        self.cap = cv2.VideoCapture(0)
        
        if not self.cap.isOpened():
            raise RuntimeError("Error: Could not open webcam")
        
        # Set camera properties for better quality
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        
        print("Webcam initialized successfully")
        
    def apply_filter(self, frame):
        """
        Apply the current filter to the frame.
        
        Args:
            frame: Input image frame
            
        Returns:
            Filtered frame
        """
        if self.current_filter == 'none':
            return frame
        elif self.current_filter == 'blur':
            return self.apply_blur(frame)
        elif self.current_filter == 'gaussian':
            return self.apply_gaussian_blur(frame)
        elif self.current_filter == 'box_blur':
            return self.apply_box_blur(frame)
        elif self.current_filter == 'sharpen':
            return self.apply_sharpen(frame)
        elif self.current_filter == 'edge':
            return self.apply_edge_detection(frame)
        else:
            return frame
    
    def apply_blur(self, frame):
        """Apply Gaussian blur filter (legacy - fixed parameters)."""
        return cv2.GaussianBlur(frame, (15, 15), 0)
    
    def apply_gaussian_blur(self, frame):
        """Apply Gaussian blur filter with adjustable parameters."""
        return cv2.GaussianBlur(frame, 
                               (self.gaussian_kernel_size, self.gaussian_kernel_size), 
                               self.gaussian_sigma)
    
    def apply_box_blur(self, frame):
        """Apply box blur filter using 5x5 convolution kernel."""
        # Create 5x5 box blur kernel with all values equal to 1/25
        kernel = np.ones((5, 5), dtype=np.float32) / 25.0
        return cv2.filter2D(frame, -1, kernel)
    
    def apply_sharpen(self, frame):
        """Apply sharpening filter using kernel convolution."""
        kernel = np.array([[-1, -1, -1],
                          [-1,  9, -1],
                          [-1, -1, -1]])
        return cv2.filter2D(frame, -1, kernel)
    
    def apply_edge_detection(self, frame):
        """Apply Canny edge detection."""
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 100, 200)
        # Convert back to BGR for display
        return cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
    
    def load_image(self):
        """Load an image from file."""
        print("\nEnter image path (or press Enter to cancel): ")
        # Note: In a real application, you might want to use a file dialog
        # For now, we'll use a simple input
        return None
    
    def save_frame(self, frame):
        """Save the current frame to Downloads folder."""
        # Get Downloads folder path
        downloads_path = os.path.join(os.path.expanduser("~"), "Downloads")
        
        # Create filename with timestamp and filter name
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filter_name = self.current_filter.replace('_', '-')
        
        if self.current_filter == 'gaussian':
            filename = f"photo_filter_{filter_name}_k{self.gaussian_kernel_size}_s{self.gaussian_sigma}_{timestamp}.png"
        else:
            filename = f"photo_filter_{filter_name}_{timestamp}.png"
        
        # Full path to save
        filepath = os.path.join(downloads_path, filename)
        
        # Save the image
        cv2.imwrite(filepath, frame)
        print(f"\n✓ Image saved to Downloads: {filename}")
        print(f"  Full path: {filepath}\n")
    
    def increase_kernel_size(self):
        """Increase Gaussian kernel size (must be odd)."""
        if self.gaussian_kernel_size < 51:
            self.gaussian_kernel_size += 2
            print(f"Gaussian kernel size: {self.gaussian_kernel_size}")
            self.show_param_preview = True
            self.preview_message = f"Kernel Size: {self.gaussian_kernel_size}"
            self.preview_timer = 60  # Show for 60 frames (~2 seconds)
    
    def decrease_kernel_size(self):
        """Decrease Gaussian kernel size (must be odd)."""
        if self.gaussian_kernel_size > 3:
            self.gaussian_kernel_size -= 2
            print(f"Gaussian kernel size: {self.gaussian_kernel_size}")
            self.show_param_preview = True
            self.preview_message = f"Kernel Size: {self.gaussian_kernel_size}"
            self.preview_timer = 60
    
    def increase_sigma(self):
        """Increase Gaussian sigma value."""
        self.gaussian_sigma += 1
        print(f"Gaussian sigma: {self.gaussian_sigma}")
        self.show_param_preview = True
        self.preview_message = f"Sigma: {self.gaussian_sigma}"
        self.preview_timer = 60
    
    def decrease_sigma(self):
        """Decrease Gaussian sigma value."""
        if self.gaussian_sigma > 0:
            self.gaussian_sigma -= 1
            print(f"Gaussian sigma: {self.gaussian_sigma}")
            self.show_param_preview = True
            self.preview_message = f"Sigma: {self.gaussian_sigma}"
            self.preview_timer = 60
    
    def draw_legend(self, frame):
        """Draw a clean drop-down menu legend on the frame."""
        if not self.show_legend:
            # Show minimized legend hint
            font = cv2.FONT_HERSHEY_SIMPLEX
            hint_text = "Press 'L' for Menu"
            (text_width, text_height), _ = cv2.getTextSize(hint_text, font, 0.5, 1)
            
            # Small tab at top-left
            cv2.rectangle(frame, (10, 10), (text_width + 30, text_height + 20), (40, 40, 40), -1)
            cv2.rectangle(frame, (10, 10), (text_width + 30, text_height + 20), (0, 255, 255), 2)
            cv2.putText(frame, hint_text, (20, text_height + 15), 
                       font, 0.5, (0, 255, 255), 1, cv2.LINE_AA)
            return frame
        
        font = cv2.FONT_HERSHEY_SIMPLEX
        
        # Menu dimensions
        menu_width = 380
        menu_x = 10
        menu_y = 10
        padding = 15
        line_height = 22
        
        # Calculate menu sections
        sections = [
            {
                'title': 'FILTERS',
                'items': [
                    ('0', 'No Filter', (220, 220, 220)),
                    ('1', 'Simple Blur', (220, 220, 220)),
                    ('G', 'Gaussian Blur', (100, 255, 100)),
                    ('B', 'Box Blur', (220, 220, 220)),
                    ('2', 'Sharpen', (220, 220, 220)),
                    ('3', 'Edge Detection', (220, 220, 220)),
                ]
            },
            {
                'title': 'GAUSSIAN CONTROLS',
                'items': [
                    ('+/-', 'Kernel Size', (255, 200, 100)),
                    ('[ ]', 'Sigma Value', (255, 200, 100)),
                ]
            },
            {
                'title': 'COMMANDS',
                'items': [
                    ('L', 'Toggle Menu', (220, 220, 220)),
                    ('S', 'Save Frame', (220, 220, 220)),
                    ('Q', 'Quit', (220, 220, 220)),
                ]
            }
        ]
        
        # Calculate total height
        total_height = padding * 2
        for section in sections:
            total_height += 30 + (len(section['items']) * line_height) + 10
        
        # Draw main menu background with border
        overlay = frame.copy()
        cv2.rectangle(overlay, (menu_x, menu_y), 
                     (menu_x + menu_width, menu_y + total_height), 
                     (30, 30, 30), -1)
        cv2.addWeighted(overlay, 0.85, frame, 0.15, 0, frame)
        
        # Draw border
        cv2.rectangle(frame, (menu_x, menu_y), 
                     (menu_x + menu_width, menu_y + total_height), 
                     (0, 255, 255), 2)
        
        # Draw header
        header_height = 35
        cv2.rectangle(frame, (menu_x, menu_y), 
                     (menu_x + menu_width, menu_y + header_height), 
                     (0, 180, 180), -1)
        cv2.putText(frame, "CONTROLS MENU", (menu_x + padding, menu_y + 25), 
                   font, 0.7, (255, 255, 255), 2, cv2.LINE_AA)
        
        # Draw sections
        y_pos = menu_y + header_height + padding
        
        for section in sections:
            # Section title
            cv2.putText(frame, section['title'], (menu_x + padding, y_pos), 
                       font, 0.5, (100, 200, 255), 1, cv2.LINE_AA)
            y_pos += 25
            
            # Section items
            for key, label, color in section['items']:
                # Draw key button
                key_width = 35
                cv2.rectangle(frame, (menu_x + padding, y_pos - 15), 
                             (menu_x + padding + key_width, y_pos + 3), 
                             (60, 60, 60), -1)
                cv2.rectangle(frame, (menu_x + padding, y_pos - 15), 
                             (menu_x + padding + key_width, y_pos + 3), 
                             (100, 100, 100), 1)
                
                # Key text
                (key_w, key_h), _ = cv2.getTextSize(key, font, 0.4, 1)
                key_x = menu_x + padding + (key_width - key_w) // 2
                cv2.putText(frame, key, (key_x, y_pos - 3), 
                           font, 0.4, (255, 255, 255), 1, cv2.LINE_AA)
                
                # Label text
                cv2.putText(frame, label, (menu_x + padding + key_width + 10, y_pos - 3), 
                           font, 0.45, color, 1, cv2.LINE_AA)
                
                y_pos += line_height
            
            y_pos += 10  # Space between sections
        
        return frame
    
    def create_side_by_side_preview(self, original_frame, filtered_frame):
        """Create side-by-side comparison of original and filtered frames."""
        if not self.show_param_preview or self.preview_timer <= 0:
            return filtered_frame
        
        font = cv2.FONT_HERSHEY_SIMPLEX
        
        # Resize frames to half width for side-by-side display
        height, width = original_frame.shape[:2]
        half_width = width // 2
        
        # Resize both frames
        original_resized = cv2.resize(original_frame, (half_width, height))
        filtered_resized = cv2.resize(filtered_frame, (half_width, height))
        
        # Create side-by-side frame
        side_by_side = np.hstack([original_resized, filtered_resized])
        
        # Add labels
        label_height = 40
        label_font_scale = 0.8
        label_thickness = 2
        
        # "ORIGINAL" label on left
        cv2.rectangle(side_by_side, (10, 50), (200, 50 + label_height), (40, 40, 40), -1)
        cv2.rectangle(side_by_side, (10, 50), (200, 50 + label_height), (100, 100, 100), 2)
        cv2.putText(side_by_side, "ORIGINAL", (20, 75), 
                   font, label_font_scale, (255, 255, 255), label_thickness, cv2.LINE_AA)
        
        # "FILTERED" label on right
        cv2.rectangle(side_by_side, (half_width + 10, 50), (half_width + 200, 50 + label_height), (40, 40, 40), -1)
        cv2.rectangle(side_by_side, (half_width + 10, 50), (half_width + 200, 50 + label_height), (0, 255, 0), 2)
        cv2.putText(side_by_side, "FILTERED", (half_width + 20, 75), 
                   font, label_font_scale, (0, 255, 0), label_thickness, cv2.LINE_AA)
        
        # Add parameter value overlay at bottom center
        (text_width, text_height), _ = cv2.getTextSize(self.preview_message, font, 1.2, 2)
        
        # Calculate position for parameter text (bottom center)
        text_x = (width - text_width) // 2
        text_y = height - 30
        
        # Draw background for parameter text
        padding = 20
        cv2.rectangle(side_by_side, 
                     (text_x - padding, text_y - text_height - padding), 
                     (text_x + text_width + padding, text_y + padding), 
                     (40, 40, 40), -1)
        
        # Draw border with fade effect
        alpha = min(1.0, self.preview_timer / 20.0)
        border_color = (int(0 * alpha), int(255 * alpha), int(255 * alpha))
        cv2.rectangle(side_by_side, 
                     (text_x - padding, text_y - text_height - padding), 
                     (text_x + text_width + padding, text_y + padding), 
                     border_color, 3)
        
        # Draw parameter text
        cv2.putText(side_by_side, self.preview_message, (text_x, text_y), 
                   font, 1.2, (255, 255, 255), 2, cv2.LINE_AA)
        
        # Add dividing line
        cv2.line(side_by_side, (half_width, 0), (half_width, height), (0, 255, 255), 2)
        
        # Decrement timer
        self.preview_timer -= 1
        if self.preview_timer <= 0:
            self.show_param_preview = False
        
        return side_by_side
    
    def display_info(self, frame, original_frame=None):
        """Display current filter information on the frame."""
        font = cv2.FONT_HERSHEY_SIMPLEX
        
        # If showing parameter preview, create side-by-side view
        if self.show_param_preview and self.preview_timer > 0 and original_frame is not None:
            frame = self.create_side_by_side_preview(original_frame, frame)
        
        # Display current filter and parameters
        if self.current_filter == 'gaussian':
            text = f"Filter: GAUSSIAN BLUR (K:{self.gaussian_kernel_size}, S:{self.gaussian_sigma})"
        else:
            text = f"Filter: {self.current_filter.upper()}"
        
        # Add semi-transparent background for filter name
        (text_width, text_height), _ = cv2.getTextSize(text, font, 0.8, 2)
        cv2.rectangle(frame, (frame.shape[1] - text_width - 20, 10), 
                     (frame.shape[1] - 10, text_height + 20), (0, 0, 0), -1)
        cv2.putText(frame, text, (frame.shape[1] - text_width - 15, text_height + 15), 
                   font, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
        
        # Draw legend (only if not in side-by-side mode)
        if not (self.show_param_preview and self.preview_timer > 0):
            frame = self.draw_legend(frame)
        
        return frame
    
    def run(self):
        """Main application loop."""
        try:
            # Initialize camera
            self.initialize_camera()
            
            # Create window
            cv2.namedWindow(self.window_name, cv2.WINDOW_NORMAL)
            
            print("\n" + "="*50)
            print("Photo Filter Application Started")
            print("="*50)
            print("\nKeyboard Controls:")
            print("\nFilters:")
            print("  0 - No filter (original)")
            print("  1 - Simple blur filter")
            print("  g - Gaussian blur (adjustable parameters)")
            print("  b - Box blur filter (5x5 convolution)")
            print("  2 - Sharpen filter")
            print("  3 - Edge detection")
            print("\nGaussian Blur Controls:")
            print("  + - Increase kernel size")
            print("  - - Decrease kernel size")
            print("  ] - Increase sigma value")
            print("  [ - Decrease sigma value")
            print("\nOther:")
            print("  l - Toggle legend display")
            print("  s - Save current frame")
            print("  q or ESC - Quit")
            print("="*50 + "\n")
            
            while True:
                # Capture frame
                ret, frame = self.cap.read()
                
                if not ret:
                    print("Error: Failed to capture frame")
                    break
                
                # Apply current filter
                filtered_frame = self.apply_filter(frame)
                
                # Add info overlay (pass original frame for side-by-side preview)
                display_frame = self.display_info(filtered_frame.copy(), frame.copy())
                
                # Display the frame
                cv2.imshow(self.window_name, display_frame)
                
                # Handle keyboard input
                key = cv2.waitKey(1) & 0xFF
                
                if key == ord('q') or key == 27:  # 'q' or ESC
                    print("Quitting application...")
                    break
                elif key == ord('0'):
                    self.current_filter = 'none'
                    print("Filter: None (Original)")
                elif key == ord('1'):
                    self.current_filter = 'blur'
                    print("Filter: Simple Blur")
                elif key == ord('g') or key == ord('G'):
                    self.current_filter = 'gaussian'
                    print(f"Filter: Gaussian Blur (Kernel: {self.gaussian_kernel_size}, Sigma: {self.gaussian_sigma})")
                elif key == ord('b') or key == ord('B'):
                    self.current_filter = 'box_blur'
                    print("Filter: Box Blur (5x5 convolution)")
                elif key == ord('2'):
                    self.current_filter = 'sharpen'
                    print("Filter: Sharpen")
                elif key == ord('3'):
                    self.current_filter = 'edge'
                    print("Filter: Edge Detection")
                elif key == ord('+') or key == ord('='):
                    self.increase_kernel_size()
                elif key == ord('-') or key == ord('_'):
                    self.decrease_kernel_size()
                elif key == ord(']') or key == ord('}'):
                    self.increase_sigma()
                elif key == ord('[') or key == ord('{'):
                    self.decrease_sigma()
                elif key == ord('l') or key == ord('L'):
                    self.show_legend = not self.show_legend
                    print(f"Legend: {'ON' if self.show_legend else 'OFF'}")
                elif key == ord('s') or key == ord('S'):
                    self.save_frame(filtered_frame)
                    
        except Exception as e:
            print(f"Error: {e}")
            
        finally:
            # Cleanup
            if self.cap is not None:
                self.cap.release()
            cv2.destroyAllWindows()
            print("Application closed")


def main():
    """Entry point for the application."""
    app = PhotoFilterApp()
    app.run()


if __name__ == "__main__":
    main()
