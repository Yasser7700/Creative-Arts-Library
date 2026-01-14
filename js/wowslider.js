// WowSlider Engine
(function() {
  'use strict';
  
  var ws = {
    version: '9.0.0',
    container: null,
    slides: [],
    currentIndex: 0,
    autoPlay: true,
    interval: 5000,
    timer: null,
    isPlaying: true
  };
  
  ws.init = function(containerId) {
    ws.container = document.getElementById(containerId);
    if (!ws.container) return;
    
    ws.slides = ws.container.querySelectorAll('.ws_images > ul > li');
    if (ws.slides.length === 0) return;
    
    ws.showSlide(0);
    if (ws.autoPlay) {
      ws.startAutoPlay();
    }
    
    // Navigation buttons
    var prevBtn = ws.container.querySelector('.ws_bullets .ws_prev');
    var nextBtn = ws.container.querySelector('.ws_bullets .ws_next');
    if (prevBtn) prevBtn.addEventListener('click', ws.prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', ws.nextSlide);
    
    // Bullets
    var bullets = ws.container.querySelectorAll('.ws_bullets a');
    bullets.forEach(function(bullet, index) {
      bullet.addEventListener('click', function(e) {
        e.preventDefault();
        ws.showSlide(index);
      });
    });
    
    // Play/Pause
    var playPause = ws.container.querySelector('.ws_playpause');
    if (playPause) {
      playPause.addEventListener('click', ws.togglePlayPause);
    }
  };
  
  ws.showSlide = function(index) {
    if (index < 0 || index >= ws.slides.length) return;
    
    ws.slides.forEach(function(slide, i) {
      slide.style.display = i === index ? 'block' : 'none';
    });
    
    // Update bullets
    var bullets = ws.container.querySelectorAll('.ws_bullets a');
    bullets.forEach(function(bullet, i) {
      bullet.classList.toggle('ws_selbull', i === index);
    });
    
    ws.currentIndex = index;
  };
  
  ws.nextSlide = function() {
    var next = (ws.currentIndex + 1) % ws.slides.length;
    ws.showSlide(next);
  };
  
  ws.prevSlide = function() {
    var prev = (ws.currentIndex - 1 + ws.slides.length) % ws.slides.length;
    ws.showSlide(prev);
  };
  
  ws.startAutoPlay = function() {
    ws.isPlaying = true;
    ws.timer = setInterval(ws.nextSlide, ws.interval);
  };
  
  ws.stopAutoPlay = function() {
    ws.isPlaying = false;
    if (ws.timer) {
      clearInterval(ws.timer);
      ws.timer = null;
    }
  };
  
  ws.togglePlayPause = function() {
    if (ws.isPlaying) {
      ws.stopAutoPlay();
    } else {
      ws.startAutoPlay();
    }
    var playPause = ws.container.querySelector('.ws_playpause');
    if (playPause) {
      playPause.classList.toggle('ws_pause', ws.isPlaying);
      playPause.classList.toggle('ws_play', !ws.isPlaying);
    }
  };
  
  // Initialize when called
  window.wowslider_init = function() {
    ws.init('wowslider-container1');
  };
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof wowslider_init !== 'undefined') {
        wowslider_init();
      }
    });
  } else {
    if (typeof wowslider_init !== 'undefined') {
      wowslider_init();
    }
  }
  
  window.wowslider = ws;
})();
