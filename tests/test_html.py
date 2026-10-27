import os, re

def test_html_structure_and_fortisway_content():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    html_path = os.path.join(base, 'index.html')
    app_js_path = os.path.join(base, 'js', 'app.js')
    
    assert os.path.exists(html_path), 'index.html must exist'
    assert os.path.exists(app_js_path), 'js/app.js must exist'
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Check branding & company name
    assert 'FortisWay' in html or 'FORTISWAY' in html, 'FortisWay brand name required'
    assert '+998 (93) 555-22-62' in html or '+998935552262' in html, 'Phone number required'
    assert 'tel:+998935552262' in html, 'tel: link required'
    assert 'LogisticsFortisway' in html, 'Telegram channel link required'
    assert 'НДС' in html, 'VAT contract mention required'
    
    # Check key sections from CTRANS
    assert 'id="currencyTicker"' in html, 'Currency ticker required'
    assert 'id="trackerForm"' in html, 'Tracker form required'
    assert 'id="trackerModal"' in html, 'Tracker modal required'
    assert 'id="calculator"' in html or 'id="freight-calculator"' in html, 'Calculator section required'
    assert 'id="services"' in html, 'Services section required'
    assert 'id="fleet"' in html, 'Fleet section required'
    assert 'id="contacts"' in html, 'Contacts section required'
