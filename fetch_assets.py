#!/usr/bin/env python3
"""
Asset Fetcher Script for Abdülkadir Altınel Sigorta Website
Downloads partner logos and attempts to fetch main company logo
"""

import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

# Create assets directory structure
ASSETS_DIR = Path("assets/img")
PARTNERS_DIR = ASSETS_DIR / "partners"
PARTNERS_DIR.mkdir(parents=True, exist_ok=True)

# Partner companies with their logo sources
PARTNERS = {
    'aksigorta': {
        'name': 'AKSigorta',
        'urls': [
            'https://logo.clearbit.com/aksigorta.com.tr',
            'https://www.google.com/s2/favicons?sz=128&domain=aksigorta.com.tr'
        ]
    },
    'allianz': {
        'name': 'Allianz',
        'urls': [
            'https://logo.clearbit.com/allianz.com',
            'https://logo.clearbit.com/allianz.com.tr'
        ]
    },
    'axa': {
        'name': 'Axa Sigorta',
        'urls': [
            'https://logo.clearbit.com/axa.com',
            'https://logo.clearbit.com/axasigorta.com.tr'
        ]
    },
    'corpus': {
        'name': 'Corpus Sigorta',
        'urls': [
            'https://logo.clearbit.com/corpussigorta.com.tr',
            'https://www.google.com/s2/favicons?sz=128&domain=corpussigorta.com.tr'
        ]
    },
    'hdi': {
        'name': 'HDI Sigorta',
        'urls': [
            'https://logo.clearbit.com/hdi.com.tr',
            'https://www.google.com/s2/favicons?sz=128&domain=hdi.com.tr'
        ]
    },
    'mapfre': {
        'name': 'Mapfre Sigorta',
        'urls': [
            'https://logo.clearbit.com/mapfre.com',
            'https://logo.clearbit.com/mapfre.com.tr'
        ]
    }
}

# Main company logo sources to try
MAIN_LOGO_URLS = [
    'https://www.abdulkadiraltinel.com.tr/images/logo.png',
    'https://www.abdulkadiraltinel.com.tr/logo.png',
    'https://abdulkadiraltinel.com.tr/assets/logo.png',
]

def download_file(url, destination):
    """Download a file from URL to destination"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = response.read()
            
            # Check if we got actual content (not just a 404 page)
            if len(data) > 500:  # Logos should be at least 500 bytes
                with open(destination, 'wb') as f:
                    f.write(data)
                return True
    except Exception as e:
        print(f"  ⚠️  Failed to download from {url}: {str(e)[:50]}")
    return False

def create_text_logo_svg(name, filename):
    """Create a simple text-based SVG logo"""
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
  <rect width="200" height="60" fill="#B91C1C" rx="8"/>
  <text x="100" y="35" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">{name}</text>
</svg>'''
    
    with open(filename, 'w') as f:
        f.write(svg_content)
    print(f"  ✅ Created text-based SVG: {filename}")

def fetch_partner_logos():
    """Fetch all partner logos"""
    print("\n🔍 Fetching Partner Logos...\n")
    
    success_count = 0
    for partner_key, partner_data in PARTNERS.items():
        partner_name = partner_data['name']
        destination = PARTNERS_DIR / f"{partner_key}.png"
        
        print(f"📥 {partner_name}:")
        
        # Try each URL until one works
        downloaded = False
        for url in partner_data['urls']:
            if download_file(url, destination):
                print(f"  ✅ Downloaded from: {url}")
                downloaded = True
                success_count += 1
                break
        
        # If download failed, create a text-based SVG
        if not downloaded:
            svg_destination = PARTNERS_DIR / f"{partner_key}.svg"
            create_text_logo_svg(partner_name, svg_destination)
    
    print(f"\n✨ Partner logos fetched: {success_count}/{len(PARTNERS)}")
    return success_count

def fetch_main_logo():
    """Fetch or create main company logo"""
    print("\n🔍 Fetching Main Logo...\n")
    
    destination = ASSETS_DIR / "logo.png"
    
    # Try to download from known URLs
    for url in MAIN_LOGO_URLS:
        print(f"📥 Trying: {url}")
        if download_file(url, destination):
            print(f"  ✅ Main logo downloaded successfully!")
            return True
    
    # If all downloads failed, create a professional text-based SVG
    print("  ⚠️  Could not fetch logo from website")
    print("  🎨 Creating custom SVG logo...")
    
    svg_destination = ASSETS_DIR / "logo.svg"
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80">
  <!-- Background -->
  <rect width="240" height="80" fill="#FFFFFF" rx="12"/>
  
  <!-- Shield Icon -->
  <path d="M30 20 L30 35 C30 45 35 50 40 52 C45 50 50 45 50 35 L50 20 L40 15 Z" 
        fill="#B91C1C" stroke="#991B1B" stroke-width="1.5"/>
  
  <!-- Company Name -->
  <text x="65" y="35" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#0F172A">
    ALTINEL
  </text>
  <text x="65" y="52" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="#B91C1C">
    SİGORTA
  </text>
  <text x="65" y="65" font-family="Inter, Arial, sans-serif" font-size="9" font-weight="400" fill="#64748B">
    1995'den Beri Güven
  </text>
</svg>'''
    
    with open(svg_destination, 'w') as f:
        f.write(svg_content)
    
    print(f"  ✅ Custom logo created: {svg_destination}")
    return False

def create_favicon():
    """Create a simple favicon"""
    print("\n🎨 Creating Favicon...\n")
    
    favicon_svg = ASSETS_DIR / "favicon.svg"
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#B91C1C" rx="20"/>
  <path d="M50 20 L50 45 C50 60 55 68 65 72 C75 68 80 60 80 45 L80 20 L65 10 Z" 
        fill="white" stroke="white" stroke-width="2"/>
</svg>'''
    
    with open(favicon_svg, 'w') as f:
        f.write(svg_content)
    
    print(f"  ✅ Favicon created: {favicon_svg}")

def main():
    """Main execution function"""
    print("=" * 60)
    print("🚀 Abdülkadir Altınel Sigorta - Asset Fetcher")
    print("=" * 60)
    
    # Create directory structure
    print(f"\n📁 Asset directories created:")
    print(f"  - {ASSETS_DIR}")
    print(f"  - {PARTNERS_DIR}")
    
    # Fetch assets
    fetch_main_logo()
    partner_count = fetch_partner_logos()
    create_favicon()
    
    # Summary
    print("\n" + "=" * 60)
    print("✨ Asset Fetching Complete!")
    print("=" * 60)
    print(f"\n📊 Summary:")
    print(f"  - Main Logo: ✅ Created")
    print(f"  - Partner Logos: {partner_count}/6 downloaded")
    print(f"  - Favicon: ✅ Created")
    print(f"\n📂 Assets saved to: {ASSETS_DIR.absolute()}")
    print("\n💡 Next steps:")
    print("  1. Review logos in assets/img/ folder")
    print("  2. Replace placeholder logos with company-provided versions if available")
    print("  3. Run the website to see the visual improvements")
    print("\n✅ Ready for HTML integration!\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Asset fetching interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        sys.exit(1)
