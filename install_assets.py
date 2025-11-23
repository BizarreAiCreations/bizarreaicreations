#!/usr/bin/env python3
"""
Asset Installation Script for Abdülkadir Altınel Sigorta Website
Moves client-provided assets from source directory to project structure
"""

import os
import shutil
from pathlib import Path

# Source directory (client-provided assets)
SOURCE_DIR = Path("/home/patron/Projects/Altinel_Portfolio_V2/additional_files/")

# Destination directories
ASSETS_DIR = Path("assets/img")
PARTNERS_DIR = ASSETS_DIR / "partners"

# Asset mapping (source -> destination)
ASSET_MAPPING = {
    # Main logo
    "logo.jpg": ASSETS_DIR / "logo.jpg",
    
    # Partner logos
    "AKSigorta.jpg": PARTNERS_DIR / "aksigorta.jpg",
    "Allianz.jpg": PARTNERS_DIR / "allianz.jpg",
    "Axa Sigorta.jpg": PARTNERS_DIR / "axa.jpg",
    "Corpus Sigorta.jpg": PARTNERS_DIR / "corpus.jpg",
    "HDI Sigorta.jpg": PARTNERS_DIR / "hdi.jpg",
    "Mapfre Sigorta.jpg": PARTNERS_DIR / "mapfre.jpg",
}

def create_directories():
    """Create destination directories if they don't exist"""
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    PARTNERS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✅ Created directories:")
    print(f"   - {ASSETS_DIR}")
    print(f"   - {PARTNERS_DIR}")

def install_assets():
    """Copy assets from source to destination"""
    print(f"\n📂 Source Directory: {SOURCE_DIR}")
    print(f"📂 Destination: {ASSETS_DIR}\n")
    
    # Check if source directory exists
    if not SOURCE_DIR.exists():
        print(f"❌ ERROR: Source directory not found: {SOURCE_DIR}")
        print(f"   Please verify the path and try again.")
        return False
    
    # Process each asset
    success_count = 0
    error_count = 0
    
    for source_name, destination_path in ASSET_MAPPING.items():
        source_path = SOURCE_DIR / source_name
        
        print(f"📥 Processing: {source_name}")
        
        if not source_path.exists():
            print(f"   ⚠️  Source file not found: {source_path}")
            error_count += 1
            continue
        
        try:
            # Copy file (preserving metadata)
            shutil.copy2(source_path, destination_path)
            file_size = destination_path.stat().st_size / 1024  # KB
            print(f"   ✅ Installed: {destination_path} ({file_size:.1f} KB)")
            success_count += 1
        except Exception as e:
            print(f"   ❌ Error: {e}")
            error_count += 1
    
    # Summary
    print("\n" + "="*60)
    print("📊 INSTALLATION SUMMARY")
    print("="*60)
    print(f"✅ Successful: {success_count}/{len(ASSET_MAPPING)}")
    print(f"❌ Failed: {error_count}/{len(ASSET_MAPPING)}")
    
    if success_count == len(ASSET_MAPPING):
        print("\n🎉 All assets installed successfully!")
        return True
    elif success_count > 0:
        print("\n⚠️  Some assets could not be installed. Please check the errors above.")
        return False
    else:
        print("\n❌ No assets were installed. Please verify the source directory.")
        return False

def verify_installation():
    """Verify that all assets are in place"""
    print("\n🔍 Verifying installation...\n")
    
    all_present = True
    for source_name, destination_path in ASSET_MAPPING.items():
        if destination_path.exists():
            print(f"   ✅ {destination_path}")
        else:
            print(f"   ❌ Missing: {destination_path}")
            all_present = False
    
    return all_present

def main():
    """Main execution function"""
    print("="*60)
    print("🚀 ASSET INSTALLATION SCRIPT")
    print("   Abdülkadir Altınel Sigorta Website")
    print("="*60)
    
    # Step 1: Create directories
    create_directories()
    
    # Step 2: Install assets
    if not install_assets():
        print("\n⚠️  Installation completed with errors.")
        return 1
    
    # Step 3: Verify installation
    if verify_installation():
        print("\n✅ All assets verified and ready to use!")
        print("\n📝 Next Steps:")
        print("   1. Update HTML files to reference new assets")
        print("   2. Test website on localhost")
        print("   3. Verify all images load correctly")
        return 0
    else:
        print("\n❌ Verification failed. Some assets are missing.")
        return 1

if __name__ == "__main__":
    try:
        exit(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Installation interrupted by user")
        exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        exit(1)
