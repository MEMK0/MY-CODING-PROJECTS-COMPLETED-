// Smooth scroll for anchor links and count-up animation
document.addEventListener('DOMContentLoaded', function(){

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // count up animation
  const counters = document.querySelectorAll('.num');
  const speed = 200; // lower = faster
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/[^0-9]/g,'');
      const increment = target / speed;
      if(count < target){
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(updateCount, 40);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          updateCount();
          io.unobserve(counter);
        }
      });
    }, {threshold:0.6});
    io.observe(counter);
  });

  // simple carousel auto scroll for deals
  const carousel = document.querySelector('.deals-carousel');
  if(carousel){
    let pos = 0;
    setInterval(()=>{
      pos = (pos+1) % carousel.children.length;
      // Instead of scrollIntoView (which moves the page),
      // just scroll the carousel container itself
      carousel.scrollTo({
        left: carousel.children[pos].offsetLeft,
        behavior: 'smooth'
      });
    }, 3500);
  }
});
