(()=>{function ke(n){(()=>{if(window.__fc27SbcHooked)return;window.__fc27SbcHooked=!0;let a=/\/ut\/game\/[^/?]+\/(club|sbs\/|purchased\/items|storagepile)|players\.json/i,u=(i,p)=>{try{window.postMessage({__fc27sbc:!0,url:String(i),body:p},window.location.origin)}catch{}},t={club:new Set,league:new Set,nation:new Set},C={club:new Set,league:new Set,nation:new Set},h=[2027,2026,2025],f={club:i=>h.flatMap(p=>[`global.teamFull.${p}.team${i}`,`global.teamabbr15.${p}.team${i}`]).concat([`global.teamFull.team${i}`,`global.teamabbr15.team${i}`]),league:i=>h.flatMap(p=>[`global.leagueFull.${p}.league${i}`,`global.leagueabbr15.${p}.league${i}`]).concat([`global.leagueFull.league${i}`]),nation:i=>[`search.nationName.nation${i}`,`global.nationFull.nation${i}`,`global.nationName.nation${i}`]},l={club:/team(full|abbr15|name)/i,league:/league(full|abbr15|name)/i,nation:/nation(full|name)/i},b=null;function d(){if(b)return b;let i=window.services&&window.services.Localization;if(!i)return null;let p=new Set,y=(w,A)=>{if(!w||typeof w!="object"||p.has(w)||A>3)return null;p.add(w);let W;try{W=Object.keys(w)}catch{return null}if(W.length>2e3&&W.slice(0,50).filter(k=>k.includes(".")&&typeof w[k]=="string").length>25)return w;for(let k of W.slice(0,200)){let E;try{E=w[k]}catch{continue}let T=y(E,A+1);if(T)return T}return null};return b=y(i,0),b}function g(i){let p=window.services&&window.services.Localization;try{let y=d();if(y&&typeof y[i]=="string")return y[i];if(p&&typeof p.localize=="function"){let w=p.localize(i);if(typeof w=="string"&&w&&w!==i&&!w.includes(i))return w}}catch{}return null}let m=null;function o(){let i={club:{},league:{},nation:{}},p=0,y=d();for(let w of Object.keys(t))for(let A of t[w]){if(C[w].has(A))continue;let W=null;for(let k of f[w](A))if(W=g(k),W)break;if(!W&&y){let k=new RegExp(`\\D${A}$`),E=Object.keys(y).find(T=>l[w].test(T)&&k.test(T));E&&(W=y[E])}W&&(i[w][A]=W,C[w].add(A),p++)}if(p&&window.postMessage({__fc27sbc:!0,labels:i},window.location.origin),y&&!o.sampled){o.sampled=!0;let w=Object.keys(y).filter(A=>/team|league|nation/i.test(A)).slice(0,60);window.postMessage({__fc27sbc:!0,locSample:w.map(A=>[A,y[A]])},window.location.origin)}}function s(i,p){p==null||p===0||C[i].has(p)||(t[i].add(p),clearTimeout(m),m=setTimeout(o,500))}function c(i){try{let p=[].concat(i.itemData||[]).concat((i.squad&&i.squad.players||[]).map(y=>y.itemData).filter(Boolean));for(let y of p)s("club",y.teamid),s("league",y.leagueId),s("nation",y.nation);for(let y of i.challenges||[])for(let w of y.elgReq||[])w.type==="CLUB_ID"&&s("club",w.eligibilityValue),w.type==="LEAGUE_ID"&&s("league",w.eligibilityValue),w.type==="NATION_ID"&&s("nation",w.eligibilityValue)}catch{}}window.addEventListener("message",i=>{if(!(i.source!==window||!i.data||!i.data.__fc27sbcWant))for(let p of Object.keys(t))for(let y of i.data.__fc27sbcWant[p]||[])s(p,y)});let S=u,N=(i,p)=>{c(p),S(i,p)},X=window.fetch;window.fetch=async function(...i){let p=await X.apply(this,i);try{let y=i[0],w=typeof y=="string"?y:y&&y.url||String(y);a.test(w)&&p.clone().json().then(A=>N(w,A)).catch(()=>{})}catch{}return p};let G=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(i,p,...y){return this.__fc27Url=p,G.call(this,i,p,...y)};let x=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(...i){return this.addEventListener("load",()=>{try{let p=String(this.__fc27Url||"");if(!a.test(p))return;let y=null;this.responseType==="json"?y=this.response:(this.responseType===""||this.responseType==="text")&&(y=JSON.parse(this.responseText)),y&&N(p,y)}catch{}}),x.apply(this,i)}})(),(()=>{let a={club:{},sets:{},challenges:{},names:{},samples:{},labels:{club:{},league:{},nation:{}},unknownUrls:[]},u=!1,t=new Set,C=null;n.storage.local.get(["club","sets","challenges","names","samples","labels"]).then(o=>{Object.assign(a,{club:o.club||{},sets:o.sets||{},challenges:o.challenges||{},names:o.names||{},samples:o.samples||{},labels:{club:{},league:{},nation:{},...o.labels||{}}});for(let[s,c]of Object.entries(a.club))(!c||!c.id||c.id==="0"||!(c.rating>0))&&(delete a.club[s],t.add("club"));u=!0,f()}),n.storage.onChanged.addListener((o,s)=>{if(s==="local")for(let c of["club","sets","challenges","names"])o[c]&&!t.has(c)&&(a[c]=o[c].newValue||{})});function h(o){t.add(o),f()}function f(){!u||t.size===0||(clearTimeout(C),C=setTimeout(()=>{let o={};for(let s of t)o[s]=a[s];t=new Set,o.lastUpdate=Date.now(),n.storage.local.set(o)},400))}function l(o,s,c){let S=(N,X=0)=>{if(Array.isArray(N))return N.slice(0,2).map(G=>S(G,X+1));if(N&&typeof N=="object"&&X<5){let G={};for(let[x,i]of Object.entries(N))G[x]=S(i,X+1);return G}return N};a.samples[o]={url:s.replace(/\?.*$/,""),at:Date.now(),body:S(c)},h("samples")}function b(o){if(!o||typeof o!="object")return null;let s=o.itemType||o.type;if(s&&s!=="player"||!o.id||!(Number(o.rating)>0)||o.itemState==="invalid"||!o.preferredPosition&&!Array.isArray(o.possiblePositions))return null;let c=o.preferredPosition||o.position||null;return{id:String(o.id),assetId:o.assetId??null,resourceId:o.resourceId??o.definitionId??null,rating:Number(o.rating),nation:o.nation??o.nationId??null,league:o.leagueId??o.league??null,club:o.teamid??o.teamId??o.clubId??null,rarity:o.rareflag??o.rarityId??0,position:c,positions:Array.isArray(o.possiblePositions)&&o.possiblePositions.length?o.possiblePositions:c?[c]:[],untradeable:!!o.untradeable,loan:!!o.loans||Number(o.loans)>0,inStorage:!1}}function d(o,s={}){let c=0;for(let S of o||[]){let N=b(S);!N||N.loan||(a.club[N.id]={...a.club[N.id],...N,...s,seen:Date.now()},c++)}c&&h("club")}function g(o,s){if(!s||typeof s!="object")return;if(/players\.json/i.test(o)){for(let S of[s.Players,s.LegendsPlayers])for(let N of S||[])N&&N.id!=null&&(a.names[N.id]=N.c||[N.f,N.l].filter(Boolean).join(" "));h("names");return}if(/\/club(\b|\/|\?|$)/.test(o)&&Array.isArray(s.itemData)){d(s.itemData),l("club",o,s);return}if(/storagepile/i.test(o)&&Array.isArray(s.itemData)){d(s.itemData,{inStorage:!0}),l("storage",o,s);return}if(/\/sbs\/sets/.test(o)&&Array.isArray(s.categories)){for(let S of s.categories)for(let N of S.sets||[])a.sets[N.setId]={setId:N.setId,name:N.name,category:S.name,challengesCount:N.challengesCount};h("sets"),l("sets",o,s);return}let c=o.match(/\/sbs\/setId\/(\d+)\/challenges/);if(c&&Array.isArray(s.challenges)){for(let S of s.challenges)a.challenges[S.challengeId]={challengeId:S.challengeId,setId:Number(c[1]),name:S.name,formation:S.formation||null,status:S.status||null,elgReq:S.elgReq||[],elgOperation:S.elgOperation||"AND"};h("challenges"),l("challenges",o,s);return}/\/sbs\/challenge\/\d+\/squad/.test(o)&&s.squad&&Array.isArray(s.squad.players)&&(d(s.squad.players.map(S=>S.itemData).filter(Boolean)),l("challengeSquad",o,s))}window.addEventListener("message",o=>{if(!(o.source!==window||!o.data||o.data.__fc27sbc!==!0))try{if(o.data.labels){for(let s of["club","league","nation"])Object.assign(a.labels[s],o.data.labels[s]||{});h("labels");return}if(o.data.locSample){a.samples.loc={at:Date.now(),body:o.data.locSample},h("samples");return}g(o.data.url,o.data.body)}catch(s){console.warn("[FC27 SBC]",s)}});function m(){let o={club:new Set,league:new Set,nation:new Set};for(let c of Object.values(a.club))for(let S of["club","league","nation"])c[S]!=null&&!a.labels[S][c[S]]&&o[S].add(c[S]);for(let c of Object.values(a.challenges))for(let S of c.elgReq||[])S.type==="CLUB_ID"&&!a.labels.club[S.eligibilityValue]&&o.club.add(S.eligibilityValue);let s={};for(let c of Object.keys(o))s[c]=[...o[c]];window.postMessage({__fc27sbcWant:s},window.location.origin)}[4e3,12e3,3e4,6e4].forEach(o=>setTimeout(()=>u&&m(),o))})()}var Se="0.3.0";var Ce="fc27sbc:",be=new Set;function Ye(n){try{let a=localStorage.getItem(Ce+n);return a==null?void 0:JSON.parse(a)}catch{return}}var ge={async get(n){let a=Array.isArray(n)?n:[n],u={};for(let t of a){let C=Ye(t);C!==void 0&&(u[t]=C)}return u},async set(n){let a={};for(let[u,t]of Object.entries(n)){try{localStorage.setItem(Ce+u,JSON.stringify(t))}catch(C){console.warn("[FC27 SBC] kunne ikke gemme",u,C)}a[u]={newValue:t}}setTimeout(()=>be.forEach(u=>{try{u(a,"local")}catch(t){console.warn(t)}}),0)}},Me={storage:{local:ge,onChanged:{addListener:n=>be.add(n)}}},Le={get:n=>ge.get(n),set:n=>ge.set(n),watch:n=>be.add((a,u)=>u==="local"&&n(a))};function $e(n){if(!n.length)return 0;let a=n.reduce((C,h)=>C+h,0),u=a/11,t=0;for(let C of n)C>u&&(t+=C-u);return Math.floor(Math.round(a+t)/11)}function ie(n){return n>=75?3:n>=65?2:1}var Xe={1:"Arsenal",2:"Aston Villa",5:"Chelsea",7:"Everton",9:"Liverpool",10:"Manchester City",11:"Manchester United",13:"Newcastle",18:"Tottenham",21:"FC Bayern",22:"Borussia Dortmund",32:"Leverkusen",39:"Atalanta",44:"Inter",45:"Juventus",46:"Lazio",47:"AC Milan",48:"Napoli",52:"Roma",65:"LOSC",66:"Lyon",69:"Monaco",73:"Paris SG",74:"Stade Rennais",78:"Celtic",219:"Marseille",229:"Anderlecht",231:"Club Brugge",234:"Benfica",236:"FC Porto",237:"Sporting CP",240:"Atlético de Madrid",241:"FC Barcelona",243:"Real Madrid",245:"Ajax",246:"Feyenoord",247:"PSV",448:"Athletic Club",449:"Real Betis",457:"Real Sociedad",461:"Valencia",481:"Sevilla",483:"Villarreal",110374:"Fiorentina",112172:"RB Leipzig"},Je={1:"Superliga",4:"Belgian Pro League",10:"Eredivisie",13:"Premier League",14:"Championship",16:"Ligue 1",19:"Bundesliga",20:"2. Bundesliga",31:"Serie A",39:"MLS",50:"Scottish Prem",53:"LaLiga",68:"Süper Lig",308:"Liga Portugal",350:"Saudi Pro League",2118:"Icons"},Qe={4:"Østrig",7:"Belgien",10:"Kroatien",13:"Danmark",14:"England",18:"Frankrig",21:"Tyskland",27:"Italien",34:"Holland",36:"Norge",37:"Polen",38:"Portugal",42:"Skotland",45:"Spanien",46:"Sverige",47:"Schweiz",50:"Wales",52:"Argentina",54:"Brasilien",56:"Colombia",60:"Uruguay",83:"Mexico",95:"USA",129:"Marokko",136:"Senegal",163:"Japan"},Be={club:["Klub",Xe],league:["Liga",Je],nation:["Nation",Qe]},he={club:{},league:{},nation:{}};function Ee(n){for(let a of Object.keys(he))he[a]={...n?.[a]||{}}}function ce(n,a){return a==null?null:he[n]?.[a]||Be[n]?.[1][a]||null}function J(n,a){return a==null?"":ce(n,a)||`${Be[n]?.[0]||""} #${a}`}var Te=n=>{let a=String(n||"").toUpperCase();return a==="LOWER"||a==="LESS"||a==="MAX"?"max":a==="EXACT"||a==="EQUAL"?"exact":"min"},Ie={NATION_ID:"nation",LEAGUE_ID:"league",CLUB_ID:"club",PLAYER_RARITY:"rarity"},Ze={SAME_NATION_COUNT:"nation",SAME_LEAGUE_COUNT:"league",SAME_CLUB_COUNT:"club"},et={NATION_COUNT:"nation",LEAGUE_COUNT:"league",CLUB_COUNT:"club"},Ae=new Set(["PLAYER_COUNT","PLAYER_COUNT_COMBINED"]),tt={0:"min",1:"max",2:"exact"},nt={nation:"nation",league:"liga",club:"klub",rarity:"sjældenhed"},Re={1:"bronze",2:"sølv",3:"guld"},Z={min:"min.",max:"maks.",exact:"præcis"};function me(n=[]){let a=new Map;for(let t of n){let C=t.eligibilitySlot??Symbol("slot");a.has(C)||a.set(C,[]),a.get(C).push(t)}let u=[];for(let t of a.values()){let C=t.find(m=>m.type==="SCOPE"),h=C?tt[Number(C.eligibilityValue)]||"min":null,f=t.find(m=>Ae.has(m.type)),l=f?Number(f.eligibilityValue):t.find(m=>m.count!=null)?.count,b=h||(f?Te(f.scope):"min"),d=t.filter(m=>!Ae.has(m.type)&&m.type!=="SCOPE");if(f&&!d.length)continue;let g=d.find(m=>Ie[m.type])?.type;if(g){let m=Ie[g],o=d.filter(c=>c.type===g).map(c=>Number(c.eligibilityValue)),s=l??1;u.push({kind:"count",filter:{field:m,values:o},op:b,n:s,desc:`${Z[b]} ${s} spiller(e) fra ${o.map(c=>m==="rarity"?`sjældenhed ${c}`:J(m,c)).join(" / ")}`});continue}for(let m of d){let o=Number(m.eligibilityValue),s=f?"exact":h||Te(m.scope);switch(m.type){case"TEAM_RATING":case"TEAM_RATING_1_TO_100":u.push({kind:"rating",op:s,n:o,desc:`Holdrating ${Z[s]} ${o}`});break;case"TEAM_CHEMISTRY":case"CHEMISTRY_POINTS":u.push({kind:"chem",op:s,n:o,desc:`Holdkemi ${Z[s]} ${o}`});break;case"ALL_PLAYERS_CHEMISTRY_POINTS":u.push({kind:"playerChem",n:o,desc:`Kemi pr. spiller min. ${o}`});break;case"PLAYER_LEVEL":case"PLAYER_QUALITY":{let c={level:o,op:s};l!=null?u.push({kind:"count",filter:c,op:b,n:l,desc:`${Z[b]} ${l} spiller(e) ${Z[s]} ${Re[o]||o}`}):u.push({kind:"perPlayer",filter:c,desc:`Alle spillere ${Z[s]} ${Re[o]||o}`});break}case"PLAYER_MIN_OVR":case"PLAYER_MAX_OVR":case"PLAYER_EXACT_OVR":{let c=m.type==="PLAYER_MIN_OVR"?"min":m.type==="PLAYER_MAX_OVR"?"max":"exact",S={ovr:o,op:c};l!=null?u.push({kind:"count",filter:S,op:b,n:l,desc:`${Z[b]} ${l} spiller(e) med rating ${Z[c]} ${o}`}):u.push({kind:"perPlayer",filter:S,desc:`Alle spillere rating ${Z[c]} ${o}`});break}case"PLAYER_RARITY_GROUP":{let c=l??1;u.push({kind:"count",filter:{rare:!0},op:b,n:c,desc:`${Z[b]} ${c} sjældne spiller(e) (antaget, gruppe ${o})`});break}case"SAME_NATION_COUNT":case"SAME_LEAGUE_COUNT":case"SAME_CLUB_COUNT":{let c=Ze[m.type];u.push({kind:"same",field:c,op:s,n:o,desc:`${Z[s]} ${o} spillere fra samme ${nt[c]}`});break}case"NATION_COUNT":case"LEAGUE_COUNT":case"CLUB_COUNT":{let c=et[m.type],S={nation:"nationer",league:"ligaer",club:"klubber"}[c];u.push({kind:"distinct",field:c,op:s,n:o,desc:`Antal forskellige ${S}: ${Z[s]} ${o}`});break}default:u.push({kind:"unknown",raw:m,desc:`Ikke understøttet krav: ${m.type} = ${m.eligibilityValue} (${m.scope||""}) — tjek selv`})}}}return u}var _e=(n,a,u)=>a==="max"?n<=u:a==="exact"?n===u:n>=u,re=(n,a,u)=>a==="max"?Math.max(0,n-u):a==="exact"?Math.abs(n-u):Math.max(0,u-n);function ne(n,a){return a.field?a.values.includes(Number(n[a.field])):a.level!=null?_e(ie(n.rating),a.op,a.level):a.ovr!=null?_e(n.rating,a.op,a.ovr):a.rare?Number(n.rarity)!==0:!0}function Ne(n,a,u){return n.map(t=>{let C=null,h=0;switch(t.kind){case"rating":C=u.rating,h=re(C,t.op,t.n)*3;break;case"chem":C=u.chem.total,h=re(C,t.op,t.n);break;case"playerChem":C=Math.min(...u.chem.per),h=u.chem.per.reduce((f,l)=>f+Math.max(0,t.n-l),0);break;case"count":C=a.filter(f=>ne(f,t.filter)).length,h=re(C,t.op,t.n);break;case"perPlayer":C=a.filter(f=>!ne(f,t.filter)).length,h=C;break;case"same":{let f=new Map;for(let l of a)l[t.field]!=null&&f.set(l[t.field],(f.get(l[t.field])||0)+1);C=f.size?Math.max(...f.values()):0,h=re(C,t.op,t.n);break}case"distinct":{let f=new Set(a.map(b=>b[t.field]).filter(b=>b!=null)).size,l=a.filter(b=>b[t.field]==null).length;C=t.op==="min"?f:f+l,h=re(C,t.op,t.n);break}default:return{c:t,ok:null,actual:null,gap:0}}return{c:t,ok:h===0,actual:C,gap:h}})}var ze={433:["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"],4231:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","CAM","ST"],442:["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"],4141:["GK","RB","CB","CB","LB","CDM","RM","CM","CM","LM","ST"],41212:["GK","RB","CB","CB","LB","CDM","RM","LM","CAM","ST","ST"],352:["GK","CB","CB","CB","CDM","CDM","RM","LM","CAM","ST","ST"],343:["GK","CB","CB","CB","RM","CM","CM","LM","RW","ST","LW"],532:["GK","RWB","CB","CB","CB","LWB","CM","CM","CM","ST","ST"],4321:["GK","RB","CB","CB","LB","CM","CM","CM","CAM","CAM","ST"],3142:["GK","CB","CB","CB","CDM","RM","CM","CM","LM","ST","ST"],3412:["GK","CB","CB","CB","RM","CM","CM","LM","CAM","ST","ST"],4411:["GK","RB","CB","CB","LB","RM","CM","CM","LM","CAM","ST"],451:["GK","RB","CB","CB","LB","RM","CM","CAM","CM","LM","ST"],4222:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","ST","ST"],541:["GK","RWB","CB","CB","CB","LWB","RM","CM","CM","LM","ST"]},Oe=2118;function Pe(n){let a=String(n||"").replace(/[^0-9]/g,"");return ze[a]||ze[433]}var xe=(n,[a,u,t])=>n>=t?3:n>=u?2:n>=a?1:0;function at(n,a,u=!1){let t=new Array(a.length).fill(-1),C=(b,d)=>u||(b.positions||[]).includes(a[d]),h=(b,d)=>{for(let g=0;g<a.length;g++)if(!(d[g]||!C(n[b],g))&&(d[g]=!0,t[g]===-1||h(t[g],d)))return t[g]=b,!0;return!1},f=n.map((b,d)=>d).sort((b,d)=>(n[b].positions?.length||0)-(n[d].positions?.length||0));for(let b of f)h(b,new Array(a.length).fill(!1));let l=new Array(n.length).fill(-1);return t.forEach((b,d)=>{b!==-1&&(l[b]=d)}),l}function Ue(n,a,u=!1){let t=at(n,a,u),C=new Map,h=new Map,f=new Map,l=(d,g,m=1)=>{g!=null&&d.set(g,(d.get(g)||0)+m)};n.forEach((d,g)=>{if(t[g]===-1)return;let m=d.league===Oe;l(C,d.club),l(h,d.nation,m?2:1),m||l(f,d.league)});let b=n.map((d,g)=>{if(t[g]===-1)return 0;if(d.league===Oe)return 3;let m=xe(C.get(d.club)||0,[2,5,7])+xe(h.get(d.nation)||0,[2,5,8])+xe(f.get(d.league)||0,[3,5,8]);return Math.min(3,m)});return{total:b.reduce((d,g)=>d+g,0),per:b,slotOf:t}}var ot={maxRating:99,excludeSpecial:!0,onlyUntradeable:!1,tradeablePenalty:1.6,ignorePositions:!1,iterations:2e4,restarts:3,excludeIds:[],allowBuy:!1,maxBuys:4,seed:null},de=["club","league","nation"];function it(n,a){let u=n.rating<75?.2+(n.rating-45)/100:Math.pow(1.35,n.rating-75);return Number(n.rarity)>1?u*=2.5:Number(n.rarity)===1&&(u*=1.15),n.untradeable||(u*=a.tradeablePenalty),n.inStorage&&a.preferStorage!==!1&&(u*=.4),u}var rt=["GK","RB","CB","LB","RWB","LWB","CDM","CM","CAM","RM","LM","RW","LW","ST"],st=[60,65,70,75,77,79,80,81,82,83,84,85,86,87];function lt(n){return(n<75?.3+(n-55)*.02:Math.pow(1.35,n-75))*2.2+2}var ct=25,dt=new Set([13,16,19,31,53]),pt=new Set([1,5,9,10,11,18,21,22,44,45,47,48,73,240,241,243]);function ut(n){if(n.generic)return 0;let a=1;return n.required&&(a+=ct),n.club!=null&&pt.has(Number(n.club))&&(a+=10),n.league!=null&&dt.has(Number(n.league))&&(a+=3),n.nation!=null&&(a+=.5),a}var se=(n,a)=>[...n.entries()].sort((u,t)=>t[1]-u[1]).slice(0,a).map(([u])=>u),oe=(n,a)=>n.set(a,(n.get(a)||0)+1);function ft(n,a,u,t){let C=new Map,h=new Map,f=new Map,l=new Map,b=new Map;for(let x of n)x.club!=null&&oe(C,x.club),x.nation!=null&&oe(h,x.nation),x.club!=null&&x.league!=null&&x.nation!=null&&oe(f,`${x.club}|${x.league}|${x.nation}`),x.league!=null&&x.nation!=null&&oe(l,`${x.league}|${x.nation}`),x.club!=null&&x.league!=null&&oe(b,`${x.club}|${x.league}`);let d=x=>{let i=null,p=0;for(let[y,w]of b){let[A,W]=y.split("|");Number(A)===Number(x)&&w>p&&(p=w,i=Number(W))}return i},g=x=>x==="null"?null:Number(x),m=new Map,o=x=>{let i=`${x.club}|${x.league}|${x.nation}`;m.has(i)||m.set(i,x)},s=new Set,c=new Map;for(let x of a){let i=x.filter;if(x.kind!=="count"||i?.field!=="club"||x.op==="max")continue;let p=i.values.map(Number);p.forEach(A=>s.add(A));let y=new Set(t.filter(A=>p.includes(Number(A.club))).map(le)).size,w=Math.max(0,x.n-y);if(w)for(let A of p)c.set(A,Math.max(c.get(A)||0,w))}for(let x of a){let i=x.filter;if(!(x.kind!=="count"||!i?.field))for(let p of i.values){if(i.field==="club"&&(c.has(Number(p))?o({club:p,league:d(p),nation:null,required:c.get(Number(p))}):s.has(Number(p))||o({club:p,league:d(p),nation:null})),i.field==="league"){o({club:null,league:p,nation:null});for(let[y]of[...l].filter(([w])=>g(w.split("|")[0])===p).sort((w,A)=>A[1]-w[1]).slice(0,3))o({club:null,league:p,nation:g(y.split("|")[1])})}if(i.field==="nation"){o({club:null,league:null,nation:p});for(let[y]of[...l].filter(([w])=>g(w.split("|")[1])===p).sort((w,A)=>A[1]-w[1]).slice(0,3))o({club:null,league:g(y.split("|")[0]),nation:p})}}}let S=x=>!s.has(Number(x));for(let x of se(f,40)){let[i,p,y]=x.split("|").map(g);S(i)&&o({club:i,league:p,nation:y})}for(let x of se(C,14))S(x)&&o({club:x,league:d(x),nation:null});for(let x of se(l,20)){let[i,p]=x.split("|").map(g);o({club:null,league:i,nation:p})}for(let x of se(h,8))o({club:null,league:null,nation:x});o({club:null,league:null,nation:null,generic:!0});let N=a.some(x=>x.kind==="count"&&(x.filter?.rare||x.filter?.field==="rarity")),X=[],G=0;for(let x of m.values())for(let i of st)for(let p of N&&(x.generic||x.club!=null)?[0,1]:[0]){let y={id:`buy-${G++}`,placeholder:!0,rating:i,rarity:p,untradeable:!1,club:x.club,league:x.league,nation:x.nation,positions:rt,requiredClub:!!x.required,maxUses:x.required||null,generic:!!x.generic};u.every(w=>ne(y,w.filter))&&X.push({p:y,cost:(lt(i)+ut(x))*(p?1.3:1)})}return X}function gt(n){if(n==null)return Math.random;let a=n>>>0;return()=>(a=a*1664525+1013904223>>>0)/4294967296}var le=n=>String(n.assetId??n.resourceId??n.id),bt=15;function De(n,a,u={}){let t={...ot,...u},C=gt(t.seed),h=Pe(t.formation),f=h.length,l=a.filter(i=>i.kind==="perPlayer"),b=a.filter(i=>i.kind!=="perPlayer"&&i.kind!=="unknown"),d=new Set(t.excludeIds.map(String)),g=new Map;for(let i of n){if(i.loan||d.has(String(i.id))||i.rating>t.maxRating||t.excludeSpecial&&Number(i.rarity)>1||t.onlyUntradeable&&!i.untradeable||!l.every(w=>ne(i,w.filter)))continue;let p=it(i,t),y=le(i);(!g.has(y)||g.get(y).cost>p)&&g.set(y,{p:i,cost:p})}let m=[...g.values()],o=t.allowBuy&&t.maxBuys>0?ft(n,b,l,m.map(i=>i.p)):[],s=[...m,...o];if(m.length<f&&!o.length)return{feasible:!1,error:`Kun ${m.length} brugbare spillere fundet (skal bruge ${f}). Bladr mere i klubben, løsn filtrene eller slå køb til.`};let c={slots:h,soft:b,opt:t,rand:C,size:f},S=ve(s,c,t.iterations,t.restarts),N=ht(m,o,b);if(N.length){let i=Math.max(3e3,Math.round(t.iterations/3));for(let p of N){let y=s.filter(A=>p.every(([W,k])=>A.p[W]!=null&&k.has(A.p[W])));if(y.length<2||y.filter(A=>!A.p.placeholder).length<f&&!y.some(A=>A.p.placeholder))continue;let w=ve(y,c,i,1);w&&je(w,S)&&(S=w)}}for(let i=0;i<3&&S&&S.s.viol>0;i++){let p=ve(s,c,t.iterations,2);p&&je(p,S)&&(S=p)}if(!S)return{feasible:!1,error:"Kunne ikke sætte et hold sammen. Bladr mere i klubben eller slå køb til."};let{players:X,s:G}=S;return{overBuyLimit:X.filter(i=>i.placeholder).length>t.maxBuys,buyLimit:t.maxBuys,feasible:G.viol===0,violation:G.viol,rating:G.rating,chem:G.chem.total,cost:Math.round(G.cost*10)/10,buys:X.filter(i=>i.placeholder).length,slots:h,squad:X.map((i,p)=>({player:i,slotIndex:G.chem.slotOf[p],slot:G.chem.slotOf[p]>=0?h[G.chem.slotOf[p]]:"—",chem:G.chem.per[p]})),checks:[...G.res,...a.filter(i=>i.kind==="perPlayer").map(i=>({c:i,ok:!0,actual:null})),...a.filter(i=>i.kind==="unknown").map(i=>({c:i,ok:null,actual:null}))],candidates:s.length}}var je=(n,a)=>a?n?n.s.viol===0!=(a.s.viol===0)?n.s.viol===0:n.s.viol===0?n.s.cost<a.s.cost:n.s.total<a.s.total:!1:!0;function ht(n,a,u){let t=u.filter(l=>l.kind==="distinct"&&l.op!=="min"&&l.n<=5&&de.includes(l.field));if(!t.length)return[];let C=[];for(let l of t){let b=new Map;for(let{p:s}of n)s[l.field]!=null&&oe(b,s[l.field]);for(let{p:s}of a)s[l.field]!=null&&!b.has(s[l.field])&&b.set(s[l.field],.5);let d=se(b,l.n<=2?8:7),g=Math.min(l.n,d.length),m=[],o=(s,c)=>{if(c.length===g){m.push(c.slice());return}for(let S=s;S<d.length;S++)c.push(d[S]),o(S+1,c),c.pop()};o(0,[]),C.push(m.map(s=>[l.field,new Set(s)]))}let h=[[]];for(let l of C){let b=[];for(let d of h)for(let g of l)b.push([...d,g]);h=b}let f=l=>n.filter(({p:b})=>l.every(([d,g])=>g.has(b[d]))).length;return h.map(l=>({combo:l,n:f(l)})).sort((l,b)=>b.n-l.n).slice(0,14).map(l=>l.combo)}function ve(n,a,u,t){let{slots:C,soft:h,opt:f,rand:l,size:b}=a;if(!n.length)return null;let d=k=>k&&k.length?k[Math.floor(l()*k.length)]:void 0,g=new Map,m=new Map,o={club:new Map,league:new Map,nation:new Map};n.forEach((k,E)=>{g.has(k.p.rating)||g.set(k.p.rating,[]),g.get(k.p.rating).push(E);for(let T of k.p.positions||[])m.has(T)||m.set(T,[]),m.get(T).push(E);for(let T of de){let O=o[T];O.has(k.p[T])||O.set(k.p[T],[]),O.get(k.p[T]).push(E)}});let s=n.map((k,E)=>E).sort((k,E)=>n[k].cost-n[E].cost),c=s.slice(0,Math.min(s.length,250)),S=new Map;for(let k of h)k.kind==="count"&&k.filter&&S.set(k,n.map((E,T)=>ne(E.p,k.filter)?T:-1).filter(E=>E>=0));let N=(k,E=c,T=40)=>{for(let O=0;O<T;O++){let j=E[Math.floor(l()*E.length)];if(j!==void 0&&k(n[j].p))return j}for(let O=0;O<T;O++){let j=s[Math.floor(l()*s.length)];if(k(n[j].p))return j}},X=120,G=k=>{let E=k.map(_=>n[_].p),T=$e(E.map(_=>_.rating)),O=Ue(E,C,f.ignorePositions),j=Ne(h,E,{rating:T,chem:O}),I=0,P=new Map;for(let _ of k)n[_].p.placeholder&&(I++,oe(P,_));let D=0;for(let[_,V]of P){let Y=n[_].p.maxUses;Y&&V>Y&&(D+=(V-Y)*2)}let F=O.slotOf.filter(_=>_<0).length,H=j.reduce((_,V)=>_+V.gap,0)+D,z=k.reduce((_,V)=>_+n[V].cost,0)+Math.max(0,I-f.maxBuys)*bt;return{total:z+X*H+F*2,viol:H,cost:z,rating:T,chem:O,res:j}},x=(k,E,T)=>{if(n[T].p.placeholder)return!1;let O=le(n[T].p);return k.some((j,I)=>I!==E&&!n[j].p.placeholder&&le(n[j].p)===O)},i=(k,E)=>{let T=new Map;return k.forEach((O,j)=>{let I=O[E];T.has(I)||T.set(I,[]),T.get(I).push(j)}),T},p=(k,E,T)=>{let O=E.map(I=>n[I].p),j=k.c;switch(j.kind){case"rating":{if(k.actual>=j.n)return null;let I=O.map((F,H)=>H).sort((F,H)=>O[F].rating-O[H].rating),P=I[Math.floor(l()*Math.min(4,I.length))],D=O[P].rating+1+Math.floor(l()*5);return[P,d(g.get(D))??N(F=>F.rating>=D)]}case"chem":case"playerChem":{let I=T.chem.per,P=I.map((_,V)=>V).sort((_,V)=>I[_]-I[V]),D=P[Math.floor(l()*Math.min(3,P.length))],F=de[Math.floor(l()*3)],H=[...i(O,F).entries()].filter(([_])=>_!=null).sort((_,V)=>V[1].length-_[1].length);if(!H.length)return null;let z=H[Math.floor(l()*Math.min(2,H.length))][0];return[D,d(o[F].get(z))]}case"count":{let I=S.get(j)||[],P=O.map(F=>ne(F,j.filter));if(k.actual<j.n){let F=P.map((H,z)=>H?-1:z).filter(H=>H>=0);return F.length?[d(F),d(I)]:null}let D=P.map((F,H)=>F?H:-1).filter(F=>F>=0);return D.length?[d(D),N(F=>!ne(F,j.filter))]:null}case"same":{let I=j.field,P=[...i(O,I).entries()].filter(([z])=>z!=null).sort((z,_)=>_[1].length-z[1].length);if(!P.length)return null;let[D,F]=P[0];if(k.actual<j.n){let z=O.map((_,V)=>_[I]!==D?V:-1).filter(_=>_>=0);return z.length?[d(z),d(o[I].get(D))]:null}let H=new Set(P.map(([z])=>z).filter(z=>z!==D));return[d(F),N(z=>z[I]!=null&&z[I]!==D&&(H.size===0||H.has(z[I])||l()<.3))]}case"distinct":{let I=j.field,P=i(O,I),D=[...P.entries()].filter(([z])=>z!=null).sort((z,_)=>z[1].length-_[1].length);if(k.actual>j.n){let z=P.get(null)||P.get(void 0)||[],_=z.length?z:D[0]?.[1];if(!_?.length)return null;let V=D.filter(([,Q])=>Q!==_).map(([Q])=>Q);if(!V.length)return null;let Y=V[V.length-1-Math.floor(l()*Math.min(2,V.length))];return[d(_),d(o[I].get(Y))]}let F=D[D.length-1];if(!F)return null;let H=new Set(D.map(([z])=>z));return[d(F[1]),N(z=>z[I]!=null&&!H.has(z[I]))]}default:return null}},y=k=>{let E=[],T=new Set,O=k===0?s:s.slice(0,80).sort(()=>l()-.5).concat(s);for(let I of O){if(E.length>=b)break;let P=n[I].p;if(!P.placeholder){let D=le(P);if(T.has(D))continue;T.add(D)}E.push(I)}let j=s.filter(I=>n[I].p.placeholder);for(;E.length<b&&j.length;)E.push(d(j));return E.length===b?E:null},w=null,A=null;for(let k=0;k<t;k++){let E=y(k);if(!E)return null;let T=G(E);T.viol===0&&(!w||T.cost<w.s.cost)&&(w={idx:[...E],s:T});for(let O=0;O<u;O++){let j=6*Math.pow(.0015,O/u),I=Math.floor(l()*b),P,D=l(),F=T.res.filter(Y=>Y.gap>0),H=T.chem.slotOf.map((Y,Q)=>Y<0?Q:-1).filter(Y=>Y>=0);if(F.length&&D<.55){let Y=p(d(F),E,T);if(!Y||Y[1]===void 0)continue;[I,P]=Y}else if(H.length&&!f.ignorePositions&&D<.65){let Y=new Set(T.chem.slotOf.filter(te=>te>=0)),Q=C.map((te,pe)=>Y.has(pe)?null:te).filter(Boolean);I=d(H),P=d(m.get(d(Q)))}else if(D<.78){let Y=n[E[I]].p.rating+(l()<.5?-1:1)*(1+Math.floor(l()*3));P=d(g.get(Y))??d(c)}else if(D<.92){let Y=n[E[Math.floor(l()*b)]].p,Q=de[Math.floor(l()*3)];P=d(o[Q].get(Y[Q]))}else P=d(c);if(P===void 0)continue;let z=E[I];if(P===z||x(E,I,P))continue;E[I]=P;let _=G(E),V=_.total-T.total;V<=0||l()<Math.exp(-V/j)?(T=_,_.viol===0&&(!w||_.cost<w.s.cost)&&(w={idx:[...E],s:_})):E[I]=z}(!A||T.total<A.s.total)&&(A={idx:[...E],s:T})}let W=w||A;return{players:W.idx.map(k=>n[k].p),s:W.s}}var K=n=>String(n??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]);async function qe(n,a,u={}){let t=e=>n.getElementById(e);if(u.version){let e=n.querySelector(".title");e&&e.insertAdjacentHTML("beforeend",`<small class="ver">v${K(u.version)}</small>`)}let C={formation:"",maxRating:88,excludeSpecial:!0,onlyUntradeable:!1,preferStorage:!0,ignorePositions:!1,mode:"sbc",challengeId:"",view:"pitch",allowBuy:!0,maxBuys:4,autoMinimize:!0},h={club:{},sets:{},challenges:{},names:{},samples:{},lastUpdate:0},f={...C},l=null,b=new Set,d=new Set;async function g(){let e=await a.get(["club","sets","challenges","names","samples","lastUpdate","settings","labels"]);h={...h,...e},Ee(h.labels),f={...C,...e.settings||{}}}let m=()=>a.set({settings:f}),o=()=>Object.values(h.club||{}).filter(e=>e&&e.id&&e.id!=="0"&&e.rating>0),s=e=>h.names?.[e.assetId]||`Spiller #${e.assetId??e.id}`,c=e=>{let r=h.names?.[e.assetId];if(!r)return`#${e.assetId??e.id}`;let v=r.split(" ");return v.length>1?v[v.length-1]:r},S=e=>Number(e.rarity)>1?"lv-special":["","lv-bronze","lv-silver","lv-gold"][ie(e.rating)],N;function X(e){let r=t("toast");r.textContent=e,r.hidden=!1,clearTimeout(N),N=setTimeout(()=>{r.hidden=!0},2200)}function G(){let e=o(),r=e.filter($=>$.untradeable).length,v=e.filter($=>$.inStorage).length,M=Object.keys(h.challenges||{}).length;t("stats").innerHTML=[`<span class="stat"><b>${e.length}</b>spillere</span>`,`<span class="stat"><b>${r}</b>UT</span>`,`<span class="stat"><b>${v}</b>opbevaring</span>`,`<span class="stat"><b>${M}</b>SBC'er</span>`].join(""),x(),t("onboarding").hidden=e.length>0}function x(){let e=t("liveState"),r=h.lastUpdate?Math.round((Date.now()-h.lastUpdate)/1e3):null,v=r!=null&&r<120;e.classList.toggle("live",v),e.innerHTML=`<span class="dot"></span>${r==null?"Venter på web-appen":v?`Forbundet · opdateret for ${r<5?"lige":r+" s"} siden`:`Sidst opdateret ${new Date(h.lastUpdate).toLocaleTimeString("da-DK",{hour:"2-digit",minute:"2-digit"})}`}`}setInterval(x,1e4),n.querySelectorAll(".tab").forEach(e=>{e.onclick=()=>{n.querySelectorAll(".tab").forEach(r=>r.classList.toggle("active",r===e)),n.querySelectorAll(".view").forEach(r=>r.classList.toggle("active",r.id===`view-${e.dataset.tab}`)),t("dock").hidden=e.dataset.tab!=="solve",e.dataset.tab==="club"&&ue()}});function i(e){f.mode=e,n.querySelectorAll("#modeSeg button").forEach(r=>r.classList.toggle("on",r.dataset.mode===e)),t("sbcPicker").hidden=e!=="sbc",t("manualForm").hidden=e!=="manual",k()}n.querySelectorAll("#modeSeg button").forEach(e=>{e.onclick=()=>{i(e.dataset.mode),m()}});function p(){let e=h.challenges?.[f.challengeId],r=e&&h.sets?.[e.setId];t("pickerLabel").className=e?"":"muted",t("pickerLabel").innerHTML=e?`<span class="name">${K(e.name)}</span><span class="set">${K(r?.name||`Sæt ${e.setId}`)}</span>`:Object.keys(h.challenges||{}).length?"Vælg en SBC…":"Ingen SBC'er fanget endnu – åbn SBC i web-appen"}function y(){let e=t("sbcSearch").value.trim().toLowerCase(),r=new Map;for(let M of Object.values(h.challenges||{})){let $=h.sets?.[M.setId]?.name||`Sæt ${M.setId}`;e&&!`${$} ${M.name}`.toLowerCase().includes(e)||(r.has($)||r.set($,[]),r.get($).push(M))}let v=t("sbcList");if(!r.size){v.innerHTML=`<div class="none">Ingen SBC'er matcher</div>`;return}v.innerHTML="";for(let[M,$]of r){let U=document.createElement("div");U.className="group-title",U.textContent=M,v.appendChild(U);for(let R of $.sort((B,L)=>B.challengeId-L.challengeId)){let B=R.status==="COMPLETED",L=me(R.elgReq).length,q=document.createElement("button");q.className=`item${String(R.challengeId)===String(f.challengeId)?" sel":""}`,q.innerHTML=`<span>${K(R.name)}</span><span class="badge${B?" done":""}">${B?"Fuldført":`${L} krav`}</span>`,q.onclick=()=>{f.challengeId=String(R.challengeId),b.clear(),d.clear(),l=null,t("result").hidden=!0,m(),A(),p(),k(),ae()},v.appendChild(q)}}}function w(){t("dropdown").hidden=!1,t("sbcSearch").value="",y(),u.touch||t("sbcSearch").focus()}function A(){t("dropdown").hidden=!0}t("pickerBtn").onclick=e=>{e.stopPropagation(),t("dropdown").hidden?w():A()},t("sbcSearch").oninput=y,t("dropdown").onclick=e=>e.stopPropagation(),n.addEventListener("click",A),n.addEventListener("keydown",e=>{e.key==="Escape"&&A()});function W(){if(f.mode==="sbc"){let M=h.challenges?.[f.challengeId];return M?{constraints:me(M.elgReq),formation:M.formation}:{constraints:[],formation:null}}let e=[],r=Number(t("mRating").value),v=Number(t("mChem").value);return r>0&&e.push({kind:"rating",op:"min",n:r,desc:`Holdrating min. ${r}`}),v>0&&e.push({kind:"chem",op:"min",n:v,desc:`Holdkemi min. ${v}`}),{constraints:e,formation:null}}function k(e){let r=t("reqChips"),v=e||W().constraints.map(M=>({c:M,ok:M.kind==="unknown"?null:void 0}));if(!v.length){r.innerHTML=`<span class="muted small">${f.mode==="sbc"?"Vælg en SBC for at se kravene.":"Angiv rating og/eller kemi."}</span>`;return}r.innerHTML=v.map(({c:M,ok:$,actual:U})=>{let R=$===!0?"ok":$===!1?"bad":$===null?"warn":"",B=$===!0?"✓":$===!1?"✗":$===null?"!":"•",L=U!=null&&$!==void 0?`<span class="act">${K(U)}</span>`:"";return`<span class="chip ${R}" title="${K(M.desc)}"><i>${B}</i>${K(M.desc)}${L}</span>`}).join("")}t("mRating").oninput=()=>k(),t("mChem").oninput=()=>k();async function E(){let{constraints:e,formation:r}=W();if(!e.length){X(f.mode==="sbc"?"Vælg en SBC først":"Angiv mindst ét krav");return}if(!o().length){X("Ingen spillere fanget endnu");return}let v=t("solve");v.disabled=!0,v.querySelector(".spinner").hidden=!1,v.querySelector(".lbl").textContent="Løser…",await new Promise(M=>setTimeout(M,30));try{l=De(o(),e,{formation:f.formation||r,maxRating:f.maxRating,excludeSpecial:f.excludeSpecial,onlyUntradeable:f.onlyUntradeable,preferStorage:f.preferStorage,ignorePositions:f.ignorePositions,allowBuy:f.allowBuy,maxBuys:Number(f.maxBuys)||0,excludeIds:[...b]}),Ke()}finally{v.disabled=!1,v.querySelector(".spinner").hidden=!0,v.querySelector(".lbl").textContent=l?"Løs igen":"Løs SBC"}}t("solve").onclick=E;let T={ST:12,CF:12,RW:18,LW:18,CAM:34,RM:48,LM:48,CM:48,CDM:62,RWB:70,LWB:70,RB:77,LB:77,CB:77,GK:90},O=e=>/^L/.test(e)?-1:/^R/.test(e)?1:0;function j(e){let r=[...new Set(e.map(U=>T[U]??50))].sort((U,R)=>U-R),v=U=>{let R=r.indexOf(T[U]??50);return r.length===1?50:11+78*R/(r.length-1)},M=new Array(e.length),$=new Map;e.forEach((U,R)=>{let B=v(U);if(O(U)!==0){M[R]={x:O(U)<0?11:89,y:B};return}$.has(B)||$.set(B,[]),$.get(B).push(R)});for(let[U,R]of $){let B=R.length,L=Math.min(24,12*(B-1));R.forEach((q,ee)=>{M[q]={x:B===1?50:50-L+2*L*ee/(B-1),y:U}})}return M}function I(e){let r=ce("club",e);if(r)return r;let v=o().filter(M=>String(M.club)===String(e)&&h.names?.[M.assetId]).sort((M,$)=>$.rating-M.rating).slice(0,2).map(s);return v.length?`Samme klub som ${v.join(" og ")}`:J("club",e)}function P(e){return e.generic?"Valgfri klub":e.club!=null?I(e.club):e.league!=null?J("league",e.league):e.nation!=null?J("nation",e.nation):"Valgfri"}function D(e){if(e.club!=null&&!e.generic&&!ce("club",e.club)){let r=o().filter(v=>String(v.club)===String(e.club)&&h.names?.[v.assetId]).sort((v,M)=>M.rating-v.rating)[0];if(r)return`som ${c(r)}`}return P(e)}let F=(e,r=11)=>e.length>r?`${e.slice(0,r-1)}…`:e;function H(e){let r=e.player;if(r.placeholder){let $=[0,1,2].map(U=>`<s class="${U<e.chem?"on":""}"></s>`).join("");return`<span class="tags"><span class="tag buy">KØB</span></span><span class="ovr">${r.rating}+</span><span class="pos">${K(e.slot)}</span><span class="nm">${K(F(D(r)))}</span><span class="chem">${$}</span>`}let v=[0,1,2].map($=>`<s class="${$<e.chem?"on":""}"></s>`).join("");return`<span class="tags">${[r.untradeable?'<span class="tag ut">UT</span>':"",r.inStorage?'<span class="tag st">OPB</span>':""].join("")}</span><span class="ovr">${r.rating}</span><span class="pos">${K(e.slot)}</span><span class="nm">${K(c(r))}</span><span class="chem">${v}</span>`}function z(e){b.add(String(e.id)),d.delete(String(e.id)),X(`${s(e)} udelukket – løser igen`),E()}function _(e){let r=!1;try{let v=document.createElement("textarea");v.value=e,v.setAttribute("readonly",""),v.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;",(n.body||n).appendChild(v),v.focus(),v.select(),v.setSelectionRange(0,e.length),r=document.execCommand("copy"),v.remove()}catch{}return!r&&navigator.clipboard?.writeText&&(navigator.clipboard.writeText(e).catch(()=>{}),r=!0),r}let V=()=>(l?.squad||[]).filter(e=>!e.player.placeholder),Y=()=>[...V()].sort((e,r)=>r.player.rating-e.player.rating),Q=()=>Y().find(e=>!d.has(String(e.player.id)));function te(e){let r=h.names?.[e.assetId];if(d.add(String(e.id)),!r){X(`Navn ukendt – søg på rating ${e.rating} og ${J("club",e.club)}`),ae();return}let v=_(r);X(v?`Kopieret: ${r}`:`Kunne ikke kopiere – søg: ${r}`),ae(),v&&u.onMinimize&&f.autoMinimize&&setTimeout(()=>u.onMinimize(),450)}function pe(e){let r=String(e.id);d.has(r)?d.delete(r):d.add(r),ae()}function ae(){let e=V(),r=new Set(e.map(R=>String(R.player.id))),v=[...d].filter(R=>r.has(R)).length,M=!!l&&!l.error&&e.length>0;t("findbar").hidden=!M,M&&(t("findCount").textContent=v===e.length?`Alle ${e.length} spillere fra klubben fundet ✓`:`Fundet ${v} af ${e.length} fra klubben`,t("findFill").style.width=`${Math.round(100*v/e.length)}%`),n.querySelectorAll("[data-pid]").forEach(R=>R.classList.toggle("found",d.has(R.dataset.pid))),n.querySelectorAll(".act-btn.chk").forEach(R=>R.classList.toggle("on",d.has(R.dataset.pid)));let $=M?Q():null,U=t("view-solve")?.classList.contains("active")!==!1;t("nextBtn").hidden=!$||!U,$&&(t("nextName").textContent=`${c($.player)} · ${$.player.rating}`),u.onProgress?.(M?{found:v,total:e.length}:null)}t("nextBtn").onclick=()=>{let e=Q();e&&te(e.player)},t("findReset").onclick=()=>{d.clear(),ae()},u.onMinimize&&(t("minimize").hidden=!1,t("minimize").onclick=()=>u.onMinimize());function Ke(){let e=l;t("result").hidden=!1,t("resetExcl").hidden=b.size===0,t("exclCount").textContent=b.size;let r=t("verdict");if(e.error){t("rRating").textContent="–",t("rChem").textContent="–",t("rCost").textContent="–",r.className="verdict bad",r.textContent=e.error,t("pitch").innerHTML="",t("plist").innerHTML="",t("bench").hidden=!0,k(),ae();return}t("rRating").textContent=e.rating,t("rChem").textContent=e.chem,t("rCost").textContent=Math.round(e.cost),r.className=`verdict ${e.feasible?"ok":"bad"}`,r.textContent=e.feasible?e.overBuyLimit?`Løst med ${11-e.buys} fra klubben + ${e.buys} køb (mere end dit maks. på ${e.buyLimit})`:e.buys?`Løst med ${11-e.buys} fra klubben + ${e.buys} køb`:"Løst kun med spillere fra klubben":"Ingen gyldig løsning – tætteste bud vises",k(e.checks),Ve(e);let v=t("pitch");v.innerHTML='<div class="circle"></div>';let M=j(e.slots),$=[];for(let B of e.squad){if(B.slotIndex<0){$.push(B);continue}let L=document.createElement("button");L.className=`pcard ${S(B.player)}`,L.style.left=`${M[B.slotIndex].x}%`,L.style.top=`${M[B.slotIndex].y}%`,B.player.placeholder?(L.className="pcard buy",L.title=`Køb: ${P(B.player)}, rating ${B.player.rating}+, position ${B.slot}`):(L.title=`Kopiér navn: ${s(B.player)} · ${B.player.rating} · ${J("club",B.player.club)} · ${J("league",B.player.league)} · ${J("nation",B.player.nation)}`,L.dataset.pid=String(B.player.id),L.onclick=()=>te(B.player)),L.innerHTML=H(B),v.appendChild(L)}let U=t("bench");U.innerHTML=$.length?'<div class="bench-title">Uden passende position (0 kemi):</div>':"";for(let B of $){let L=document.createElement("button");L.className=`pcard ${S(B.player)}`,L.innerHTML=H(B),B.player.placeholder||(L.dataset.pid=String(B.player.id),L.onclick=()=>te(B.player)),U.appendChild(L)}let R=t("plist");R.innerHTML="";for(let B of[...e.squad].sort((L,q)=>!!L.player.placeholder-!!q.player.placeholder||q.player.rating-L.player.rating)){if(B.player.placeholder){let ee=document.createElement("div");ee.className="prow",ee.innerHTML=`<span class="ov buyov">${B.player.rating}+</span><span class="meta"><b>Køb: ${K(P(B.player))}</b><span>${K(B.slot)} · se indkøbslisten</span></span><span class="pp">${K(B.slot)}</span><span class="chemtxt">${B.chem}/3</span>`,R.appendChild(ee);continue}let L=String(B.player.id),q=document.createElement("div");q.className="prow pick",q.dataset.pid=L,q.setAttribute("role","button"),q.title="Kopiér navn",q.innerHTML=ye(B.player,`<span class="pp">${K(B.slot)}</span><button class="act-btn chk" data-pid="${K(L)}" aria-label="Markér som fundet">✓</button><button class="act-btn x" aria-label="Udeluk og løs igen">✕</button>`),q.onclick=()=>te(B.player),q.querySelector(".chk").onclick=ee=>{ee.stopPropagation(),pe(B.player)},q.querySelector(".x").onclick=ee=>{ee.stopPropagation(),z(B.player)},R.appendChild(q)}we(),ae()}function Ve(e){let r=(e.squad||[]).filter(M=>M.player.placeholder);if(t("shop").hidden=!r.length,!r.length)return;t("shopCount").textContent=`${r.length} spiller${r.length>1?"e":""}`;let v=[];for(let M of W().constraints){if(M.kind!=="same"||M.op!=="max")continue;let $=new Map;for(let U of e.squad){let R=U.player[M.field];R!=null&&$.set(R,($.get(R)||0)+1)}for(let[U,R]of $)R>=M.n&&v.push(J(M.field,U))}t("shopList").innerHTML=r.sort((M,$)=>$.player.rating-M.player.rating).map(M=>{let $=M.player,U=$.generic?'Hvilken som helst spiller <span class="sub2">· billigst fra en mindre liga</span>':$.club!=null?`${K(I($.club))}${$.league!=null?` <span class="sub2">· ${K(J("league",$.league))}</span>`:""}`:K(P($)),R=$.nation!=null?`Nation: <b>${K(J("nation",$.nation))}</b>`:v.length?`Ikke fra: ${K(v.join(", "))}`:"Valgfri nation",B=$.requiredClub?`Krævet af SBC'en – du ejer ingen · ${R}`:$.generic?`Kun rating tæller · ${R}`:R;return`<div class="shoprow"><span class="pp">${K(M.slot)}</span><span><b>${U}</b><span class="sub2">${B}</span></span><span class="rt">${$.rating}+</span></div>`}).join("")}function ye(e,r){let v=(e.untradeable?'<span class="flag ut">UT</span>':"")+(e.inStorage?'<span class="flag st">OPB</span>':"");return`<span class="ov ${S(e)}">${e.rating}</span>
      <span class="meta"><b>${K(s(e))}${v}</b><span>${K((e.positions||[]).join(" · "))} · ${K(J("club",e.club))} · ${K(J("league",e.league))} · ${K(J("nation",e.nation))}</span></span>
      ${r}`}function we(){n.querySelectorAll("#viewSeg button").forEach(r=>r.classList.toggle("on",r.dataset.view===f.view));let e=f.view==="pitch";t("pitch").hidden=!e,t("bench").hidden=!e||!t("bench").children.length,t("plist").hidden=e}n.querySelectorAll("#viewSeg button").forEach(e=>{e.onclick=()=>{f.view=e.dataset.view,m(),we()}}),t("resetExcl").onclick=()=>{b.clear(),E()};function ue(){let e=o(),r={gold:0,silver:0,bronze:0,special:0};for(let L of e)Number(L.rarity)>1?r.special++:r[["","bronze","silver","gold"][ie(L.rating)]]++;t("levels").innerHTML=[["gold","Guld"],["silver","Sølv"],["bronze","Bronze"],["special","Special"]].map(([L,q])=>`<div class="lvl lv-${L}"><b>${r[L]}</b><small>${q}</small></div>`).join("");let v=t("clubSearch").value.trim().toLowerCase(),M=e.filter(L=>t("fUT").checked&&!L.untradeable||t("fStorage").checked&&!L.inStorage||t("fSpecial").checked&&!(Number(L.rarity)>1)?!1:v?`${s(L)} ${L.rating} ${J("league",L.league)} ${J("nation",L.nation)} ${J("club",L.club)} ${(L.positions||[]).join(" ")}`.toLowerCase().includes(v):!0),$=t("clubSort").value,U={"rating-desc":(L,q)=>q.rating-L.rating,"rating-asc":(L,q)=>L.rating-q.rating,league:(L,q)=>L.league-q.league||q.rating-L.rating,nation:(L,q)=>L.nation-q.nation||q.rating-L.rating}[$];M.sort(U);let R=150,B=t("clubList");B.innerHTML=M.length?M.slice(0,R).map(L=>`<div class="prow">${ye(L,"<span></span><span></span>")}</div>`).join(""):'<div class="empty center muted">Ingen spillere matcher.</div>',t("clubMore").textContent=M.length>R?`Viser ${R} af ${M.length} – søg for at indsnævre`:""}["clubSearch","clubSort","fUT","fStorage","fSpecial"].forEach(e=>{t(e).addEventListener("input",ue)});function Ge(){t("formation").value=f.formation,t("maxRating").value=f.maxRating,t("maxRatingVal").textContent=f.maxRating,t("autoMinWrap").hidden=!u.onMinimize;for(let e of["excludeSpecial","onlyUntradeable","preferStorage","ignorePositions","autoMinimize"])t(e).checked=f[e],t(e).onchange=()=>{f[e]=t(e).checked,m()};t("formation").onchange=()=>{f.formation=t("formation").value,m()},t("allowBuy").checked=f.allowBuy,t("maxBuys").value=String(f.maxBuys),t("maxBuysWrap").hidden=!f.allowBuy,t("allowBuy").onchange=()=>{f.allowBuy=t("allowBuy").checked,t("maxBuysWrap").hidden=!f.allowBuy,m()},t("maxBuys").onchange=()=>{f.maxBuys=Number(t("maxBuys").value),m()},t("maxRating").oninput=()=>{f.maxRating=Number(t("maxRating").value),t("maxRatingVal").textContent=f.maxRating},t("maxRating").onchange=m}function We(){let e=o().length,r=Object.keys(h.names||{}).length;t("dataInfo").textContent=`${e} spillere og ${Object.keys(h.challenges||{}).length} SBC-udfordringer gemt lokalt. ${r?`${r} spillernavne kendt.`:"Ingen spillernavne endnu (vises som #ID)."}${u.version?` Version ${u.version}.`:""}`}t("clearClub").onclick=async()=>{confirm("Slet alle gemte spillere? Bladr klubben igennem igen bagefter.")&&(await a.set({club:{}}),h.club={},b.clear(),d.clear(),fe(),X("Klubdata ryddet"))},t("exportDebug").onclick=()=>{let e=new Blob([JSON.stringify({samples:h.samples,challenges:h.challenges,labels:h.labels},null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(e),r.download="fc27-sbc-debug.json",r.click()};function fe(){G(),p(),t("dropdown").hidden||y(),We(),l||k(),t("view-club").classList.contains("active")&&ue()}a.watch(async()=>{await g(),fe()}),await g(),Ge(),i(f.mode),fe()}var Fe=`<!doctype html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FC27 SBC Solver</title>
  <link rel="stylesheet" href="panel.css">
</head>
<body>
  <header class="top">
    <div class="brand">
      <div class="logo">S</div>
      <div>
        <div class="title">SBC Solver</div>
        <div class="sub" id="liveState"><span class="dot"></span>Venter på web-appen</div>
      </div>
    </div>
    <div class="stats" id="stats"></div>
  </header>

  <nav class="tabs" role="tablist">
    <button class="tab active" data-tab="solve" role="tab">Løs</button>
    <button class="tab" data-tab="club" role="tab">Klub</button>
    <button class="tab" data-tab="settings" role="tab">Indstillinger</button>
  </nav>

  <main>
    <!-- LØS -->
    <section class="view active" id="view-solve">
      <div id="onboarding" class="empty" hidden>
        <h3>Kom i gang</h3>
        <ol class="steps">
          <li><b>Åbn FC Web App</b> og log ind.</li>
          <li>Gå til <b>Klub → Spillere</b> og bladr gennem siderne. Tjek også <b>SBC-opbevaring</b>.</li>
          <li>Åbn <b>SBC</b> og klik ind på det sæt, du vil løse.</li>
          <li>Vælg udfordringen her og tryk <b>Løs</b>.</li>
        </ol>
      </div>

      <div class="card">
        <div class="card-head">
          <h2>Udfordring</h2>
          <div class="seg" id="modeSeg">
            <button class="on" data-mode="sbc">SBC</button>
            <button data-mode="manual">Manuel</button>
          </div>
        </div>

        <div id="sbcPicker">
          <button class="picker" id="pickerBtn">
            <span id="pickerLabel" class="muted">Vælg en SBC…</span>
            <span class="chev">▾</span>
          </button>
          <div class="dropdown" id="dropdown" hidden>
            <input id="sbcSearch" type="search" placeholder="Søg i SBC'er…" autocomplete="off">
            <div class="list" id="sbcList"></div>
          </div>
        </div>

        <div id="manualForm" class="grid2" hidden>
          <label class="field">Min. holdrating
            <input id="mRating" type="number" min="0" max="99" placeholder="f.eks. 84">
          </label>
          <label class="field">Min. kemi
            <input id="mChem" type="number" min="0" max="33" placeholder="0–33">
          </label>
        </div>

        <div class="chips" id="reqChips"></div>

        <div class="buyrow">
          <label class="switch inline"><input type="checkbox" id="allowBuy"><span></span>Foreslå spillere at købe</label>
          <label class="maxbuys" id="maxBuysWrap">maks.
            <select id="maxBuys">
              <option>1</option><option>2</option><option>3</option><option>4</option>
              <option>5</option><option>6</option><option>8</option><option>11</option>
            </select>
          </label>
        </div>
      </div>

      <div id="result" hidden>
        <div class="scoreboard">
          <div class="score"><span id="rRating">–</span><small>Rating</small></div>
          <div class="score"><span id="rChem">–</span><small>Kemi</small></div>
          <div class="score"><span id="rCost">–</span><small>Pris-score</small></div>
          <div class="verdict" id="verdict"></div>
        </div>

        <div class="card shop" id="shop" hidden>
          <div class="card-head"><h2>Indkøbsliste</h2><span class="badge-buy" id="shopCount"></span></div>
          <div id="shopList"></div>
          <p class="hint">Søg på transfermarkedet med klub/liga og min. rating. Positionen kan du ændre med et positionskort, hvis spilleren ikke kan spille den.</p>
        </div>

        <div class="card-head slim">
          <h2>Hold</h2>
          <div class="seg" id="viewSeg">
            <button class="on" data-view="pitch">Bane</button>
            <button data-view="list">Liste</button>
          </div>
        </div>

        <div class="findbar" id="findbar" hidden>
          <div class="findtxt"><b id="findCount"></b><button class="link" id="findReset">Nulstil</button></div>
          <div class="findtrack"><i id="findFill"></i></div>
        </div>

        <div class="pitch" id="pitch"></div>
        <div class="bench" id="bench" hidden></div>
        <div class="plist" id="plist" hidden></div>

        <p class="hint">Tryk på en spiller for at kopiere navnet og markere den som fundet. Indsæt navnet i søgefeltet i web-appen. Under <b>Liste</b> kan du udelukke en spiller (✕) og løse igen.
          <button class="link" id="resetExcl" hidden>Nulstil udelukkede (<span id="exclCount">0</span>)</button></p>
      </div>
    </section>

    <!-- KLUB -->
    <section class="view" id="view-club">
      <div class="card">
        <div class="levels" id="levels"></div>
        <div class="toolbar">
          <input id="clubSearch" type="search" placeholder="Søg navn, rating, liga-ID…">
          <select id="clubSort">
            <option value="rating-desc">Rating ↓</option>
            <option value="rating-asc">Rating ↑</option>
            <option value="league">Liga</option>
            <option value="nation">Nation</option>
          </select>
        </div>
        <div class="toggles">
          <label class="pill-check"><input type="checkbox" id="fUT"> Kun UT</label>
          <label class="pill-check"><input type="checkbox" id="fStorage"> Opbevaring</label>
          <label class="pill-check"><input type="checkbox" id="fSpecial"> Specialkort</label>
        </div>
      </div>
      <div class="clubgrid" id="clubList"></div>
      <p class="hint center" id="clubMore"></p>
    </section>

    <!-- INDSTILLINGER -->
    <section class="view" id="view-settings">
      <div class="card">
        <h2>Spillervalg</h2>
        <label class="field">Formation
          <select id="formation">
            <option value="">Fra SBC (ellers 4-3-3)</option>
            <option value="433">4-3-3</option><option value="4231">4-2-3-1</option>
            <option value="442">4-4-2</option><option value="4141">4-1-4-1</option>
            <option value="41212">4-1-2-1-2</option><option value="352">3-5-2</option>
            <option value="343">3-4-3</option><option value="532">5-3-2</option>
            <option value="4321">4-3-2-1</option>
          </select>
        </label>
        <label class="field">Brug ikke spillere over <b id="maxRatingVal">88</b>
          <input id="maxRating" type="range" min="60" max="99" value="88">
        </label>
        <label class="switch"><input type="checkbox" id="excludeSpecial" checked><span></span>Beskyt specialkort</label>
        <label class="switch"><input type="checkbox" id="onlyUntradeable"><span></span>Kun utradeables</label>
        <label class="switch"><input type="checkbox" id="preferStorage" checked><span></span>Brug SBC-opbevaring først</label>
        <label class="switch"><input type="checkbox" id="ignorePositions"><span></span>Ignorér positioner</label>
        <label class="switch" id="autoMinWrap" hidden><input type="checkbox" id="autoMinimize"><span></span>Minimér efter kopiering af navn</label>
      </div>
      <div class="card">
        <h2>Data</h2>
        <p class="muted small" id="dataInfo"></p>
        <div class="row">
          <button class="btn ghost" id="clearClub">Ryd klubdata</button>
          <button class="btn ghost" id="exportDebug">Eksportér fejlfindingsdata</button>
        </div>
      </div>
    </section>
  </main>

  <footer class="dock" id="dock">
    <div class="dock-row">
      <button class="btn ghost dock-min" id="minimize" hidden aria-label="Minimér"><span class="chev"></span><small>Minimér</small></button>
      <button class="btn next" id="nextBtn" hidden><small>Kopiér næste</small><b id="nextName"></b></button>
      <button class="btn primary big" id="solve"><span class="spinner" hidden></span><span class="lbl">Løs SBC</span></button>
    </div>
  </footer>

  <div class="toast" id="toast" hidden></div>

  <script type="module" src="panel.js"><\/script>
</body>
</html>
`;var He=`:root {
  --bg: #0d0f14;
  --bg2: #141821;
  --card: #181d28;
  --card2: #1f2533;
  --line: #2a3142;
  --fg: #eef1f7;
  --muted: #8b93a7;
  --accent: #19e6a0;
  --accent-ink: #04241a;
  --accent-soft: rgba(25, 230, 160, .12);
  --ok: #19e6a0;
  --bad: #ff5d6c;
  --warn: #ffc24b;
  --gold1: #f7e08a; --gold2: #c9a227; --gold-ink: #2b2006;
  --silver1: #e9edf2; --silver2: #9aa4b1; --silver-ink: #1c222b;
  --bronze1: #e7b38a; --bronze2: #9b5f36; --bronze-ink: #2a1609;
  --special1: #b48cff; --special2: #5b2fd6; --special-ink: #fff;
  --pitch1: #12442f; --pitch2: #0f3a28;
  --radius: 14px;
  color-scheme: dark;
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --bg: #eef1f6; --bg2: #e4e8f0; --card: #ffffff; --card2: #f4f6fa; --line: #dde2eb;
    --fg: #121722; --muted: #636b7e; --accent: #0aa877; --accent-ink: #fff; --accent-soft: rgba(10,168,119,.1);
    --ok: #0a9a6d; --bad: #d93848; --warn: #b07a00;
    --pitch1: #2f8a5c; --pitch2: #2a7d53;
    color-scheme: light;
  }
}
:root[data-theme="dark"] { color-scheme: dark; }

* { box-sizing: border-box; }
[hidden] { display: none !important; }
html, body { margin: 0; }
body {
  background: var(--bg);
  color: var(--fg);
  font: 13px/1.45 "Segoe UI", system-ui, -apple-system, sans-serif;
  padding-bottom: 84px;
  min-width: 300px;
}
button { font: inherit; color: inherit; cursor: pointer; }
input, select {
  font: inherit; color: var(--fg); background: var(--bg2);
  border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; width: 100%;
  outline: none; transition: border-color .15s;
}
input:focus, select:focus { border-color: var(--accent); }
h2 { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
h3 { margin: 0 0 8px; font-size: 15px; }
.muted { color: var(--muted); }
.small { font-size: 12px; }
.center { text-align: center; }

/* Header */
.top {
  display: flex; flex-direction: column; gap: 10px;
  padding: 14px 14px 10px;
}
.brand { display: flex; align-items: center; gap: 10px; }
.logo {
  width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center;
  background: linear-gradient(135deg, var(--accent), #0b8cff); color: var(--accent-ink);
  font-weight: 900; font-size: 18px;
}
.title { font-weight: 800; font-size: 16px; letter-spacing: -.01em; }
.title .ver { font-size: 10px; font-weight: 700; color: var(--muted); margin-left: 4px; letter-spacing: 0; }
.sub { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--muted); }
.sub.live .dot { background: var(--ok); box-shadow: 0 0 0 3px var(--accent-soft); }
.stats { display: flex; gap: 6px; flex-wrap: wrap; }
.stat {
  background: var(--card); border: 1px solid var(--line); border-radius: 999px;
  padding: 4px 10px; font-size: 11px; color: var(--muted);
}
.stat b { color: var(--fg); font-weight: 700; margin-right: 3px; }

/* Tabs */
.tabs {
  display: flex; gap: 4px; margin: 0 14px 12px; padding: 4px;
  background: var(--card); border: 1px solid var(--line); border-radius: 12px;
}
.tab {
  flex: 1; border: 0; background: transparent; padding: 7px 0; border-radius: 9px;
  color: var(--muted); font-weight: 600;
}
.tab.active { background: var(--card2); color: var(--fg); box-shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 2px 8px rgba(0,0,0,.25); }

main { padding: 0 14px; }
.view { display: none; }
.view.active { display: block; animation: fade .18s ease; }
@keyframes fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

.card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 12px; margin-bottom: 12px;
}
.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.card-head h2 { margin: 0; }
.card-head.slim { margin: 14px 0 8px; }

/* Segmented control */
.seg { display: inline-flex; background: var(--bg2); border: 1px solid var(--line); border-radius: 9px; padding: 2px; }
.seg button { border: 0; background: transparent; padding: 4px 10px; border-radius: 7px; font-size: 12px; color: var(--muted); font-weight: 600; }
.seg button.on { background: var(--card2); color: var(--fg); }

/* SBC picker */
#sbcPicker { position: relative; }
.picker {
  width: 100%; display: flex; justify-content: space-between; align-items: center; text-align: left;
  background: var(--bg2); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px;
}
.picker:hover { border-color: var(--accent); }
.picker .name { font-weight: 700; }
.picker .set { display: block; font-size: 11px; color: var(--muted); }
.chev { color: var(--muted); }
.dropdown {
  position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 30;
  background: var(--card2); border: 1px solid var(--line); border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0,0,0,.45); padding: 8px;
}
.list { max-height: 320px; overflow: auto; margin-top: 6px; }
.group-title { font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); padding: 8px 8px 4px; }
.item {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px;
  border: 0; background: transparent; text-align: left; padding: 8px; border-radius: 8px;
}
.item:hover, .item.sel { background: var(--accent-soft); }
.item .badge { font-size: 10px; padding: 2px 7px; border-radius: 999px; background: var(--bg2); color: var(--muted); white-space: nowrap; }
.item .badge.done { background: var(--accent-soft); color: var(--ok); }
.list .none { padding: 14px; color: var(--muted); text-align: center; }

