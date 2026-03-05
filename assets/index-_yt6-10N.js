(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const $=[{id:"independence",name:"Independence, MO",miles:0,type:"town",description:"Your journey begins here at the bustling frontier town.",hasStore:!0},{id:"kansas_crossing",name:"Kansas River Crossing",miles:102,type:"river",description:"The wide Kansas River blocks your path.",riverWidth:620,riverDepth:4.5},{id:"alcove_spring",name:"Alcove Spring",miles:166,type:"landmark",description:"A beautiful natural spring surrounded by wildflowers and carved names."},{id:"fort_kearney",name:"Fort Kearney",miles:304,type:"fort",description:"A military outpost buzzing with soldiers and traders.",hasStore:!0},{id:"chimney_rock",name:"Chimney Rock",miles:554,type:"landmark",description:"The towering 300-foot spire rises from the plains like a giant finger!"},{id:"fort_laramie",name:"Fort Laramie",miles:640,type:"fort",description:"A major trading post where mountain men swap wild stories.",hasStore:!0},{id:"independence_rock",name:"Independence Rock",miles:830,type:"landmark",description:'The "Great Register of the Desert" — thousands of names carved in stone!'},{id:"south_pass",name:"South Pass",miles:914,type:"landmark",description:"The gentle gateway through the mighty Rocky Mountains."},{id:"green_river",name:"Green River Crossing",miles:980,type:"river",description:"The swift Green River rushes through a deep canyon.",riverWidth:400,riverDepth:12},{id:"fort_bridger",name:"Fort Bridger",miles:1025,type:"fort",description:"Jim Bridger's famous trading post in the mountain wilderness.",hasStore:!0},{id:"soda_springs",name:"Soda Springs",miles:1160,type:"landmark",description:"Magical bubbling springs that taste like fizzy soda pop!"},{id:"fort_hall",name:"Fort Hall",miles:1210,type:"fort",description:"A Hudson's Bay Company post on the Snake River.",hasStore:!0},{id:"snake_river",name:"Snake River Crossing",miles:1330,type:"river",description:"The Snake River carves through a deep and dangerous canyon.",riverWidth:1e3,riverDepth:8},{id:"fort_boise",name:"Fort Boise",miles:1490,type:"fort",description:"The last fort before the rugged Blue Mountains.",hasStore:!0},{id:"blue_mountains",name:"Blue Mountains",miles:1600,type:"landmark",description:"Dense forests and steep slopes test your wagon's strength."},{id:"the_dalles",name:"The Dalles",miles:1740,type:"landmark",description:"The mighty Columbia River gorge — almost there!"},{id:"oregon_city",name:"Oregon City, OR",miles:1870,type:"destination",description:"🎉 The promised land at the end of the trail! You made it!"}],E=1870;function V(e){return $.find(t=>t.miles>e)||$[$.length-1]}function ae(e){return $.find(t=>Math.abs(t.miles-e)<5)}function U(e){return Math.min(e/E,1)}const oe=[{id:"dysentery",type:"illness",title:"🤢 Dysentery!",description:"{name} has come down with dysentery! They look absolutely miserable.",healthLoss:25,chance:.04},{id:"fever",type:"illness",title:"🤒 Fever!",description:"{name} is burning up with a terrible fever and can barely stand.",healthLoss:20,chance:.05},{id:"broken_leg",type:"illness",title:"🦴 Broken Leg!",description:"{name} tripped over a rock and broke their leg! Ouch!",healthLoss:15,chance:.03},{id:"snakebite",type:"illness",title:"🐍 Snakebite!",description:"{name} was bitten by a rattlesnake while gathering firewood!",healthLoss:30,chance:.02},{id:"cholera",type:"illness",title:"☠️ Cholera!",description:"{name} has contracted cholera from bad water. This is serious!",healthLoss:40,chance:.02},{id:"exhaustion",type:"illness",title:"😴 Exhaustion",description:"{name} is completely worn out from the grueling pace.",healthLoss:10,chance:.06},{id:"measles",type:"illness",title:"🔴 Measles!",description:"{name} has broken out in spots — it's the measles!",healthLoss:20,chance:.02},{id:"broken_wheel",type:"wagon",title:"🛞 Broken Wheel!",description:"A wagon wheel has shattered on a rock! You need a spare part to fix it.",spareParts:-1,daysLost:1,chance:.04},{id:"broken_axle",type:"wagon",title:"🪓 Broken Axle!",description:"The wagon axle snapped in two! This is a serious problem.",spareParts:-1,daysLost:2,chance:.03},{id:"broken_tongue",type:"wagon",title:"🔧 Broken Tongue!",description:"The wagon tongue broke! The oxen can't pull without it.",spareParts:-1,daysLost:1,chance:.03},{id:"thunderstorm",type:"weather",title:"⛈️ Thunderstorm!",description:"A massive thunderstorm rolls in with deafening thunder and blinding lightning!",daysLost:1,chance:.06},{id:"blizzard",type:"weather",title:"🌨️ Blizzard!",description:"A howling blizzard blankets the trail in snow! Visibility is zero.",daysLost:2,healthLoss:10,chance:.03,minMonth:10},{id:"heatwave",type:"weather",title:"🔥 Heatwave!",description:"The scorching sun beats down relentlessly. Everyone is drenched in sweat.",healthLoss:5,waterLoss:10,chance:.04,maxMonth:8},{id:"fog",type:"weather",title:"🌫️ Heavy Fog!",description:"Thick fog rolls in and you can barely see the trail ahead.",daysLost:1,chance:.04},{id:"find_food",type:"good",title:"🍖 Lucky Find!",description:"You stumble upon an abandoned camp with leftover supplies!",foodGain:30,chance:.03},{id:"friendly_natives",type:"good",title:"🤝 Friendly Travelers!",description:"Friendly travelers share tips about the trail ahead and give you supplies.",foodGain:20,chance:.04},{id:"berry_patch",type:"good",title:"🫐 Berry Patch!",description:"You discover a huge patch of wild berries! Time for a feast!",foodGain:15,chance:.05},{id:"wagon_train",type:"good",title:"🤠 Wagon Train!",description:"You meet another wagon train and trade stories around the campfire.",healthGain:5,chance:.04},{id:"clear_water",type:"good",title:"💧 Fresh Spring!",description:"You find a crystal-clear spring of fresh water. Everyone drinks their fill!",healthGain:10,chance:.04},{id:"wildflowers",type:"good",title:"🌸 Wildflower Meadow!",description:"A stunning meadow of wildflowers lifts everyone's spirits!",healthGain:5,chance:.04},{id:"thief",type:"danger",title:"🦹 Thief in the Night!",description:"Someone snuck into camp while everyone slept and stole supplies!",foodLoss:25,chance:.03},{id:"wolves",type:"danger",title:"🐺 Wolf Pack!",description:"A pack of wolves circles your camp, howling in the moonlight!",oxenLoss:1,chance:.02},{id:"stampede",type:"danger",title:"🐂 Stampede!",description:"Something spooked the oxen and they nearly stampeded off a cliff!",oxenLoss:1,chance:.02},{id:"fire",type:"danger",title:"🔥 Prairie Fire!",description:"A wall of fire sweeps across the prairie! Everyone runs for cover!",foodLoss:20,clothingLoss:1,chance:.02},{id:"river_flood",type:"danger",title:"🌊 Flash Flood!",description:"A sudden flood sweeps through camp, carrying away supplies!",foodLoss:30,ammoLoss:10,chance:.02},{id:"lost_trail",type:"special",title:"🗺️ Lost the Trail!",description:"The trail markers have disappeared. You wander for days trying to find the way.",daysLost:3,chance:.02},{id:"beautiful_sunset",type:"special",title:"🌅 Beautiful Sunset!",description:"The most incredible sunset you've ever seen paints the sky in gold and crimson.",healthGain:3,chance:.06},{id:"shooting_star",type:"special",title:"🌠 Shooting Star!",description:"{name} spots a brilliant shooting star streaking across the night sky. Make a wish!",healthGain:2,chance:.05},{id:"old_grave",type:"special",title:"⚰️ Trailside Grave",description:"You pass a lonely grave marker by the trail. A somber reminder of the journey's dangers.",chance:.05}];function re(e){const t=[...oe].sort(()=>Math.random()-.5);for(const s of t)if(!(s.minMonth&&e<s.minMonth)&&!(s.maxMonth&&e>s.maxMonth)&&Math.random()<s.chance)return s;return null}function le(e,t){if(e.description.includes("{name}")){const s=t.filter(n=>n.health>0),i=s[Math.floor(Math.random()*s.length)];return e.description.replace("{name}",i?.name||"Someone")}return e.description}const O={food:{name:"Food",icon:"🥩",unit:"lbs",price:.2,description:"Bacon, flour, beans, and dried fruit. You'll need about 200 lbs per person.",recommended:200},ammunition:{name:"Ammunition",icon:"🔫",unit:"boxes",price:2,description:"Each box has 20 bullets. Great for hunting game on the trail.",recommended:5},clothing:{name:"Clothing",icon:"👕",unit:"sets",price:10,description:"Sets of warm, sturdy clothes. Essential for cold mountain passes.",recommended:2},spareParts:{name:"Spare Parts",icon:"🔧",unit:"sets",price:10,description:"Wagon wheels, axles, and tongues. Breakdowns are common!",recommended:3},oxen:{name:"Oxen",icon:"🐂",unit:"yoke",price:40,description:"A yoke of 2 oxen to pull your wagon. More oxen = faster travel.",recommended:3}},F=[{id:"banker",name:"Banker from Boston",icon:"🎩",money:1600,description:"Plenty of money but no trail skills. Points multiplier: x1",scoreMultiplier:1},{id:"carpenter",name:"Carpenter from Ohio",icon:"🪚",money:800,description:"Some money and wagon repair skills. Points multiplier: x2",scoreMultiplier:2,bonus:"repairBonus"},{id:"farmer",name:"Farmer from Illinois",icon:"🌾",money:400,description:"Less money but great survival skills. Points multiplier: x3",scoreMultiplier:3,bonus:"foodBonus"}],C=[{id:"steady",name:"Steady",milesPerDay:14,healthDrain:0,description:"A comfortable pace. Your party stays healthy."},{id:"strenuous",name:"Strenuous",milesPerDay:18,healthDrain:2,description:"A hard push. Gets tiring after a while."},{id:"grueling",name:"Grueling",milesPerDay:22,healthDrain:5,description:"Breakneck speed! Very hard on your party."}],q=[{id:"filling",name:"Filling",lbsPerDay:3,healthBonus:2,description:"Plenty to eat! Everyone stays strong."},{id:"meager",name:"Meager",lbsPerDay:2,healthBonus:0,description:"Just enough to keep going."},{id:"bare_bones",name:"Bare Bones",lbsPerDay:1,healthBonus:-2,description:"Barely a bite. People will get weak."}],de=[{id:"first_steps",name:"First Steps",icon:"👣",description:"Begin your journey on the Oregon Trail",condition:e=>e.milesTraveled>=1},{id:"century",name:"Century Club",icon:"💯",description:"Travel 100 miles",condition:e=>e.milesTraveled>=100},{id:"halfway",name:"Halfway There!",icon:"⛰️",description:"Reach the halfway point",condition:e=>e.milesTraveled>=935},{id:"oregon_or_bust",name:"Oregon or Bust!",icon:"🏆",description:"Reach Oregon City",condition:e=>e.milesTraveled>=1870},{id:"sharpshooter",name:"Sharpshooter",icon:"🎯",description:"Get 5 hits in a single hunting trip",condition:e=>e.huntingHighScore>=5},{id:"big_spender",name:"Big Spender",icon:"💰",description:"Spend over $500 at a single store",condition:e=>e.biggestPurchase>=500},{id:"penny_pincher",name:"Penny Pincher",icon:"🪙",description:"Arrive in Oregon with over $200",condition:e=>e.milesTraveled>=1870&&e.money>=200},{id:"iron_stomach",name:"Iron Stomach",icon:"💪",description:"Complete the journey without anyone getting dysentery",condition:e=>e.milesTraveled>=1870&&!e.hadDysentery},{id:"river_master",name:"River Master",icon:"🛶",description:"Cross 3 rivers without losing any supplies",condition:e=>e.perfectCrossings>=3},{id:"survivor",name:"Survivor",icon:"🏕️",description:"Complete the journey with all party members alive",condition:e=>e.milesTraveled>=1870&&e.party.every(t=>t.health>0)},{id:"speed_demon",name:"Speed Demon",icon:"💨",description:"Reach Oregon in under 120 days",condition:e=>e.milesTraveled>=1870&&e.daysTraveled<120},{id:"fully_stocked",name:"Fully Stocked",icon:"📦",description:"Buy the maximum recommended supplies",condition:e=>e.fullyStocked},{id:"buffalo_hunter",name:"Buffalo Hunter",icon:"🦬",description:"Bag a buffalo during hunting",condition:e=>e.shotBuffalo},{id:"trailblazer",name:"Trailblazer",icon:"⭐",description:"Visit every landmark along the trail",condition:e=>e.landmarksVisited>=17},{id:"tough_cookie",name:"Tough Cookie",icon:"🍪",description:"Survive 10 negative events",condition:e=>e.negativeEvents>=10}];function ce(e,t){const s=[];for(const i of de)!t.includes(i.id)&&i.condition(e)&&s.push(i);return s}const _="oregonTrailSave";function pe(e,t,s){return{party:[{name:e,health:100,isLeader:!0},...t.map(i=>({name:i,health:100,isLeader:!1}))],profession:s,food:0,ammunition:0,clothing:0,spareParts:0,oxen:0,money:s.money,milesTraveled:0,daysTraveled:0,date:new Date(1848,2,1),pace:C[0],rations:q[0],isResting:!1,huntingHighScore:0,biggestPurchase:0,hadDysentery:!1,perfectCrossings:0,shotBuffalo:!1,fullyStocked:!1,landmarksVisited:0,negativeEvents:0,unlockedAchievements:[],gameOver:!1,won:!1,currentEvent:null,atLandmark:$[0],visitedLandmarks:["independence"],weatherEmoji:"☀️",messages:[]}}function X(e){if(e.gameOver||e.isResting)return e.isResting&&(e.party.forEach(o=>{o.health>0&&(o.health=Math.min(100,o.health+5))}),e.daysTraveled++,z(e)),e;const t=e.pace.milesPerDay+(e.oxen>3?2:0);e.milesTraveled+=t,e.daysTraveled++,z(e);const s=e.party.filter(o=>o.health>0).length,i=e.rations.lbsPerDay*s;e.food=Math.max(0,e.food-i),e.party.forEach(o=>{o.health>0&&(o.health=Math.max(0,o.health-e.pace.healthDrain),o.health=Math.min(100,o.health+e.rations.healthBonus),e.food<=0&&(o.health-=8),e.clothing>0&&H(e)>=10&&(o.health=Math.min(100,o.health+1)),o.health<=0&&(o.health=0))}),he(e);const n=H(e),a=re(n);a&&ue(e,a);const l=ae(e.milesTraveled);l&&!e.visitedLandmarks.includes(l.id)?(e.atLandmark=l,e.visitedLandmarks.push(l.id),e.landmarksVisited=e.visitedLandmarks.length):e.atLandmark=null,e.milesTraveled>=E&&(e.milesTraveled=E,e.won=!0,e.gameOver=!0,e.atLandmark=$[$.length-1]),e.party.every(o=>o.health<=0)&&(e.gameOver=!0,e.won=!1);const r=ce(e,e.unlockedAchievements);return r.length>0?(e.unlockedAchievements.push(...r.map(o=>o.id)),e.newAchievements=r):e.newAchievements=[],e}function ue(e,t){const s=le(t,e.party);if(e.currentEvent={...t,description:s},t.healthLoss){const i=e.party.filter(n=>n.health>0);if(i.length>0){const n=i[Math.floor(Math.random()*i.length)];n.health=Math.max(0,n.health-t.healthLoss),e.currentEvent.description=s.replace("{name}",n.name)}e.negativeEvents++}t.healthGain&&e.party.forEach(i=>{i.health>0&&(i.health=Math.min(100,i.health+t.healthGain))}),t.foodLoss&&(e.food=Math.max(0,e.food-t.foodLoss),e.negativeEvents++),t.foodGain&&(e.food+=t.foodGain),t.spareParts&&(e.spareParts>0?(e.spareParts+=t.spareParts,e.currentEvent.description+=" You used a spare part to fix it."):e.currentEvent.description+=" You don't have any spare parts! You lost extra days.",e.negativeEvents++),t.ammoLoss&&(e.ammunition=Math.max(0,e.ammunition-t.ammoLoss),e.negativeEvents++),t.oxenLoss&&(e.oxen=Math.max(0,e.oxen-t.oxenLoss),e.negativeEvents++),t.clothingLoss&&(e.clothing=Math.max(0,e.clothing-t.clothingLoss),e.negativeEvents++),t.id==="dysentery"&&(e.hadDysentery=!0)}function z(e){const t=new Date(e.date);t.setDate(t.getDate()+1),e.date=t}function H(e){return new Date(e.date).getMonth()+1}function he(e){const t=H(e),s=Math.random();t>=11||t<=2?e.weatherEmoji=s<.3?"🌨️":s<.6?"☁️":"❄️":t>=6&&t<=8?e.weatherEmoji=s<.5?"☀️":s<.7?"⛅":"⛈️":e.weatherEmoji=s<.4?"☀️":s<.7?"⛅":s<.85?"🌧️":"🌈"}function K(e){const t={...e,date:new Date(e.date).toISOString()};localStorage.setItem(_,JSON.stringify(t))}function ve(){const e=localStorage.getItem(_);if(!e)return null;const t=JSON.parse(e);return t.date=new Date(t.date),t.pace=C.find(s=>s.id===t.pace.id)||C[0],t.rations=q.find(s=>s.id===t.rations.id)||q[0],t}function me(){return localStorage.getItem(_)!==null}function W(){localStorage.removeItem(_)}function ye(e){let t=0;return e.party.forEach(s=>{s.health>0&&(t+=200),t+=s.health}),t+=e.food,t+=e.ammunition*5,t+=e.money,e.daysTraveled<120?t+=500:e.daysTraveled<150&&(t+=200),t*=e.profession.scoreMultiplier,Math.round(t)}function fe(e){e.innerHTML=`
    <div class="title-screen">
      <div class="stars" id="stars-container"></div>
      <div class="parallax-bg">
        <div class="mountain-layer mountain-far"></div>
        <div class="mountain-layer mountain-mid"></div>
        <div class="mountain-layer mountain-near"></div>
        <div class="prairie-layer"></div>
      </div>
      <div class="campfire-glow"></div>
      <div class="dust-particles" id="dust-particles"></div>
      
      <div class="title-content">
        <div class="title-badge">⚙️ A Modern Classic</div>
        <h1 class="game-title">
          <span class="title-the">The</span>
          <span class="title-oregon">Oregon</span>
          <span class="title-trail">Trail</span>
        </h1>
        <p class="title-subtitle">The year is 1848. Your destination: Oregon City.</p>
        <p class="title-subtitle2">Do you have what it takes to survive the journey?</p>
        
        <div class="title-buttons">
          <button class="btn btn-primary btn-glow" id="btn-new-game">
            <span class="btn-icon">🚀</span> New Journey
          </button>
          ${me()?`
          <button class="btn btn-secondary" id="btn-continue">
            <span class="btn-icon">📂</span> Continue Journey
          </button>
          `:""}
          <button class="btn btn-ghost" id="btn-how-to-play">
            <span class="btn-icon">📖</span> How to Play
          </button>
        </div>
      </div>
      
      <div class="wagon-silhouette">
        <div class="wagon-sprite">🚐</div>
      </div>
      
      <div class="title-footer">
        <span>🌾 2,000 miles of adventure await 🏔️</span>
      </div>
    </div>
    
    <div class="modal-overlay hidden" id="how-to-play-modal">
      <div class="modal-card">
        <h2>📖 How to Play</h2>
        <div class="how-to-play-content">
          <div class="how-to-section">
            <h3>🎯 Your Goal</h3>
            <p>Lead your party of 5 pioneers from <strong>Independence, Missouri</strong> to <strong>Oregon City</strong> — a 2,000-mile journey through wilderness!</p>
          </div>
          <div class="how-to-section">
            <h3>📦 Manage Supplies</h3>
            <p>Buy food, ammunition, clothing, spare parts, and oxen. Run out and your party will suffer!</p>
          </div>
          <div class="how-to-section">
            <h3>⚡ Face Challenges</h3>
            <p>Cross dangerous rivers, hunt wild animals, survive storms, illness, and bandits. Every day brings new surprises!</p>
          </div>
          <div class="how-to-section">
            <h3>💡 Tips</h3>
            <ul>
              <li>Start with plenty of food — you'll need it!</li>
              <li>Spare parts save you days of lost travel</li>
              <li>A steady pace keeps your party healthy</li>
              <li>Hunt often to keep your food supplies up</li>
            </ul>
          </div>
        </div>
        <button class="btn btn-primary" id="btn-close-modal">Got it!</button>
      </div>
    </div>
  `;const t=e.querySelector("#stars-container");for(let n=0;n<80;n++){const a=document.createElement("div");a.className="star",a.style.left=Math.random()*100+"%",a.style.top=Math.random()*50+"%",a.style.animationDelay=Math.random()*3+"s",a.style.width=a.style.height=Math.random()*3+1+"px",t.appendChild(a)}const s=e.querySelector("#dust-particles");for(let n=0;n<20;n++){const a=document.createElement("div");a.className="dust",a.style.left=Math.random()*100+"%",a.style.top=50+Math.random()*50+"%",a.style.animationDelay=Math.random()*5+"s",a.style.animationDuration=5+Math.random()*5+"s",s.appendChild(a)}e.querySelector("#btn-new-game").addEventListener("click",()=>{u("character")});const i=e.querySelector("#btn-continue");i&&i.addEventListener("click",()=>{const n=ve();n&&(se(n),u("travel",n))}),e.querySelector("#btn-how-to-play").addEventListener("click",()=>{e.querySelector("#how-to-play-modal").classList.remove("hidden")}),e.querySelector("#btn-close-modal").addEventListener("click",()=>{e.querySelector("#how-to-play-modal").classList.add("hidden")})}const J=["Sarah","Benjamin","Emma","William"];function ge(e){let t=F[0];e.innerHTML=`
    <div class="character-screen">
      <div class="screen-bg-gradient"></div>
      
      <div class="character-content">
        <div class="step-indicator">
          <div class="step active" id="step1-dot"><span>1</span> Profession</div>
          <div class="step-line"></div>
          <div class="step" id="step2-dot"><span>2</span> Party</div>
        </div>
        
        <!-- Step 1: Profession -->
        <div class="character-step" id="step-profession">
          <h2 class="section-title">Choose Your Profession</h2>
          <p class="section-desc">Your profession determines your starting money and score bonus.</p>
          
          <div class="profession-cards">
            ${F.map((i,n)=>`
              <div class="profession-card ${n===0?"selected":""}" data-profession="${i.id}">
                <div class="prof-icon">${i.icon}</div>
                <h3>${i.name}</h3>
                <p class="prof-desc">${i.description}</p>
                <div class="prof-money">💰 $${i.money}</div>
              </div>
            `).join("")}
          </div>
          
          <button class="btn btn-primary btn-glow" id="btn-to-party">
            Next: Name Your Party <span class="btn-arrow">→</span>
          </button>
        </div>
        
        <!-- Step 2: Party Names -->
        <div class="character-step hidden" id="step-party">
          <h2 class="section-title">Name Your Party</h2>
          <p class="section-desc">Choose names for your wagon party of 5 brave pioneers.</p>
          
          <div class="party-form">
            <div class="party-member leader">
              <div class="member-badge">⭐ Leader</div>
              <div class="member-input-wrap">
                <span class="member-icon">🤠</span>
                <input type="text" class="member-input" id="name-leader" placeholder="Your Name" maxlength="15" value="" />
              </div>
            </div>
            ${[0,1,2,3].map(i=>`
              <div class="party-member">
                <div class="member-badge">Pioneer ${i+1}</div>
                <div class="member-input-wrap">
                  <span class="member-icon">${["👩","👦","👧","👨"][i]}</span>
                  <input type="text" class="member-input" id="name-${i}" placeholder="${J[i]}" maxlength="15" value="" />
                </div>
              </div>
            `).join("")}
          </div>
          
          <div class="party-buttons">
            <button class="btn btn-ghost" id="btn-back-prof">← Back</button>
            <button class="btn btn-primary btn-glow" id="btn-start-journey">
              🚐 Start Your Journey!
            </button>
          </div>
        </div>
      </div>
    </div>
  `;const s=e.querySelectorAll(".profession-card");s.forEach(i=>{i.addEventListener("click",()=>{s.forEach(n=>n.classList.remove("selected")),i.classList.add("selected"),t=F.find(n=>n.id===i.dataset.profession)})}),e.querySelector("#btn-to-party").addEventListener("click",()=>{e.querySelector("#step-profession").classList.add("hidden"),e.querySelector("#step-party").classList.remove("hidden"),e.querySelector("#step1-dot").classList.remove("active"),e.querySelector("#step2-dot").classList.add("active"),e.querySelector("#name-leader").focus()}),e.querySelector("#btn-back-prof").addEventListener("click",()=>{e.querySelector("#step-party").classList.add("hidden"),e.querySelector("#step-profession").classList.remove("hidden"),e.querySelector("#step2-dot").classList.remove("active"),e.querySelector("#step1-dot").classList.add("active")}),e.querySelector("#btn-start-journey").addEventListener("click",()=>{const i=e.querySelector("#name-leader").value.trim()||"Pioneer",n=[0,1,2,3].map(l=>e.querySelector(`#name-${l}`).value.trim()||J[l]),a=pe(i,n,t);se(a),u("store",a)})}function be(e,t){const s={food:0,ammunition:0,clothing:0,spareParts:0,oxen:0};let i=0;const n=t.milesTraveled===0;function a(){i=Object.entries(s).reduce((o,[c,d])=>o+d*O[c].price,0);const l=e.querySelector("#cart-total"),r=e.querySelector("#cart-remaining");if(l&&(l.textContent=`$${i.toFixed(2)}`),r){const o=t.money-i;r.textContent=`$${o.toFixed(2)}`,r.classList.toggle("low-money",o<50)}}e.innerHTML=`
    <div class="store-screen">
      <div class="screen-bg-gradient store-bg"></div>
      
      <div class="store-content">
        <div class="store-header">
          <div class="store-sign">
            <h2>🏪 Matt's General Store</h2>
            <p>${n?"Stock up before you hit the trail!":"Welcome back, traveler!"}</p>
          </div>
          <div class="money-display">
            <div class="money-label">Your Money</div>
            <div class="money-amount">💰 $${t.money.toFixed(2)}</div>
          </div>
        </div>
        
        <div class="store-items">
          ${Object.entries(O).map(([l,r])=>`
            <div class="store-item-card" data-item="${l}">
              <div class="item-header">
                <span class="item-icon">${r.icon}</span>
                <span class="item-name">${r.name}</span>
                <span class="item-price">$${r.price.toFixed(2)}/${r.unit}</span>
              </div>
              <p class="item-desc">${r.description}</p>
              <div class="item-controls">
                <button class="qty-btn minus" data-item="${l}" data-dir="-1">−</button>
                <div class="qty-display">
                  <span class="qty-value" id="qty-${l}">0</span>
                  <span class="qty-unit">${r.unit}</span>
                </div>
                <button class="qty-btn plus" data-item="${l}" data-dir="1">+</button>
              </div>
              ${n?`<div class="item-recommended">Recommended: ${r.recommended} ${r.unit}</div>`:""}
            </div>
          `).join("")}
        </div>
        
        <div class="store-cart">
          <div class="cart-summary">
            <div class="cart-row">
              <span>Total Cost:</span>
              <span class="cart-value" id="cart-total">$0.00</span>
            </div>
            <div class="cart-row">
              <span>Remaining:</span>
              <span class="cart-value" id="cart-remaining">$${t.money.toFixed(2)}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-glow" id="btn-purchase">
            ${n?"🚐 Hit the Trail!":"✅ Done Shopping"}
          </button>
        </div>
      </div>
    </div>
  `,e.querySelectorAll(".qty-btn").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.item,o=parseInt(l.dataset.dir),c=r==="food"?50:1,d=s[r]+o*c;if(d<0||i+o*c*O[r].price>t.money)return;s[r]=d,e.querySelector(`#qty-${r}`).textContent=d,a();const p=e.querySelector(`#qty-${r}`);p.classList.add("qty-bump"),setTimeout(()=>p.classList.remove("qty-bump"),200)})}),e.querySelector("#btn-purchase").addEventListener("click",()=>{t.food+=s.food,t.ammunition+=s.ammunition,t.clothing+=s.clothing,t.spareParts+=s.spareParts,t.oxen+=s.oxen,t.money-=i,i>t.biggestPurchase&&(t.biggestPurchase=i),s.food>=1e3&&s.ammunition>=5&&s.clothing>=10&&s.spareParts>=3&&s.oxen>=3&&(t.fullyStocked=!0),u("travel",t)})}function we(e,t){const s=V(t.milesTraveled),i=s?s.miles-t.milesTraveled:0,n=ee(t.date),a=U(t.milesTraveled);e.innerHTML=`
    <div class="travel-screen">
      <!-- Animated landscape -->
      <div class="landscape">
        <div class="sky" id="sky">
          <div class="sun-moon" id="sun-moon">☀️</div>
          <div class="clouds" id="clouds"></div>
        </div>
        <div class="mountains-far travel-parallax" data-speed="0.2"></div>
        <div class="mountains-mid travel-parallax" data-speed="0.5"></div>
        <div class="hills travel-parallax" data-speed="0.8"></div>
        <div class="ground">
          <div class="trail-path"></div>
          <div class="wagon-container">
            <div class="travel-wagon" id="travel-wagon">
              <span class="wagon-body">🚐</span>
            </div>
          </div>
        </div>
        <div class="weather-overlay" id="weather-overlay"></div>
      </div>
      
      <!-- HUD -->
      <div class="travel-hud">
        <div class="hud-top">
          <div class="hud-date">
            <span class="hud-label">Date</span>
            <span class="hud-value" id="hud-date">${n}</span>
          </div>
          <div class="hud-weather">
            <span class="hud-label">Weather</span>
            <span class="hud-value" id="hud-weather">${t.weatherEmoji}</span>
          </div>
          <div class="hud-miles">
            <span class="hud-label">Miles</span>
            <span class="hud-value" id="hud-miles">${t.milesTraveled} / ${E}</span>
          </div>
          <div class="hud-next">
            <span class="hud-label">Next Stop</span>
            <span class="hud-value" id="hud-next">${s?.name||"Oregon City"}</span>
            <span class="hud-sub" id="hud-next-miles">${i} miles</span>
          </div>
        </div>
        
        <div class="progress-bar-container">
          <div class="progress-bar" id="progress-bar" style="width: ${a*100}%"></div>
          <div class="progress-markers">
            <span>Independence</span>
            <span>Oregon City</span>
          </div>
        </div>
      </div>
      
      <!-- Status Panel -->
      <div class="travel-status">
        <div class="party-health-list" id="party-health">
          ${Z(t)}
        </div>
        
        <div class="supplies-grid">
          <div class="supply-item">
            <span class="supply-icon">🥩</span>
            <span class="supply-label">Food</span>
            <span class="supply-value ${t.food<100?"warning":""}" id="supply-food">${t.food} lbs</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">🔫</span>
            <span class="supply-label">Ammo</span>
            <span class="supply-value" id="supply-ammo">${t.ammunition} boxes</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">👕</span>
            <span class="supply-label">Clothes</span>
            <span class="supply-value" id="supply-clothes">${t.clothing} sets</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">🔧</span>
            <span class="supply-label">Parts</span>
            <span class="supply-value" id="supply-parts">${t.spareParts} sets</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">🐂</span>
            <span class="supply-label">Oxen</span>
            <span class="supply-value" id="supply-oxen">${t.oxen} yoke</span>
          </div>
          <div class="supply-item">
            <span class="supply-icon">💰</span>
            <span class="supply-label">Money</span>
            <span class="supply-value" id="supply-money">$${t.money.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <!-- Controls -->
      <div class="travel-controls">
        <div class="control-group">
          <label class="control-label">Pace</label>
          <div class="control-options" id="pace-options">
            ${C.map(r=>`
              <button class="control-btn ${r.id===t.pace.id?"active":""}" data-pace="${r.id}" title="${r.description}">
                ${r.name}
              </button>
            `).join("")}
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Rations</label>
          <div class="control-options" id="rations-options">
            ${q.map(r=>`
              <button class="control-btn ${r.id===t.rations.id?"active":""}" data-rations="${r.id}" title="${r.description}">
                ${r.name}
              </button>
            `).join("")}
          </div>
        </div>
        <div class="control-actions">
          <button class="btn btn-action" id="btn-travel" title="Travel another day">
            🚐 Travel
          </button>
          <button class="btn btn-action secondary" id="btn-rest" title="Rest to recover health">
            🏕️ Rest
          </button>
          <button class="btn btn-action secondary" id="btn-hunt" title="Hunt for food">
            🎯 Hunt
          </button>
        </div>
      </div>
      
      <!-- Achievement popup -->
      <div class="achievement-popup hidden" id="achievement-popup">
        <div class="achievement-icon" id="achievement-icon"></div>
        <div class="achievement-text">
          <span class="achievement-label">Achievement Unlocked!</span>
          <span class="achievement-name" id="achievement-name"></span>
        </div>
      </div>
      
      <!-- Event toast -->
      <div class="event-toast hidden" id="event-toast">
        <div class="event-toast-content" id="event-toast-content"></div>
      </div>
    </div>
  `;const l=e.querySelector("#clouds");for(let r=0;r<5;r++){const o=document.createElement("div");o.className="cloud",o.textContent="☁️",o.style.top=5+Math.random()*20+"%",o.style.left=Math.random()*100+"%",o.style.animationDuration=30+Math.random()*20+"s",o.style.animationDelay=-Math.random()*30+"s",o.style.fontSize=1.5+Math.random()*2+"rem",o.style.opacity=.3+Math.random()*.4,l.appendChild(o)}e.querySelectorAll("[data-pace]").forEach(r=>{r.addEventListener("click",()=>{t.pace=C.find(o=>o.id===r.dataset.pace),e.querySelectorAll("[data-pace]").forEach(o=>o.classList.remove("active")),r.classList.add("active")})}),e.querySelectorAll("[data-rations]").forEach(r=>{r.addEventListener("click",()=>{t.rations=q.find(o=>o.id===r.dataset.rations),e.querySelectorAll("[data-rations]").forEach(o=>o.classList.remove("active")),r.classList.add("active")})}),e.querySelector("#btn-travel").addEventListener("click",()=>{t.isResting=!1,Se(e,t)}),e.querySelector("#btn-rest").addEventListener("click",()=>{t.isResting=!0,X(t),Q(e,t),N(e,"🏕️ You rested for a day. Your party feels a bit better!"),K(t)}),e.querySelector("#btn-hunt").addEventListener("click",()=>{if(t.ammunition<=0){N(e,"🔫 You don't have any ammunition! Buy some at the next store.");return}u("hunting",t)})}function Se(e,t){if(t.oxen<=0){N(e,"🐂 You have no oxen! You can't travel without them.");return}if(X(t),Q(e,t),t.currentEvent){setTimeout(()=>{u("event",t)},500);return}if(t.atLandmark&&t.atLandmark.type!=="destination"){setTimeout(()=>{u("landmark",t)},500);return}if(t.gameOver){setTimeout(()=>u("gameover",t),500);return}t.newAchievements&&t.newAchievements.length>0&&ke(e,t.newAchievements[0]),K(t)}function Q(e,t){const s=V(t.milesTraveled),i=s?s.miles-t.milesTraveled:0,n=U(t.milesTraveled),a=(d,m)=>{const p=e.querySelector(d);p&&(p.textContent=m)};a("#hud-date",ee(t.date)),a("#hud-weather",t.weatherEmoji),a("#hud-miles",`${t.milesTraveled} / ${E}`),a("#hud-next",s?.name||"Oregon City"),a("#hud-next-miles",`${Math.max(0,i)} miles`);const l=e.querySelector("#progress-bar");l&&(l.style.width=`${n*100}%`),a("#supply-food",`${t.food} lbs`),a("#supply-ammo",`${t.ammunition} boxes`),a("#supply-clothes",`${t.clothing} sets`),a("#supply-parts",`${t.spareParts} sets`),a("#supply-oxen",`${t.oxen} yoke`),a("#supply-money",`$${t.money.toFixed(2)}`);const r=e.querySelector("#supply-food");r&&r.classList.toggle("warning",t.food<100);const o=e.querySelector("#party-health");o&&(o.innerHTML=Z(t));const c=e.querySelector("#travel-wagon");c&&(c.classList.add("wagon-moving"),setTimeout(()=>c.classList.remove("wagon-moving"),400))}function Z(e){return e.party.map(t=>`
    <div class="party-member-health ${t.health<=0?"dead":""}">
      <span class="member-name">${t.isLeader?"⭐":"👤"} ${t.name}</span>
      <div class="health-bar-mini">
        <div class="health-fill ${t.health<30?"critical":t.health<60?"warn":"good"}" 
             style="width: ${t.health}%"></div>
      </div>
      <span class="health-text">${t.health<=0?"💀":t.health+"%"}</span>
    </div>
  `).join("")}function ke(e,t){const s=e.querySelector("#achievement-popup"),i=e.querySelector("#achievement-icon"),n=e.querySelector("#achievement-name");s&&i&&n&&(i.textContent=t.icon,n.textContent=t.name,s.classList.remove("hidden"),s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),s.classList.add("hidden")},3e3))}function N(e,t){const s=e.querySelector("#event-toast"),i=e.querySelector("#event-toast-content");s&&i&&(i.textContent=t,s.classList.remove("hidden"),s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),s.classList.add("hidden")},3e3))}function ee(e){const t=new Date(e);return`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`}const M="/Modern_Oregon_Trail/",$e=[{img:`${M}assets/deer.png`,name:"Deer",food:35,points:1,speed:1.8,hitRadius:50,width:120,height:110,zone:"ground",bobAmount:3,bobSpeed:2,facesRight:!0},{img:`${M}assets/buffalo.png`,name:"Buffalo",food:100,points:2,speed:1.2,hitRadius:60,width:140,height:100,zone:"ground",bobAmount:2,bobSpeed:1.5,facesRight:!0},{img:`${M}assets/turkey.png`,name:"Turkey",food:12,points:1,speed:2,hitRadius:40,width:90,height:80,zone:"ground",bobAmount:3,bobSpeed:3,facesRight:!0},{img:`${M}assets/squirrel.png`,name:"Squirrel",food:3,points:1,speed:3.2,hitRadius:30,width:70,height:55,zone:"ground",bobAmount:5,bobSpeed:5,facesRight:!1}],Le={ground:{min:.55,max:.82}};let P=null,w=[],k=0,x=0,G=0,g=30,D=null,R=null,Y=0;function xe(e,t){k=0,x=0,G=0,g=30,w=[],Y=0;const s=`${M}assets/hunting-bg.jpg`;e.innerHTML=`
    <div class="hunting-screen">
      <div class="hunting-bg">
        <img src="${s}" class="hunting-bg-img" alt="" />
      </div>
      
      <div class="hunting-hud">
        <div class="hunt-stat">
          <span class="hunt-stat-label">⏱️ Time</span>
          <span class="hunt-stat-value" id="hunt-timer">${g}s</span>
        </div>
        <div class="hunt-stat">
          <span class="hunt-stat-label">🎯 Hits</span>
          <span class="hunt-stat-value" id="hunt-score">${k}</span>
        </div>
        <div class="hunt-stat">
          <span class="hunt-stat-label">🥩 Food</span>
          <span class="hunt-stat-value" id="hunt-food">+${x} lbs</span>
        </div>
        <div class="hunt-stat">
          <span class="hunt-stat-label">🔫 Ammo</span>
          <span class="hunt-stat-value" id="hunt-ammo">${t.ammunition} boxes</span>
        </div>
      </div>
      
      <div class="hunting-field" id="hunting-field">
        <div class="crosshair" id="crosshair">⊕</div>
      </div>
      
      <div class="hunting-results hidden" id="hunting-results">
        <div class="results-card">
          <h2>🎯 Hunt Results</h2>
          <div class="results-stats">
            <div class="result-stat">
              <span class="result-label">Animals Hit</span>
              <span class="result-value" id="result-hits">0</span>
            </div>
            <div class="result-stat">
              <span class="result-label">Food Gained</span>
              <span class="result-value" id="result-food">0 lbs</span>
            </div>
            <div class="result-stat">
              <span class="result-label">Ammo Used</span>
              <span class="result-value" id="result-ammo">0 boxes</span>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-done-hunt">Back to Trail</button>
        </div>
      </div>
    </div>
  `;const i=e.querySelector("#hunting-field"),n=e.querySelector("#crosshair");i.addEventListener("mousemove",o=>{const c=i.getBoundingClientRect();n.style.left=o.clientX-c.left+"px",n.style.top=o.clientY-c.top+"px"}),i.addEventListener("click",o=>{if(g<=0||t.ammunition<=0)return;t.ammunition--,G++,e.querySelector("#hunt-ammo").textContent=`${t.ammunition} boxes`;const c=document.createElement("div");c.className="shot-flash",c.style.left=o.clientX-i.getBoundingClientRect().left+"px",c.style.top=o.clientY-i.getBoundingClientRect().top+"px",i.appendChild(c),setTimeout(()=>c.remove(),300);const d=o.clientX-i.getBoundingClientRect().left,m=o.clientY-i.getBoundingClientRect().top;for(let p=w.length-1;p>=0;p--){const h=w[p];if(h.hit)continue;const T=h.x+h.data.width/2,y=h.y+h.data.height/2;if(Math.sqrt((d-T)**2+(m-y)**2)<h.data.hitRadius){k++,x+=h.data.food,h.data.name==="Buffalo"&&(t.shotBuffalo=!0),e.querySelector("#hunt-score").textContent=k,e.querySelector("#hunt-food").textContent=`+${x} lbs`,h.hit=!0,h.el.classList.add("hit");const b=h.el;setTimeout(()=>{b.parentNode&&b.remove()},500),w.splice(p,1);break}}});function a(){if(g<=0)return;const o=[3,1,3,2],c=o.reduce((L,ne)=>L+ne,0);let d=Math.random()*c,m=0;for(let L=0;L<o.length;L++)if(d-=o[L],d<=0){m=L;break}const p=$e[m],h=i.getBoundingClientRect(),T=Le[p.zone],y=document.createElement("div");y.className="hunting-animal",y.style.width=p.width+"px",y.style.height=p.height+"px";const S=document.createElement("img");S.src=p.img,S.style.width="100%",S.style.height="100%",S.style.objectFit="contain",S.draggable=!1,y.appendChild(S);const b=Math.random()<.5,I=b?h.width+20:-p.width-20,B=T.min*h.height+Math.random()*(T.max-T.min)*h.height;y.style.left=I+"px",y.style.top=B+"px";const j=p.facesRight&&b||!p.facesRight&&!b;y.style.transform=j?"scaleX(-1)":"scaleX(1)",i.appendChild(y);const ie={el:y,x:I,y:B,baseY:B,data:p,dx:b?-p.speed:p.speed,phase:Math.random()*Math.PI*2,hit:!1,pauseTimer:0,isPaused:!1,movingLeft:b,needsFlip:j};w.push(ie)}function l(){Y++;const o=Y/60;for(let c=w.length-1;c>=0;c--){const d=w[c];if(d.hit)continue;d.isPaused||(d.pauseTimer++,d.pauseTimer>120&&Math.random()<.015&&(d.isPaused=!0,d.pauseTimer=0,setTimeout(()=>{d.isPaused=!1,d.pauseTimer=0},600+Math.random()*1800))),d.isPaused||(d.x+=d.dx);const m=Math.sin(o*d.data.bobSpeed+d.phase)*d.data.bobAmount;d.y=d.baseY+m,d.el.style.left=d.x+"px",d.el.style.top=d.y+"px";const p=i.getBoundingClientRect();(d.x<-d.data.width-50||d.x>p.width+50)&&(d.el.remove(),w.splice(c,1))}P=requestAnimationFrame(l)}D=setInterval(()=>{g--;const o=e.querySelector("#hunt-timer");o&&(o.textContent=`${g}s`),g<=5&&o&&(o.style.color="#ff6b6b"),g<=0&&Te(e)},1e3);function r(){if(g<=0)return;const o=2e3+Math.random()*2e3;R=setTimeout(()=>{a(),r()},o)}setTimeout(()=>a(),600),setTimeout(()=>a(),1800),setTimeout(()=>a(),3200),r(),l(),e.querySelector("#btn-done-hunt").addEventListener("click",()=>{t.food+=x,k>t.huntingHighScore&&(t.huntingHighScore=k),u("travel",t)})}function Te(e,t){D&&(clearInterval(D),D=null),R&&(clearTimeout(R),R=null),P&&(cancelAnimationFrame(P),P=null);const s=e.querySelector("#hunting-results");s&&(s.classList.remove("hidden"),e.querySelector("#result-hits").textContent=k,e.querySelector("#result-food").textContent=`${x} lbs`,e.querySelector("#result-ammo").textContent=`${G} boxes`)}function Me(e,t){const s=t.atLandmark,i=s?.riverDepth||5,n=s?.riverWidth||500;e.innerHTML=`
    <div class="river-screen">
      <div class="river-bg">
        <div class="river-sky"></div>
        <div class="river-banks">
          <div class="river-bank-left"></div>
          <div class="river-water" id="river-water">
            <div class="water-wave wave1"></div>
            <div class="water-wave wave2"></div>
            <div class="water-wave wave3"></div>
            <div class="river-wagon-container">
              <span class="river-wagon" id="river-wagon">🚐</span>
            </div>
          </div>
          <div class="river-bank-right"></div>
        </div>
      </div>
      
      <div class="river-info-panel">
        <h2>🌊 ${s?.name||"River Crossing"}</h2>
        <p class="river-desc">${s?.description||"A wide river blocks your path."}</p>
        
        <div class="river-stats">
          <div class="river-stat">
            <span class="river-stat-label">Width</span>
            <span class="river-stat-value">${n} feet</span>
          </div>
          <div class="river-stat">
            <span class="river-stat-label">Depth</span>
            <span class="river-stat-value">${i} feet</span>
          </div>
          <div class="river-stat">
            <span class="river-stat-label">Current</span>
            <span class="river-stat-value">${i>6?"Strong":i>3?"Moderate":"Gentle"}</span>
          </div>
        </div>
        
        <div class="river-options">
          <button class="river-option-btn" id="btn-ford" ${i>5?'title="Very risky at this depth!"':""}>
            <div class="option-icon">🚶</div>
            <div class="option-text">
              <strong>Ford the River</strong>
              <span>Walk through it. ${i>5?"⚠️ Dangerous!":"Risky if deep."}</span>
            </div>
          </button>
          <button class="river-option-btn" id="btn-caulk">
            <div class="option-icon">🛟</div>
            <div class="option-text">
              <strong>Caulk & Float</strong>
              <span>Seal the wagon and float across. Moderate risk.</span>
            </div>
          </button>
          <button class="river-option-btn" id="btn-ferry" ${t.money<20?'disabled title="You need $20"':""}>
            <div class="option-icon">⛴️</div>
            <div class="option-text">
              <strong>Take the Ferry</strong>
              <span>Safe crossing. Costs $20.</span>
            </div>
          </button>
          <button class="river-option-btn" id="btn-wait">
            <div class="option-icon">⏳</div>
            <div class="option-text">
              <strong>Wait for Conditions</strong>
              <span>Rest 1-3 days for better crossing.</span>
            </div>
          </button>
        </div>
      </div>
      
      <div class="river-result hidden" id="river-result">
        <div class="result-card">
          <div class="result-icon" id="river-result-icon">✅</div>
          <h3 id="river-result-title">Crossed Successfully!</h3>
          <p id="river-result-desc"></p>
          <button class="btn btn-primary" id="btn-river-continue">Continue</button>
        </div>
      </div>
    </div>
  `,e.querySelector("#btn-ford").addEventListener("click",()=>{const a=i>5?.6:i>3?.3:.1;A(e,t,a,"forded")}),e.querySelector("#btn-caulk").addEventListener("click",()=>{const a=n>700?.4:.2;A(e,t,a,"floated")}),e.querySelector("#btn-ferry").addEventListener("click",()=>{t.money>=20&&(t.money-=20,A(e,t,.02,"ferried"))}),e.querySelector("#btn-wait").addEventListener("click",()=>{const a=1+Math.floor(Math.random()*3);t.daysTraveled+=a;const l=new Date(t.date);l.setDate(l.getDate()+a),t.date=l,A(e,t,.1,"waited",a)}),e.querySelector("#btn-river-continue").addEventListener("click",()=>{u("travel",t)})}function A(e,t,s,i,n){e.querySelector("#river-wagon").classList.add("crossing"),setTimeout(()=>{const l=e.querySelector("#river-result"),r=e.querySelector("#river-result-icon"),o=e.querySelector("#river-result-title"),c=e.querySelector("#river-result-desc");if(Math.random()<s){const d=Math.floor(Math.random()*50)+20,m=Math.floor(Math.random()*15)+5;t.food=Math.max(0,t.food-d),t.party.forEach(p=>{p.health>0&&(p.health=Math.max(0,p.health-m))}),r.textContent="😰",o.textContent="Rough Crossing!",c.textContent=`You lost ${d} lbs of food and everyone took damage while crossing.`,l.classList.add("failure")}else t.perfectCrossings=(t.perfectCrossings||0)+1,r.textContent="✅",o.textContent="Crossed Successfully!",i==="waited"?c.textContent=`After waiting ${n} days, you crossed safely!`:i==="ferried"?c.textContent="The ferry took you across smoothly. Well worth the $20!":c.textContent=`You ${i} across the river without any problems!`;l.classList.remove("hidden")},2e3)}function Ee(e,t){const s=t.currentEvent;if(!s){u("travel",t);return}const n=s.type==="good"||s.type==="special"?"event-good":"event-bad";e.innerHTML=`
    <div class="event-screen ${n}">
      <div class="event-overlay"></div>
      
      <div class="event-card">
        <div class="event-card-glow ${n}"></div>
        <div class="event-title-icon">${s.title.split(" ")[0]}</div>
        <h2 class="event-title">${s.title.substring(s.title.indexOf(" ")+1)}</h2>
        <p class="event-description">${s.description}</p>
        
        <div class="event-effects">
          ${s.healthLoss?`<div class="effect bad">❤️ -${s.healthLoss} Health</div>`:""}
          ${s.healthGain?`<div class="effect good">❤️ +${s.healthGain} Health</div>`:""}
          ${s.foodLoss?`<div class="effect bad">🥩 -${s.foodLoss} Food</div>`:""}
          ${s.foodGain?`<div class="effect good">🥩 +${s.foodGain} Food</div>`:""}
          ${s.daysLost?`<div class="effect bad">📅 -${s.daysLost} Days</div>`:""}
          ${s.spareParts?'<div class="effect bad">🔧 -1 Spare Part</div>':""}
          ${s.ammoLoss?`<div class="effect bad">🔫 -${s.ammoLoss} Ammo</div>`:""}
          ${s.oxenLoss?`<div class="effect bad">🐂 -${s.oxenLoss} Oxen</div>`:""}
          ${s.clothingLoss?`<div class="effect bad">👕 -${s.clothingLoss} Clothing</div>`:""}
        </div>
        
        <button class="btn btn-primary" id="btn-event-continue">Continue Journey →</button>
      </div>
    </div>
  `,setTimeout(()=>{const a=e.querySelector(".event-card");a&&a.classList.add("show")},100),e.querySelector("#btn-event-continue").addEventListener("click",()=>{t.currentEvent=null,t.atLandmark&&!t.gameOver?u("landmark",t):t.gameOver?u("gameover",t):u("travel",t)})}function Ce(e,t){const s=ye(t),i=t.party.filter(a=>a.health>0).length,n=t.party.length;t.won?qe(e,t,s,i,n):Ae(e,t,s)}function qe(e,t,s,i,n){e.innerHTML=`
    <div class="gameover-screen win">
      <div class="confetti-container" id="confetti"></div>
      <div class="fireworks" id="fireworks"></div>
      
      <div class="gameover-content">
        <div class="gameover-card win-card">
          <h1 class="win-title">🎉 You Made It!</h1>
          <p class="win-subtitle">Welcome to Oregon City!</p>
          
          <div class="win-stats">
            <div class="win-stat">
              <span class="win-stat-icon">👥</span>
              <span class="win-stat-label">Survivors</span>
              <span class="win-stat-value">${i} / ${n}</span>
            </div>
            <div class="win-stat">
              <span class="win-stat-icon">📅</span>
              <span class="win-stat-label">Days</span>
              <span class="win-stat-value">${t.daysTraveled}</span>
            </div>
            <div class="win-stat">
              <span class="win-stat-icon">🥩</span>
              <span class="win-stat-label">Food Left</span>
              <span class="win-stat-value">${t.food} lbs</span>
            </div>
            <div class="win-stat">
              <span class="win-stat-icon">💰</span>
              <span class="win-stat-label">Money Left</span>
              <span class="win-stat-value">$${t.money.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="score-display">
            <div class="score-label">Final Score</div>
            <div class="score-value">${s.toLocaleString()}</div>
            <div class="score-multiplier">×${t.profession.scoreMultiplier} (${t.profession.name})</div>
          </div>
          
          <div class="party-final">
            <h3>Your Party</h3>
            ${t.party.map(a=>`
              <div class="party-final-member ${a.health<=0?"dead":""}">
                ${a.health>0?"😊":"💀"} ${a.name} — ${a.health>0?`${a.health}% health`:"Did not survive"}
              </div>
            `).join("")}
          </div>
          
          ${t.unlockedAchievements.length>0?`
          <div class="achievements-earned">
            <h3>🏅 Achievements</h3>
            <div class="achievement-list">
              ${t.unlockedAchievements.map(a=>`<span class="achievement-badge" title="${a}">${Re(a)}</span>`).join("")}
            </div>
          </div>
          `:""}
          
          <div class="gameover-buttons">
            <button class="btn btn-primary btn-glow" id="btn-play-again">🚐 New Journey</button>
            <button class="btn btn-ghost" id="btn-main-menu">📋 Main Menu</button>
          </div>
        </div>
      </div>
    </div>
  `,Pe(e),te(e)}function Ae(e,t,s,i,n){e.innerHTML=`
    <div class="gameover-screen lose">
      <div class="lose-bg">
        <div class="lose-particles" id="lose-particles"></div>
      </div>
      
      <div class="gameover-content">
        <div class="gameover-card lose-card">
          <div class="tombstone">
            <div class="tombstone-shape">
              <div class="tombstone-text">
                <p class="tombstone-rip">Rest In Peace</p>
                <p class="tombstone-name">${t.party[0].name}'s Party</p>
                <p class="tombstone-date">${_e(t.date)}</p>
                <p class="tombstone-epitaph">"${De(t)}"</p>
              </div>
            </div>
          </div>
          
          <h2 class="lose-title">Your Journey Has Ended</h2>
          <p class="lose-subtitle">After ${t.milesTraveled} miles, the trail claimed your party.</p>
          
          <div class="lose-stats">
            <div class="lose-stat">
              <span>Miles Traveled: ${t.milesTraveled}</span>
            </div>
            <div class="lose-stat">
              <span>Days on Trail: ${t.daysTraveled}</span>
            </div>
            <div class="lose-stat">
              <span>Score: ${s.toLocaleString()}</span>
            </div>
          </div>
          
          <div class="gameover-buttons">
            <button class="btn btn-primary btn-glow" id="btn-play-again">🚐 Try Again</button>
            <button class="btn btn-ghost" id="btn-main-menu">📋 Main Menu</button>
          </div>
        </div>
      </div>
    </div>
  `,te(e)}function te(e){e.querySelector("#btn-play-again").addEventListener("click",()=>{W(),u("character")}),e.querySelector("#btn-main-menu").addEventListener("click",()=>{W(),u("title")})}function Pe(e){const t=e.querySelector("#confetti");if(!t)return;const s=["#f4a261","#e76f51","#2d6a4f","#e9c46a","#264653","#e63946","#a8dadc"];for(let i=0;i<80;i++){const n=document.createElement("div");n.className="confetti-piece",n.style.left=Math.random()*100+"%",n.style.backgroundColor=s[Math.floor(Math.random()*s.length)],n.style.animationDelay=Math.random()*3+"s",n.style.animationDuration=2+Math.random()*3+"s",t.appendChild(n)}}function De(e){const t=["They died as they lived — on the trail.","Should have bought more food.","The trail is long, but life is short.","At least the oxen survived. Oh wait...","Gone too soon, but the stories remain.","Next time, take the ferry.",`${e.milesTraveled} miles wasn't far enough.`,"They tried their best. The trail did the rest."];return t[Math.floor(Math.random()*t.length)]}function Re(e){return{first_steps:"👣",century:"💯",halfway:"⛰️",oregon_or_bust:"🏆",sharpshooter:"🎯",big_spender:"💰",penny_pincher:"🪙",iron_stomach:"💪",river_master:"🛶",survivor:"🏕️",speed_demon:"💨",fully_stocked:"📦",buffalo_hunter:"🦬",trailblazer:"⭐",tough_cookie:"🍪"}[e]||"🏅"}function _e(e){const t=new Date(e);return`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`}function Be(e,t){const s=t.atLandmark;if(!s){u("travel",t);return}const i={fort:"🏰",river:"🌊",landmark:"🏔️",town:"🏘️",destination:"🎉"};e.innerHTML=`
    <div class="landmark-screen">
      <div class="landmark-bg ${s.type}">
        <div class="landmark-clouds"></div>
      </div>
      
      <div class="landmark-content">
        <div class="landmark-card">
          <div class="landmark-badge">${i[s.type]||"📍"} ${s.type.toUpperCase()}</div>
          <h2 class="landmark-name">${s.name}</h2>
          <p class="landmark-desc">${s.description}</p>
          <div class="landmark-miles">📏 ${s.miles} miles from Independence</div>
          
          <div class="landmark-actions">
            ${s.type==="river"?`
              <button class="btn btn-action" id="btn-cross-river">🌊 Cross the River</button>
            `:""}
            ${s.hasStore?`
              <button class="btn btn-action" id="btn-visit-store">🏪 Visit the Store</button>
            `:""}
            <button class="btn btn-action secondary" id="btn-rest-here">🏕️ Rest Here</button>
            <button class="btn btn-primary" id="btn-continue-trail">🚐 Continue on Trail</button>
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{const l=e.querySelector(".landmark-card");l&&l.classList.add("show")},200);const n=e.querySelector("#btn-cross-river");n&&n.addEventListener("click",()=>{u("river",t)});const a=e.querySelector("#btn-visit-store");a&&a.addEventListener("click",()=>{u("store",t)}),e.querySelector("#btn-rest-here").addEventListener("click",()=>{t.isResting=!0,t.party.forEach(r=>{r.health>0&&(r.health=Math.min(100,r.health+10))}),t.daysTraveled++;const l=new Date(t.date);l.setDate(l.getDate()+1),t.date=l,u("travel",t)}),e.querySelector("#btn-continue-trail").addEventListener("click",()=>{u("travel",t)})}let f=null;const v=document.getElementById("app");function u(e,t){f=t||f,v.classList.add("screen-exit"),setTimeout(()=>{switch(v.innerHTML="",v.classList.remove("screen-exit"),v.classList.add("screen-enter"),e){case"title":fe(v);break;case"character":ge(v);break;case"store":be(v,f);break;case"travel":we(v,f);break;case"hunting":xe(v,f);break;case"river":Me(v,f);break;case"event":Ee(v,f);break;case"gameover":Ce(v,f);break;case"landmark":Be(v,f);break}setTimeout(()=>v.classList.remove("screen-enter"),500)},300)}function se(e){f=e}u("title");
