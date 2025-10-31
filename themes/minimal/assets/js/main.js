(function () {
  var storageKey = 'theme-preference';
  var root = document.documentElement;

  function getCurrentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch (err) {
      // Ignore storage errors (e.g., private mode)
    }
    updateToggleLabels(theme);
  }

  function updateToggleLabels(theme) {
    var label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    var icon = theme === 'dark' ? '🌙' : '☀️';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      var labelNode = btn.querySelector('.theme-toggle__label');
      var iconNode = btn.querySelector('.theme-toggle__icon');
      if (labelNode) {
        labelNode.textContent = label;
      }
      if (iconNode) {
        iconNode.textContent = icon;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var stored;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {
      stored = null;
    }
    if (stored && (stored === 'dark' || stored === 'light')) {
      setTheme(stored);
    } else {
      updateToggleLabels(getCurrentTheme());
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
      btn.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          btn.click();
        }
      });
    });
  });
})();