.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--muted); margin-bottom: 12px; }
.field b { color: var(--fg); }
input[type=range] { padding: 0; accent-color: var(--accent); background: transparent; border: 0; }

/* Requirement chips */
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--bg2); border: 1px solid var(--line); border-radius: 999px;
  padding: 5px 10px; font-size: 12px;
}
.chip i { font-style: normal; font-weight: 800; }
.chip.ok { border-color: color-mix(in srgb, var(--ok) 45%, transparent); }
.chip.ok i { color: var(--ok); }
.chip.bad { border-color: color-mix(in srgb, var(--bad) 55%, transparent); }
.chip.bad i { color: var(--bad); }
.chip.warn { border-color: color-mix(in srgb, var(--warn) 55%, transparent); }
.chip.warn i { color: var(--warn); }
.chip .act { color: var(--muted); font-size: 11px; }

/* Køb */
.buyrow { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 12px; padding-top: 4px; }
.switch.inline { border-top: 0; padding: 4px 0; }
.maxbuys { display: flex; flex-direction: row; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); }
.maxbuys select { width: 58px; padding: 4px 6px; }
.shop { margin-top: 12px; border-color: color-mix(in srgb, var(--warn) 45%, var(--line)); }
.badge-buy { font-size: 11px; font-weight: 800; color: var(--warn); }
.shoprow { display: grid; grid-template-columns: 40px 1fr auto; gap: 10px; align-items: center; padding: 8px 0; border-top: 1px solid var(--line); }
.shoprow:first-child { border-top: 0; }
.shoprow .pp { font-weight: 900; font-size: 12px; text-align: center; padding: 6px 0; border-radius: 8px; border: 1.5px dashed var(--warn); color: var(--warn); }
.shoprow b { display: block; }
.shoprow .sub2 { font-size: 11px; color: var(--muted); }
.shoprow .rt { font-weight: 900; font-size: 15px; }

