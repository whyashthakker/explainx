#!/usr/bin/env python3
import os
import shutil
import sys
from pathlib import Path
from typing import List, Set


class TurboCleanup:
    def __init__(self, dirs_to_delete: List[str]):
        self.dirs_to_delete = dirs_to_delete
        self.total_size = 0
        self.total_deleted = 0
        self.processed_paths: Set[str] = set()

    def get_dir_size(self, path: Path) -> int:
        """Calculate total size of a directory."""
        total = 0
        try:
            for entry in path.rglob('*'):
                if entry.is_file():
                    total += entry.stat().st_size
        except (PermissionError, OSError) as e:
            print(f"⚠️  Error calculating size for {path}: {e}")
        return total

    def format_size(self, size: int) -> str:
        """Convert bytes to human readable format."""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size < 1024:
                return f"{size:.2f} {unit}"
            size /= 1024
        return f"{size:.2f} TB"

    def delete_directory(self, path: Path) -> None:
        """Delete a directory and update statistics."""
        try:
            # Get size before deletion
            dir_size = self.get_dir_size(path)
            
            # Use shutil.rmtree for directory removal
            shutil.rmtree(path)
            
            self.total_size += dir_size
            self.total_deleted += 1
            print(f"✅ Deleted: {path} ({self.format_size(dir_size)})")
            
        except (PermissionError, OSError) as e:
            print(f"❌ Error deleting {path}: {e}")

    def cleanup(self, start_path: Path) -> None:
        """Main cleanup function."""
        if not start_path.exists():
            print(f"Path {start_path} does not exist")
            return

        print(f"🧹 Starting cleanup from: {start_path}")
        
        try:
            # Use rglob to find all directories
            for path in start_path.rglob('*'):
                if not path.is_dir():
                    continue
                    
                # Convert to absolute path to handle symlinks
                abs_path = path.resolve()
                
                # Skip if already processed (handles symlinks)
                if str(abs_path) in self.processed_paths:
                    continue
                    
                self.processed_paths.add(str(abs_path))
                
                if path.name in self.dirs_to_delete:
                    self.delete_directory(path)

        except Exception as e:
            print(f"❌ Error during cleanup: {e}")
            raise

        # Print summary
        print("\n🎉 Cleanup completed!")
        print(f"📊 Total directories deleted: {self.total_deleted}")
        print(f"💾 Total space freed: {self.format_size(self.total_size)}")

def main():
    # Directories to be deleted
    dirs_to_delete = ['.next', 'node_modules', '.turbo']
    
    # Get start path from command line argument or use current directory
    start_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    
    # Create and run cleanup
    cleaner = TurboCleanup(dirs_to_delete)
    try:
        cleaner.cleanup(start_path)
    except KeyboardInterrupt:
        print("\n⚠️  Cleanup interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
