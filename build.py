import os
from jinja2 import Environment, FileSystemLoader

def build():
    # Setup Jinja2 environment to load from templates and pages directories
    env = Environment(loader=FileSystemLoader(['src/templates', 'src/pages']))
    
    out_dir = '.' # Output to website root directory
    
    pages = [
        ('index.html', 'Home'),
        ('about.html', 'About'),
        ('projects.html', 'Projects'),
        ('skills.html', 'Skills'),
        ('contact.html', 'Contact')
    ]
    
    for filename, title in pages:
        template = env.get_template(filename)
        # We pass `current_page` to highlight the active menu link
        rendered_html = template.render(current_page=filename)
        
        out_path = os.path.join(out_dir, filename)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(rendered_html)
        print(f"Generated {out_path}")

if __name__ == '__main__':
    build()
