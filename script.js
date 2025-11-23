function generateUniqueNumbers(maxInclusive, howMany){
  const chosen = new Set();
  while(chosen.size < howMany){
    const n = Math.floor(Math.random() * maxInclusive) + 1; // 1..maxInclusive
    chosen.add(n);
  }
  return Array.from(chosen).sort((a,b)=>a-b);
}

function renderBalls(container, numbers){
  container.innerHTML = "";
  for(const num of numbers){
    const el = document.createElement("span");
    el.className = "ball";
    el.setAttribute("role","listitem");
    el.textContent = String(num);
    container.appendChild(el);
  }
}

function draw(){
  const main = generateUniqueNumbers(50, 5); // 5 aus 1-50
  const euro = generateUniqueNumbers(12, 2); // 2 aus 1-12 (seit 2022)
  const mainEl = document.getElementById("main-numbers");
  const euroEl = document.getElementById("euro-numbers");
  renderBalls(mainEl, main);
  renderBalls(euroEl, euro);
  return { main, euro };
}

function formatPick(p){
  const a = p.main.join(" ? ");
  const b = p.euro.join(" ? ");
  return `EuroJackpot: [${a}] + Eurozahlen [${b}]`;
}

function init(){
  let current = draw();

  const btn = document.getElementById("draw-btn");
  btn.addEventListener("click", ()=>{ current = draw(); });

  const shareBtn = document.getElementById("share-btn");
  shareBtn.addEventListener("click", async ()=>{
    const text = formatPick(current) + "\n\nNur Zufall ? keine Gewinn-Garantie.";
    try{
      if(navigator.share){
        await navigator.share({ text, title: "EuroJackpot Gl?ckszahlen" });
      } else if(navigator.clipboard){
        await navigator.clipboard.writeText(text);
        shareBtn.textContent = "Kopiert!";
        setTimeout(()=>{ shareBtn.textContent = "Teilen"; }, 1200);
      }
    }catch{ /* ignore */ }
  });
}

document.addEventListener("DOMContentLoaded", init);
