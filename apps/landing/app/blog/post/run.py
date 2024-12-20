import os
import re

def update_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Check if BASE_URL constant is already defined
    if 'const BASE_URL' in content:
        print(f"BASE_URL already defined in: {file_path}")
        return False  # No changes made

    # Add BASE_URL constant after the last import statement
    import_pattern = r'^import.*$'
    matches = list(re.finditer(import_pattern, content, re.MULTILINE))
    if matches:
        last_import = matches[-1]
        insert_position = last_import.end() + 1
        base_url_constant = "\nconst BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.olly.social';\n"
        content = content[:insert_position] + base_url_constant + content[insert_position:]

    # Regular expression to find the alternates object
    pattern = r'alternates:\s*{\s*canonical:\s*`?[\'"]?(https?://[^`\'"]+|/[^`\'"]+)[\'"]?`?\s*,'
    
    # Function to replace the matched group
    def replacer(match):
        path = match.group(1)
        if path.startswith('http'):
            # Extract the path from the full URL
            path = '/' + '/'.join(path.split('/')[3:])
        return f'alternates: {{ canonical: `${{BASE_URL}}{path}`,'

    # Perform the replacement
    updated_content = re.sub(pattern, replacer, content)

    if updated_content != content:
        with open(file_path, 'w') as file:
            file.write(updated_content)
        return True  # Changes made
    else:
        return False  # No changes needed

def process_directory(directory):
    files_updated = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == 'page.tsx':
                file_path = os.path.join(root, file)
                if update_file(file_path):
                    print(f"Updated: {file_path}")
                    files_updated += 1
                else:
                    print(f"No changes needed: {file_path}")
    return files_updated

if __name__ == "__main__":
    project_directory = input("Enter the path to your Next.js project directory: ")
    files_updated = process_directory(project_directory)
    print(f"Bulk update completed. {files_updated} files were updated.")