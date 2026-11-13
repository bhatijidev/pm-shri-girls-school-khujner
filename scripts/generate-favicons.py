import os
from PIL import Image, ImageDraw

def generate_favicons():
    client_public = os.path.join('client', 'public')
    logo_path = os.path.join(client_public, 'images', 'logo.jpg')
    
    if not os.path.exists(logo_path):
        print("Logo not found at:", logo_path)
        return

    # 1. Load logo and crop the official PM SHRI Emblem
    im = Image.open(logo_path)
    # The PM SHRI emblem is located on the left of the banner
    emblem = im.crop((68, 146, 282, 344)) # (214w x 198h)
    
    # 2. Build high-res 512x512 badge on clean white circular base with brand orange accent border
    size = 512
    badge = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    
    # Smooth circular background with brand orange ring
    margin = 8
    draw.ellipse(
        [margin, margin, size - margin, size - margin],
        fill=(255, 255, 255, 255),
        outline=(247, 148, 29, 255), # Brand Orange #F7941D
        width=16
    )
    
    # Center the emblem inside the badge
    target_inner_w = 380
    aspect = emblem.width / emblem.height
    target_inner_h = int(target_inner_w / aspect)
    emblem_resized = emblem.resize((target_inner_w, target_inner_h), Image.Resampling.LANCZOS)
    
    offset_x = (size - target_inner_w) // 2
    offset_y = (size - target_inner_h) // 2
    badge.paste(emblem_resized, (offset_x, offset_y))
    
    # 3. Generate multi-resolution favicon.ico (16, 32, 48, 64)
    ico_path = os.path.join(client_public, 'favicon.ico')
    badge.save(
        ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    print("✅ Created:", ico_path)
    
    # 4. Generate PNG favicons
    png_16 = badge.resize((16, 16), Image.Resampling.LANCZOS)
    png_16.save(os.path.join(client_public, 'favicon-16x16.png'))
    print("✅ Created: favicon-16x16.png")
    
    png_32 = badge.resize((32, 32), Image.Resampling.LANCZOS)
    png_32.save(os.path.join(client_public, 'favicon-32x32.png'))
    png_32.save(os.path.join(client_public, 'favicon.png'))
    print("✅ Created: favicon-32x32.png & favicon.png")
    
    # 5. Generate Apple Touch Icon (180x180)
    apple_icon = badge.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save(os.path.join(client_public, 'apple-touch-icon.png'))
    print("✅ Created: apple-touch-icon.png")
    
    # 6. Generate Android Chrome icons for PWA / Add to Homescreen
    android_192 = badge.resize((192, 192), Image.Resampling.LANCZOS)
    android_192.save(os.path.join(client_public, 'android-chrome-192x192.png'))
    print("✅ Created: android-chrome-192x192.png")
    
    android_512 = badge.resize((512, 512), Image.Resampling.LANCZOS)
    android_512.save(os.path.join(client_public, 'android-chrome-512x512.png'))
    print("✅ Created: android-chrome-512x512.png")
    
    # 7. Clean up temporary test files
    for temp in ['test_emblem.png', 'favicon_badge_512.png', 'favicon-512x512.png']:
        p = os.path.join(client_public, temp)
        if os.path.exists(p):
            os.remove(p)
            print("🧹 Removed temp file:", temp)

if __name__ == '__main__':
    generate_favicons()
