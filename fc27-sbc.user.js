// ==UserScript==
// @name         FC27 SBC Solver
// @namespace    fc27-sbc-solver
// @version      0.1.0
// @description  Løs SBC'er med spillere fra din egen klub. Læser kun – klikker ikke og laver ingen egne kald.
// @match        https://www.ea.com/*ultimate-team/web-app*
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==
(()=>{function pe(o){(()=>{if(window.__fc27SbcHooked)return;window.__fc27SbcHooked=!0;let n=/\/ut\/game\/[^/?]+\/(club|sbs\/|purchased\/items|storagepile)|players\.json/i,g=(u,L)=>{try{window.postMessage({__fc27sbc:!0,url:String(u),body:L},window.location.origin)}catch{}},e={club:new Set,league:new Set,nation:new Set},m={club:new Set,league:new Set,nation:new Set},f=[2027,2026,2025],l={club:u=>f.flatMap(L=>[`global.teamFull.${L}.team${u}`,`global.teamabbr15.${L}.team${u}`]).concat([`global.teamFull.team${u}`,`global.teamabbr15.team${u}`]),league:u=>f.flatMap(L=>[`global.leagueFull.${L}.league${u}`,`global.leagueabbr15.${L}.league${u}`]).concat([`global.leagueFull.league${u}`]),nation:u=>[`search.nationName.nation${u}`,`global.nationFull.nation${u}`,`global.nationName.nation${u}`]},$={club:/team(full|abbr15|name)/i,league:/league(full|abbr15|name)/i,nation:/nation(full|name)/i},y=null;function w(){if(y)return y;let u=window.services&&window.services.Localization;if(!u)return null;let L=new Set,k=(I,d)=>{if(!I||typeof I!="object"||L.has(I)||d>3)return null;L.add(I);let B;try{B=Object.keys(I)}catch{return null}if(B.length>2e3&&B.slice(0,50).filter(E=>E.includes(".")&&typeof I[E]=="string").length>25)return I;for(let E of B.slice(0,200)){let z;try{z=I[E]}catch{continue}let U=k(z,d+1);if(U)return U}return null};return y=k(u,0),y}function b(u){let L=window.services&&window.services.Localization;try{let k=w();if(k&&typeof k[u]=="string")return k[u];if(L&&typeof L.localize=="function"){let I=L.localize(u);if(typeof I=="string"&&I&&I!==u&&!I.includes(u))return I}}catch{}return null}let p=null;function a(){let u={club:{},league:{},nation:{}},L=0,k=w();for(let I of Object.keys(e))for(let d of e[I]){if(m[I].has(d))continue;let B=null;for(let E of l[I](d))if(B=b(E),B)break;if(!B&&k){let E=new RegExp(`\\D${d}$`),z=Object.keys(k).find(U=>$[I].test(U)&&E.test(U));z&&(B=k[z])}B&&(u[I][d]=B,m[I].add(d),L++)}if(L&&window.postMessage({__fc27sbc:!0,labels:u},window.location.origin),k&&!a.sampled){a.sampled=!0;let I=Object.keys(k).filter(d=>/team|league|nation/i.test(d)).slice(0,60);window.postMessage({__fc27sbc:!0,locSample:I.map(d=>[d,k[d]])},window.location.origin)}}function c(u,L){L==null||L===0||m[u].has(L)||(e[u].add(L),clearTimeout(p),p=setTimeout(a,500))}function s(u){try{let L=[].concat(u.itemData||[]).concat((u.squad&&u.squad.players||[]).map(k=>k.itemData).filter(Boolean));for(let k of L)c("club",k.teamid),c("league",k.leagueId),c("nation",k.nation);for(let k of u.challenges||[])for(let I of k.elgReq||[])I.type==="CLUB_ID"&&c("club",I.eligibilityValue),I.type==="LEAGUE_ID"&&c("league",I.eligibilityValue),I.type==="NATION_ID"&&c("nation",I.eligibilityValue)}catch{}}window.addEventListener("message",u=>{if(!(u.source!==window||!u.data||!u.data.__fc27sbcWant))for(let L of Object.keys(e))for(let k of u.data.__fc27sbcWant[L]||[])c(L,k)});let i=g,x=(u,L)=>{s(L),i(u,L)},R=window.fetch;window.fetch=async function(...u){let L=await R.apply(this,u);try{let k=u[0],I=typeof k=="string"?k:k&&k.url||String(k);n.test(I)&&L.clone().json().then(d=>x(I,d)).catch(()=>{})}catch{}return L};let P=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(u,L,...k){return this.__fc27Url=L,P.call(this,u,L,...k)};let O=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(...u){return this.addEventListener("load",()=>{try{let L=String(this.__fc27Url||"");if(!n.test(L))return;let k=null;this.responseType==="json"?k=this.response:(this.responseType===""||this.responseType==="text")&&(k=JSON.parse(this.responseText)),k&&x(L,k)}catch{}}),O.apply(this,u)}})(),(()=>{let n={club:{},sets:{},challenges:{},names:{},samples:{},labels:{club:{},league:{},nation:{}},unknownUrls:[]},g=!1,e=new Set,m=null;o.storage.local.get(["club","sets","challenges","names","samples","labels"]).then(a=>{Object.assign(n,{club:a.club||{},sets:a.sets||{},challenges:a.challenges||{},names:a.names||{},samples:a.samples||{},labels:{club:{},league:{},nation:{},...a.labels||{}}});for(let[c,s]of Object.entries(n.club))(!s||!s.id||s.id==="0"||!(s.rating>0))&&(delete n.club[c],e.add("club"));g=!0,l()}),o.storage.onChanged.addListener((a,c)=>{if(c==="local")for(let s of["club","sets","challenges","names"])a[s]&&!e.has(s)&&(n[s]=a[s].newValue||{})});function f(a){e.add(a),l()}function l(){!g||e.size===0||(clearTimeout(m),m=setTimeout(()=>{let a={};for(let c of e)a[c]=n[c];e=new Set,a.lastUpdate=Date.now(),o.storage.local.set(a)},400))}function $(a,c,s){let i=(x,R=0)=>{if(Array.isArray(x))return x.slice(0,2).map(P=>i(P,R+1));if(x&&typeof x=="object"&&R<5){let P={};for(let[O,u]of Object.entries(x))P[O]=i(u,R+1);return P}return x};n.samples[a]={url:c.replace(/\?.*$/,""),at:Date.now(),body:i(s)},f("samples")}function y(a){if(!a||typeof a!="object")return null;let c=a.itemType||a.type;if(c&&c!=="player"||!a.id||!(Number(a.rating)>0)||a.itemState==="invalid"||!a.preferredPosition&&!Array.isArray(a.possiblePositions))return null;let s=a.preferredPosition||a.position||null;return{id:String(a.id),assetId:a.assetId??null,resourceId:a.resourceId??a.definitionId??null,rating:Number(a.rating),nation:a.nation??a.nationId??null,league:a.leagueId??a.league??null,club:a.teamid??a.teamId??a.clubId??null,rarity:a.rareflag??a.rarityId??0,position:s,positions:Array.isArray(a.possiblePositions)&&a.possiblePositions.length?a.possiblePositions:s?[s]:[],untradeable:!!a.untradeable,loan:!!a.loans||Number(a.loans)>0,inStorage:!1}}function w(a,c={}){let s=0;for(let i of a||[]){let x=y(i);!x||x.loan||(n.club[x.id]={...n.club[x.id],...x,...c,seen:Date.now()},s++)}s&&f("club")}function b(a,c){if(!c||typeof c!="object")return;if(/players\.json/i.test(a)){for(let i of[c.Players,c.LegendsPlayers])for(let x of i||[])x&&x.id!=null&&(n.names[x.id]=x.c||[x.f,x.l].filter(Boolean).join(" "));f("names");return}if(/\/club(\b|\/|\?|$)/.test(a)&&Array.isArray(c.itemData)){w(c.itemData),$("club",a,c);return}if(/storagepile/i.test(a)&&Array.isArray(c.itemData)){w(c.itemData,{inStorage:!0}),$("storage",a,c);return}if(/\/sbs\/sets/.test(a)&&Array.isArray(c.categories)){for(let i of c.categories)for(let x of i.sets||[])n.sets[x.setId]={setId:x.setId,name:x.name,category:i.name,challengesCount:x.challengesCount};f("sets"),$("sets",a,c);return}let s=a.match(/\/sbs\/setId\/(\d+)\/challenges/);if(s&&Array.isArray(c.challenges)){for(let i of c.challenges)n.challenges[i.challengeId]={challengeId:i.challengeId,setId:Number(s[1]),name:i.name,formation:i.formation||null,status:i.status||null,elgReq:i.elgReq||[],elgOperation:i.elgOperation||"AND"};f("challenges"),$("challenges",a,c);return}/\/sbs\/challenge\/\d+\/squad/.test(a)&&c.squad&&Array.isArray(c.squad.players)&&(w(c.squad.players.map(i=>i.itemData).filter(Boolean)),$("challengeSquad",a,c))}window.addEventListener("message",a=>{if(!(a.source!==window||!a.data||a.data.__fc27sbc!==!0))try{if(a.data.labels){for(let c of["club","league","nation"])Object.assign(n.labels[c],a.data.labels[c]||{});f("labels");return}if(a.data.locSample){n.samples.loc={at:Date.now(),body:a.data.locSample},f("samples");return}b(a.data.url,a.data.body)}catch(c){console.warn("[FC27 SBC]",c)}});function p(){let a={club:new Set,league:new Set,nation:new Set};for(let s of Object.values(n.club))for(let i of["club","league","nation"])s[i]!=null&&!n.labels[i][s[i]]&&a[i].add(s[i]);for(let s of Object.values(n.challenges))for(let i of s.elgReq||[])i.type==="CLUB_ID"&&!n.labels.club[i.eligibilityValue]&&a.club.add(i.eligibilityValue);let c={};for(let s of Object.keys(a))c[s]=[...a[s]];window.postMessage({__fc27sbcWant:c},window.location.origin)}[4e3,12e3,3e4,6e4].forEach(a=>setTimeout(()=>g&&p(),a))})()}var ue="fc27sbc:",ie=new Set;function Ne(o){try{let n=localStorage.getItem(ue+o);return n==null?void 0:JSON.parse(n)}catch{return}}var se={async get(o){let n=Array.isArray(o)?o:[o],g={};for(let e of n){let m=Ne(e);m!==void 0&&(g[e]=m)}return g},async set(o){let n={};for(let[g,e]of Object.entries(o)){try{localStorage.setItem(ue+g,JSON.stringify(e))}catch(m){console.warn("[FC27 SBC] kunne ikke gemme",g,m)}n[g]={newValue:e}}setTimeout(()=>ie.forEach(g=>{try{g(n,"local")}catch(e){console.warn(e)}}),0)}},ge={storage:{local:se,onChanged:{addListener:o=>ie.add(o)}}},fe={get:o=>se.get(o),set:o=>se.set(o),watch:o=>ie.add((n,g)=>g==="local"&&o(n))};function be(o){if(!o.length)return 0;let n=o.reduce((m,f)=>m+f,0),g=n/11,e=0;for(let m of o)m>g&&(e+=m-g);return Math.floor(Math.round(n+e)/11)}function Z(o){return o>=75?3:o>=65?2:1}var Oe={1:"Arsenal",2:"Aston Villa",5:"Chelsea",7:"Everton",9:"Liverpool",10:"Manchester City",11:"Manchester United",13:"Newcastle",18:"Tottenham",21:"FC Bayern",22:"Borussia Dortmund",32:"Leverkusen",39:"Atalanta",44:"Inter",45:"Juventus",46:"Lazio",47:"AC Milan",48:"Napoli",52:"Roma",65:"LOSC",66:"Lyon",69:"Monaco",73:"Paris SG",74:"Stade Rennais",78:"Celtic",219:"Marseille",229:"Anderlecht",231:"Club Brugge",234:"Benfica",236:"FC Porto",237:"Sporting CP",240:"Atlético de Madrid",241:"FC Barcelona",243:"Real Madrid",245:"Ajax",246:"Feyenoord",247:"PSV",448:"Athletic Club",449:"Real Betis",457:"Real Sociedad",461:"Valencia",481:"Sevilla",483:"Villarreal",110374:"Fiorentina",112172:"RB Leipzig"},Pe={1:"Superliga",4:"Belgian Pro League",10:"Eredivisie",13:"Premier League",14:"Championship",16:"Ligue 1",19:"Bundesliga",20:"2. Bundesliga",31:"Serie A",39:"MLS",50:"Scottish Prem",53:"LaLiga",68:"Süper Lig",308:"Liga Portugal",350:"Saudi Pro League",2118:"Icons"},ze={4:"Østrig",7:"Belgien",10:"Kroatien",13:"Danmark",14:"England",18:"Frankrig",21:"Tyskland",27:"Italien",34:"Holland",36:"Norge",37:"Polen",38:"Portugal",42:"Skotland",45:"Spanien",46:"Sverige",47:"Schweiz",50:"Wales",52:"Argentina",54:"Brasilien",56:"Colombia",60:"Uruguay",83:"Mexico",95:"USA",129:"Marokko",136:"Senegal",163:"Japan"},me={club:["Klub",Oe],league:["Liga",Pe],nation:["Nation",ze]},le={club:{},league:{},nation:{}};function he(o){for(let n of Object.keys(le))le[n]={...o?.[n]||{}}}function ae(o,n){return n==null?null:le[o]?.[n]||me[o]?.[1][n]||null}function D(o,n){return n==null?"":ae(o,n)||`${me[o]?.[0]||""} #${n}`}var xe=o=>{let n=String(o||"").toUpperCase();return n==="LOWER"||n==="LESS"||n==="MAX"?"max":n==="EXACT"||n==="EQUAL"?"exact":"min"},ve={NATION_ID:"nation",LEAGUE_ID:"league",CLUB_ID:"club",PLAYER_RARITY:"rarity"},Ue={SAME_NATION_COUNT:"nation",SAME_LEAGUE_COUNT:"league",SAME_CLUB_COUNT:"club"},De={NATION_COUNT:"nation",LEAGUE_COUNT:"league",CLUB_COUNT:"club"},ye=new Set(["PLAYER_COUNT","PLAYER_COUNT_COMBINED"]),je={0:"min",1:"max",2:"exact"},qe={nation:"nation",league:"liga",club:"klub",rarity:"sjældenhed"},we={1:"bronze",2:"sølv",3:"guld"},F={min:"min.",max:"maks.",exact:"præcis"};function ce(o=[]){let n=new Map;for(let e of o){let m=e.eligibilitySlot??Symbol("slot");n.has(m)||n.set(m,[]),n.get(m).push(e)}let g=[];for(let e of n.values()){let m=e.find(p=>p.type==="SCOPE"),f=m?je[Number(m.eligibilityValue)]||"min":null,l=e.find(p=>ye.has(p.type)),$=l?Number(l.eligibilityValue):e.find(p=>p.count!=null)?.count,y=f||(l?xe(l.scope):"min"),w=e.filter(p=>!ye.has(p.type)&&p.type!=="SCOPE");if(l&&!w.length)continue;let b=w.find(p=>ve[p.type])?.type;if(b){let p=ve[b],a=w.filter(s=>s.type===b).map(s=>Number(s.eligibilityValue)),c=$??1;g.push({kind:"count",filter:{field:p,values:a},op:y,n:c,desc:`${F[y]} ${c} spiller(e) fra ${a.map(s=>p==="rarity"?`sjældenhed ${s}`:D(p,s)).join(" / ")}`});continue}for(let p of w){let a=Number(p.eligibilityValue),c=l?"exact":f||xe(p.scope);switch(p.type){case"TEAM_RATING":case"TEAM_RATING_1_TO_100":g.push({kind:"rating",op:c,n:a,desc:`Holdrating ${F[c]} ${a}`});break;case"TEAM_CHEMISTRY":case"CHEMISTRY_POINTS":g.push({kind:"chem",op:c,n:a,desc:`Holdkemi ${F[c]} ${a}`});break;case"ALL_PLAYERS_CHEMISTRY_POINTS":g.push({kind:"playerChem",n:a,desc:`Kemi pr. spiller min. ${a}`});break;case"PLAYER_LEVEL":case"PLAYER_QUALITY":{let s={level:a,op:c};$!=null?g.push({kind:"count",filter:s,op:y,n:$,desc:`${F[y]} ${$} spiller(e) ${F[c]} ${we[a]||a}`}):g.push({kind:"perPlayer",filter:s,desc:`Alle spillere ${F[c]} ${we[a]||a}`});break}case"PLAYER_MIN_OVR":case"PLAYER_MAX_OVR":case"PLAYER_EXACT_OVR":{let s=p.type==="PLAYER_MIN_OVR"?"min":p.type==="PLAYER_MAX_OVR"?"max":"exact",i={ovr:a,op:s};$!=null?g.push({kind:"count",filter:i,op:y,n:$,desc:`${F[y]} ${$} spiller(e) med rating ${F[s]} ${a}`}):g.push({kind:"perPlayer",filter:i,desc:`Alle spillere rating ${F[s]} ${a}`});break}case"PLAYER_RARITY_GROUP":{let s=$??1;g.push({kind:"count",filter:{rare:!0},op:y,n:s,desc:`${F[y]} ${s} sjældne spiller(e) (antaget, gruppe ${a})`});break}case"SAME_NATION_COUNT":case"SAME_LEAGUE_COUNT":case"SAME_CLUB_COUNT":{let s=Ue[p.type];g.push({kind:"same",field:s,op:c,n:a,desc:`${F[c]} ${a} spillere fra samme ${qe[s]}`});break}case"NATION_COUNT":case"LEAGUE_COUNT":case"CLUB_COUNT":{let s=De[p.type],i={nation:"nationer",league:"ligaer",club:"klubber"}[s];g.push({kind:"distinct",field:s,op:c,n:a,desc:`Antal forskellige ${i}: ${F[c]} ${a}`});break}default:g.push({kind:"unknown",raw:p,desc:`Ikke understøttet krav: ${p.type} = ${p.eligibilityValue} (${p.scope||""}) — tjek selv`})}}}return g}var ke=(o,n,g)=>n==="max"?o<=g:n==="exact"?o===g:o>=g,ee=(o,n,g)=>n==="max"?Math.max(0,o-g):n==="exact"?Math.abs(o-g):Math.max(0,g-o);function J(o,n){return n.field?n.values.includes(Number(o[n.field])):n.level!=null?ke(Z(o.rating),n.op,n.level):n.ovr!=null?ke(o.rating,n.op,n.ovr):n.rare?Number(o.rarity)!==0:!0}function Se(o,n,g){return o.map(e=>{let m=null,f=0;switch(e.kind){case"rating":m=g.rating,f=ee(m,e.op,e.n)*3;break;case"chem":m=g.chem.total,f=ee(m,e.op,e.n);break;case"playerChem":m=Math.min(...g.chem.per),f=g.chem.per.reduce((l,$)=>l+Math.max(0,e.n-$),0);break;case"count":m=n.filter(l=>J(l,e.filter)).length,f=ee(m,e.op,e.n);break;case"perPlayer":m=n.filter(l=>!J(l,e.filter)).length,f=m;break;case"same":{let l=new Map;for(let $ of n)$[e.field]!=null&&l.set($[e.field],(l.get($[e.field])||0)+1);m=l.size?Math.max(...l.values()):0,f=ee(m,e.op,e.n);break}case"distinct":m=new Set(n.map(l=>l[e.field]).filter(l=>l!=null)).size,f=ee(m,e.op,e.n);break;default:return{c:e,ok:null,actual:null,gap:0}}return{c:e,ok:f===0,actual:m,gap:f}})}var Ce={433:["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"],4231:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","CAM","ST"],442:["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"],4141:["GK","RB","CB","CB","LB","CDM","RM","CM","CM","LM","ST"],41212:["GK","RB","CB","CB","LB","CDM","RM","LM","CAM","ST","ST"],352:["GK","CB","CB","CB","CDM","CDM","RM","LM","CAM","ST","ST"],343:["GK","CB","CB","CB","RM","CM","CM","LM","RW","ST","LW"],532:["GK","RWB","CB","CB","CB","LWB","CM","CM","CM","ST","ST"],4321:["GK","RB","CB","CB","LB","CM","CM","CM","CAM","CAM","ST"],3142:["GK","CB","CB","CB","CDM","RM","CM","CM","LM","ST","ST"],3412:["GK","CB","CB","CB","RM","CM","CM","LM","CAM","ST","ST"],4411:["GK","RB","CB","CB","LB","RM","CM","CM","LM","CAM","ST"],451:["GK","RB","CB","CB","LB","RM","CM","CAM","CM","LM","ST"],4222:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","ST","ST"],541:["GK","RWB","CB","CB","CB","LWB","RM","CM","CM","LM","ST"]},Me=2118;function Le(o){let n=String(o||"").replace(/[^0-9]/g,"");return Ce[n]||Ce[433]}var de=(o,[n,g,e])=>o>=e?3:o>=g?2:o>=n?1:0;function Fe(o,n,g=!1){let e=new Array(n.length).fill(-1),m=(y,w)=>g||(y.positions||[]).includes(n[w]),f=(y,w)=>{for(let b=0;b<n.length;b++)if(!(w[b]||!m(o[y],b))&&(w[b]=!0,e[b]===-1||f(e[b],w)))return e[b]=y,!0;return!1},l=o.map((y,w)=>w).sort((y,w)=>(o[y].positions?.length||0)-(o[w].positions?.length||0));for(let y of l)f(y,new Array(n.length).fill(!1));let $=new Array(o.length).fill(-1);return e.forEach((y,w)=>{y!==-1&&($[y]=w)}),$}function Be(o,n,g=!1){let e=Fe(o,n,g),m=new Map,f=new Map,l=new Map,$=(w,b,p=1)=>{b!=null&&w.set(b,(w.get(b)||0)+p)};o.forEach((w,b)=>{if(e[b]===-1)return;let p=w.league===Me;$(m,w.club),$(f,w.nation,p?2:1),p||$(l,w.league)});let y=o.map((w,b)=>{if(e[b]===-1)return 0;if(w.league===Me)return 3;let p=de(m.get(w.club)||0,[2,5,7])+de(f.get(w.nation)||0,[2,5,8])+de(l.get(w.league)||0,[3,5,8]);return Math.min(3,p)});return{total:y.reduce((w,b)=>w+b,0),per:y,slotOf:e}}var He={maxRating:99,excludeSpecial:!0,onlyUntradeable:!1,tradeablePenalty:1.6,ignorePositions:!1,iterations:25e3,restarts:4,excludeIds:[],allowBuy:!1,maxBuys:4,seed:null};function Ve(o,n){let g=o.rating<75?.2+(o.rating-45)/100:Math.pow(1.35,o.rating-75);return Number(o.rarity)>1?g*=2.5:Number(o.rarity)===1&&(g*=1.15),o.untradeable||(g*=n.tradeablePenalty),o.inStorage&&n.preferStorage!==!1&&(g*=.4),g}var Ke=["GK","RB","CB","LB","RWB","LWB","CDM","CM","CAM","RM","LM","RW","LW","ST"],Ge=[60,70,75,77,79,81,82,83,84,85,86,87];function Ye(o){return(o<75?.5:Math.pow(1.35,o-75))*2.2+2}var We=25,Xe=new Set([13,16,19,31,53]),Je=new Set([1,5,9,10,11,18,21,22,44,45,47,48,73,240,241,243]);function Qe(o){if(o.generic)return 0;let n=1;return o.required&&(n+=We),o.club!=null&&Je.has(Number(o.club))&&(n+=10),o.league!=null&&Xe.has(Number(o.league))&&(n+=3),n}function Ze(o,n,g,e,m){let f=new Map,l=new Map;for(let i of o){if(i.club==null)continue;l.set(i.club,(l.get(i.club)||0)+1);let x=`${i.club}|${i.league}`;f.set(x,(f.get(x)||0)+1)}let $=i=>{let x=null,R=0;for(let[P,O]of f){let[u,L]=P.split("|");Number(u)===Number(i)&&O>R&&(R=O,x=Number(L))}return x},y=new Map,w=i=>y.set(`${i.club}|${i.league}|${i.nation}`,i),b=new Set,p=new Map;for(let i of n){let x=i.filter;if(i.kind!=="count"||x?.field!=="club"||i.op==="max")continue;let R=x.values.map(Number);R.forEach(u=>b.add(u));let P=new Set(m.filter(u=>R.includes(Number(u.club))).map(te)).size,O=Math.max(0,i.n-P);if(O)for(let u of R)p.set(u,Math.max(p.get(u)||0,O))}for(let i of n){let x=i.filter;if(!(i.kind!=="count"||!x?.field))for(let R of x.values)x.field==="club"&&(p.has(Number(R))?w({club:R,league:$(R),nation:null,required:p.get(Number(R))}):b.has(Number(R))||w({club:R,league:$(R),nation:null})),x.field==="league"&&w({club:null,league:R,nation:null}),x.field==="nation"&&w({club:null,league:null,nation:R})}[...l.entries()].filter(([i])=>!b.has(Number(i))).sort((i,x)=>x[1]-i[1]).slice(0,12).forEach(([i])=>w({club:i,league:$(i),nation:null})),w({club:null,league:null,nation:null,generic:!0});let a=Math.max(1,Math.min(g.maxBuys,5)),c=[],s=0;for(let i of y.values())for(let x of Ge){let R={id:`buy-${s}`,placeholder:!0,rating:x,rarity:0,untradeable:!1,club:i.club,league:i.league,nation:i.nation,positions:Ke,requiredClub:!!i.required,generic:!!i.generic};if(!e.every(u=>J(R,u.filter)))continue;let P=Ye(x)+Qe(i),O=i.required?Math.min(a,i.required):a;for(let u=0;u<O;u++)c.push({p:{...R,id:`buy-${s++}`},cost:P})}return c}function et(o){if(o==null)return Math.random;let n=o>>>0;return()=>(n=n*1664525+1013904223>>>0)/4294967296}var te=o=>String(o.assetId??o.resourceId??o.id);function $e(o,n,g={}){let e={...He,...g},m=et(e.seed),f=Le(e.formation),l=f.length,$=n.filter(d=>d.kind==="perPlayer"),y=n.filter(d=>d.kind!=="perPlayer"&&d.kind!=="unknown"),w=new Set(e.excludeIds.map(String)),b=new Map;for(let d of o){if(d.loan||w.has(String(d.id))||d.rating>e.maxRating||e.excludeSpecial&&Number(d.rarity)>1||e.onlyUntradeable&&!d.untradeable||!$.every(z=>J(d,z.filter)))continue;let B=Ve(d,e),E=te(d);(!b.has(E)||b.get(E).cost>B)&&b.set(E,{p:d,cost:B})}let p=[...b.values()];if(e.allowBuy&&e.maxBuys>0&&p.push(...Ze(o,y,e,$,p.map(d=>d.p))),p.length<l)return{feasible:!1,error:`Kun ${p.length} brugbare spillere fundet (skal bruge ${l}). Bladr mere i klubben eller løsn filtrene.`};let a=new Map,c={club:new Map,league:new Map,nation:new Map};p.forEach((d,B)=>{a.has(d.p.rating)||a.set(d.p.rating,[]),a.get(d.p.rating).push(B);for(let E of Object.keys(c)){let z=c[E];z.has(d.p[E])||z.set(d.p[E],[]),z.get(d.p[E]).push(B)}});let s=d=>d[Math.floor(m()*d.length)],i=y.filter(d=>d.kind==="count"&&d.filter&&d.op!=="max").map(d=>p.map((B,E)=>J(B.p,d.filter)?E:-1).filter(B=>B>=0)).filter(d=>d.length),x=40,R=d=>{let B=d.map(j=>p[j].p),E=be(B.map(j=>j.rating)),z=Be(B,f,e.ignorePositions),U=Se(y,B,{rating:E,chem:z}),H=d.reduce((j,V)=>j+(p[V].p.placeholder?1:0),0),K=U.reduce((j,V)=>j+V.gap,0)+Math.max(0,H-e.maxBuys)*2,q=d.reduce((j,V)=>j+p[V].cost,0);return{total:q+x*K,viol:K,cost:q,rating:E,chem:z,res:U}},P=p.map((d,B)=>B).sort((d,B)=>p[d].cost-p[B].cost),O=null,u=null;for(let d=0;d<e.restarts;d++){let B=P.slice(0,Math.max(l*3,40)),E=[],z=new Set;for(;E.length<l;){let H=d===0?B[E.length]??s(P):s(B),K=te(p[H].p);if(z.has(K)){d===0&&B.splice(E.length,1);continue}z.add(K),E.push(H)}let U=R(E);U.viol===0&&(!O||U.cost<O.s.cost)&&(O={idx:[...E],s:U});for(let H=0;H<e.iterations;H++){let K=6*Math.pow(.0015,H/e.iterations),q=Math.floor(m()*l),j=E[q],V=m(),G;if(i.length&&V<.12)G=s(s(i));else if(V<.35){let W=p[j].p.rating+(m()<.5?-1:1)*(1+Math.floor(m()*3)),Y=a.get(W);G=s(Y||P)}else if(V<.7){let W=p[E[Math.floor(m()*l)]].p,Y=["club","league","nation"][Math.floor(m()*3)];G=s(c[Y].get(W[Y]))}else G=s(P);let Q=te(p[G].p);if(G===j||E.some((W,Y)=>Y!==q&&te(p[W].p)===Q))continue;E[q]=G;let X=R(E),ne=X.total-U.total;ne<=0||m()<Math.exp(-ne/K)?(U=X,X.viol===0&&(!O||X.cost<O.s.cost)&&(O={idx:[...E],s:X})):E[q]=j}(!u||U.total<u.s.total)&&(u={idx:[...E],s:U})}let{idx:L,s:k}=O||u,I=L.map(d=>p[d].p);return{feasible:k.viol===0,rating:k.rating,chem:k.chem.total,cost:Math.round(k.cost*10)/10,buys:I.filter(d=>d.placeholder).length,slots:f,squad:I.map((d,B)=>({player:d,slotIndex:k.chem.slotOf[B],slot:k.chem.slotOf[B]>=0?f[k.chem.slotOf[B]]:"—",chem:k.chem.per[B]})),checks:[...k.res,...n.filter(d=>d.kind==="perPlayer").map(d=>({c:d,ok:!0,actual:null})),...n.filter(d=>d.kind==="unknown").map(d=>({c:d,ok:null,actual:null}))],candidates:p.length}}var N=o=>String(o??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]);async function Ee(o,n,g={}){let e=t=>o.getElementById(t),m={formation:"",maxRating:88,excludeSpecial:!0,onlyUntradeable:!1,preferStorage:!0,ignorePositions:!1,mode:"sbc",challengeId:"",view:"pitch",allowBuy:!0,maxBuys:4},f={club:{},sets:{},challenges:{},names:{},samples:{},lastUpdate:0},l={...m},$=null,y=new Set;async function w(){let t=await n.get(["club","sets","challenges","names","samples","lastUpdate","settings","labels"]);f={...f,...t},he(f.labels),l={...m,...t.settings||{}}}let b=()=>n.set({settings:l}),p=()=>Object.values(f.club||{}).filter(t=>t&&t.id&&t.id!=="0"&&t.rating>0),a=t=>f.names?.[t.assetId]||`Spiller #${t.assetId??t.id}`,c=t=>{let r=f.names?.[t.assetId];if(!r)return`#${t.assetId??t.id}`;let S=r.split(" ");return S.length>1?S[S.length-1]:r},s=t=>Number(t.rarity)>1?"lv-special":["","lv-bronze","lv-silver","lv-gold"][Z(t.rating)],i;function x(t){let r=e("toast");r.textContent=t,r.hidden=!1,clearTimeout(i),i=setTimeout(()=>{r.hidden=!0},2200)}function R(){let t=p(),r=t.filter(C=>C.untradeable).length,S=t.filter(C=>C.inStorage).length,v=Object.keys(f.challenges||{}).length;e("stats").innerHTML=[`<span class="stat"><b>${t.length}</b>spillere</span>`,`<span class="stat"><b>${r}</b>UT</span>`,`<span class="stat"><b>${S}</b>opbevaring</span>`,`<span class="stat"><b>${v}</b>SBC'er</span>`].join(""),P(),e("onboarding").hidden=t.length>0}function P(){let t=e("liveState"),r=f.lastUpdate?Math.round((Date.now()-f.lastUpdate)/1e3):null,S=r!=null&&r<120;t.classList.toggle("live",S),t.innerHTML=`<span class="dot"></span>${r==null?"Venter på web-appen":S?`Forbundet · opdateret for ${r<5?"lige":r+" s"} siden`:`Sidst opdateret ${new Date(f.lastUpdate).toLocaleTimeString("da-DK",{hour:"2-digit",minute:"2-digit"})}`}`}setInterval(P,1e4),o.querySelectorAll(".tab").forEach(t=>{t.onclick=()=>{o.querySelectorAll(".tab").forEach(r=>r.classList.toggle("active",r===t)),o.querySelectorAll(".view").forEach(r=>r.classList.toggle("active",r.id===`view-${t.dataset.tab}`)),e("dock").hidden=t.dataset.tab!=="solve",t.dataset.tab==="club"&&oe()}});function O(t){l.mode=t,o.querySelectorAll("#modeSeg button").forEach(r=>r.classList.toggle("on",r.dataset.mode===t)),e("sbcPicker").hidden=t!=="sbc",e("manualForm").hidden=t!=="manual",B()}o.querySelectorAll("#modeSeg button").forEach(t=>{t.onclick=()=>{O(t.dataset.mode),b()}});function u(){let t=f.challenges?.[l.challengeId],r=t&&f.sets?.[t.setId];e("pickerLabel").className=t?"":"muted",e("pickerLabel").innerHTML=t?`<span class="name">${N(t.name)}</span><span class="set">${N(r?.name||`Sæt ${t.setId}`)}</span>`:Object.keys(f.challenges||{}).length?"Vælg en SBC…":"Ingen SBC'er fanget endnu – åbn SBC i web-appen"}function L(){let t=e("sbcSearch").value.trim().toLowerCase(),r=new Map;for(let v of Object.values(f.challenges||{})){let C=f.sets?.[v.setId]?.name||`Sæt ${v.setId}`;t&&!`${C} ${v.name}`.toLowerCase().includes(t)||(r.has(C)||r.set(C,[]),r.get(C).push(v))}let S=e("sbcList");if(!r.size){S.innerHTML=`<div class="none">Ingen SBC'er matcher</div>`;return}S.innerHTML="";for(let[v,C]of r){let A=document.createElement("div");A.className="group-title",A.textContent=v,S.appendChild(A);for(let T of C.sort((M,h)=>M.challengeId-h.challengeId)){let M=T.status==="COMPLETED",h=ce(T.elgReq).length,_=document.createElement("button");_.className=`item${String(T.challengeId)===String(l.challengeId)?" sel":""}`,_.innerHTML=`<span>${N(T.name)}</span><span class="badge${M?" done":""}">${M?"Fuldført":`${h} krav`}</span>`,_.onclick=()=>{l.challengeId=String(T.challengeId),y.clear(),$=null,e("result").hidden=!0,b(),I(),u(),B()},S.appendChild(_)}}}function k(){e("dropdown").hidden=!1,e("sbcSearch").value="",L(),g.touch||e("sbcSearch").focus()}function I(){e("dropdown").hidden=!0}e("pickerBtn").onclick=t=>{t.stopPropagation(),e("dropdown").hidden?k():I()},e("sbcSearch").oninput=L,e("dropdown").onclick=t=>t.stopPropagation(),o.addEventListener("click",I),o.addEventListener("keydown",t=>{t.key==="Escape"&&I()});function d(){if(l.mode==="sbc"){let v=f.challenges?.[l.challengeId];return v?{constraints:ce(v.elgReq),formation:v.formation}:{constraints:[],formation:null}}let t=[],r=Number(e("mRating").value),S=Number(e("mChem").value);return r>0&&t.push({kind:"rating",op:"min",n:r,desc:`Holdrating min. ${r}`}),S>0&&t.push({kind:"chem",op:"min",n:S,desc:`Holdkemi min. ${S}`}),{constraints:t,formation:null}}function B(t){let r=e("reqChips"),S=t||d().constraints.map(v=>({c:v,ok:v.kind==="unknown"?null:void 0}));if(!S.length){r.innerHTML=`<span class="muted small">${l.mode==="sbc"?"Vælg en SBC for at se kravene.":"Angiv rating og/eller kemi."}</span>`;return}r.innerHTML=S.map(({c:v,ok:C,actual:A})=>{let T=C===!0?"ok":C===!1?"bad":C===null?"warn":"",M=C===!0?"✓":C===!1?"✗":C===null?"!":"•",h=A!=null&&C!==void 0?`<span class="act">${N(A)}</span>`:"";return`<span class="chip ${T}" title="${N(v.desc)}"><i>${M}</i>${N(v.desc)}${h}</span>`}).join("")}e("mRating").oninput=()=>B(),e("mChem").oninput=()=>B();async function E(){let{constraints:t,formation:r}=d();if(!t.length){x(l.mode==="sbc"?"Vælg en SBC først":"Angiv mindst ét krav");return}if(!p().length){x("Ingen spillere fanget endnu");return}let S=e("solve");S.disabled=!0,S.querySelector(".spinner").hidden=!1,S.querySelector(".lbl").textContent="Løser…",await new Promise(v=>setTimeout(v,30));try{$=$e(p(),t,{formation:l.formation||r,maxRating:l.maxRating,excludeSpecial:l.excludeSpecial,onlyUntradeable:l.onlyUntradeable,preferStorage:l.preferStorage,ignorePositions:l.ignorePositions,allowBuy:l.allowBuy,maxBuys:Number(l.maxBuys)||0,excludeIds:[...y]}),X()}finally{S.disabled=!1,S.querySelector(".spinner").hidden=!0,S.querySelector(".lbl").textContent=$?"Løs igen":"Løs SBC"}}e("solve").onclick=E;let z={ST:12,CF:12,RW:18,LW:18,CAM:34,RM:48,LM:48,CM:48,CDM:62,RWB:70,LWB:70,RB:77,LB:77,CB:77,GK:90},U=t=>/^L/.test(t)?-1:/^R/.test(t)?1:0;function H(t){let r=[...new Set(t.map(A=>z[A]??50))].sort((A,T)=>A-T),S=A=>{let T=r.indexOf(z[A]??50);return r.length===1?50:11+78*T/(r.length-1)},v=new Array(t.length),C=new Map;t.forEach((A,T)=>{let M=S(A);if(U(A)!==0){v[T]={x:U(A)<0?11:89,y:M};return}C.has(M)||C.set(M,[]),C.get(M).push(T)});for(let[A,T]of C){let M=T.length,h=Math.min(24,12*(M-1));T.forEach((_,_e)=>{v[_]={x:M===1?50:50-h+2*h*_e/(M-1),y:A}})}return v}function K(t){let r=ae("club",t);if(r)return r;let S=p().filter(v=>String(v.club)===String(t)&&f.names?.[v.assetId]).sort((v,C)=>C.rating-v.rating).slice(0,2).map(a);return S.length?`Samme klub som ${S.join(" og ")}`:D("club",t)}function q(t){return t.generic?"Valgfri klub":t.club!=null?K(t.club):t.league!=null?D("league",t.league):t.nation!=null?D("nation",t.nation):"Valgfri"}function j(t){if(t.club!=null&&!t.generic&&!ae("club",t.club)){let r=p().filter(S=>String(S.club)===String(t.club)&&f.names?.[S.assetId]).sort((S,v)=>v.rating-S.rating)[0];if(r)return`som ${c(r)}`}return q(t)}let V=(t,r=11)=>t.length>r?`${t.slice(0,r-1)}…`:t;function G(t){let r=t.player;if(r.placeholder){let C=[0,1,2].map(A=>`<s class="${A<t.chem?"on":""}"></s>`).join("");return`<span class="tags"><span class="tag buy">KØB</span></span><span class="ovr">${r.rating}+</span><span class="pos">${N(t.slot)}</span><span class="nm">${N(V(j(r)))}</span><span class="chem">${C}</span>`}let S=[0,1,2].map(C=>`<s class="${C<t.chem?"on":""}"></s>`).join("");return`<span class="tags">${[r.untradeable?'<span class="tag ut">UT</span>':"",r.inStorage?'<span class="tag st">OPB</span>':""].join("")}</span><span class="ovr">${r.rating}</span><span class="pos">${N(t.slot)}</span><span class="nm">${N(c(r))}</span><span class="chem">${S}</span>`}function Q(t){y.add(String(t.id)),x(`${a(t)} udelukket – løser igen`),E()}function X(){let t=$;e("result").hidden=!1,e("resetExcl").hidden=y.size===0,e("exclCount").textContent=y.size;let r=e("verdict");if(t.error){e("rRating").textContent="–",e("rChem").textContent="–",e("rCost").textContent="–",r.className="verdict bad",r.textContent=t.error,e("pitch").innerHTML="",e("plist").innerHTML="",e("bench").hidden=!0,B();return}e("rRating").textContent=t.rating,e("rChem").textContent=t.chem,e("rCost").textContent=Math.round(t.cost),r.className=`verdict ${t.feasible?"ok":"bad"}`,r.textContent=t.feasible?t.buys?`Løst med ${11-t.buys} fra klubben + ${t.buys} køb`:"Løst kun med spillere fra klubben":"Ingen gyldig løsning – tætteste bud vises",B(t.checks),ne(t);let S=e("pitch");S.innerHTML='<div class="circle"></div>';let v=H(t.slots),C=[];for(let M of t.squad){if(M.slotIndex<0){C.push(M);continue}let h=document.createElement("button");h.className=`pcard ${s(M.player)}`,h.style.left=`${v[M.slotIndex].x}%`,h.style.top=`${v[M.slotIndex].y}%`,M.player.placeholder?(h.className="pcard buy",h.title=`Køb: ${q(M.player)}, rating ${M.player.rating}+, position ${M.slot}`):(h.title=`${a(M.player)} · ${M.player.rating} · ${D("club",M.player.club)} · ${D("league",M.player.league)} · ${D("nation",M.player.nation)}`,h.onclick=()=>Q(M.player)),h.innerHTML=G(M),S.appendChild(h)}let A=e("bench");A.innerHTML=C.length?'<div class="bench-title">Uden passende position (0 kemi):</div>':"";for(let M of C){let h=document.createElement("button");h.className=`pcard ${s(M.player)}`,h.innerHTML=G(M),h.onclick=()=>Q(M.player),A.appendChild(h)}let T=e("plist");T.innerHTML="";for(let M of[...t.squad].sort((h,_)=>_.player.rating-h.player.rating)){if(M.player.placeholder){let _=document.createElement("div");_.className="prow",_.innerHTML=`<span class="ov buyov">${M.player.rating}+</span><span class="meta"><b>Køb: ${N(q(M.player))}</b><span>${N(M.slot)} · se indkøbslisten</span></span><span class="pp">${N(M.slot)}</span><span class="chemtxt">${M.chem}/3</span>`,T.appendChild(_);continue}let h=document.createElement("button");h.className="prow",h.title="Udeluk og løs igen",h.innerHTML=W(M.player,`<span class="pp">${N(M.slot)}</span><span class="chemtxt">${M.chem}/3</span>`),h.onclick=()=>Q(M.player),T.appendChild(h)}Y()}function ne(t){let r=(t.squad||[]).filter(v=>v.player.placeholder);if(e("shop").hidden=!r.length,!r.length)return;e("shopCount").textContent=`${r.length} spiller${r.length>1?"e":""}`;let S=[];for(let v of d().constraints){if(v.kind!=="same"||v.op!=="max")continue;let C=new Map;for(let A of t.squad){let T=A.player[v.field];T!=null&&C.set(T,(C.get(T)||0)+1)}for(let[A,T]of C)T>=v.n&&S.push(D(v.field,A))}e("shopList").innerHTML=r.sort((v,C)=>C.player.rating-v.player.rating).map(v=>{let C=v.player,A=C.generic?'Hvilken som helst spiller <span class="sub2">· billigst fra en mindre liga</span>':C.club!=null?`${N(K(C.club))}${C.league!=null?` <span class="sub2">· ${N(D("league",C.league))}</span>`:""}`:N(q(C)),T=S.length?`Ikke fra: ${N(S.join(", "))}`:"Valgfri nation",M=C.requiredClub?`Krævet af SBC'en – du ejer ingen · ${T}`:C.generic?`Kun rating tæller · ${T}`:T;return`<div class="shoprow"><span class="pp">${N(v.slot)}</span><span><b>${A}</b><span class="sub2">${M}</span></span><span class="rt">${C.rating}+</span></div>`}).join("")}function W(t,r){let S=(t.untradeable?'<span class="flag ut">UT</span>':"")+(t.inStorage?'<span class="flag st">OPB</span>':"");return`<span class="ov ${s(t)}">${t.rating}</span>
      <span class="meta"><b>${N(a(t))}${S}</b><span>${N((t.positions||[]).join(" · "))} · ${N(D("club",t.club))} · ${N(D("league",t.league))} · ${N(D("nation",t.nation))}</span></span>
      ${r}`}function Y(){o.querySelectorAll("#viewSeg button").forEach(r=>r.classList.toggle("on",r.dataset.view===l.view));let t=l.view==="pitch";e("pitch").hidden=!t,e("bench").hidden=!t||!e("bench").children.length,e("plist").hidden=t}o.querySelectorAll("#viewSeg button").forEach(t=>{t.onclick=()=>{l.view=t.dataset.view,b(),Y()}}),e("resetExcl").onclick=()=>{y.clear(),E()};function oe(){let t=p(),r={gold:0,silver:0,bronze:0,special:0};for(let h of t)Number(h.rarity)>1?r.special++:r[["","bronze","silver","gold"][Z(h.rating)]]++;e("levels").innerHTML=[["gold","Guld"],["silver","Sølv"],["bronze","Bronze"],["special","Special"]].map(([h,_])=>`<div class="lvl lv-${h}"><b>${r[h]}</b><small>${_}</small></div>`).join("");let S=e("clubSearch").value.trim().toLowerCase(),v=t.filter(h=>e("fUT").checked&&!h.untradeable||e("fStorage").checked&&!h.inStorage||e("fSpecial").checked&&!(Number(h.rarity)>1)?!1:S?`${a(h)} ${h.rating} ${D("league",h.league)} ${D("nation",h.nation)} ${D("club",h.club)} ${(h.positions||[]).join(" ")}`.toLowerCase().includes(S):!0),C=e("clubSort").value,A={"rating-desc":(h,_)=>_.rating-h.rating,"rating-asc":(h,_)=>h.rating-_.rating,league:(h,_)=>h.league-_.league||_.rating-h.rating,nation:(h,_)=>h.nation-_.nation||_.rating-h.rating}[C];v.sort(A);let T=150,M=e("clubList");M.innerHTML=v.length?v.slice(0,T).map(h=>`<div class="prow">${W(h,"<span></span><span></span>")}</div>`).join(""):'<div class="empty center muted">Ingen spillere matcher.</div>',e("clubMore").textContent=v.length>T?`Viser ${T} af ${v.length} – søg for at indsnævre`:""}["clubSearch","clubSort","fUT","fStorage","fSpecial"].forEach(t=>{e(t).addEventListener("input",oe)});function Ae(){e("formation").value=l.formation,e("maxRating").value=l.maxRating,e("maxRatingVal").textContent=l.maxRating;for(let t of["excludeSpecial","onlyUntradeable","preferStorage","ignorePositions"])e(t).checked=l[t],e(t).onchange=()=>{l[t]=e(t).checked,b()};e("formation").onchange=()=>{l.formation=e("formation").value,b()},e("allowBuy").checked=l.allowBuy,e("maxBuys").value=String(l.maxBuys),e("maxBuysWrap").hidden=!l.allowBuy,e("allowBuy").onchange=()=>{l.allowBuy=e("allowBuy").checked,e("maxBuysWrap").hidden=!l.allowBuy,b()},e("maxBuys").onchange=()=>{l.maxBuys=Number(e("maxBuys").value),b()},e("maxRating").oninput=()=>{l.maxRating=Number(e("maxRating").value),e("maxRatingVal").textContent=l.maxRating},e("maxRating").onchange=b}function Re(){let t=p().length,r=Object.keys(f.names||{}).length;e("dataInfo").textContent=`${t} spillere og ${Object.keys(f.challenges||{}).length} SBC-udfordringer gemt lokalt. ${r?`${r} spillernavne kendt.`:"Ingen spillernavne endnu (vises som #ID)."}`}e("clearClub").onclick=async()=>{confirm("Slet alle gemte spillere? Bladr klubben igennem igen bagefter.")&&(await n.set({club:{}}),f.club={},y.clear(),re(),x("Klubdata ryddet"))},e("exportDebug").onclick=()=>{let t=new Blob([JSON.stringify({samples:f.samples,challenges:f.challenges,labels:f.labels},null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download="fc27-sbc-debug.json",r.click()};function re(){R(),u(),e("dropdown").hidden||L(),Re(),$||B(),e("view-club").classList.contains("active")&&oe()}n.watch(async()=>{await w(),re()}),await w(),Ae(),O(l.mode),re()}var Ie=`<!doctype html>
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

        <div class="pitch" id="pitch"></div>
        <div class="bench" id="bench" hidden></div>
        <div class="plist" id="plist" hidden></div>

        <p class="hint">Tryk på et kort for at udelukke spilleren og løse igen.
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
    <button class="btn primary big" id="solve"><span class="spinner" hidden></span><span class="lbl">Løs SBC</span></button>
  </footer>

  <div class="toast" id="toast" hidden></div>

  <script type="module" src="panel.js"><\/script>
</body>
</html>
`;var Te=`:root {
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
.pcard:hover { transform: translate(-50%, -50%) scale(1.06); z-index: 5; }
.pcard:hover::after {
  content: "Udeluk"; position: absolute; inset: 0; border-radius: inherit;
  background: rgba(10, 12, 18, .72); color: #fff; font-weight: 800; font-size: 11px;
  display: grid; place-items: center;
}
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
`;(()=>{if(window.__fc27sbc){window.__fc27sbc.toggle();return}pe(ge);let o,n,g=!1,e=!1;function m(){return`${Te.replace(/@media \(prefers-color-scheme: light\) \{[\s\S]*?\n\}\n/,"").replace(/:root\[data-theme="dark"\][^\n]*\n/,"").replace(":root {",":host {").replace("html, body { margin: 0; }","").replace(/(^|\n)body \{/,"$1.app {")}
:host { all: initial; }
.app {
  position: fixed; inset: 0; z-index: 2147483000; overflow-y: auto; -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain; min-width: 0;
  padding-top: env(safe-area-inset-top); padding-bottom: calc(96px + env(safe-area-inset-bottom));
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
`}function f(){let b=new DOMParser().parseFromString(Ie,"text/html");return b.querySelectorAll("script").forEach(p=>p.remove()),b.body.innerHTML}async function l(){g||(g=!0,o=document.createElement("div"),o.id="fc27-sbc-host",n=o.attachShadow({mode:"open"}),n.innerHTML=`<style>${m()}</style>
      <button class="fab" id="fc27Fab" aria-label="Åbn SBC Solver">SBC</button>
      <div class="app closed" id="fc27App"><button class="close" id="fc27Close" aria-label="Luk">✕</button>${f()}</div>`,document.documentElement.appendChild(o),n.getElementById("fc27Fab").onclick=()=>y(!0),n.getElementById("fc27Close").onclick=()=>y(!1),$(n.getElementById("fc27Fab")),await Ee(n,fe,{touch:!0}))}function $(b){let p=0,a=0,c=!1;try{let s=Number(localStorage.getItem("fc27sbc:fabBottom"));s>0&&(b.style.bottom=`${s}px`)}catch{}b.addEventListener("pointerdown",s=>{p=s.clientY,a=parseFloat(getComputedStyle(b).bottom),c=!1,b.setPointerCapture(s.pointerId)}),b.addEventListener("pointermove",s=>{if(!b.hasPointerCapture(s.pointerId))return;let i=p-s.clientY;Math.abs(i)>6&&(c=!0),c&&(b.style.bottom=`${Math.max(10,Math.min(window.innerHeight-70,a+i))}px`)}),b.addEventListener("pointerup",()=>{if(c){try{localStorage.setItem("fc27sbc:fabBottom",String(parseFloat(b.style.bottom)))}catch{}b.addEventListener("click",s=>s.stopImmediatePropagation(),{once:!0,capture:!0})}})}async function y(b){await l(),e=b,n.getElementById("fc27App").classList.toggle("closed",!e),n.getElementById("fc27Fab").classList.toggle("hide",e)}window.__fc27sbc={open:()=>y(!0),close:()=>y(!1),toggle:()=>y(!e)};let w=()=>window.__fc27sbcOpen?y(!0):l();document.body?w():document.addEventListener("DOMContentLoaded",w,{once:!0})})();})();
