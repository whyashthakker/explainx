import re

def update_features_paths(file_path):
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Use regex to replace all /features/whatever with /features
        updated_content = re.sub(r'"/features/[^"]*"', '"/features"', content)
        
        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
            
        print(f"Successfully updated {file_path}")
        
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")

def main():
    # List of files to process
    files = [
        'apps/landing/data/productPageData.ts',
        'apps/landing/data/for-pages/index.ts'
    ]
    
    # Process each file
    for file_path in files:
        update_features_paths(file_path)
        
if __name__ == "__main__":
    main()