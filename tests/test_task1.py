import os, re

def test_css_tokens_and_files():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    app_css = os.path.join(base, 'css', 'app.css')
    components_css = os.path.join(base, 'css', 'components.css')
    responsive_css = os.path.join(base, 'css', 'responsive.css')
    
    assert os.path.exists(app_css), 'css/app.css must exist'
    assert os.path.exists(components_css), 'css/components.css must exist'
    assert os.path.exists(responsive_css), 'css/responsive.css must exist'
    
    with open(app_css, 'r', encoding='utf-8') as f:
        content = f.read()
        assert '--primary' in content, '--primary CSS variable required'
        assert '--dark-bg' in content, '--dark-bg CSS variable required'
        assert '.navbar' in content, '.navbar style required'
        assert '.hero-section' in content, '.hero-section style required'
        
    logo = os.path.join(base, 'assets', 'images', 'logo_brand.jpg')
    assert os.path.exists(logo), 'assets/images/logo_brand.jpg must exist'
