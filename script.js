// typing effect
const texts = ["Cloud Engineer ☁️", "Docker Enthusiast 🐳", "DevOps & Automation ⚙️"];
let cur = 0, pos = 0, forward = true;
const TGT = document.getElementById('typed-text');
function tick(){
  if(!TGT) return;
  const str = texts[cur];
  if(forward){
    pos++;
    TGT.textContent = str.slice(0,pos);
    if(pos===str.length){ forward=false; setTimeout(tick,1200); return; }
  } else {
    pos--;
    TGT.textContent = str.slice(0,pos);
    if(pos===0){ forward=true; cur=(cur+1)%texts.length; setTimeout(tick,200); return; }
  }
  setTimeout(tick, forward ? 80 : 40);
}
tick();

// mouse parallax on hero layers
const hero = document.querySelector('.hero');
if(hero){
  hero.addEventListener('mousemove', (e)=>{
    const w = hero.offsetWidth, h = hero.offsetHeight;
    const x = (e.clientX - hero.getBoundingClientRect().left) - w/2;
    const y = (e.clientY - hero.getBoundingClientRect().top) - h/2;
    const layers = document.querySelectorAll('.layer');
    layers.forEach((L, i)=>{
      const depth = (i+1)*6;
      const tx = -x * (depth/200);
      const ty = -y * (depth/200);
      L.style.transform = `translate3d(${tx}px, ${ty}px, ${-i*40}px) scale(${1 + i*0.05})`;
    });
    // tilt profile
    const profile = document.getElementById('profile-3d');
    const px = x / (w/2), py = y / (h/2);
    profile.style.transform = `rotateY(${px*8}deg) rotateX(${-py*8}deg) translateZ(20px)`;
  });
  hero.addEventListener('mouseleave', ()=>{
    document.querySelectorAll('.layer').forEach((L,i)=> L.style.transform = '');
    const profile = document.getElementById('profile-3d');
    if(profile) profile.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

// small tilt for cards on mousemove
document.querySelectorAll('[data-tilt]').forEach(el=>{
  el.addEventListener('mousemove', (e)=>{
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * 12; // rotateX
    const ry = (px - 0.5) * -12; // rotateY
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  });
  el.addEventListener('mouseleave', ()=>{
    el.style.transform = '';
  });
});
