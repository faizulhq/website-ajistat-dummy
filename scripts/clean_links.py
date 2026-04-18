import re

files = [
    'frontend/src/app/program-ajibiz/page.tsx',
    'frontend/src/app/program-ajidigi/page.tsx',
    'frontend/src/app/program-ajilanguage/page.tsx',
    'frontend/src/app/program-ajipr/page.tsx'
]

pattern = re.compile(r'<Link\s+href="/konsultasi"[\s\S]*?Konsultasi Gratis\s*</Link>', re.MULTILINE)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern.sub('', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
print("Removed Konsultasi Link from Hubs!")
