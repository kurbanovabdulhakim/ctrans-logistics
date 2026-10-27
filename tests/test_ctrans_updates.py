import os, re

def test_ctrans_exact_clone_updates():
    base = r"C:\Users\user\GitHub\fortisway-ctrans"
    html_path = os.path.join(base, "index.html")
    app_css_path = os.path.join(base, "css", "app.css")
    components_css_path = os.path.join(base, "css", "components.css")
    bg_img_path = os.path.join(base, "assets", "images", "bg-04.webp")
    calc_js_path = os.path.join(base, "js", "calculator.js")

    # 1. bg-04.webp asset check
    assert os.path.exists(bg_img_path), "assets/images/bg-04.webp must exist"
    assert os.path.getsize(bg_img_path) > 10000, "bg-04.webp must be valid image file"

    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 2. Check top-bar removed
    assert '<div class="top-bar">' not in html, "Top bar should be removed from body"

    # 3. Check video experience banner with bg-04.webp
    assert 'class="video-experience-section"' in html, "Video experience section required"
    assert 'Опыт работы в сфере логистических услуг' in html, "Video experience title required"
    assert 'Вы узнаете о нашей логистической службе через это видео' in html, "Video subtitle required"
    assert 'openVideoModal()' in html, "Video modal trigger required"

    # 4. Check 1-to-1 calculator structure
    assert 'class="calc-modes-grid"' in html, "4-mode transport grid required"
    assert 'data-cat="air"' in html, "Air mode required"
    assert 'data-cat="rail"' in html, "Rail mode required"
    assert 'data-cat="auto"' in html, "Auto mode required"
    assert 'data-cat="sea"' in html, "Sea mode required"
    assert 'id="calcDanger"' in html, "Danger goods checkbox required"
    assert 'Опасный груз' in html, "Danger goods label required"
    assert 'btn-calculate-green' in html, "Green calculate button required"
    assert 'calc-compact-warning' in html, "Compact warning box required"
    assert 'ВНИМАНИЕ: СТОИМОСТЬ ЯВЛЯЕТСЯ ОРИЕНТИРОВОЧНОЙ!' in html, "Warning headline required"
    assert 'Калькулятор для расчета ориентировочной стоимости грузоперевозок' in html, "Bottom description required"

    # 5. Check CSS for single-line nav links
    with open(app_css_path, "r", encoding="utf-8") as f:
        app_css = f.read()
    assert "white-space: nowrap" in app_css, "nav-link must have white-space: nowrap"

    # 6. Check JS calculator export and formulas
    with open(calc_js_path, "r", encoding="utf-8") as f:
        calc_js = f.read()
    assert "selectTransportCat" in calc_js, "selectTransportCat function required"
    assert "runCalculation" in calc_js, "runCalculation function required"
    assert "10320" in calc_js or "10,320" in calc_js, "10320 rate formula required"

if __name__ == "__main__":
    test_ctrans_exact_clone_updates()
    print("ALL CTRANS REFINEMENT TESTS PASSED PERFECTLY!")