.pcard.buy {
  background: color-mix(in srgb, var(--card) 70%, transparent);
  border: 2px dashed var(--warn); color: var(--fg); box-shadow: none;
}
.pcard.buy .ovr { color: var(--warn); }
.pcard.buy:hover::after { content: none; }
.pcard.buy:hover { transform: translate(-50%, -50%); cursor: default; }
.pcard .tag.buy { color: var(--warn); }
.prow .ov.buyov { border: 2px dashed var(--warn); color: var(--warn); font-size: 12px; }

/* Scoreboard */
.scoreboard {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px;
}
.score { text-align: center; }
.score span { display: block; font-size: 24px; font-weight: 900; letter-spacing: -.02em; }
.score small { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; font-weight: 700; }
.verdict { grid-column: 1 / -1; text-align: center; font-weight: 700; font-size: 12px; padding: 6px; border-radius: 9px; }
.verdict.ok { background: var(--accent-soft); color: var(--ok); }
.verdict.bad { background: color-mix(in srgb, var(--bad) 14%, transparent); color: var(--bad); }

/* Pitch */
.pitch {
  position: relative; aspect-ratio: 3 / 4.4; border-radius: var(--radius); overflow: hidden;
  background:
    repeating-linear-gradient(180deg, var(--pitch1) 0 10%, var(--pitch2) 10% 20%);
  border: 1px solid var(--line);
}
.pitch::before, .pitch::after { content: ""; position: absolute; border: 2px solid rgba(255,255,255,.16); pointer-events: none; }
.pitch::before { left: 26%; right: 26%; bottom: -2px; height: 15%; border-bottom: 0; }
.pitch::after { left: -2px; right: -2px; top: -2px; height: 0; border-width: 2px 0 0; }
.pitch .halfway { position: absolute; left: 0; right: 0; top: 0; height: 0; }
.pitch .circle { position: absolute; left: 50%; top: 0; width: 28%; aspect-ratio: 1; transform: translate(-50%, -50%); border: 2px solid rgba(255,255,255,.16); border-radius: 50%; }

