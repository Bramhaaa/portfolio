import os
from PIL import Image, ImageOps, ImageDraw

def make_circle_icon():
    avatar_path = '/Users/bramhabajannavar/Documents/dp/WhatsApp Image 2023-10-20 at 1.05.29 PM (7).jpeg'
    output_path = 'src/app/icon.png'
    
    if not os.path.exists(avatar_path):
        print(f"Error: {avatar_path} not found.")
        return
        
    try:
        im = Image.open(avatar_path)
        
        # Crop to square first
        width, height = im.size
        size = min(width, height)
        left = (width - size) // 2
        top = (height - size) // 2
        right = (width + size) // 2
        bottom = (height + size) // 2
        im = im.crop((left, top, right, bottom))
        
        # Create circular mask
        mask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        
        # Apply mask
        im.putalpha(mask)
        
        # Resize to standard high-res icon size
        output = im.resize((512, 512), Image.Resampling.LANCZOS)
        output.save(output_path, 'PNG')
        print(f"Successfully created round icon at: {output_path}")
        
        # Save as favicon.ico with multiple sizes
        favicon_path = 'src/app/favicon.ico'
        output.save(favicon_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
        print(f"Successfully created round favicon at: {favicon_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    make_circle_icon()
