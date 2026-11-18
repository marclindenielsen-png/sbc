(()=>{function he(n){(()=>{if(window.__fc27SbcHooked)return;window.__fc27SbcHooked=!0;let a=/\/ut\/game\/[^/?]+\/(club|sbs\/|purchased\/items|storagepile)|players\.json/i,u=(r,c)=>{try{window.postMessage({__fc27sbc:!0,url:String(r),body:c},window.location.origin)}catch{}},e={club:new Set,league:new Set,nation:new Set},S={club:new Set,league:new Set,nation:new Set},m=[2027,2026,2025],p={club:r=>m.flatMap(c=>[`global.teamFull.${c}.team${r}`,`global.teamabbr15.${c}.team${r}`]).concat([`global.teamFull.team${r}`,`global.teamabbr15.team${r}`]),league:r=>m.flatMap(c=>[`global.leagueFull.${c}.league${r}`,`global.leagueabbr15.${c}.league${r}`]).concat([`global.leagueFull.league${r}`]),nation:r=>[`search.nationName.nation${r}`,`global.nationFull.nation${r}`,`global.nationName.nation${r}`]},i={club:/team(full|abbr15|name)/i,league:/league(full|abbr15|name)/i,nation:/nation(full|name)/i},g=null;function f(){if(g)return g;let r=window.services&&window.services.Localization;if(!r)return null;let c=new Set,y=(v,A)=>{if(!v||typeof v!="object"||c.has(v)||A>3)return null;c.add(v);let H;try{H=Object.keys(v)}catch{return null}if(H.length>2e3&&H.slice(0,50).filter(k=>k.includes(".")&&typeof v[k]=="string").length>25)return v;for(let k of H.slice(0,200)){let M;try{M=v[k]}catch{continue}let I=y(M,A+1);if(I)return I}return null};return g=y(r,0),g}function b(r){let c=window.services&&window.services.Localization;try{let y=f();if(y&&typeof y[r]=="string")return y[r];if(c&&typeof c.localize=="function"){let v=c.localize(r);if(typeof v=="string"&&v&&v!==r&&!v.includes(r))return v}}catch{}return null}let x=null;function o(){let r={club:{},league:{},nation:{}},c=0,y=f();for(let v of Object.keys(e))for(let A of e[v]){if(S[v].has(A))continue;let H=null;for(let k of p[v](A))if(H=b(k),H)break;if(!H&&y){let k=new RegExp(`\\D${A}$`),M=Object.keys(y).find(I=>i[v].test(I)&&k.test(I));M&&(H=y[M])}H&&(r[v][A]=H,S[v].add(A),c++)}if(c&&window.postMessage({__fc27sbc:!0,labels:r},window.location.origin),y&&!o.sampled){o.sampled=!0;let v=Object.keys(y).filter(A=>/team|league|nation/i.test(A)).slice(0,60);window.postMessage({__fc27sbc:!0,locSample:v.map(A=>[A,y[A]])},window.location.origin)}}function s(r,c){c==null||c===0||S[r].has(c)||(e[r].add(c),clearTimeout(x),x=setTimeout(o,500))}function l(r){try{let c=[].concat(r.itemData||[]).concat((r.squad&&r.squad.players||[]).map(y=>y.itemData).filter(Boolean));for(let y of c)s("club",y.teamid),s("league",y.leagueId),s("nation",y.nation);for(let y of r.challenges||[])for(let v of y.elgReq||[])v.type==="CLUB_ID"&&s("club",v.eligibilityValue),v.type==="LEAGUE_ID"&&s("league",v.eligibilityValue),v.type==="NATION_ID"&&s("nation",v.eligibilityValue)}catch{}}window.addEventListener("message",r=>{if(!(r.source!==window||!r.data||!r.data.__fc27sbcWant))for(let c of Object.keys(e))for(let y of r.data.__fc27sbcWant[c]||[])s(c,y)});let w=u,R=(r,c)=>{l(c),w(r,c)},J=window.fetch;window.fetch=async function(...r){let c=await J.apply(this,r);try{let y=r[0],v=typeof y=="string"?y:y&&y.url||String(y);a.test(v)&&c.clone().json().then(A=>R(v,A)).catch(()=>{})}catch{}return c};let K=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(r,c,...y){return this.__fc27Url=c,K.call(this,r,c,...y)};let h=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(...r){return this.addEventListener("load",()=>{try{let c=String(this.__fc27Url||"");if(!a.test(c))return;let y=null;this.responseType==="json"?y=this.response:(this.responseType===""||this.responseType==="text")&&(y=JSON.parse(this.responseText)),y&&R(c,y)}catch{}}),h.apply(this,r)}})(),(()=>{let a={club:{},sets:{},challenges:{},names:{},samples:{},labels:{club:{},league:{},nation:{}},unknownUrls:[]},u=!1,e=new Set,S=null;n.storage.local.get(["club","sets","challenges","names","samples","labels"]).then(o=>{Object.assign(a,{club:o.club||{},sets:o.sets||{},challenges:o.challenges||{},names:o.names||{},samples:o.samples||{},labels:{club:{},league:{},nation:{},...o.labels||{}}});for(let[s,l]of Object.entries(a.club))(!l||!l.id||l.id==="0"||!(l.rating>0))&&(delete a.club[s],e.add("club"));u=!0,p()}),n.storage.onChanged.addListener((o,s)=>{if(s==="local")for(let l of["club","sets","challenges","names"])o[l]&&!e.has(l)&&(a[l]=o[l].newValue||{})});function m(o){e.add(o),p()}function p(){!u||e.size===0||(clearTimeout(S),S=setTimeout(()=>{let o={};for(let s of e)o[s]=a[s];e=new Set,o.lastUpdate=Date.now(),n.storage.local.set(o)},400))}function i(o,s,l){let w=(R,J=0)=>{if(Array.isArray(R))return R.slice(0,2).map(K=>w(K,J+1));if(R&&typeof R=="object"&&J<5){let K={};for(let[h,r]of Object.entries(R))K[h]=w(r,J+1);return K}return R};a.samples[o]={url:s.replace(/\?.*$/,""),at:Date.now(),body:w(l)},m("samples")}function g(o){if(!o||typeof o!="object")return null;let s=o.itemType||o.type;if(s&&s!=="player"||!o.id||!(Number(o.rating)>0)||o.itemState==="invalid"||!o.preferredPosition&&!Array.isArray(o.possiblePositions))return null;let l=o.preferredPosition||o.position||null;return{id:String(o.id),assetId:o.assetId??null,resourceId:o.resourceId??o.definitionId??null,rating:Number(o.rating),nation:o.nation??o.nationId??null,league:o.leagueId??o.league??null,club:o.teamid??o.teamId??o.clubId??null,rarity:o.rareflag??o.rarityId??0,position:l,positions:Array.isArray(o.possiblePositions)&&o.possiblePositions.length?o.possiblePositions:l?[l]:[],untradeable:!!o.untradeable,loan:!!o.loans||Number(o.loans)>0,inStorage:!1}}function f(o,s={}){let l=0;for(let w of o||[]){let R=g(w);!R||R.loan||(a.club[R.id]={...a.club[R.id],...R,...s,seen:Date.now()},l++)}l&&m("club")}function b(o,s){if(!s||typeof s!="object")return;if(/players\.json/i.test(o)){for(let w of[s.Players,s.LegendsPlayers])for(let R of w||[])R&&R.id!=null&&(a.names[R.id]=R.c||[R.f,R.l].filter(Boolean).join(" "));m("names");return}if(/\/club(\b|\/|\?|$)/.test(o)&&Array.isArray(s.itemData)){f(s.itemData),i("club",o,s);return}if(/storagepile/i.test(o)&&Array.isArray(s.itemData)){f(s.itemData,{inStorage:!0}),i("storage",o,s);return}if(/\/sbs\/sets/.test(o)&&Array.isArray(s.categories)){for(let w of s.categories)for(let R of w.sets||[])a.sets[R.setId]={setId:R.setId,name:R.name,category:w.name,challengesCount:R.challengesCount};m("sets"),i("sets",o,s);return}let l=o.match(/\/sbs\/setId\/(\d+)\/challenges/);if(l&&Array.isArray(s.challenges)){for(let w of s.challenges)a.challenges[w.challengeId]={challengeId:w.challengeId,setId:Number(l[1]),name:w.name,formation:w.formation||null,status:w.status||null,elgReq:w.elgReq||[],elgOperation:w.elgOperation||"AND"};m("challenges"),i("challenges",o,s);return}/\/sbs\/challenge\/\d+\/squad/.test(o)&&s.squad&&Array.isArray(s.squad.players)&&(f(s.squad.players.map(w=>w.itemData).filter(Boolean)),i("challengeSquad",o,s))}window.addEventListener("message",o=>{if(!(o.source!==window||!o.data||o.data.__fc27sbc!==!0))try{if(o.data.labels){for(let s of["club","league","nation"])Object.assign(a.labels[s],o.data.labels[s]||{});m("labels");return}if(o.data.locSample){a.samples.loc={at:Date.now(),body:o.data.locSample},m("samples");return}b(o.data.url,o.data.body)}catch(s){console.warn("[FC27 SBC]",s)}});function x(){let o={club:new Set,league:new Set,nation:new Set};for(let l of Object.values(a.club))for(let w of["club","league","nation"])l[w]!=null&&!a.labels[w][l[w]]&&o[w].add(l[w]);for(let l of Object.values(a.challenges))for(let w of l.elgReq||[])w.type==="CLUB_ID"&&!a.labels.club[w.eligibilityValue]&&o.club.add(w.eligibilityValue);let s={};for(let l of Object.keys(o))s[l]=[...o[l]];window.postMessage({__fc27sbcWant:s},window.location.origin)}[4e3,12e3,3e4,6e4].forEach(o=>setTimeout(()=>u&&x(),o))})()}var xe="0.2.0";var ve="fc27sbc:",ue=new Set;function je(n){try{let a=localStorage.getItem(ve+n);return a==null?void 0:JSON.parse(a)}catch{return}}var pe={async get(n){let a=Array.isArray(n)?n:[n],u={};for(let e of a){let S=je(e);S!==void 0&&(u[e]=S)}return u},async set(n){let a={};for(let[u,e]of Object.entries(n)){try{localStorage.setItem(ve+u,JSON.stringify(e))}catch(S){console.warn("[FC27 SBC] kunne ikke gemme",u,S)}a[u]={newValue:e}}setTimeout(()=>ue.forEach(u=>{try{u(a,"local")}catch(e){console.warn(e)}}),0)}},ye={storage:{local:pe,onChanged:{addListener:n=>ue.add(n)}}},we={get:n=>pe.get(n),set:n=>pe.set(n),watch:n=>ue.add((a,u)=>u==="local"&&n(a))};function ke(n){if(!n.length)return 0;let a=n.reduce((S,m)=>S+m,0),u=a/11,e=0;for(let S of n)S>u&&(e+=S-u);return Math.floor(Math.round(a+e)/11)}function ae(n){return n>=75?3:n>=65?2:1}var qe={1:"Arsenal",2:"Aston Villa",5:"Chelsea",7:"Everton",9:"Liverpool",10:"Manchester City",11:"Manchester United",13:"Newcastle",18:"Tottenham",21:"FC Bayern",22:"Borussia Dortmund",32:"Leverkusen",39:"Atalanta",44:"Inter",45:"Juventus",46:"Lazio",47:"AC Milan",48:"Napoli",52:"Roma",65:"LOSC",66:"Lyon",69:"Monaco",73:"Paris SG",74:"Stade Rennais",78:"Celtic",219:"Marseille",229:"Anderlecht",231:"Club Brugge",234:"Benfica",236:"FC Porto",237:"Sporting CP",240:"Atlético de Madrid",241:"FC Barcelona",243:"Real Madrid",245:"Ajax",246:"Feyenoord",247:"PSV",448:"Athletic Club",449:"Real Betis",457:"Real Sociedad",461:"Valencia",481:"Sevilla",483:"Villarreal",110374:"Fiorentina",112172:"RB Leipzig"},Fe={1:"Superliga",4:"Belgian Pro League",10:"Eredivisie",13:"Premier League",14:"Championship",16:"Ligue 1",19:"Bundesliga",20:"2. Bundesliga",31:"Serie A",39:"MLS",50:"Scottish Prem",53:"LaLiga",68:"Süper Lig",308:"Liga Portugal",350:"Saudi Pro League",2118:"Icons"},He={4:"Østrig",7:"Belgien",10:"Kroatien",13:"Danmark",14:"England",18:"Frankrig",21:"Tyskland",27:"Italien",34:"Holland",36:"Norge",37:"Polen",38:"Portugal",42:"Skotland",45:"Spanien",46:"Sverige",47:"Schweiz",50:"Wales",52:"Argentina",54:"Brasilien",56:"Colombia",60:"Uruguay",83:"Mexico",95:"USA",129:"Marokko",136:"Senegal",163:"Japan"},Se={club:["Klub",qe],league:["Liga",Fe],nation:["Nation",He]},fe={club:{},league:{},nation:{}};function Ce(n){for(let a of Object.keys(fe))fe[a]={...n?.[a]||{}}}function ie(n,a){return a==null?null:fe[n]?.[a]||Se[n]?.[1][a]||null}function X(n,a){return a==null?"":ie(n,a)||`${Se[n]?.[0]||""} #${a}`}var Me=n=>{let a=String(n||"").toUpperCase();return a==="LOWER"||a==="LESS"||a==="MAX"?"max":a==="EXACT"||a==="EQUAL"?"exact":"min"},Le={NATION_ID:"nation",LEAGUE_ID:"league",CLUB_ID:"club",PLAYER_RARITY:"rarity"},Ve={SAME_NATION_COUNT:"nation",SAME_LEAGUE_COUNT:"league",SAME_CLUB_COUNT:"club"},Ke={NATION_COUNT:"nation",LEAGUE_COUNT:"league",CLUB_COUNT:"club"},Be=new Set(["PLAYER_COUNT","PLAYER_COUNT_COMBINED"]),Ge={0:"min",1:"max",2:"exact"},Ye={nation:"nation",league:"liga",club:"klub",rarity:"sjældenhed"},$e={1:"bronze",2:"sølv",3:"guld"},Z={min:"min.",max:"maks.",exact:"præcis"};function ge(n=[]){let a=new Map;for(let e of n){let S=e.eligibilitySlot??Symbol("slot");a.has(S)||a.set(S,[]),a.get(S).push(e)}let u=[];for(let e of a.values()){let S=e.find(x=>x.type==="SCOPE"),m=S?Ge[Number(S.eligibilityValue)]||"min":null,p=e.find(x=>Be.has(x.type)),i=p?Number(p.eligibilityValue):e.find(x=>x.count!=null)?.count,g=m||(p?Me(p.scope):"min"),f=e.filter(x=>!Be.has(x.type)&&x.type!=="SCOPE");if(p&&!f.length)continue;let b=f.find(x=>Le[x.type])?.type;if(b){let x=Le[b],o=f.filter(l=>l.type===b).map(l=>Number(l.eligibilityValue)),s=i??1;u.push({kind:"count",filter:{field:x,values:o},op:g,n:s,desc:`${Z[g]} ${s} spiller(e) fra ${o.map(l=>x==="rarity"?`sjældenhed ${l}`:X(x,l)).join(" / ")}`});continue}for(let x of f){let o=Number(x.eligibilityValue),s=p?"exact":m||Me(x.scope);switch(x.type){case"TEAM_RATING":case"TEAM_RATING_1_TO_100":u.push({kind:"rating",op:s,n:o,desc:`Holdrating ${Z[s]} ${o}`});break;case"TEAM_CHEMISTRY":case"CHEMISTRY_POINTS":u.push({kind:"chem",op:s,n:o,desc:`Holdkemi ${Z[s]} ${o}`});break;case"ALL_PLAYERS_CHEMISTRY_POINTS":u.push({kind:"playerChem",n:o,desc:`Kemi pr. spiller min. ${o}`});break;case"PLAYER_LEVEL":case"PLAYER_QUALITY":{let l={level:o,op:s};i!=null?u.push({kind:"count",filter:l,op:g,n:i,desc:`${Z[g]} ${i} spiller(e) ${Z[s]} ${$e[o]||o}`}):u.push({kind:"perPlayer",filter:l,desc:`Alle spillere ${Z[s]} ${$e[o]||o}`});break}case"PLAYER_MIN_OVR":case"PLAYER_MAX_OVR":case"PLAYER_EXACT_OVR":{let l=x.type==="PLAYER_MIN_OVR"?"min":x.type==="PLAYER_MAX_OVR"?"max":"exact",w={ovr:o,op:l};i!=null?u.push({kind:"count",filter:w,op:g,n:i,desc:`${Z[g]} ${i} spiller(e) med rating ${Z[l]} ${o}`}):u.push({kind:"perPlayer",filter:w,desc:`Alle spillere rating ${Z[l]} ${o}`});break}case"PLAYER_RARITY_GROUP":{let l=i??1;u.push({kind:"count",filter:{rare:!0},op:g,n:l,desc:`${Z[g]} ${l} sjældne spiller(e) (antaget, gruppe ${o})`});break}case"SAME_NATION_COUNT":case"SAME_LEAGUE_COUNT":case"SAME_CLUB_COUNT":{let l=Ve[x.type];u.push({kind:"same",field:l,op:s,n:o,desc:`${Z[s]} ${o} spillere fra samme ${Ye[l]}`});break}case"NATION_COUNT":case"LEAGUE_COUNT":case"CLUB_COUNT":{let l=Ke[x.type],w={nation:"nationer",league:"ligaer",club:"klubber"}[l];u.push({kind:"distinct",field:l,op:s,n:o,desc:`Antal forskellige ${w}: ${Z[s]} ${o}`});break}default:u.push({kind:"unknown",raw:x,desc:`Ikke understøttet krav: ${x.type} = ${x.eligibilityValue} (${x.scope||""}) — tjek selv`})}}}return u}var Ee=(n,a,u)=>a==="max"?n<=u:a==="exact"?n===u:n>=u,oe=(n,a,u)=>a==="max"?Math.max(0,n-u):a==="exact"?Math.abs(n-u):Math.max(0,u-n);function ee(n,a){return a.field?a.values.includes(Number(n[a.field])):a.level!=null?Ee(ae(n.rating),a.op,a.level):a.ovr!=null?Ee(n.rating,a.op,a.ovr):a.rare?Number(n.rarity)!==0:!0}function Ie(n,a,u){return n.map(e=>{let S=null,m=0;switch(e.kind){case"rating":S=u.rating,m=oe(S,e.op,e.n)*3;break;case"chem":S=u.chem.total,m=oe(S,e.op,e.n);break;case"playerChem":S=Math.min(...u.chem.per),m=u.chem.per.reduce((p,i)=>p+Math.max(0,e.n-i),0);break;case"count":S=a.filter(p=>ee(p,e.filter)).length,m=oe(S,e.op,e.n);break;case"perPlayer":S=a.filter(p=>!ee(p,e.filter)).length,m=S;break;case"same":{let p=new Map;for(let i of a)i[e.field]!=null&&p.set(i[e.field],(p.get(i[e.field])||0)+1);S=p.size?Math.max(...p.values()):0,m=oe(S,e.op,e.n);break}case"distinct":{let p=new Set(a.map(g=>g[e.field]).filter(g=>g!=null)).size,i=a.filter(g=>g[e.field]==null).length;S=e.op==="min"?p:p+i,m=oe(S,e.op,e.n);break}default:return{c:e,ok:null,actual:null,gap:0}}return{c:e,ok:m===0,actual:S,gap:m}})}var Te={433:["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"],4231:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","CAM","ST"],442:["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"],4141:["GK","RB","CB","CB","LB","CDM","RM","CM","CM","LM","ST"],41212:["GK","RB","CB","CB","LB","CDM","RM","LM","CAM","ST","ST"],352:["GK","CB","CB","CB","CDM","CDM","RM","LM","CAM","ST","ST"],343:["GK","CB","CB","CB","RM","CM","CM","LM","RW","ST","LW"],532:["GK","RWB","CB","CB","CB","LWB","CM","CM","CM","ST","ST"],4321:["GK","RB","CB","CB","LB","CM","CM","CM","CAM","CAM","ST"],3142:["GK","CB","CB","CB","CDM","RM","CM","CM","LM","ST","ST"],3412:["GK","CB","CB","CB","RM","CM","CM","LM","CAM","ST","ST"],4411:["GK","RB","CB","CB","LB","RM","CM","CM","LM","CAM","ST"],451:["GK","RB","CB","CB","LB","RM","CM","CAM","CM","LM","ST"],4222:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","ST","ST"],541:["GK","RWB","CB","CB","CB","LWB","RM","CM","CM","LM","ST"]},Ae=2118;function Re(n){let a=String(n||"").replace(/[^0-9]/g,"");return Te[a]||Te[433]}var be=(n,[a,u,e])=>n>=e?3:n>=u?2:n>=a?1:0;function We(n,a,u=!1){let e=new Array(a.length).fill(-1),S=(g,f)=>u||(g.positions||[]).includes(a[f]),m=(g,f)=>{for(let b=0;b<a.length;b++)if(!(f[b]||!S(n[g],b))&&(f[b]=!0,e[b]===-1||m(e[b],f)))return e[b]=g,!0;return!1},p=n.map((g,f)=>f).sort((g,f)=>(n[g].positions?.length||0)-(n[f].positions?.length||0));for(let g of p)m(g,new Array(a.length).fill(!1));let i=new Array(n.length).fill(-1);return e.forEach((g,f)=>{g!==-1&&(i[g]=f)}),i}function _e(n,a,u=!1){let e=We(n,a,u),S=new Map,m=new Map,p=new Map,i=(f,b,x=1)=>{b!=null&&f.set(b,(f.get(b)||0)+x)};n.forEach((f,b)=>{if(e[b]===-1)return;let x=f.league===Ae;i(S,f.club),i(m,f.nation,x?2:1),x||i(p,f.league)});let g=n.map((f,b)=>{if(e[b]===-1)return 0;if(f.league===Ae)return 3;let x=be(S.get(f.club)||0,[2,5,7])+be(m.get(f.nation)||0,[2,5,8])+be(p.get(f.league)||0,[3,5,8]);return Math.min(3,x)});return{total:g.reduce((f,b)=>f+b,0),per:g,slotOf:e}}var Xe={maxRating:99,excludeSpecial:!0,onlyUntradeable:!1,tradeablePenalty:1.6,ignorePositions:!1,iterations:2e4,restarts:3,excludeIds:[],allowBuy:!1,maxBuys:4,seed:null},le=["club","league","nation"];function Je(n,a){let u=n.rating<75?.2+(n.rating-45)/100:Math.pow(1.35,n.rating-75);return Number(n.rarity)>1?u*=2.5:Number(n.rarity)===1&&(u*=1.15),n.untradeable||(u*=a.tradeablePenalty),n.inStorage&&a.preferStorage!==!1&&(u*=.4),u}var Qe=["GK","RB","CB","LB","RWB","LWB","CDM","CM","CAM","RM","LM","RW","LW","ST"],Ze=[60,65,70,75,77,79,80,81,82,83,84,85,86,87];function et(n){return(n<75?.3+(n-55)*.02:Math.pow(1.35,n-75))*2.2+2}var tt=25,nt=new Set([13,16,19,31,53]),at=new Set([1,5,9,10,11,18,21,22,44,45,47,48,73,240,241,243]);function ot(n){if(n.generic)return 0;let a=1;return n.required&&(a+=tt),n.club!=null&&at.has(Number(n.club))&&(a+=10),n.league!=null&&nt.has(Number(n.league))&&(a+=3),n.nation!=null&&(a+=.5),a}var re=(n,a)=>[...n.entries()].sort((u,e)=>e[1]-u[1]).slice(0,a).map(([u])=>u),te=(n,a)=>n.set(a,(n.get(a)||0)+1);function rt(n,a,u,e){let S=new Map,m=new Map,p=new Map,i=new Map,g=new Map;for(let h of n)h.club!=null&&te(S,h.club),h.nation!=null&&te(m,h.nation),h.club!=null&&h.league!=null&&h.nation!=null&&te(p,`${h.club}|${h.league}|${h.nation}`),h.league!=null&&h.nation!=null&&te(i,`${h.league}|${h.nation}`),h.club!=null&&h.league!=null&&te(g,`${h.club}|${h.league}`);let f=h=>{let r=null,c=0;for(let[y,v]of g){let[A,H]=y.split("|");Number(A)===Number(h)&&v>c&&(c=v,r=Number(H))}return r},b=h=>h==="null"?null:Number(h),x=new Map,o=h=>{let r=`${h.club}|${h.league}|${h.nation}`;x.has(r)||x.set(r,h)},s=new Set,l=new Map;for(let h of a){let r=h.filter;if(h.kind!=="count"||r?.field!=="club"||h.op==="max")continue;let c=r.values.map(Number);c.forEach(A=>s.add(A));let y=new Set(e.filter(A=>c.includes(Number(A.club))).map(se)).size,v=Math.max(0,h.n-y);if(v)for(let A of c)l.set(A,Math.max(l.get(A)||0,v))}for(let h of a){let r=h.filter;if(!(h.kind!=="count"||!r?.field))for(let c of r.values){if(r.field==="club"&&(l.has(Number(c))?o({club:c,league:f(c),nation:null,required:l.get(Number(c))}):s.has(Number(c))||o({club:c,league:f(c),nation:null})),r.field==="league"){o({club:null,league:c,nation:null});for(let[y]of[...i].filter(([v])=>b(v.split("|")[0])===c).sort((v,A)=>A[1]-v[1]).slice(0,3))o({club:null,league:c,nation:b(y.split("|")[1])})}if(r.field==="nation"){o({club:null,league:null,nation:c});for(let[y]of[...i].filter(([v])=>b(v.split("|")[1])===c).sort((v,A)=>A[1]-v[1]).slice(0,3))o({club:null,league:b(y.split("|")[0]),nation:c})}}}let w=h=>!s.has(Number(h));for(let h of re(p,40)){let[r,c,y]=h.split("|").map(b);w(r)&&o({club:r,league:c,nation:y})}for(let h of re(S,14))w(h)&&o({club:h,league:f(h),nation:null});for(let h of re(i,20)){let[r,c]=h.split("|").map(b);o({club:null,league:r,nation:c})}for(let h of re(m,8))o({club:null,league:null,nation:h});o({club:null,league:null,nation:null,generic:!0});let R=a.some(h=>h.kind==="count"&&(h.filter?.rare||h.filter?.field==="rarity")),J=[],K=0;for(let h of x.values())for(let r of Ze)for(let c of R&&(h.generic||h.club!=null)?[0,1]:[0]){let y={id:`buy-${K++}`,placeholder:!0,rating:r,rarity:c,untradeable:!1,club:h.club,league:h.league,nation:h.nation,positions:Qe,requiredClub:!!h.required,maxUses:h.required||null,generic:!!h.generic};u.every(v=>ee(y,v.filter))&&J.push({p:y,cost:(et(r)+ot(h))*(c?1.3:1)})}return J}function st(n){if(n==null)return Math.random;let a=n>>>0;return()=>(a=a*1664525+1013904223>>>0)/4294967296}var se=n=>String(n.assetId??n.resourceId??n.id),it=15;function Oe(n,a,u={}){let e={...Xe,...u},S=st(e.seed),m=Re(e.formation),p=m.length,i=a.filter(r=>r.kind==="perPlayer"),g=a.filter(r=>r.kind!=="perPlayer"&&r.kind!=="unknown"),f=new Set(e.excludeIds.map(String)),b=new Map;for(let r of n){if(r.loan||f.has(String(r.id))||r.rating>e.maxRating||e.excludeSpecial&&Number(r.rarity)>1||e.onlyUntradeable&&!r.untradeable||!i.every(v=>ee(r,v.filter)))continue;let c=Je(r,e),y=se(r);(!b.has(y)||b.get(y).cost>c)&&b.set(y,{p:r,cost:c})}let x=[...b.values()],o=e.allowBuy&&e.maxBuys>0?rt(n,g,i,x.map(r=>r.p)):[],s=[...x,...o];if(x.length<p&&!o.length)return{feasible:!1,error:`Kun ${x.length} brugbare spillere fundet (skal bruge ${p}). Bladr mere i klubben, løsn filtrene eller slå køb til.`};let l={slots:m,soft:g,opt:e,rand:S,size:p},w=me(s,l,e.iterations,e.restarts),R=lt(x,o,g);if(R.length){let r=Math.max(3e3,Math.round(e.iterations/3));for(let c of R){let y=s.filter(A=>c.every(([H,k])=>A.p[H]!=null&&k.has(A.p[H])));if(y.length<2||y.filter(A=>!A.p.placeholder).length<p&&!y.some(A=>A.p.placeholder))continue;let v=me(y,l,r,1);v&&Ne(v,w)&&(w=v)}}for(let r=0;r<3&&w&&w.s.viol>0;r++){let c=me(s,l,e.iterations,2);c&&Ne(c,w)&&(w=c)}if(!w)return{feasible:!1,error:"Kunne ikke sætte et hold sammen. Bladr mere i klubben eller slå køb til."};let{players:J,s:K}=w;return{overBuyLimit:J.filter(r=>r.placeholder).length>e.maxBuys,buyLimit:e.maxBuys,feasible:K.viol===0,violation:K.viol,rating:K.rating,chem:K.chem.total,cost:Math.round(K.cost*10)/10,buys:J.filter(r=>r.placeholder).length,slots:m,squad:J.map((r,c)=>({player:r,slotIndex:K.chem.slotOf[c],slot:K.chem.slotOf[c]>=0?m[K.chem.slotOf[c]]:"—",chem:K.chem.per[c]})),checks:[...K.res,...a.filter(r=>r.kind==="perPlayer").map(r=>({c:r,ok:!0,actual:null})),...a.filter(r=>r.kind==="unknown").map(r=>({c:r,ok:null,actual:null}))],candidates:s.length}}var Ne=(n,a)=>a?n?n.s.viol===0!=(a.s.viol===0)?n.s.viol===0:n.s.viol===0?n.s.cost<a.s.cost:n.s.total<a.s.total:!1:!0;function lt(n,a,u){let e=u.filter(i=>i.kind==="distinct"&&i.op!=="min"&&i.n<=5&&le.includes(i.field));if(!e.length)return[];let S=[];for(let i of e){let g=new Map;for(let{p:s}of n)s[i.field]!=null&&te(g,s[i.field]);for(let{p:s}of a)s[i.field]!=null&&!g.has(s[i.field])&&g.set(s[i.field],.5);let f=re(g,i.n<=2?8:7),b=Math.min(i.n,f.length),x=[],o=(s,l)=>{if(l.length===b){x.push(l.slice());return}for(let w=s;w<f.length;w++)l.push(f[w]),o(w+1,l),l.pop()};o(0,[]),S.push(x.map(s=>[i.field,new Set(s)]))}let m=[[]];for(let i of S){let g=[];for(let f of m)for(let b of i)g.push([...f,b]);m=g}let p=i=>n.filter(({p:g})=>i.every(([f,b])=>b.has(g[f]))).length;return m.map(i=>({combo:i,n:p(i)})).sort((i,g)=>g.n-i.n).slice(0,14).map(i=>i.combo)}function me(n,a,u,e){let{slots:S,soft:m,opt:p,rand:i,size:g}=a;if(!n.length)return null;let f=k=>k&&k.length?k[Math.floor(i()*k.length)]:void 0,b=new Map,x=new Map,o={club:new Map,league:new Map,nation:new Map};n.forEach((k,M)=>{b.has(k.p.rating)||b.set(k.p.rating,[]),b.get(k.p.rating).push(M);for(let I of k.p.positions||[])x.has(I)||x.set(I,[]),x.get(I).push(M);for(let I of le){let O=o[I];O.has(k.p[I])||O.set(k.p[I],[]),O.get(k.p[I]).push(M)}});let s=n.map((k,M)=>M).sort((k,M)=>n[k].cost-n[M].cost),l=s.slice(0,Math.min(s.length,250)),w=new Map;for(let k of m)k.kind==="count"&&k.filter&&w.set(k,n.map((M,I)=>ee(M.p,k.filter)?I:-1).filter(M=>M>=0));let R=(k,M=l,I=40)=>{for(let O=0;O<I;O++){let U=M[Math.floor(i()*M.length)];if(U!==void 0&&k(n[U].p))return U}for(let O=0;O<I;O++){let U=s[Math.floor(i()*s.length)];if(k(n[U].p))return U}},J=120,K=k=>{let M=k.map(_=>n[_].p),I=ke(M.map(_=>_.rating)),O=_e(M,S,p.ignorePositions),U=Ie(m,M,{rating:I,chem:O}),T=0,P=new Map;for(let _ of k)n[_].p.placeholder&&(T++,te(P,_));let D=0;for(let[_,G]of P){let Y=n[_].p.maxUses;Y&&G>Y&&(D+=(G-Y)*2)}let j=O.slotOf.filter(_=>_<0).length,F=U.reduce((_,G)=>_+G.gap,0)+D,N=k.reduce((_,G)=>_+n[G].cost,0)+Math.max(0,T-p.maxBuys)*it;return{total:N+J*F+j*2,viol:F,cost:N,rating:I,chem:O,res:U}},h=(k,M,I)=>{if(n[I].p.placeholder)return!1;let O=se(n[I].p);return k.some((U,T)=>T!==M&&!n[U].p.placeholder&&se(n[U].p)===O)},r=(k,M)=>{let I=new Map;return k.forEach((O,U)=>{let T=O[M];I.has(T)||I.set(T,[]),I.get(T).push(U)}),I},c=(k,M,I)=>{let O=M.map(T=>n[T].p),U=k.c;switch(U.kind){case"rating":{if(k.actual>=U.n)return null;let T=O.map((j,F)=>F).sort((j,F)=>O[j].rating-O[F].rating),P=T[Math.floor(i()*Math.min(4,T.length))],D=O[P].rating+1+Math.floor(i()*5);return[P,f(b.get(D))??R(j=>j.rating>=D)]}case"chem":case"playerChem":{let T=I.chem.per,P=T.map((_,G)=>G).sort((_,G)=>T[_]-T[G]),D=P[Math.floor(i()*Math.min(3,P.length))],j=le[Math.floor(i()*3)],F=[...r(O,j).entries()].filter(([_])=>_!=null).sort((_,G)=>G[1].length-_[1].length);if(!F.length)return null;let N=F[Math.floor(i()*Math.min(2,F.length))][0];return[D,f(o[j].get(N))]}case"count":{let T=w.get(U)||[],P=O.map(j=>ee(j,U.filter));if(k.actual<U.n){let j=P.map((F,N)=>F?-1:N).filter(F=>F>=0);return j.length?[f(j),f(T)]:null}let D=P.map((j,F)=>j?F:-1).filter(j=>j>=0);return D.length?[f(D),R(j=>!ee(j,U.filter))]:null}case"same":{let T=U.field,P=[...r(O,T).entries()].filter(([N])=>N!=null).sort((N,_)=>_[1].length-N[1].length);if(!P.length)return null;let[D,j]=P[0];if(k.actual<U.n){let N=O.map((_,G)=>_[T]!==D?G:-1).filter(_=>_>=0);return N.length?[f(N),f(o[T].get(D))]:null}let F=new Set(P.map(([N])=>N).filter(N=>N!==D));return[f(j),R(N=>N[T]!=null&&N[T]!==D&&(F.size===0||F.has(N[T])||i()<.3))]}case"distinct":{let T=U.field,P=r(O,T),D=[...P.entries()].filter(([N])=>N!=null).sort((N,_)=>N[1].length-_[1].length);if(k.actual>U.n){let N=P.get(null)||P.get(void 0)||[],_=N.length?N:D[0]?.[1];if(!_?.length)return null;let G=D.filter(([,Q])=>Q!==_).map(([Q])=>Q);if(!G.length)return null;let Y=G[G.length-1-Math.floor(i()*Math.min(2,G.length))];return[f(_),f(o[T].get(Y))]}let j=D[D.length-1];if(!j)return null;let F=new Set(D.map(([N])=>N));return[f(j[1]),R(N=>N[T]!=null&&!F.has(N[T]))]}default:return null}},y=k=>{let M=[],I=new Set,O=k===0?s:s.slice(0,80).sort(()=>i()-.5).concat(s);for(let T of O){if(M.length>=g)break;let P=n[T].p;if(!P.placeholder){let D=se(P);if(I.has(D))continue;I.add(D)}M.push(T)}let U=s.filter(T=>n[T].p.placeholder);for(;M.length<g&&U.length;)M.push(f(U));return M.length===g?M:null},v=null,A=null;for(let k=0;k<e;k++){let M=y(k);if(!M)return null;let I=K(M);I.viol===0&&(!v||I.cost<v.s.cost)&&(v={idx:[...M],s:I});for(let O=0;O<u;O++){let U=6*Math.pow(.0015,O/u),T=Math.floor(i()*g),P,D=i(),j=I.res.filter(Y=>Y.gap>0),F=I.chem.slotOf.map((Y,Q)=>Y<0?Q:-1).filter(Y=>Y>=0);if(j.length&&D<.55){let Y=c(f(j),M,I);if(!Y||Y[1]===void 0)continue;[T,P]=Y}else if(F.length&&!p.ignorePositions&&D<.65){let Y=new Set(I.chem.slotOf.filter(ne=>ne>=0)),Q=S.map((ne,ce)=>Y.has(ce)?null:ne).filter(Boolean);T=f(F),P=f(x.get(f(Q)))}else if(D<.78){let Y=n[M[T]].p.rating+(i()<.5?-1:1)*(1+Math.floor(i()*3));P=f(b.get(Y))??f(l)}else if(D<.92){let Y=n[M[Math.floor(i()*g)]].p,Q=le[Math.floor(i()*3)];P=f(o[Q].get(Y[Q]))}else P=f(l);if(P===void 0)continue;let N=M[T];if(P===N||h(M,T,P))continue;M[T]=P;let _=K(M),G=_.total-I.total;G<=0||i()<Math.exp(-G/U)?(I=_,_.viol===0&&(!v||_.cost<v.s.cost)&&(v={idx:[...M],s:_})):M[T]=N}(!A||I.total<A.s.total)&&(A={idx:[...M],s:I})}let H=v||A;return{players:H.idx.map(k=>n[k].p),s:H.s}}var V=n=>String(n??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]);async function ze(n,a,u={}){let e=t=>n.getElementById(t);if(u.version){let t=n.querySelector(".title");t&&t.insertAdjacentHTML("beforeend",`<small class="ver">v${V(u.version)}</small>`)}let S={formation:"",maxRating:88,excludeSpecial:!0,onlyUntradeable:!1,preferStorage:!0,ignorePositions:!1,mode:"sbc",challengeId:"",view:"pitch",allowBuy:!0,maxBuys:4},m={club:{},sets:{},challenges:{},names:{},samples:{},lastUpdate:0},p={...S},i=null,g=new Set;async function f(){let t=await a.get(["club","sets","challenges","names","samples","lastUpdate","settings","labels"]);m={...m,...t},Ce(m.labels),p={...S,...t.settings||{}}}let b=()=>a.set({settings:p}),x=()=>Object.values(m.club||{}).filter(t=>t&&t.id&&t.id!=="0"&&t.rating>0),o=t=>m.names?.[t.assetId]||`Spiller #${t.assetId??t.id}`,s=t=>{let d=m.names?.[t.assetId];if(!d)return`#${t.assetId??t.id}`;let $=d.split(" ");return $.length>1?$[$.length-1]:d},l=t=>Number(t.rarity)>1?"lv-special":["","lv-bronze","lv-silver","lv-gold"][ae(t.rating)],w;function R(t){let d=e("toast");d.textContent=t,d.hidden=!1,clearTimeout(w),w=setTimeout(()=>{d.hidden=!0},2200)}function J(){let t=x(),d=t.filter(B=>B.untradeable).length,$=t.filter(B=>B.inStorage).length,L=Object.keys(m.challenges||{}).length;e("stats").innerHTML=[`<span class="stat"><b>${t.length}</b>spillere</span>`,`<span class="stat"><b>${d}</b>UT</span>`,`<span class="stat"><b>${$}</b>opbevaring</span>`,`<span class="stat"><b>${L}</b>SBC'er</span>`].join(""),K(),e("onboarding").hidden=t.length>0}function K(){let t=e("liveState"),d=m.lastUpdate?Math.round((Date.now()-m.lastUpdate)/1e3):null,$=d!=null&&d<120;t.classList.toggle("live",$),t.innerHTML=`<span class="dot"></span>${d==null?"Venter på web-appen":$?`Forbundet · opdateret for ${d<5?"lige":d+" s"} siden`:`Sidst opdateret ${new Date(m.lastUpdate).toLocaleTimeString("da-DK",{hour:"2-digit",minute:"2-digit"})}`}`}setInterval(K,1e4),n.querySelectorAll(".tab").forEach(t=>{t.onclick=()=>{n.querySelectorAll(".tab").forEach(d=>d.classList.toggle("active",d===t)),n.querySelectorAll(".view").forEach(d=>d.classList.toggle("active",d.id===`view-${t.dataset.tab}`)),e("dock").hidden=t.dataset.tab!=="solve",t.dataset.tab==="club"&&Q()}});function h(t){p.mode=t,n.querySelectorAll("#modeSeg button").forEach(d=>d.classList.toggle("on",d.dataset.mode===t)),e("sbcPicker").hidden=t!=="sbc",e("manualForm").hidden=t!=="manual",H()}n.querySelectorAll("#modeSeg button").forEach(t=>{t.onclick=()=>{h(t.dataset.mode),b()}});function r(){let t=m.challenges?.[p.challengeId],d=t&&m.sets?.[t.setId];e("pickerLabel").className=t?"":"muted",e("pickerLabel").innerHTML=t?`<span class="name">${V(t.name)}</span><span class="set">${V(d?.name||`Sæt ${t.setId}`)}</span>`:Object.keys(m.challenges||{}).length?"Vælg en SBC…":"Ingen SBC'er fanget endnu – åbn SBC i web-appen"}function c(){let t=e("sbcSearch").value.trim().toLowerCase(),d=new Map;for(let L of Object.values(m.challenges||{})){let B=m.sets?.[L.setId]?.name||`Sæt ${L.setId}`;t&&!`${B} ${L.name}`.toLowerCase().includes(t)||(d.has(B)||d.set(B,[]),d.get(B).push(L))}let $=e("sbcList");if(!d.size){$.innerHTML=`<div class="none">Ingen SBC'er matcher</div>`;return}$.innerHTML="";for(let[L,B]of d){let q=document.createElement("div");q.className="group-title",q.textContent=L,$.appendChild(q);for(let z of B.sort((E,C)=>E.challengeId-C.challengeId)){let E=z.status==="COMPLETED",C=ge(z.elgReq).length,W=document.createElement("button");W.className=`item${String(z.challengeId)===String(p.challengeId)?" sel":""}`,W.innerHTML=`<span>${V(z.name)}</span><span class="badge${E?" done":""}">${E?"Fuldført":`${C} krav`}</span>`,W.onclick=()=>{p.challengeId=String(z.challengeId),g.clear(),i=null,e("result").hidden=!0,b(),v(),r(),H()},$.appendChild(W)}}}function y(){e("dropdown").hidden=!1,e("sbcSearch").value="",c(),u.touch||e("sbcSearch").focus()}function v(){e("dropdown").hidden=!0}e("pickerBtn").onclick=t=>{t.stopPropagation(),e("dropdown").hidden?y():v()},e("sbcSearch").oninput=c,e("dropdown").onclick=t=>t.stopPropagation(),n.addEventListener("click",v),n.addEventListener("keydown",t=>{t.key==="Escape"&&v()});function A(){if(p.mode==="sbc"){let L=m.challenges?.[p.challengeId];return L?{constraints:ge(L.elgReq),formation:L.formation}:{constraints:[],formation:null}}let t=[],d=Number(e("mRating").value),$=Number(e("mChem").value);return d>0&&t.push({kind:"rating",op:"min",n:d,desc:`Holdrating min. ${d}`}),$>0&&t.push({kind:"chem",op:"min",n:$,desc:`Holdkemi min. ${$}`}),{constraints:t,formation:null}}function H(t){let d=e("reqChips"),$=t||A().constraints.map(L=>({c:L,ok:L.kind==="unknown"?null:void 0}));if(!$.length){d.innerHTML=`<span class="muted small">${p.mode==="sbc"?"Vælg en SBC for at se kravene.":"Angiv rating og/eller kemi."}</span>`;return}d.innerHTML=$.map(({c:L,ok:B,actual:q})=>{let z=B===!0?"ok":B===!1?"bad":B===null?"warn":"",E=B===!0?"✓":B===!1?"✗":B===null?"!":"•",C=q!=null&&B!==void 0?`<span class="act">${V(q)}</span>`:"";return`<span class="chip ${z}" title="${V(L.desc)}"><i>${E}</i>${V(L.desc)}${C}</span>`}).join("")}e("mRating").oninput=()=>H(),e("mChem").oninput=()=>H();async function k(){let{constraints:t,formation:d}=A();if(!t.length){R(p.mode==="sbc"?"Vælg en SBC først":"Angiv mindst ét krav");return}if(!x().length){R("Ingen spillere fanget endnu");return}let $=e("solve");$.disabled=!0,$.querySelector(".spinner").hidden=!1,$.querySelector(".lbl").textContent="Løser…",await new Promise(L=>setTimeout(L,30));try{i=Oe(x(),t,{formation:p.formation||d,maxRating:p.maxRating,excludeSpecial:p.excludeSpecial,onlyUntradeable:p.onlyUntradeable,preferStorage:p.preferStorage,ignorePositions:p.ignorePositions,allowBuy:p.allowBuy,maxBuys:Number(p.maxBuys)||0,excludeIds:[...g]}),N()}finally{$.disabled=!1,$.querySelector(".spinner").hidden=!0,$.querySelector(".lbl").textContent=i?"Løs igen":"Løs SBC"}}e("solve").onclick=k;let M={ST:12,CF:12,RW:18,LW:18,CAM:34,RM:48,LM:48,CM:48,CDM:62,RWB:70,LWB:70,RB:77,LB:77,CB:77,GK:90},I=t=>/^L/.test(t)?-1:/^R/.test(t)?1:0;function O(t){let d=[...new Set(t.map(q=>M[q]??50))].sort((q,z)=>q-z),$=q=>{let z=d.indexOf(M[q]??50);return d.length===1?50:11+78*z/(d.length-1)},L=new Array(t.length),B=new Map;t.forEach((q,z)=>{let E=$(q);if(I(q)!==0){L[z]={x:I(q)<0?11:89,y:E};return}B.has(E)||B.set(E,[]),B.get(E).push(z)});for(let[q,z]of B){let E=z.length,C=Math.min(24,12*(E-1));z.forEach((W,De)=>{L[W]={x:E===1?50:50-C+2*C*De/(E-1),y:q}})}return L}function U(t){let d=ie("club",t);if(d)return d;let $=x().filter(L=>String(L.club)===String(t)&&m.names?.[L.assetId]).sort((L,B)=>B.rating-L.rating).slice(0,2).map(o);return $.length?`Samme klub som ${$.join(" og ")}`:X("club",t)}function T(t){return t.generic?"Valgfri klub":t.club!=null?U(t.club):t.league!=null?X("league",t.league):t.nation!=null?X("nation",t.nation):"Valgfri"}function P(t){if(t.club!=null&&!t.generic&&!ie("club",t.club)){let d=x().filter($=>String($.club)===String(t.club)&&m.names?.[$.assetId]).sort(($,L)=>L.rating-$.rating)[0];if(d)return`som ${s(d)}`}return T(t)}let D=(t,d=11)=>t.length>d?`${t.slice(0,d-1)}…`:t;function j(t){let d=t.player;if(d.placeholder){let B=[0,1,2].map(q=>`<s class="${q<t.chem?"on":""}"></s>`).join("");return`<span class="tags"><span class="tag buy">KØB</span></span><span class="ovr">${d.rating}+</span><span class="pos">${V(t.slot)}</span><span class="nm">${V(D(P(d)))}</span><span class="chem">${B}</span>`}let $=[0,1,2].map(B=>`<s class="${B<t.chem?"on":""}"></s>`).join("");return`<span class="tags">${[d.untradeable?'<span class="tag ut">UT</span>':"",d.inStorage?'<span class="tag st">OPB</span>':""].join("")}</span><span class="ovr">${d.rating}</span><span class="pos">${V(t.slot)}</span><span class="nm">${V(s(d))}</span><span class="chem">${$}</span>`}function F(t){g.add(String(t.id)),R(`${o(t)} udelukket – løser igen`),k()}function N(){let t=i;e("result").hidden=!1,e("resetExcl").hidden=g.size===0,e("exclCount").textContent=g.size;let d=e("verdict");if(t.error){e("rRating").textContent="–",e("rChem").textContent="–",e("rCost").textContent="–",d.className="verdict bad",d.textContent=t.error,e("pitch").innerHTML="",e("plist").innerHTML="",e("bench").hidden=!0,H();return}e("rRating").textContent=t.rating,e("rChem").textContent=t.chem,e("rCost").textContent=Math.round(t.cost),d.className=`verdict ${t.feasible?"ok":"bad"}`,d.textContent=t.feasible?t.overBuyLimit?`Løst med ${11-t.buys} fra klubben + ${t.buys} køb (mere end dit maks. på ${t.buyLimit})`:t.buys?`Løst med ${11-t.buys} fra klubben + ${t.buys} køb`:"Løst kun med spillere fra klubben":"Ingen gyldig løsning – tætteste bud vises",H(t.checks),_(t);let $=e("pitch");$.innerHTML='<div class="circle"></div>';let L=O(t.slots),B=[];for(let E of t.squad){if(E.slotIndex<0){B.push(E);continue}let C=document.createElement("button");C.className=`pcard ${l(E.player)}`,C.style.left=`${L[E.slotIndex].x}%`,C.style.top=`${L[E.slotIndex].y}%`,E.player.placeholder?(C.className="pcard buy",C.title=`Køb: ${T(E.player)}, rating ${E.player.rating}+, position ${E.slot}`):(C.title=`${o(E.player)} · ${E.player.rating} · ${X("club",E.player.club)} · ${X("league",E.player.league)} · ${X("nation",E.player.nation)}`,C.onclick=()=>F(E.player)),C.innerHTML=j(E),$.appendChild(C)}let q=e("bench");q.innerHTML=B.length?'<div class="bench-title">Uden passende position (0 kemi):</div>':"";for(let E of B){let C=document.createElement("button");C.className=`pcard ${l(E.player)}`,C.innerHTML=j(E),C.onclick=()=>F(E.player),q.appendChild(C)}let z=e("plist");z.innerHTML="";for(let E of[...t.squad].sort((C,W)=>W.player.rating-C.player.rating)){if(E.player.placeholder){let W=document.createElement("div");W.className="prow",W.innerHTML=`<span class="ov buyov">${E.player.rating}+</span><span class="meta"><b>Køb: ${V(T(E.player))}</b><span>${V(E.slot)} · se indkøbslisten</span></span><span class="pp">${V(E.slot)}</span><span class="chemtxt">${E.chem}/3</span>`,z.appendChild(W);continue}let C=document.createElement("button");C.className="prow",C.title="Udeluk og løs igen",C.innerHTML=G(E.player,`<span class="pp">${V(E.slot)}</span><span class="chemtxt">${E.chem}/3</span>`),C.onclick=()=>F(E.player),z.appendChild(C)}Y()}function _(t){let d=(t.squad||[]).filter(L=>L.player.placeholder);if(e("shop").hidden=!d.length,!d.length)return;e("shopCount").textContent=`${d.length} spiller${d.length>1?"e":""}`;let $=[];for(let L of A().constraints){if(L.kind!=="same"||L.op!=="max")continue;let B=new Map;for(let q of t.squad){let z=q.player[L.field];z!=null&&B.set(z,(B.get(z)||0)+1)}for(let[q,z]of B)z>=L.n&&$.push(X(L.field,q))}e("shopList").innerHTML=d.sort((L,B)=>B.player.rating-L.player.rating).map(L=>{let B=L.player,q=B.generic?'Hvilken som helst spiller <span class="sub2">· billigst fra en mindre liga</span>':B.club!=null?`${V(U(B.club))}${B.league!=null?` <span class="sub2">· ${V(X("league",B.league))}</span>`:""}`:V(T(B)),z=B.nation!=null?`Nation: <b>${V(X("nation",B.nation))}</b>`:$.length?`Ikke fra: ${V($.join(", "))}`:"Valgfri nation",E=B.requiredClub?`Krævet af SBC'en – du ejer ingen · ${z}`:B.generic?`Kun rating tæller · ${z}`:z;return`<div class="shoprow"><span class="pp">${V(L.slot)}</span><span><b>${q}</b><span class="sub2">${E}</span></span><span class="rt">${B.rating}+</span></div>`}).join("")}function G(t,d){let $=(t.untradeable?'<span class="flag ut">UT</span>':"")+(t.inStorage?'<span class="flag st">OPB</span>':"");return`<span class="ov ${l(t)}">${t.rating}</span>
      <span class="meta"><b>${V(o(t))}${$}</b><span>${V((t.positions||[]).join(" · "))} · ${V(X("club",t.club))} · ${V(X("league",t.league))} · ${V(X("nation",t.nation))}</span></span>
      ${d}`}function Y(){n.querySelectorAll("#viewSeg button").forEach(d=>d.classList.toggle("on",d.dataset.view===p.view));let t=p.view==="pitch";e("pitch").hidden=!t,e("bench").hidden=!t||!e("bench").children.length,e("plist").hidden=t}n.querySelectorAll("#viewSeg button").forEach(t=>{t.onclick=()=>{p.view=t.dataset.view,b(),Y()}}),e("resetExcl").onclick=()=>{g.clear(),k()};function Q(){let t=x(),d={gold:0,silver:0,bronze:0,special:0};for(let C of t)Number(C.rarity)>1?d.special++:d[["","bronze","silver","gold"][ae(C.rating)]]++;e("levels").innerHTML=[["gold","Guld"],["silver","Sølv"],["bronze","Bronze"],["special","Special"]].map(([C,W])=>`<div class="lvl lv-${C}"><b>${d[C]}</b><small>${W}</small></div>`).join("");let $=e("clubSearch").value.trim().toLowerCase(),L=t.filter(C=>e("fUT").checked&&!C.untradeable||e("fStorage").checked&&!C.inStorage||e("fSpecial").checked&&!(Number(C.rarity)>1)?!1:$?`${o(C)} ${C.rating} ${X("league",C.league)} ${X("nation",C.nation)} ${X("club",C.club)} ${(C.positions||[]).join(" ")}`.toLowerCase().includes($):!0),B=e("clubSort").value,q={"rating-desc":(C,W)=>W.rating-C.rating,"rating-asc":(C,W)=>C.rating-W.rating,league:(C,W)=>C.league-W.league||W.rating-C.rating,nation:(C,W)=>C.nation-W.nation||W.rating-C.rating}[B];L.sort(q);let z=150,E=e("clubList");E.innerHTML=L.length?L.slice(0,z).map(C=>`<div class="prow">${G(C,"<span></span><span></span>")}</div>`).join(""):'<div class="empty center muted">Ingen spillere matcher.</div>',e("clubMore").textContent=L.length>z?`Viser ${z} af ${L.length} – søg for at indsnævre`:""}["clubSearch","clubSort","fUT","fStorage","fSpecial"].forEach(t=>{e(t).addEventListener("input",Q)});function ne(){e("formation").value=p.formation,e("maxRating").value=p.maxRating,e("maxRatingVal").textContent=p.maxRating;for(let t of["excludeSpecial","onlyUntradeable","preferStorage","ignorePositions"])e(t).checked=p[t],e(t).onchange=()=>{p[t]=e(t).checked,b()};e("formation").onchange=()=>{p.formation=e("formation").value,b()},e("allowBuy").checked=p.allowBuy,e("maxBuys").value=String(p.maxBuys),e("maxBuysWrap").hidden=!p.allowBuy,e("allowBuy").onchange=()=>{p.allowBuy=e("allowBuy").checked,e("maxBuysWrap").hidden=!p.allowBuy,b()},e("maxBuys").onchange=()=>{p.maxBuys=Number(e("maxBuys").value),b()},e("maxRating").oninput=()=>{p.maxRating=Number(e("maxRating").value),e("maxRatingVal").textContent=p.maxRating},e("maxRating").onchange=b}function ce(){let t=x().length,d=Object.keys(m.names||{}).length;e("dataInfo").textContent=`${t} spillere og ${Object.keys(m.challenges||{}).length} SBC-udfordringer gemt lokalt. ${d?`${d} spillernavne kendt.`:"Ingen spillernavne endnu (vises som #ID)."}${u.version?` Version ${u.version}.`:""}`}e("clearClub").onclick=async()=>{confirm("Slet alle gemte spillere? Bladr klubben igennem igen bagefter.")&&(await a.set({club:{}}),m.club={},g.clear(),de(),R("Klubdata ryddet"))},e("exportDebug").onclick=()=>{let t=new Blob([JSON.stringify({samples:m.samples,challenges:m.challenges,labels:m.labels},null,2)],{type:"application/json"}),d=document.createElement("a");d.href=URL.createObjectURL(t),d.download="fc27-sbc-debug.json",d.click()};function de(){J(),r(),e("dropdown").hidden||c(),ce(),i||H(),e("view-club").classList.contains("active")&&Q()}a.watch(async()=>{await f(),de()}),await f(),ne(),h(p.mode),de()}var Pe=`<!doctype html>
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
`;var Ue=`:root {
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
`;(()=>{if(window.__fc27sbc){window.__fc27sbc.toggle();return}he(ye);let n,a,u=!1,e=!1;function S(){return`${Ue.replace(/@media \(prefers-color-scheme: light\) \{[\s\S]*?\n\}\n/,"").replace(/:root\[data-theme="dark"\][^\n]*\n/,"").replace(":root {",":host {").replace("html, body { margin: 0; }","").replace(/(^|\n)body \{/,"$1.app {")}
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
`}function m(){let b=new DOMParser().parseFromString(Pe,"text/html");return b.querySelectorAll("script").forEach(x=>x.remove()),b.body.innerHTML}async function p(){u||(u=!0,n=document.createElement("div"),n.id="fc27-sbc-host",a=n.attachShadow({mode:"open"}),a.innerHTML=`<style>${S()}</style>
      <button class="fab" id="fc27Fab" aria-label="Åbn SBC Solver">SBC</button>
      <div class="app closed" id="fc27App"><button class="close" id="fc27Close" aria-label="Luk">✕</button>${m()}</div>`,document.documentElement.appendChild(n),a.getElementById("fc27Fab").onclick=()=>g(!0),a.getElementById("fc27Close").onclick=()=>g(!1),i(a.getElementById("fc27Fab")),await ze(a,we,{touch:!0,version:xe}))}function i(b){let x=0,o=0,s=!1;try{let l=Number(localStorage.getItem("fc27sbc:fabBottom"));l>0&&(b.style.bottom=`${l}px`)}catch{}b.addEventListener("pointerdown",l=>{x=l.clientY,o=parseFloat(getComputedStyle(b).bottom),s=!1,b.setPointerCapture(l.pointerId)}),b.addEventListener("pointermove",l=>{if(!b.hasPointerCapture(l.pointerId))return;let w=x-l.clientY;Math.abs(w)>6&&(s=!0),s&&(b.style.bottom=`${Math.max(10,Math.min(window.innerHeight-70,o+w))}px`)}),b.addEventListener("pointerup",()=>{if(s){try{localStorage.setItem("fc27sbc:fabBottom",String(parseFloat(b.style.bottom)))}catch{}b.addEventListener("click",l=>l.stopImmediatePropagation(),{once:!0,capture:!0})}})}async function g(b){await p(),e=b,a.getElementById("fc27App").classList.toggle("closed",!e),a.getElementById("fc27Fab").classList.toggle("hide",e)}window.__fc27sbc={open:()=>g(!0),close:()=>g(!1),toggle:()=>g(!e)};let f=()=>window.__fc27sbcOpen?g(!0):p();document.body?f():document.addEventListener("DOMContentLoaded",f,{once:!0})})();})();
