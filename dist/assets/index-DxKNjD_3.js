(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://pokeapi.co/api/v2`,t=new Map,n=new Map;function r(e){let t=String(e).match(/\/pokemon\/(\d+)\//);return t?Number(t[1]):null}async function i(t=151){let n=await fetch(`${e}/pokemon?limit=${t}`);if(!n.ok)throw Error(`Failed to fetch pokemon list: ${n.status}`);return(await n.json()).results.map(e=>({name:e.name,url:e.url,id:r(e.url)})).filter(e=>Number.isFinite(e.id))}function a(e){return e?.other?.[`official-artwork`]?.front_default||e?.other?.[`official-artwork`]?.front_shiny||e?.front_default||e?.front_shiny||``}function o(e){let t={hp:0,attack:0,defense:0,speed:0};for(let n of e||[]){let e=n?.stat?.name,r=n?.base_stat;!e||typeof r!=`number`||e in t&&(t[e]=r)}return t}async function s(n){if(t.has(n))return t.get(n);let r=await fetch(`${e}/pokemon/${n}`);if(!r.ok)throw Error(`Failed to fetch pokemon details (${n}): ${r.status}`);let i=await r.json(),s=(i.types||[]).map(e=>e.type.name),c=s[0]||`normal`,l=a(i.sprites),u={id:i.id,name:i.name,image:l,types:s,primaryType:c,abilities:(i.abilities||[]).map(e=>e?.ability?.name).filter(Boolean),stats:o(i.stats)};return t.set(n,u),u}function c(e,t){let n=null,r=[];function i(e,a){if(!e)return!1;let o=e?.species?.name;if(!o)return!1;if(o===t)return n=a,r=(e.evolves_to||[]).map(e=>e?.species?.name).filter(Boolean),!0;for(let t of e.evolves_to||[])if(i(t,o))return!0;return!1}return i(e,null),{from:n,into:r}}async function l(t){if(n.has(t))return n.get(t);let r=await fetch(`${e}/pokemon-species/${t}`);if(!r.ok)throw Error(`Failed to fetch pokemon species (${t}): ${r.status}`);let i=await r.json(),a=i?.evolution_chain?.url;if(!a){let e={from:null,into:[]};return n.set(t,e),e}let o=await fetch(a);if(!o.ok)throw Error(`Failed to fetch evolution chain: ${o.status}`);let s=await o.json(),l=i?.name,u=c(s?.chain,l);return n.set(t,u),u}var u={bug:`#A6B91A`,dark:`#705746`,dragon:`#6F35FC`,electric:`#F7D02C`,fairy:`#D685AD`,fighting:`#C22E28`,fire:`#EE8130`,flying:`#A98FF3`,ghost:`#735797`,grass:`#7AC74C`,ground:`#E2BF65`,ice:`#96D9D6`,normal:`#A8A77A`,poison:`#A33EA1`,psychic:`#F95587`,rock:`#B6A136`,steel:`#B7B7CE`,water:`#6390F0`};function d(e){return String(e||``).trim().replace(/-/g,` `).replace(/\s+/g,` `).split(` `).filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(` `)}function f(e){return d(e)}function ee(e){return u[e]||`#60a5fa`}function p(e){return ee(e)}function m(e,t){let n={hp:250,attack:190,defense:230,speed:200}[e]||200;return Math.max(0,Math.min(100,Math.round(t/n*100)))}function h(e,t){e.innerHTML=`
    <span class="spinner" aria-hidden="true"></span>
    <span style="margin-left:10px">${t||`Loading...`}</span>
  `}function g(e){e.textContent=``}function te(e,t=20){let n=Array.from({length:t},()=>`<div class="skeleton-card"></div>`).join(``);e.classList.add(`skeleton-grid`),e.innerHTML=n}function _(e){e.classList.remove(`skeleton-grid`)}function ne(e,t){let n=String(e.id).padStart(3,`0`),r=p(e.primaryType),i=(e.types||[]).slice(0,2).map(e=>`<span class="type-badge" title="${e}">${f(e)}</span>`).join(``),a=t?`is-favorite`:``;return`
    <article class="pokemon-card" data-id="${e.id}" style="--card-bg:${r}" tabindex="0" role="button" aria-label="Open ${d(e.name)}">
      <button class="heart-btn" type="button" data-fav="${e.id}" aria-label="Add to favorites">
        <span class="heart-icon ${a}" aria-hidden="true">♥</span>
      </button>

      <div class="pokemon-card__image-wrap">
        <img src="${e.image}" alt="${d(e.name)}" loading="lazy" />
      </div>

      <div class="pokemon-card__content">
        <div class="pokemon-card__title">
          <span class="pokemon-card__id">#${n}</span>
          <h3 class="pokemon-card__name">${d(e.name)}</h3>
        </div>
        <div class="pokemon-card__types">${i}</div>
      </div>
    </article>
  `}function v({statKey:e,statName:t,value:n}){return`
    <div class="statRow">
      <div class="statName">${t}</div>
      <div>
        <div class="progress" role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="250">
          <div class="bar" style="width:${m(e,n)}%"></div>
        </div>
      </div>
      <div class="statValue">${n}</div>
    </div>
  `}function re(e,t,n){let r=String(e.id).padStart(3,`0`),i=n?`is-favorite`:``,a=t?.from?d(t.from):`—`,o=t?.into?.length?t.into.map(e=>`<li>${d(e)}</li>`).join(``):`<li>—</li>`,s=(e.types||[]).slice(0,2).map(e=>`<span class="type-badge" title="${e}">${f(e)}</span>`).join(``),c=e.stats||{hp:0,attack:0,defense:0,speed:0},l=p(e.primaryType);return`
    <div class="modalHeader">
      <div class="modalHeader__left">
        <img class="modalPokemonImage" src="${e.image}" alt="${d(e.name)}" />
        <div class="modalHeader__title">
          <h2 style="padding-bottom: 8px;" id="modalTitle">${d(e.name)}</h2>
          <div class="id">#${r} • ${s}</div>
        </div>
      </div>

      <div>
        <button class="heart-btn" id="modalFavBtn" type="button" data-id="${e.id}" aria-label="Favorite">
          <span class="heart-icon ${i}" aria-hidden="true">♥</span>
        </button>
      </div>
    </div>

    <div class="grid2">
      <div class="panel" style="--card-bg:${l}">
        <h3 style="margin:0 0 10px">Stats</h3>
        ${v({statKey:`hp`,statName:`HP`,value:c.hp})}
        ${v({statKey:`attack`,statName:`Attack`,value:c.attack})}
        ${v({statKey:`defense`,statName:`Defense`,value:c.defense})}
        ${v({statKey:`speed`,statName:`Speed`,value:c.speed})}
      </div>

      <div class="panel">
        <h3 style="margin:0 0 10px">Abilities</h3>
        <ul class="abilityList">
          ${(e.abilities||[]).map(e=>`<li>${d(e)}</li>`).join(``)}
        </ul>

        <div class="evoFrom">
          Evolution:
          <div class="evoFrom">
            <div>From: <strong>${a}</strong></div>
            <div class="evoTo" style="margin-top:8px">To: <strong>${t?.into?.length?t.into.map(d).join(`, `):`—`}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin:0 0 10px">Evolution Chain</h3>
      <div class="evoFrom">From: <strong>${a}</strong></div>
      <div class="evoTo">To:</div>
      <ul class="evoList">${o}</ul>
    </div>
  `}function ie(e,t){let n=e.stats||{hp:0,attack:0,defense:0,speed:0},r=t.stats||{hp:0,attack:0,defense:0,speed:0},i=[{key:`hp`,name:`HP`},{key:`attack`,name:`Attack`},{key:`defense`,name:`Defense`},{key:`speed`,name:`Speed`}];function a(e,t){return`
      <div class="compareCard" style="--card-bg:${p(e.primaryType)}">
        <h3>${d(e.name)}</h3>
        <div class="small">#${String(e.id).padStart(3,`0`)} • ${(e.types||[]).slice(0,2).map(f).join(` / `)}</div>
        <div class="compareStats" aria-label="Stats">
          ${i.map(e=>{let n=t[e.key]||0,r=m(e.key,n);return`
                <div class="statRow" style="grid-template-columns: 90px 1fr 56px">
                  <div class="statName">${e.name}</div>
                  <div>
                    <div class="progress">
                      <div class="bar" style="width:${r}%;"></div>
                    </div>
                  </div>
                  <div class="statValue">${n}</div>
                </div>
              `}).join(``)}
        </div>
      </div>
    `}return`
    <div class="compareStats__row">
      ${a(e,n)}
      ${a(t,r)}
    </div>
  `}var y=20,b=`vanillaDex:favorites`,x=`vanillaDex:theme`,S=document.getElementById(`gallery`),C=document.getElementById(`bottomSentinel`),w=document.getElementById(`loadingLine`),T=document.getElementById(`emptyState`),E=document.getElementById(`metaLine`),D=document.getElementById(`search`),O=document.getElementById(`typeFilter`),k=document.getElementById(`favoritesOnly`),ae=document.getElementById(`themeToggle`),A=document.getElementById(`modalOverlay`),j=document.getElementById(`modalContent`),oe=document.getElementById(`modalClose`),M=document.getElementById(`compareA`),N=document.getElementById(`compareB`),P=document.getElementById(`compareBtn`),F=document.getElementById(`compareResult`),se=[`bug`,`dark`,`dragon`,`electric`,`fairy`,`fighting`,`fire`,`flying`,`ghost`,`grass`,`ground`,`ice`,`normal`,`poison`,`psychic`,`rock`,`steel`,`water`],I=[],L=0,R=!0,z=!1,B=``,V=`all`,H=!1,U=new Set,W=null,G=!1;function ce(){try{let e=localStorage.getItem(b);if(!e)return new Set;let t=JSON.parse(e);return Array.isArray(t)?new Set(t.map(e=>Number(e)).filter(e=>Number.isFinite(e))):new Set}catch{return new Set}}function le(){localStorage.setItem(b,JSON.stringify(Array.from(U)))}function ue(){return window.matchMedia?.(`(prefers-color-scheme: dark)`)?.matches??!1}function K(e){let t=e===`dark`?`dark`:`light`;document.documentElement.setAttribute(`data-theme`,t)}function de(){let e=localStorage.getItem(x);if(e===`dark`||e===`light`){K(e);return}K(ue()?`dark`:`light`)}function fe(){let e=(document.documentElement.getAttribute(`data-theme`)||`light`)===`dark`?`light`:`dark`;K(e),localStorage.setItem(x,e)}function q(){E.textContent=`Showing: ${Array.from(S.querySelectorAll(`[data-id]`)).length}. Filter: ${V===`all`?`All types`:f(V)}${H?` + favorites`:``}${B?` • Search: "${B}"`:``}`}function pe(e,t){let n=B;return!(n&&!e.name.toLowerCase().includes(n)||H&&!U.has(e.id)||V!==`all`&&(!t||!(t.types||[]).includes(V)))}async function J(){if(!(z||!R)&&I.length!==0){z=!0,h(w,`Loading Pokémon...`);try{let e=[],t=0;for(;t<y&&L<I.length;){let n=I[L];L+=1;let r=B;if(r&&!n.name.toLowerCase().includes(r)||H&&!U.has(n.id))continue;let i=await s(n.id);if(!pe(n,i))continue;let a=ne(i,U.has(i.id));S.insertAdjacentHTML(`beforeend`,a),e.push(i.id),t+=1}L>=I.length&&e.length===0&&(R=!1),T.hidden=S.querySelector(`[data-id]`)!==null,q()}catch(e){console.error(e),h(w,`Failed to load. Please try again.`)}finally{z=!1,g(w)}}}function Y(){L=0,R=!0,z=!1,S.innerHTML=``,_(S),T.hidden=!1,q(),J()}function me(e,t=250){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var he=me(()=>{B=(D.value||``).trim().toLowerCase(),Y()},180);function ge(){for(let e of se){let t=document.createElement(`option`);t.value=e,t.textContent=e,O.appendChild(t)}}function _e(){M.innerHTML=``,N.innerHTML=``;let e=I[0]?.id||1,t=I[1]?.id||2;for(let e of I){let t=document.createElement(`option`);t.value=String(e.id),t.textContent=`${e.id.toString().padStart(3,`0`)} ${e.name}`;let n=document.createElement(`option`);n.value=String(e.id),n.textContent=`${e.id.toString().padStart(3,`0`)} ${e.name}`,M.appendChild(t),N.appendChild(n)}M.value=String(e),N.value=String(t)}async function X(){let e=Number(M.value),t=Number(N.value);if(!(!Number.isFinite(e)||!Number.isFinite(t))&&G){F.innerHTML=`<span class="spinner" aria-hidden="true"></span><span style="margin-left:10px">Comparing...</span>`;try{let[n,r]=await Promise.all([s(e),s(t)]);F.innerHTML=ie(n,r)}catch(e){console.error(e),F.textContent=`Comparison failed.`}}}function ve(e){W=e,j.innerHTML=`
    <div class="panel">
      <span class="spinner" aria-hidden="true"></span>
      <span style="margin-left:10px">Loading details...</span>
    </div>
  `}async function Z(e){ve(e);try{let[t,n]=await Promise.all([s(e),l(e)]);if(W!==e)return;j.innerHTML=re(t,n,U.has(e));let r=j.querySelector(`#modalFavBtn`);r&&r.addEventListener(`click`,t=>{t.stopPropagation(),$(e),Z(e)})}catch(e){console.error(e),j.innerHTML=`<div class="panel">Failed to load details.</div>`}}function ye(){A.hidden=!1}function Q(){A.hidden=!0,j.innerHTML=``,W=null}function $(e){U.has(e)?U.delete(e):U.add(e),le()}function be(){for(let e of S.querySelectorAll(`[data-id]`)){let t=Number(e.getAttribute(`data-id`)),n=e.querySelector(`.heart-icon`);n&&n.classList.toggle(`is-favorite`,U.has(t))}}async function xe(){U=ce(),Q(),de(),ge(),F.innerHTML=``,F.hidden=!0,G=!1,P.textContent=`Compare`,T.hidden=!0,q(),ae.addEventListener(`click`,()=>fe()),D.addEventListener(`input`,he),O.addEventListener(`change`,()=>{V=O.value,Y()}),k.addEventListener(`change`,()=>{H=k.checked,Y()}),oe.addEventListener(`click`,Q),A.addEventListener(`click`,e=>{e.target.closest(`.modal`)||Q()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&!A.hidden&&Q()}),S.addEventListener(`click`,e=>{if(!e.isTrusted)return;let t=e.target.closest(`.heart-btn`);if(t&&t.dataset.fav){e.stopPropagation(),$(Number(t.dataset.fav)),be();return}let n=e.target.closest(`.pokemon-card[data-id]`);if(n){let e=Number(n.getAttribute(`data-id`));Number.isFinite(e)&&(ye(),Z(e))}});let e=e=>{G=e,F.hidden=!e,e||(F.innerHTML=``),P.textContent=e?`Hide`:`Compare`};P.addEventListener(`click`,async()=>{if(G){e(!1);return}e(!0),await X()}),M.addEventListener(`change`,()=>{G&&X()}),N.addEventListener(`change`,()=>{G&&X()}),te(S,y),h(w,`Loading Pokédex...`);try{I=await i(151),_(S),S.innerHTML=``,_e(),T.hidden=!0,B=``,V=`all`,H=!1,D.value=``,O.value=`all`,k.checked=!1,q(),new IntersectionObserver(e=>{e[0]?.isIntersecting&&J()},{root:null,threshold:.1,rootMargin:`200px`}).observe(C),L=0,R=!0,z=!1,T.hidden=!1,await J()}catch(e){console.error(e),h(w,`Failed to load Pokédex.`)}finally{g(w)}}xe();