.pcard {
  position: absolute; transform: translate(-50%, -50%);
  width: 17%; min-width: 52px; height: 14%;
  border: 0; border-radius: 10px 10px 14px 14px;
  display: flex; flex-direction: column; align-items: center; justify-content: space-evenly;
  padding: 3px 4px; overflow: visible; line-height: 1.1;
  box-shadow: 0 6px 14px rgba(0,0,0,.4);
  transition: transform .15s, box-shadow .15s;
}
@media (hover: hover) {
  .pcard:hover { transform: translate(-50%, -50%) scale(1.06); z-index: 5; }
  .pcard:hover::after {
    content: "Kopiér navn"; position: absolute; inset: 0; border-radius: inherit;
    background: rgba(10, 12, 18, .72); color: #fff; font-weight: 800; font-size: 11px;
    display: grid; place-items: center;
  }
}
.pcard:active { transform: translate(-50%, -50%) scale(.95); }
.pcard .ovr { font-weight: 900; font-size: clamp(13px, 4.2vw, 20px); line-height: 1; }
.pcard .pos { font-size: 9px; font-weight: 800; opacity: .8; letter-spacing: .04em; }
.pcard .nm { font-size: 10px; font-weight: 700; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pcard .chem { display: flex; gap: 2px; }
.pcard .chem s { width: 6px; height: 6px; transform: rotate(45deg); background: rgba(0,0,0,.25); border-radius: 1px; }
.pcard .chem s.on { background: currentColor; }
.pcard .tags { position: absolute; top: -6px; right: -6px; display: flex; gap: 2px; }
.pcard .tag { font-size: 8px; font-weight: 900; padding: 1px 4px; border-radius: 5px; background: var(--card2); color: var(--fg); border: 1px solid var(--line); }
.pcard .tag.ut { color: var(--ok); }
.pcard .tag.st { color: var(--warn); }

.lv-gold { background: linear-gradient(160deg, var(--gold1), var(--gold2)); color: var(--gold-ink); }
.lv-silver { background: linear-gradient(160deg, var(--silver1), var(--silver2)); color: var(--silver-ink); }
.lv-bronze { background: linear-gradient(160deg, var(--bronze1), var(--bronze2)); color: var(--bronze-ink); }
.lv-special { background: linear-gradient(160deg, var(--special1), var(--special2)); color: var(--special-ink); }

.bench { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
.bench .pcard { position: relative; transform: none; width: 64px; height: 80px; }
.bench .pcard:hover { transform: scale(1.05); }
.bench-title { width: 100%; font-size: 11px; color: var(--warn); }

/* List view & club grid */
.plist, .clubgrid { display: flex; flex-direction: column; gap: 6px; }
.prow {
  display: grid; grid-template-columns: 38px 1fr auto auto; align-items: center; gap: 10px;
  background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 7px 10px; text-align: left; width: 100%;
}
button.prow:hover { border-color: var(--bad); }
.prow .ov { width: 38px; height: 38px; border-radius: 9px; display: grid; place-items: center; font-weight: 900; font-size: 15px; }
.prow .meta { min-width: 0; }
.prow .meta b { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.prow .meta span { font-size: 11px; color: var(--muted); }
.prow .pp { font-size: 11px; font-weight: 800; color: var(--muted); }
.prow .chemtxt { font-size: 11px; font-weight: 800; color: var(--ok); }
.flag { font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 5px; margin-left: 4px; background: var(--bg2); }
.flag.ut { color: var(--ok); } .flag.st { color: var(--warn); }

.levels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px; }
.lvl { border-radius: 10px; padding: 8px; text-align: center; }
.lvl b { display: block; font-size: 17px; font-weight: 900; }
.lvl small { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; opacity: .8; }
.toolbar { display: grid; grid-template-columns: 1fr 110px; gap: 6px; }
.toggles { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
.pill-check { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; background: var(--bg2); border: 1px solid var(--line); border-radius: 999px; padding: 4px 10px; cursor: pointer; }
.pill-check input { width: auto; accent-color: var(--accent); margin: 0; }

/* Switches */
.switch { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--line); cursor: pointer; }
.switch input { display: none; }
.switch span { width: 34px; height: 20px; border-radius: 999px; background: var(--line); position: relative; flex: none; transition: background .15s; }
.switch span::after { content: ""; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%; background: #fff; transition: transform .15s; }
.switch input:checked + span { background: var(--accent); }
.switch input:checked + span::after { transform: translateX(14px); }

/* Buttons */
.btn { border: 0; border-radius: 11px; padding: 9px 14px; font-weight: 700; }
.btn.primary { background: var(--accent); color: var(--accent-ink); box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 35%, transparent); }
.btn.primary:disabled { opacity: .6; cursor: progress; }
.btn.ghost { background: var(--bg2); border: 1px solid var(--line); }
.btn.big { width: 100%; padding: 13px; font-size: 15px; display: flex; justify-content: center; align-items: center; gap: 8px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.link { background: none; border: 0; color: var(--accent); padding: 0; font-weight: 700; }
.hint { font-size: 11px; color: var(--muted); margin: 10px 2px; }

.dock {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 25; padding: 12px 14px 14px;
  background: linear-gradient(0deg, var(--bg) 65%, transparent);
}
.dock-row { display: flex; gap: 8px; align-items: stretch; }
.dock-row .btn.big { flex: 1 1 0; min-width: 0; }
.dock-min {
  flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  padding: 6px 10px; color: var(--fg);
}
.dock-min small { font-size: 10px; font-weight: 700; color: var(--muted); }
.dock-min .chev { width: 10px; height: 10px; border-right: 2.5px solid currentColor; border-bottom: 2.5px solid currentColor; transform: rotate(45deg) translate(-2px, -2px); }
.btn.next {
  flex: 1.3 1 0; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 1px;
  background: var(--card2); border: 1px solid var(--accent); color: var(--fg); text-align: left; padding: 7px 12px;
}
.btn.next small { font-size: 10px; font-weight: 700; color: var(--accent); }
.btn.next b { font-size: 14px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Fundet-status */
.findbar { margin: 4px 2px 10px; }
.findtxt { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; margin-bottom: 5px; }
.findtrack { height: 6px; border-radius: 99px; background: var(--bg2); overflow: hidden; }
.findtrack i { display: block; height: 100%; width: 0; background: var(--accent); transition: width .2s; }
.pcard.found { opacity: .42; }
.pcard.found::before {
  content: "✓"; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 2;
  width: 26px; height: 26px; border-radius: 50%; background: var(--accent); color: var(--accent-ink);
  display: grid; place-items: center; font-weight: 900; font-size: 15px;
}
.prow.pick:hover { border-color: var(--accent); }
.prow.pick { grid-template-columns: 38px 1fr auto auto auto; cursor: pointer; }
.prow.found { opacity: .5; }
.prow.found .meta b { text-decoration: line-through; }
.prow .act-btn {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--line); background: var(--bg2); color: var(--muted);
  font-weight: 900; font-size: 13px; display: grid; place-items: center; padding: 0;
}
.prow .act-btn.chk.on { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
.prow .act-btn.x:hover { color: var(--bad); border-color: var(--bad); }
.prow .copyhint { font-size: 10px; color: var(--accent); font-weight: 700; }
.spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Empty / onboarding */
.empty { background: var(--card); border: 1px dashed var(--line); border-radius: var(--radius); padding: 14px; margin-bottom: 12px; }
.steps { margin: 0; padding-left: 20px; display: grid; gap: 6px; color: var(--muted); }
.steps b { color: var(--fg); }

.toast {
  position: fixed; left: 50%; bottom: 84px; transform: translateX(-50%); z-index: 40;
  background: var(--card2); border: 1px solid var(--line); color: var(--fg);
  padding: 8px 14px; border-radius: 999px; font-size: 12px; font-weight: 600;
  box-shadow: 0 10px 30px rgba(0,0,0,.4);
}
`;(()=>{if(window.__fc27sbc){window.__fc27sbc.toggle();return}ke(Me);let n,a,u=!1,t=!1;function C(){return`${He.replace(/@media \(prefers-color-scheme: light\) \{[\s\S]*?\n\}\n/,"").replace(/:root\[data-theme="dark"\][^\n]*\n/,"").replace(":root {",":host {").replace("html, body { margin: 0; }","").replace(/(^|\n)body \{/,"$1.app {")}
:host { all: initial; }
.app {
  position: fixed; inset: 0; z-index: 2147483000; overflow-y: auto; -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain; min-width: 0;
  padding-top: env(safe-area-inset-top); padding-bottom: 0;
  transition: transform .22s ease; transform: translateY(0);
}
.app.closed { transform: translateY(105%); pointer-events: none; }
.app .dock { position: sticky; bottom: 0; padding-bottom: calc(14px + env(safe-area-inset-bottom)); margin-top: 12px; }
.app .top { padding-right: 56px; }
.close {
  position: absolute; top: calc(10px + env(safe-area-inset-top)); right: 10px; z-index: 30;
  width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--line);
  background: var(--card2); color: var(--fg); font-size: 18px; line-height: 1;
}
/* iOS zoomer ind på felter med under 16px tekst */
input, select { font-size: 16px; }
.fab {
  position: fixed; right: 10px; bottom: calc(88px + env(safe-area-inset-bottom)); z-index: 2147483001;
  width: 52px; height: 52px; border-radius: 50%; border: 0;
  background: var(--accent); color: var(--accent-ink); font: 800 13px/1 system-ui, -apple-system, sans-serif;
  box-shadow: 0 8px 24px rgba(0,0,0,.45); touch-action: none;
}
.fab.hide { display: none; }
.app .dock { z-index: 30; }
.app .toast { bottom: calc(90px + env(safe-area-inset-bottom)); }
.app .dock { padding-top: 18px; }
`}function h(){let g=new DOMParser().parseFromString(Fe,"text/html");return g.querySelectorAll("script").forEach(m=>m.remove()),g.body.innerHTML}async function f(){u||(u=!0,n=document.createElement("div"),n.id="fc27-sbc-host",a=n.attachShadow({mode:"open"}),a.innerHTML=`<style>${C()}</style>
      <button class="fab" id="fc27Fab" aria-label="Åbn SBC Solver">SBC</button>
      <div class="app closed" id="fc27App"><button class="close" id="fc27Close" aria-label="Luk">✕</button>${h()}</div>`,document.documentElement.appendChild(n),a.getElementById("fc27Fab").onclick=()=>b(!0),a.getElementById("fc27Close").onclick=()=>b(!1),l(a.getElementById("fc27Fab")),await qe(a,Le,{touch:!0,version:Se,onMinimize:()=>b(!1),onProgress:g=>{let m=a.getElementById("fc27Fab");m.textContent=g&&g.found<g.total?`${g.found}/${g.total}`:"SBC",m.classList.toggle("done",!!g&&g.found>=g.total)}}))}function l(g){let m=0,o=0,s=!1;try{let c=Number(localStorage.getItem("fc27sbc:fabBottom"));c>0&&(g.style.bottom=`${c}px`)}catch{}g.addEventListener("pointerdown",c=>{m=c.clientY,o=parseFloat(getComputedStyle(g).bottom),s=!1,g.setPointerCapture(c.pointerId)}),g.addEventListener("pointermove",c=>{if(!g.hasPointerCapture(c.pointerId))return;let S=m-c.clientY;Math.abs(S)>6&&(s=!0),s&&(g.style.bottom=`${Math.max(10,Math.min(window.innerHeight-70,o+S))}px`)}),g.addEventListener("pointerup",()=>{if(s){try{localStorage.setItem("fc27sbc:fabBottom",String(parseFloat(g.style.bottom)))}catch{}g.addEventListener("click",c=>c.stopImmediatePropagation(),{once:!0,capture:!0})}})}async function b(g){await f(),t=g,a.getElementById("fc27App").classList.toggle("closed",!t),a.getElementById("fc27Fab").classList.toggle("hide",t)}window.__fc27sbc={open:()=>b(!0),close:()=>b(!1),toggle:()=>b(!t)};let d=()=>window.__fc27sbcOpen?b(!0):f();document.body?d():document.addEventListener("DOMContentLoaded",d,{once:!0})})();})();
