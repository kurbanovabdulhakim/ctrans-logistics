import os, re

def test_calculator_file_and_logic():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    calc_path = os.path.join(base, 'js', 'calculator.js')
    assert os.path.exists(calc_path), 'js/calculator.js must exist'
    
    with open(calc_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    assert 'calculateFreight' in code, 'calculateFreight function required'
    assert 'china_yiwu' in code, 'china_yiwu route required'
    assert 'russia_moscow' in code, 'russia_moscow route required'
    assert 'tashkent' in code, 'tashkent route required'
    assert 'LogisticsFortisway' in code, 'FortisWay telegram contact required'

def test_tracker_file_and_stages():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    tracker_path = os.path.join(base, 'js', 'tracker.js')
    assert os.path.exists(tracker_path), 'js/tracker.js must exist'
    
    with open(tracker_path, 'r', encoding='utf-8') as f:
        code = f.read()
        
    assert 'trackCargo' in code, 'trackCargo function required'
    assert 'FW-' in code or 'trackNumber' in code, 'trackNumber handling required'
    assert 'Принят на складе' in code, 'Stage 1 required'
    assert 'Таможенная очистка' in code, 'Stage 5 required'

def test_currency_file():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    curr_path = os.path.join(base, 'js', 'currency.js')
    assert os.path.exists(curr_path), 'js/currency.js must exist'
    
    with open(curr_path, 'r', encoding='utf-8') as f:
        code = f.read()
        
    assert 'USD' in code, 'USD rate required'
    assert 'CNY' in code, 'CNY rate required'
    assert 'UZS' in code, 'UZS base required'
