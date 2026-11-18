(()=>{function pe(o){(()=>{if(window.__fc27SbcHooked)return;window.__fc27SbcHooked=!0;let n=/\/ut\/game\/[^/?]+\/(club|sbs\/|purchased\/items|storagepile)|players\.json/i,g=(b,h)=>{try{window.postMessage({__fc27sbc:!0,url:String(b),body:h},window.location.origin)}catch{}},e={club:new Set,league:new Set,nation:new Set},f={club:new Set,league:new Set,nation:new Set},u=[2027,2026,2025],i={club:b=>u.flatMap(h=>[`global.teamFull.${h}.team${b}`,`global.teamabbr15.${h}.team${b}`]).concat([`global.teamFull.team${b}`,`global.teamabbr15.team${b}`]),league:b=>u.flatMap(h=>[`global.leagueFull.${h}.league${b}`,`global.leagueabbr15.${h}.league${b}`]).concat([`global.leagueFull.league${b}`]),nation:b=>[`search.nationName.nation${b}`,`global.nationFull.nation${b}`,`global.nationName.nation${b}`]},S={club:/team(full|abbr15|name)/i,league:/league(full|abbr15|name)/i,nation:/nation(full|name)/i},x=null;function y(){if(x)return x;let b=window.services&&window.services.Localization;if(!b)return null;let h=new Set,w=(I,c)=>{if(!I||typeof I!="object"||h.has(I)||c>3)return null;h.add(I);let $;try{$=Object.keys(I)}catch{return null}if($.length>2e3&&$.slice(0,50).filter(E=>E.includes(".")&&typeof I[E]=="string").length>25)return I;for(let E of $.slice(0,200)){let z;try{z=I[E]}catch{continue}let U=w(z,c+1);if(U)return U}return null};return x=w(b,0),x}function m(b){let h=window.services&&window.services.Localization;try{let w=y();if(w&&typeof w[b]=="string")return w[b];if(h&&typeof h.localize=="function"){let I=h.localize(b);if(typeof I=="string"&&I&&I!==b&&!I.includes(b))return I}}catch{}return null}let p=null;function a(){let b={club:{},league:{},nation:{}},h=0,w=y();for(let I of Object.keys(e))for(let c of e[I]){if(f[I].has(c))continue;let $=null;for(let E of i[I](c))if($=m(E),$)break;if(!$&&w){let E=new RegExp(`\\D${c}$`),z=Object.keys(w).find(U=>S[I].test(U)&&E.test(U));z&&($=w[z])}$&&(b[I][c]=$,f[I].add(c),h++)}if(h&&window.postMessage({__fc27sbc:!0,labels:b},window.location.origin),w&&!a.sampled){a.sampled=!0;let I=Object.keys(w).filter(c=>/team|league|nation/i.test(c)).slice(0,60);window.postMessage({__fc27sbc:!0,locSample:I.map(c=>[c,w[c]])},window.location.origin)}}function l(b,h){h==null||h===0||f[b].has(h)||(e[b].add(h),clearTimeout(p),p=setTimeout(a,500))}function s(b){try{let h=[].concat(b.itemData||[]).concat((b.squad&&b.squad.players||[]).map(w=>w.itemData).filter(Boolean));for(let w of h)l("club",w.teamid),l("league",w.leagueId),l("nation",w.nation);for(let w of b.challenges||[])for(let I of w.elgReq||[])I.type==="CLUB_ID"&&l("club",I.eligibilityValue),I.type==="LEAGUE_ID"&&l("league",I.eligibilityValue),I.type==="NATION_ID"&&l("nation",I.eligibilityValue)}catch{}}window.addEventListener("message",b=>{if(!(b.source!==window||!b.data||!b.data.__fc27sbcWant))for(let h of Object.keys(e))for(let w of b.data.__fc27sbcWant[h]||[])l(h,w)});let B=g,d=(b,h)=>{s(h),B(b,h)},R=window.fetch;window.fetch=async function(...b){let h=await R.apply(this,b);try{let w=b[0],I=typeof w=="string"?w:w&&w.url||String(w);n.test(I)&&h.clone().json().then(c=>d(I,c)).catch(()=>{})}catch{}return h};let A=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(b,h,...w){return this.__fc27Url=h,A.call(this,b,h,...w)};let P=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(...b){return this.addEventListener("load",()=>{try{let h=String(this.__fc27Url||"");if(!n.test(h))return;let w=null;this.responseType==="json"?w=this.response:(this.responseType===""||this.responseType==="text")&&(w=JSON.parse(this.responseText)),w&&d(h,w)}catch{}}),P.apply(this,b)}})(),(()=>{let n={club:{},sets:{},challenges:{},names:{},samples:{},labels:{club:{},league:{},nation:{}},unknownUrls:[]},g=!1,e=new Set,f=null;o.storage.local.get(["club","sets","challenges","names","samples","labels"]).then(a=>{Object.assign(n,{club:a.club||{},sets:a.sets||{},challenges:a.challenges||{},names:a.names||{},samples:a.samples||{},labels:{club:{},league:{},nation:{},...a.labels||{}}});for(let[l,s]of Object.entries(n.club))(!s||!s.id||s.id==="0"||!(s.rating>0))&&(delete n.club[l],e.add("club"));g=!0,i()}),o.storage.onChanged.addListener((a,l)=>{if(l==="local")for(let s of["club","sets","challenges","names"])a[s]&&!e.has(s)&&(n[s]=a[s].newValue||{})});function u(a){e.add(a),i()}function i(){!g||e.size===0||(clearTimeout(f),f=setTimeout(()=>{let a={};for(let l of e)a[l]=n[l];e=new Set,a.lastUpdate=Date.now(),o.storage.local.set(a)},400))}function S(a,l,s){let B=(d,R=0)=>{if(Array.isArray(d))return d.slice(0,2).map(A=>B(A,R+1));if(d&&typeof d=="object"&&R<5){let A={};for(let[P,b]of Object.entries(d))A[P]=B(b,R+1);return A}return d};n.samples[a]={url:l.replace(/\?.*$/,""),at:Date.now(),body:B(s)},u("samples")}function x(a){if(!a||typeof a!="object")return null;let l=a.itemType||a.type;if(l&&l!=="player"||!a.id||!(Number(a.rating)>0)||a.itemState==="invalid"||!a.preferredPosition&&!Array.isArray(a.possiblePositions))return null;let s=a.preferredPosition||a.position||null;return{id:String(a.id),assetId:a.assetId??null,resourceId:a.resourceId??a.definitionId??null,rating:Number(a.rating),nation:a.nation??a.nationId??null,league:a.leagueId??a.league??null,club:a.teamid??a.teamId??a.clubId??null,rarity:a.rareflag??a.rarityId??0,position:s,positions:Array.isArray(a.possiblePositions)&&a.possiblePositions.length?a.possiblePositions:s?[s]:[],untradeable:!!a.untradeable,loan:!!a.loans||Number(a.loans)>0,inStorage:!1}}function y(a,l={}){let s=0;for(let B of a||[]){let d=x(B);!d||d.loan||(n.club[d.id]={...n.club[d.id],...d,...l,seen:Date.now()},s++)}s&&u("club")}function m(a,l){if(!l||typeof l!="object")return;if(/players\.json/i.test(a)){for(let B of[l.Players,l.LegendsPlayers])for(let d of B||[])d&&d.id!=null&&(n.names[d.id]=d.c||[d.f,d.l].filter(Boolean).join(" "));u("names");return}if(/\/club(\b|\/|\?|$)/.test(a)&&Array.isArray(l.itemData)){y(l.itemData),S("club",a,l);return}if(/storagepile/i.test(a)&&Array.isArray(l.itemData)){y(l.itemData,{inStorage:!0}),S("storage",a,l);return}if(/\/sbs\/sets/.test(a)&&Array.isArray(l.categories)){for(let B of l.categories)for(let d of B.sets||[])n.sets[d.setId]={setId:d.setId,name:d.name,category:B.name,challengesCount:d.challengesCount};u("sets"),S("sets",a,l);return}let s=a.match(/\/sbs\/setId\/(\d+)\/challenges/);if(s&&Array.isArray(l.challenges)){for(let B of l.challenges)n.challenges[B.challengeId]={challengeId:B.challengeId,setId:Number(s[1]),name:B.name,formation:B.formation||null,status:B.status||null,elgReq:B.elgReq||[],elgOperation:B.elgOperation||"AND"};u("challenges"),S("challenges",a,l);return}/\/sbs\/challenge\/\d+\/squad/.test(a)&&l.squad&&Array.isArray(l.squad.players)&&(y(l.squad.players.map(B=>B.itemData).filter(Boolean)),S("challengeSquad",a,l))}window.addEventListener("message",a=>{if(!(a.source!==window||!a.data||a.data.__fc27sbc!==!0))try{if(a.data.labels){for(let l of["club","league","nation"])Object.assign(n.labels[l],a.data.labels[l]||{});u("labels");return}if(a.data.locSample){n.samples.loc={at:Date.now(),body:a.data.locSample},u("samples");return}m(a.data.url,a.data.body)}catch(l){console.warn("[FC27 SBC]",l)}});function p(){let a={club:new Set,league:new Set,nation:new Set};for(let s of Object.values(n.club))for(let B of["club","league","nation"])s[B]!=null&&!n.labels[B][s[B]]&&a[B].add(s[B]);for(let s of Object.values(n.challenges))for(let B of s.elgReq||[])B.type==="CLUB_ID"&&!n.labels.club[B.eligibilityValue]&&a.club.add(B.eligibilityValue);let l={};for(let s of Object.keys(a))l[s]=[...a[s]];window.postMessage({__fc27sbcWant:l},window.location.origin)}[4e3,12e3,3e4,6e4].forEach(a=>setTimeout(()=>g&&p(),a))})()}var ue="fc27sbc:",se=new Set;function Pe(o){try{let n=localStorage.getItem(ue+o);return n==null?void 0:JSON.parse(n)}catch{return}}var ie={async get(o){let n=Array.isArray(o)?o:[o],g={};for(let e of n){let f=Pe(e);f!==void 0&&(g[e]=f)}return g},async set(o){let n={};for(let[g,e]of Object.entries(o)){try{localStorage.setItem(ue+g,JSON.stringify(e))}catch(f){console.warn("[FC27 SBC] kunne ikke gemme",g,f)}n[g]={newValue:e}}setTimeout(()=>se.forEach(g=>{try{g(n,"local")}catch(e){console.warn(e)}}),0)}},ge={storage:{local:ie,onChanged:{addListener:o=>se.add(o)}}},fe={get:o=>ie.get(o),set:o=>ie.set(o),watch:o=>se.add((n,g)=>g==="local"&&o(n))};function be(o){if(!o.length)return 0;let n=o.reduce((f,u)=>f+u,0),g=n/11,e=0;for(let f of o)f>g&&(e+=f-g);return Math.floor(Math.round(n+e)/11)}function Z(o){return o>=75?3:o>=65?2:1}var ze={1:"Arsenal",2:"Aston Villa",5:"Chelsea",7:"Everton",9:"Liverpool",10:"Manchester City",11:"Manchester United",13:"Newcastle",18:"Tottenham",21:"FC Bayern",22:"Borussia Dortmund",32:"Leverkusen",39:"Atalanta",44:"Inter",45:"Juventus",46:"Lazio",47:"AC Milan",48:"Napoli",52:"Roma",65:"LOSC",66:"Lyon",69:"Monaco",73:"Paris SG",74:"Stade Rennais",78:"Celtic",219:"Marseille",229:"Anderlecht",231:"Club Brugge",234:"Benfica",236:"FC Porto",237:"Sporting CP",240:"Atlético de Madrid",241:"FC Barcelona",243:"Real Madrid",245:"Ajax",246:"Feyenoord",247:"PSV",448:"Athletic Club",449:"Real Betis",457:"Real Sociedad",461:"Valencia",481:"Sevilla",483:"Villarreal",110374:"Fiorentina",112172:"RB Leipzig"},Ue={1:"Superliga",4:"Belgian Pro League",10:"Eredivisie",13:"Premier League",14:"Championship",16:"Ligue 1",19:"Bundesliga",20:"2. Bundesliga",31:"Serie A",39:"MLS",50:"Scottish Prem",53:"LaLiga",68:"Süper Lig",308:"Liga Portugal",350:"Saudi Pro League",2118:"Icons"},De={4:"Østrig",7:"Belgien",10:"Kroatien",13:"Danmark",14:"England",18:"Frankrig",21:"Tyskland",27:"Italien",34:"Holland",36:"Norge",37:"Polen",38:"Portugal",42:"Skotland",45:"Spanien",46:"Sverige",47:"Schweiz",50:"Wales",52:"Argentina",54:"Brasilien",56:"Colombia",60:"Uruguay",83:"Mexico",95:"USA",129:"Marokko",136:"Senegal",163:"Japan"},me={club:["Klub",ze],league:["Liga",Ue],nation:["Nation",De]},le={club:{},league:{},nation:{}};function he(o){for(let n of Object.keys(le))le[n]={...o?.[n]||{}}}function ae(o,n){return n==null?null:le[o]?.[n]||me[o]?.[1][n]||null}function D(o,n){return n==null?"":ae(o,n)||`${me[o]?.[0]||""} #${n}`}var xe=o=>{let n=String(o||"").toUpperCase();return n==="LOWER"||n==="LESS"||n==="MAX"?"max":n==="EXACT"||n==="EQUAL"?"exact":"min"},ve={NATION_ID:"nation",LEAGUE_ID:"league",CLUB_ID:"club",PLAYER_RARITY:"rarity"},je={SAME_NATION_COUNT:"nation",SAME_LEAGUE_COUNT:"league",SAME_CLUB_COUNT:"club"},qe={NATION_COUNT:"nation",LEAGUE_COUNT:"league",CLUB_COUNT:"club"},ye=new Set(["PLAYER_COUNT","PLAYER_COUNT_COMBINED"]),Fe={0:"min",1:"max",2:"exact"},He={nation:"nation",league:"liga",club:"klub",rarity:"sjældenhed"},we={1:"bronze",2:"sølv",3:"guld"},F={min:"min.",max:"maks.",exact:"præcis"};function ce(o=[]){let n=new Map;for(let e of o){let f=e.eligibilitySlot??Symbol("slot");n.has(f)||n.set(f,[]),n.get(f).push(e)}let g=[];for(let e of n.values()){let f=e.find(p=>p.type==="SCOPE"),u=f?Fe[Number(f.eligibilityValue)]||"min":null,i=e.find(p=>ye.has(p.type)),S=i?Number(i.eligibilityValue):e.find(p=>p.count!=null)?.count,x=u||(i?xe(i.scope):"min"),y=e.filter(p=>!ye.has(p.type)&&p.type!=="SCOPE");if(i&&!y.length)continue;let m=y.find(p=>ve[p.type])?.type;if(m){let p=ve[m],a=y.filter(s=>s.type===m).map(s=>Number(s.eligibilityValue)),l=S??1;g.push({kind:"count",filter:{field:p,values:a},op:x,n:l,desc:`${F[x]} ${l} spiller(e) fra ${a.map(s=>p==="rarity"?`sjældenhed ${s}`:D(p,s)).join(" / ")}`});continue}for(let p of y){let a=Number(p.eligibilityValue),l=i?"exact":u||xe(p.scope);switch(p.type){case"TEAM_RATING":case"TEAM_RATING_1_TO_100":g.push({kind:"rating",op:l,n:a,desc:`Holdrating ${F[l]} ${a}`});break;case"TEAM_CHEMISTRY":case"CHEMISTRY_POINTS":g.push({kind:"chem",op:l,n:a,desc:`Holdkemi ${F[l]} ${a}`});break;case"ALL_PLAYERS_CHEMISTRY_POINTS":g.push({kind:"playerChem",n:a,desc:`Kemi pr. spiller min. ${a}`});break;case"PLAYER_LEVEL":case"PLAYER_QUALITY":{let s={level:a,op:l};S!=null?g.push({kind:"count",filter:s,op:x,n:S,desc:`${F[x]} ${S} spiller(e) ${F[l]} ${we[a]||a}`}):g.push({kind:"perPlayer",filter:s,desc:`Alle spillere ${F[l]} ${we[a]||a}`});break}case"PLAYER_MIN_OVR":case"PLAYER_MAX_OVR":case"PLAYER_EXACT_OVR":{let s=p.type==="PLAYER_MIN_OVR"?"min":p.type==="PLAYER_MAX_OVR"?"max":"exact",B={ovr:a,op:s};S!=null?g.push({kind:"count",filter:B,op:x,n:S,desc:`${F[x]} ${S} spiller(e) med rating ${F[s]} ${a}`}):g.push({kind:"perPlayer",filter:B,desc:`Alle spillere rating ${F[s]} ${a}`});break}case"PLAYER_RARITY_GROUP":{let s=S??1;g.push({kind:"count",filter:{rare:!0},op:x,n:s,desc:`${F[x]} ${s} sjældne spiller(e) (antaget, gruppe ${a})`});break}case"SAME_NATION_COUNT":case"SAME_LEAGUE_COUNT":case"SAME_CLUB_COUNT":{let s=je[p.type];g.push({kind:"same",field:s,op:l,n:a,desc:`${F[l]} ${a} spillere fra samme ${He[s]}`});break}case"NATION_COUNT":case"LEAGUE_COUNT":case"CLUB_COUNT":{let s=qe[p.type],B={nation:"nationer",league:"ligaer",club:"klubber"}[s];g.push({kind:"distinct",field:s,op:l,n:a,desc:`Antal forskellige ${B}: ${F[l]} ${a}`});break}default:g.push({kind:"unknown",raw:p,desc:`Ikke understøttet krav: ${p.type} = ${p.eligibilityValue} (${p.scope||""}) — tjek selv`})}}}return g}var ke=(o,n,g)=>n==="max"?o<=g:n==="exact"?o===g:o>=g,ee=(o,n,g)=>n==="max"?Math.max(0,o-g):n==="exact"?Math.abs(o-g):Math.max(0,g-o);function J(o,n){return n.field?n.values.includes(Number(o[n.field])):n.level!=null?ke(Z(o.rating),n.op,n.level):n.ovr!=null?ke(o.rating,n.op,n.ovr):n.rare?Number(o.rarity)!==0:!0}function Se(o,n,g){return o.map(e=>{let f=null,u=0;switch(e.kind){case"rating":f=g.rating,u=ee(f,e.op,e.n)*3;break;case"chem":f=g.chem.total,u=ee(f,e.op,e.n);break;case"playerChem":f=Math.min(...g.chem.per),u=g.chem.per.reduce((i,S)=>i+Math.max(0,e.n-S),0);break;case"count":f=n.filter(i=>J(i,e.filter)).length,u=ee(f,e.op,e.n);break;case"perPlayer":f=n.filter(i=>!J(i,e.filter)).length,u=f;break;case"same":{let i=new Map;for(let S of n)S[e.field]!=null&&i.set(S[e.field],(i.get(S[e.field])||0)+1);f=i.size?Math.max(...i.values()):0,u=ee(f,e.op,e.n);break}case"distinct":{let i=new Set(n.map(x=>x[e.field]).filter(x=>x!=null)).size,S=n.filter(x=>x[e.field]==null).length;f=e.op==="min"?i:i+S,u=ee(f,e.op,e.n);break}default:return{c:e,ok:null,actual:null,gap:0}}return{c:e,ok:u===0,actual:f,gap:u}})}var Ce={433:["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"],4231:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","CAM","ST"],442:["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"],4141:["GK","RB","CB","CB","LB","CDM","RM","CM","CM","LM","ST"],41212:["GK","RB","CB","CB","LB","CDM","RM","LM","CAM","ST","ST"],352:["GK","CB","CB","CB","CDM","CDM","RM","LM","CAM","ST","ST"],343:["GK","CB","CB","CB","RM","CM","CM","LM","RW","ST","LW"],532:["GK","RWB","CB","CB","CB","LWB","CM","CM","CM","ST","ST"],4321:["GK","RB","CB","CB","LB","CM","CM","CM","CAM","CAM","ST"],3142:["GK","CB","CB","CB","CDM","RM","CM","CM","LM","ST","ST"],3412:["GK","CB","CB","CB","RM","CM","CM","LM","CAM","ST","ST"],4411:["GK","RB","CB","CB","LB","RM","CM","CM","LM","CAM","ST"],451:["GK","RB","CB","CB","LB","RM","CM","CAM","CM","LM","ST"],4222:["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","ST","ST"],541:["GK","RWB","CB","CB","CB","LWB","RM","CM","CM","LM","ST"]},Me=2118;function Le(o){let n=String(o||"").replace(/[^0-9]/g,"");return Ce[n]||Ce[433]}var de=(o,[n,g,e])=>o>=e?3:o>=g?2:o>=n?1:0;function Ve(o,n,g=!1){let e=new Array(n.length).fill(-1),f=(x,y)=>g||(x.positions||[]).includes(n[y]),u=(x,y)=>{for(let m=0;m<n.length;m++)if(!(y[m]||!f(o[x],m))&&(y[m]=!0,e[m]===-1||u(e[m],y)))return e[m]=x,!0;return!1},i=o.map((x,y)=>y).sort((x,y)=>(o[x].positions?.length||0)-(o[y].positions?.length||0));for(let x of i)u(x,new Array(n.length).fill(!1));let S=new Array(o.length).fill(-1);return e.forEach((x,y)=>{x!==-1&&(S[x]=y)}),S}function Be(o,n,g=!1){let e=Ve(o,n,g),f=new Map,u=new Map,i=new Map,S=(y,m,p=1)=>{m!=null&&y.set(m,(y.get(m)||0)+p)};o.forEach((y,m)=>{if(e[m]===-1)return;let p=y.league===Me;S(f,y.club),S(u,y.nation,p?2:1),p||S(i,y.league)});let x=o.map((y,m)=>{if(e[m]===-1)return 0;if(y.league===Me)return 3;let p=de(f.get(y.club)||0,[2,5,7])+de(u.get(y.nation)||0,[2,5,8])+de(i.get(y.league)||0,[3,5,8]);return Math.min(3,p)});return{total:x.reduce((y,m)=>y+m,0),per:x,slotOf:e}}var Ee={maxRating:99,excludeSpecial:!0,onlyUntradeable:!1,tradeablePenalty:1.6,ignorePositions:!1,iterations:25e3,restarts:4,excludeIds:[],allowBuy:!1,maxBuys:4,seed:null};function Ke(o,n){let g=o.rating<75?.2+(o.rating-45)/100:Math.pow(1.35,o.rating-75);return Number(o.rarity)>1?g*=2.5:Number(o.rarity)===1&&(g*=1.15),o.untradeable||(g*=n.tradeablePenalty),o.inStorage&&n.preferStorage!==!1&&(g*=.4),g}var Ge=["GK","RB","CB","LB","RWB","LWB","CDM","CM","CAM","RM","LM","RW","LW","ST"],Ye=[60,70,75,77,79,81,82,83,84,85,86,87];function We(o){return(o<75?.5:Math.pow(1.35,o-75))*2.2+2}var Xe=25,Je=new Set([13,16,19,31,53]),Qe=new Set([1,5,9,10,11,18,21,22,44,45,47,48,73,240,241,243]);function Ze(o){if(o.generic)return 0;let n=1;return o.required&&(n+=Xe),o.club!=null&&Qe.has(Number(o.club))&&(n+=10),o.league!=null&&Je.has(Number(o.league))&&(n+=3),n}function et(o,n,g,e,f){let u=new Map,i=new Map;for(let d of o){if(d.club==null)continue;i.set(d.club,(i.get(d.club)||0)+1);let R=`${d.club}|${d.league}`;u.set(R,(u.get(R)||0)+1)}let S=d=>{let R=null,A=0;for(let[P,b]of u){let[h,w]=P.split("|");Number(h)===Number(d)&&b>A&&(A=b,R=Number(w))}return R},x=new Map,y=d=>x.set(`${d.club}|${d.league}|${d.nation}`,d),m=new Set,p=new Map;for(let d of n){let R=d.filter;if(d.kind!=="count"||R?.field!=="club"||d.op==="max")continue;let A=R.values.map(Number);A.forEach(h=>m.add(h));let P=new Set(f.filter(h=>A.includes(Number(h.club))).map(te)).size,b=Math.max(0,d.n-P);if(b)for(let h of A)p.set(h,Math.max(p.get(h)||0,b))}for(let d of n){let R=d.filter;if(!(d.kind!=="count"||!R?.field))for(let A of R.values)R.field==="club"&&(p.has(Number(A))?y({club:A,league:S(A),nation:null,required:p.get(Number(A))}):m.has(Number(A))||y({club:A,league:S(A),nation:null})),R.field==="league"&&y({club:null,league:A,nation:null}),R.field==="nation"&&y({club:null,league:null,nation:A})}[...i.entries()].filter(([d])=>!m.has(Number(d))).sort((d,R)=>R[1]-d[1]).slice(0,12).forEach(([d])=>y({club:d,league:S(d),nation:null}));let a=new Map;for(let d of o)d.nation!=null&&a.set(d.nation,(a.get(d.nation)||0)+1);[...a.entries()].sort((d,R)=>R[1]-d[1]).slice(0,6).forEach(([d])=>y({club:null,league:null,nation:d})),y({club:null,league:null,nation:null,generic:!0});let l=Math.max(1,Math.min(g.maxBuys,5)),s=[],B=0;for(let d of x.values())for(let R of Ye){let A={id:`buy-${B}`,placeholder:!0,rating:R,rarity:0,untradeable:!1,club:d.club,league:d.league,nation:d.nation,positions:Ge,requiredClub:!!d.required,generic:!!d.generic};if(!e.every(h=>J(A,h.filter)))continue;let P=We(R)+Ze(d),b=d.required?Math.min(l,d.required):l;for(let h=0;h<b;h++)s.push({p:{...A,id:`buy-${B++}`},cost:P})}return s}function tt(o){if(o==null)return Math.random;let n=o>>>0;return()=>(n=n*1664525+1013904223>>>0)/4294967296}var te=o=>String(o.assetId??o.resourceId??o.id);function Ie(o,n,g={}){let e={...Ee,...g},f=$e(o,n,e);if(f.feasible||!e.allowBuy)return f;let u=Number(e.maxBuys)||0;for(let i of[u+2,u+4,11]){if(i<=u||i>11)continue;let S=$e(o,n,{...e,maxBuys:i,restarts:Math.max(e.restarts,5)});if(S.feasible)return{...S,overBuyLimit:!0,buyLimit:u};!f.feasible&&S.squad&&(!f.squad||S.violation<f.violation)&&(f=S)}return f}function $e(o,n,g={}){let e={...Ee,...g},f=tt(e.seed),u=Le(e.formation),i=u.length,S=n.filter(c=>c.kind==="perPlayer"),x=n.filter(c=>c.kind!=="perPlayer"&&c.kind!=="unknown"),y=new Set(e.excludeIds.map(String)),m=new Map;for(let c of o){if(c.loan||y.has(String(c.id))||c.rating>e.maxRating||e.excludeSpecial&&Number(c.rarity)>1||e.onlyUntradeable&&!c.untradeable||!S.every(z=>J(c,z.filter)))continue;let $=Ke(c,e),E=te(c);(!m.has(E)||m.get(E).cost>$)&&m.set(E,{p:c,cost:$})}let p=[...m.values()];if(e.allowBuy&&e.maxBuys>0&&p.push(...et(o,x,e,S,p.map(c=>c.p))),p.length<i)return{feasible:!1,error:`Kun ${p.length} brugbare spillere fundet (skal bruge ${i}). Bladr mere i klubben eller løsn filtrene.`};let a=new Map,l={club:new Map,league:new Map,nation:new Map};p.forEach((c,$)=>{a.has(c.p.rating)||a.set(c.p.rating,[]),a.get(c.p.rating).push($);for(let E of Object.keys(l)){let z=l[E];z.has(c.p[E])||z.set(c.p[E],[]),z.get(c.p[E]).push($)}});let s=c=>c[Math.floor(f()*c.length)],B=x.filter(c=>c.kind==="count"&&c.filter&&c.op!=="max").map(c=>p.map(($,E)=>J($.p,c.filter)?E:-1).filter($=>$>=0)).filter(c=>c.length),d=40,R=c=>{let $=c.map(j=>p[j].p),E=be($.map(j=>j.rating)),z=Be($,u,e.ignorePositions),U=Se(x,$,{rating:E,chem:z}),H=c.reduce((j,V)=>j+(p[V].p.placeholder?1:0),0),K=U.reduce((j,V)=>j+V.gap,0)+Math.max(0,H-e.maxBuys)*2,q=c.reduce((j,V)=>j+p[V].cost,0);return{total:q+d*K,viol:K,cost:q,rating:E,chem:z,res:U}},A=p.map((c,$)=>$).sort((c,$)=>p[c].cost-p[$].cost),P=null,b=null;for(let c=0;c<e.restarts;c++){let $=A.slice(0,Math.max(i*3,40)),E=[],z=new Set;for(;E.length<i;){let H=c===0?$[E.length]??s(A):s($),K=te(p[H].p);if(z.has(K)){c===0&&$.splice(E.length,1);continue}z.add(K),E.push(H)}let U=R(E);U.viol===0&&(!P||U.cost<P.s.cost)&&(P={idx:[...E],s:U});for(let H=0;H<e.iterations;H++){let K=6*Math.pow(.0015,H/e.iterations),q=Math.floor(f()*i),j=E[q],V=f(),G;if(B.length&&V<.12)G=s(s(B));else if(V<.35){let W=p[j].p.rating+(f()<.5?-1:1)*(1+Math.floor(f()*3)),Y=a.get(W);G=s(Y||A)}else if(V<.7){let W=p[E[Math.floor(f()*i)]].p,Y=["club","league","nation"][Math.floor(f()*3)];G=s(l[Y].get(W[Y]))}else G=s(A);let Q=te(p[G].p);if(G===j||E.some((W,Y)=>Y!==q&&te(p[W].p)===Q))continue;E[q]=G;let X=R(E),ne=X.total-U.total;ne<=0||f()<Math.exp(-ne/K)?(U=X,X.viol===0&&(!P||X.cost<P.s.cost)&&(P={idx:[...E],s:X})):E[q]=j}(!b||U.total<b.s.total)&&(b={idx:[...E],s:U})}let{idx:h,s:w}=P||b,I=h.map(c=>p[c].p);return{feasible:w.viol===0,violation:w.viol,rating:w.rating,chem:w.chem.total,cost:Math.round(w.cost*10)/10,buys:I.filter(c=>c.placeholder).length,slots:u,squad:I.map((c,$)=>({player:c,slotIndex:w.chem.slotOf[$],slot:w.chem.slotOf[$]>=0?u[w.chem.slotOf[$]]:"—",chem:w.chem.per[$]})),checks:[...w.res,...n.filter(c=>c.kind==="perPlayer").map(c=>({c,ok:!0,actual:null})),...n.filter(c=>c.kind==="unknown").map(c=>({c,ok:null,actual:null}))],candidates:p.length}}var O=o=>String(o??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]);async function Te(o,n,g={}){let e=t=>o.getElementById(t),f={formation:"",maxRating:88,excludeSpecial:!0,onlyUntradeable:!1,preferStorage:!0,ignorePositions:!1,mode:"sbc",challengeId:"",view:"pitch",allowBuy:!0,maxBuys:4},u={club:{},sets:{},challenges:{},names:{},samples:{},lastUpdate:0},i={...f},S=null,x=new Set;async function y(){let t=await n.get(["club","sets","challenges","names","samples","lastUpdate","settings","labels"]);u={...u,...t},he(u.labels),i={...f,...t.settings||{}}}let m=()=>n.set({settings:i}),p=()=>Object.values(u.club||{}).filter(t=>t&&t.id&&t.id!=="0"&&t.rating>0),a=t=>u.names?.[t.assetId]||`Spiller #${t.assetId??t.id}`,l=t=>{let r=u.names?.[t.assetId];if(!r)return`#${t.assetId??t.id}`;let C=r.split(" ");return C.length>1?C[C.length-1]:r},s=t=>Number(t.rarity)>1?"lv-special":["","lv-bronze","lv-silver","lv-gold"][Z(t.rating)],B;function d(t){let r=e("toast");r.textContent=t,r.hidden=!1,clearTimeout(B),B=setTimeout(()=>{r.hidden=!0},2200)}function R(){let t=p(),r=t.filter(M=>M.untradeable).length,C=t.filter(M=>M.inStorage).length,k=Object.keys(u.challenges||{}).length;e("stats").innerHTML=[`<span class="stat"><b>${t.length}</b>spillere</span>`,`<span class="stat"><b>${r}</b>UT</span>`,`<span class="stat"><b>${C}</b>opbevaring</span>`,`<span class="stat"><b>${k}</b>SBC'er</span>`].join(""),A(),e("onboarding").hidden=t.length>0}function A(){let t=e("liveState"),r=u.lastUpdate?Math.round((Date.now()-u.lastUpdate)/1e3):null,C=r!=null&&r<120;t.classList.toggle("live",C),t.innerHTML=`<span class="dot"></span>${r==null?"Venter på web-appen":C?`Forbundet · opdateret for ${r<5?"lige":r+" s"} siden`:`Sidst opdateret ${new Date(u.lastUpdate).toLocaleTimeString("da-DK",{hour:"2-digit",minute:"2-digit"})}`}`}setInterval(A,1e4),o.querySelectorAll(".tab").forEach(t=>{t.onclick=()=>{o.querySelectorAll(".tab").forEach(r=>r.classList.toggle("active",r===t)),o.querySelectorAll(".view").forEach(r=>r.classList.toggle("active",r.id===`view-${t.dataset.tab}`)),e("dock").hidden=t.dataset.tab!=="solve",t.dataset.tab==="club"&&oe()}});function P(t){i.mode=t,o.querySelectorAll("#modeSeg button").forEach(r=>r.classList.toggle("on",r.dataset.mode===t)),e("sbcPicker").hidden=t!=="sbc",e("manualForm").hidden=t!=="manual",$()}o.querySelectorAll("#modeSeg button").forEach(t=>{t.onclick=()=>{P(t.dataset.mode),m()}});function b(){let t=u.challenges?.[i.challengeId],r=t&&u.sets?.[t.setId];e("pickerLabel").className=t?"":"muted",e("pickerLabel").innerHTML=t?`<span class="name">${O(t.name)}</span><span class="set">${O(r?.name||`Sæt ${t.setId}`)}</span>`:Object.keys(u.challenges||{}).length?"Vælg en SBC…":"Ingen SBC'er fanget endnu – åbn SBC i web-appen"}function h(){let t=e("sbcSearch").value.trim().toLowerCase(),r=new Map;for(let k of Object.values(u.challenges||{})){let M=u.sets?.[k.setId]?.name||`Sæt ${k.setId}`;t&&!`${M} ${k.name}`.toLowerCase().includes(t)||(r.has(M)||r.set(M,[]),r.get(M).push(k))}let C=e("sbcList");if(!r.size){C.innerHTML=`<div class="none">Ingen SBC'er matcher</div>`;return}C.innerHTML="";for(let[k,M]of r){let _=document.createElement("div");_.className="group-title",_.textContent=k,C.appendChild(_);for(let T of M.sort((L,v)=>L.challengeId-v.challengeId)){let L=T.status==="COMPLETED",v=ce(T.elgReq).length,N=document.createElement("button");N.className=`item${String(T.challengeId)===String(i.challengeId)?" sel":""}`,N.innerHTML=`<span>${O(T.name)}</span><span class="badge${L?" done":""}">${L?"Fuldført":`${v} krav`}</span>`,N.onclick=()=>{i.challengeId=String(T.challengeId),x.clear(),S=null,e("result").hidden=!0,m(),I(),b(),$()},C.appendChild(N)}}}function w(){e("dropdown").hidden=!1,e("sbcSearch").value="",h(),g.touch||e("sbcSearch").focus()}function I(){e("dropdown").hidden=!0}e("pickerBtn").onclick=t=>{t.stopPropagation(),e("dropdown").hidden?w():I()},e("sbcSearch").oninput=h,e("dropdown").onclick=t=>t.stopPropagation(),o.addEventListener("click",I),o.addEventListener("keydown",t=>{t.key==="Escape"&&I()});function c(){if(i.mode==="sbc"){let k=u.challenges?.[i.challengeId];return k?{constraints:ce(k.elgReq),formation:k.formation}:{constraints:[],formation:null}}let t=[],r=Number(e("mRating").value),C=Number(e("mChem").value);return r>0&&t.push({kind:"rating",op:"min",n:r,desc:`Holdrating min. ${r}`}),C>0&&t.push({kind:"chem",op:"min",n:C,desc:`Holdkemi min. ${C}`}),{constraints:t,formation:null}}function $(t){let r=e("reqChips"),C=t||c().constraints.map(k=>({c:k,ok:k.kind==="unknown"?null:void 0}));if(!C.length){r.innerHTML=`<span class="muted small">${i.mode==="sbc"?"Vælg en SBC for at se kravene.":"Angiv rating og/eller kemi."}</span>`;return}r.innerHTML=C.map(({c:k,ok:M,actual:_})=>{let T=M===!0?"ok":M===!1?"bad":M===null?"warn":"",L=M===!0?"✓":M===!1?"✗":M===null?"!":"•",v=_!=null&&M!==void 0?`<span class="act">${O(_)}</span>`:"";return`<span class="chip ${T}" title="${O(k.desc)}"><i>${L}</i>${O(k.desc)}${v}</span>`}).join("")}e("mRating").oninput=()=>$(),e("mChem").oninput=()=>$();async function E(){let{constraints:t,formation:r}=c();if(!t.length){d(i.mode==="sbc"?"Vælg en SBC først":"Angiv mindst ét krav");return}if(!p().length){d("Ingen spillere fanget endnu");return}let C=e("solve");C.disabled=!0,C.querySelector(".spinner").hidden=!1,C.querySelector(".lbl").textContent="Løser…",await new Promise(k=>setTimeout(k,30));try{S=Ie(p(),t,{formation:i.formation||r,maxRating:i.maxRating,excludeSpecial:i.excludeSpecial,onlyUntradeable:i.onlyUntradeable,preferStorage:i.preferStorage,ignorePositions:i.ignorePositions,allowBuy:i.allowBuy,maxBuys:Number(i.maxBuys)||0,excludeIds:[...x]}),X()}finally{C.disabled=!1,C.querySelector(".spinner").hidden=!0,C.querySelector(".lbl").textContent=S?"Løs igen":"Løs SBC"}}e("solve").onclick=E;let z={ST:12,CF:12,RW:18,LW:18,CAM:34,RM:48,LM:48,CM:48,CDM:62,RWB:70,LWB:70,RB:77,LB:77,CB:77,GK:90},U=t=>/^L/.test(t)?-1:/^R/.test(t)?1:0;function H(t){let r=[...new Set(t.map(_=>z[_]??50))].sort((_,T)=>_-T),C=_=>{let T=r.indexOf(z[_]??50);return r.length===1?50:11+78*T/(r.length-1)},k=new Array(t.length),M=new Map;t.forEach((_,T)=>{let L=C(_);if(U(_)!==0){k[T]={x:U(_)<0?11:89,y:L};return}M.has(L)||M.set(L,[]),M.get(L).push(T)});for(let[_,T]of M){let L=T.length,v=Math.min(24,12*(L-1));T.forEach((N,Oe)=>{k[N]={x:L===1?50:50-v+2*v*Oe/(L-1),y:_}})}return k}function K(t){let r=ae("club",t);if(r)return r;let C=p().filter(k=>String(k.club)===String(t)&&u.names?.[k.assetId]).sort((k,M)=>M.rating-k.rating).slice(0,2).map(a);return C.length?`Samme klub som ${C.join(" og ")}`:D("club",t)}function q(t){return t.generic?"Valgfri klub":t.club!=null?K(t.club):t.league!=null?D("league",t.league):t.nation!=null?D("nation",t.nation):"Valgfri"}function j(t){if(t.club!=null&&!t.generic&&!ae("club",t.club)){let r=p().filter(C=>String(C.club)===String(t.club)&&u.names?.[C.assetId]).sort((C,k)=>k.rating-C.rating)[0];if(r)return`som ${l(r)}`}return q(t)}let V=(t,r=11)=>t.length>r?`${t.slice(0,r-1)}…`:t;function G(t){let r=t.player;if(r.placeholder){let M=[0,1,2].map(_=>`<s class="${_<t.chem?"on":""}"></s>`).join("");return`<span class="tags"><span class="tag buy">KØB</span></span><span class="ovr">${r.rating}+</span><span class="pos">${O(t.slot)}</span><span class="nm">${O(V(j(r)))}</span><span class="chem">${M}</span>`}let C=[0,1,2].map(M=>`<s class="${M<t.chem?"on":""}"></s>`).join("");return`<span class="tags">${[r.untradeable?'<span class="tag ut">UT</span>':"",r.inStorage?'<span class="tag st">OPB</span>':""].join("")}</span><span class="ovr">${r.rating}</span><span class="pos">${O(t.slot)}</span><span class="nm">${O(l(r))}</span><span class="chem">${C}</span>`}function Q(t){x.add(String(t.id)),d(`${a(t)} udelukket – løser igen`),E()}function X(){let t=S;e("result").hidden=!1,e("resetExcl").hidden=x.size===0,e("exclCount").textContent=x.size;let r=e("verdict");if(t.error){e("rRating").textContent="–",e("rChem").textContent="–",e("rCost").textContent="–",r.className="verdict bad",r.textContent=t.error,e("pitch").innerHTML="",e("plist").innerHTML="",e("bench").hidden=!0,$();return}e("rRating").textContent=t.rating,e("rChem").textContent=t.chem,e("rCost").textContent=Math.round(t.cost),r.className=`verdict ${t.feasible?"ok":"bad"}`,r.textContent=t.feasible?t.overBuyLimit?`Løst med ${11-t.buys} fra klubben + ${t.buys} køb (mere end dit maks. på ${t.buyLimit})`:t.buys?`Løst med ${11-t.buys} fra klubben + ${t.buys} køb`:"Løst kun med spillere fra klubben":"Ingen gyldig løsning – tætteste bud vises",$(t.checks),ne(t);let C=e("pitch");C.innerHTML='<div class="circle"></div>';let k=H(t.slots),M=[];for(let L of t.squad){if(L.slotIndex<0){M.push(L);continue}let v=document.createElement("button");v.className=`pcard ${s(L.player)}`,v.style.left=`${k[L.slotIndex].x}%`,v.style.top=`${k[L.slotIndex].y}%`,L.player.placeholder?(v.className="pcard buy",v.title=`Køb: ${q(L.player)}, rating ${L.player.rating}+, position ${L.slot}`):(v.title=`${a(L.player)} · ${L.player.rating} · ${D("club",L.player.club)} · ${D("league",L.player.league)} · ${D("nation",L.player.nation)}`,v.onclick=()=>Q(L.player)),v.innerHTML=G(L),C.appendChild(v)}let _=e("bench");_.innerHTML=M.length?'<div class="bench-title">Uden passende position (0 kemi):</div>':"";for(let L of M){let v=document.createElement("button");v.className=`pcard ${s(L.player)}`,v.innerHTML=G(L),v.onclick=()=>Q(L.player),_.appendChild(v)}let T=e("plist");T.innerHTML="";for(let L of[...t.squad].sort((v,N)=>N.player.rating-v.player.rating)){if(L.player.placeholder){let N=document.createElement("div");N.className="prow",N.innerHTML=`<span class="ov buyov">${L.player.rating}+</span><span class="meta"><b>Køb: ${O(q(L.player))}</b><span>${O(L.slot)} · se indkøbslisten</span></span><span class="pp">${O(L.slot)}</span><span class="chemtxt">${L.chem}/3</span>`,T.appendChild(N);continue}let v=document.createElement("button");v.className="prow",v.title="Udeluk og løs igen",v.innerHTML=W(L.player,`<span class="pp">${O(L.slot)}</span><span class="chemtxt">${L.chem}/3</span>`),v.onclick=()=>Q(L.player),T.appendChild(v)}Y()}function ne(t){let r=(t.squad||[]).filter(k=>k.player.placeholder);if(e("shop").hidden=!r.length,!r.length)return;e("shopCount").textContent=`${r.length} spiller${r.length>1?"e":""}`;let C=[];for(let k of c().constraints){if(k.kind!=="same"||k.op!=="max")continue;let M=new Map;for(let _ of t.squad){let T=_.player[k.field];T!=null&&M.set(T,(M.get(T)||0)+1)}for(let[_,T]of M)T>=k.n&&C.push(D(k.field,_))}e("shopList").innerHTML=r.sort((k,M)=>M.player.rating-k.player.rating).map(k=>{let M=k.player,_=M.generic?'Hvilken som helst spiller <span class="sub2">· billigst fra en mindre liga</span>':M.club!=null?`${O(K(M.club))}${M.league!=null?` <span class="sub2">· ${O(D("league",M.league))}</span>`:""}`:O(q(M)),T=C.length?`Ikke fra: ${O(C.join(", "))}`:"Valgfri nation",L=M.requiredClub?`Krævet af SBC'en – du ejer ingen · ${T}`:M.generic?`Kun rating tæller · ${T}`:T;return`<div class="shoprow"><span class="pp">${O(k.slot)}</span><span><b>${_}</b><span class="sub2">${L}</span></span><span class="rt">${M.rating}+</span></div>`}).join("")}function W(t,r){let C=(t.untradeable?'<span class="flag ut">UT</span>':"")+(t.inStorage?'<span class="flag st">OPB</span>':"");return`<span class="ov ${s(t)}">${t.rating}</span>
      <span class="meta"><b>${O(a(t))}${C}</b><span>${O((t.positions||[]).join(" · "))} · ${O(D("club",t.club))} · ${O(D("league",t.league))} · ${O(D("nation",t.nation))}</span></span>
      ${r}`}function Y(){o.querySelectorAll("#viewSeg button").forEach(r=>r.classList.toggle("on",r.dataset.view===i.view));let t=i.view==="pitch";e("pitch").hidden=!t,e("bench").hidden=!t||!e("bench").children.length,e("plist").hidden=t}o.querySelectorAll("#viewSeg button").forEach(t=>{t.onclick=()=>{i.view=t.dataset.view,m(),Y()}}),e("resetExcl").onclick=()=>{x.clear(),E()};function oe(){let t=p(),r={gold:0,silver:0,bronze:0,special:0};for(let v of t)Number(v.rarity)>1?r.special++:r[["","bronze","silver","gold"][Z(v.rating)]]++;e("levels").innerHTML=[["gold","Guld"],["silver","Sølv"],["bronze","Bronze"],["special","Special"]].map(([v,N])=>`<div class="lvl lv-${v}"><b>${r[v]}</b><small>${N}</small></div>`).join("");let C=e("clubSearch").value.trim().toLowerCase(),k=t.filter(v=>e("fUT").checked&&!v.untradeable||e("fStorage").checked&&!v.inStorage||e("fSpecial").checked&&!(Number(v.rarity)>1)?!1:C?`${a(v)} ${v.rating} ${D("league",v.league)} ${D("nation",v.nation)} ${D("club",v.club)} ${(v.positions||[]).join(" ")}`.toLowerCase().includes(C):!0),M=e("clubSort").value,_={"rating-desc":(v,N)=>N.rating-v.rating,"rating-asc":(v,N)=>v.rating-N.rating,league:(v,N)=>v.league-N.league||N.rating-v.rating,nation:(v,N)=>v.nation-N.nation||N.rating-v.rating}[M];k.sort(_);let T=150,L=e("clubList");L.innerHTML=k.length?k.slice(0,T).map(v=>`<div class="prow">${W(v,"<span></span><span></span>")}</div>`).join(""):'<div class="empty center muted">Ingen spillere matcher.</div>',e("clubMore").textContent=k.length>T?`Viser ${T} af ${k.length} – søg for at indsnævre`:""}["clubSearch","clubSort","fUT","fStorage","fSpecial"].forEach(t=>{e(t).addEventListener("input",oe)});function _e(){e("formation").value=i.formation,e("maxRating").value=i.maxRating,e("maxRatingVal").textContent=i.maxRating;for(let t of["excludeSpecial","onlyUntradeable","preferStorage","ignorePositions"])e(t).checked=i[t],e(t).onchange=()=>{i[t]=e(t).checked,m()};e("formation").onchange=()=>{i.formation=e("formation").value,m()},e("allowBuy").checked=i.allowBuy,e("maxBuys").value=String(i.maxBuys),e("maxBuysWrap").hidden=!i.allowBuy,e("allowBuy").onchange=()=>{i.allowBuy=e("allowBuy").checked,e("maxBuysWrap").hidden=!i.allowBuy,m()},e("maxBuys").onchange=()=>{i.maxBuys=Number(e("maxBuys").value),m()},e("maxRating").oninput=()=>{i.maxRating=Number(e("maxRating").value),e("maxRatingVal").textContent=i.maxRating},e("maxRating").onchange=m}function Ne(){let t=p().length,r=Object.keys(u.names||{}).length;e("dataInfo").textContent=`${t} spillere og ${Object.keys(u.challenges||{}).length} SBC-udfordringer gemt lokalt. ${r?`${r} spillernavne kendt.`:"Ingen spillernavne endnu (vises som #ID)."}`}e("clearClub").onclick=async()=>{confirm("Slet alle gemte spillere? Bladr klubben igennem igen bagefter.")&&(await n.set({club:{}}),u.club={},x.clear(),re(),d("Klubdata ryddet"))},e("exportDebug").onclick=()=>{let t=new Blob([JSON.stringify({samples:u.samples,challenges:u.challenges,labels:u.labels},null,2)],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download="fc27-sbc-debug.json",r.click()};function re(){R(),b(),e("dropdown").hidden||h(),Ne(),S||$(),e("view-club").classList.contains("active")&&oe()}n.watch(async()=>{await y(),re()}),await y(),_e(),P(i.mode),re()}var Ae=`<!doctype html>
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
`;var Re=`:root {
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
`;(()=>{if(window.__fc27sbc){window.__fc27sbc.toggle();return}pe(ge);let o,n,g=!1,e=!1;function f(){return`${Re.replace(/@media \(prefers-color-scheme: light\) \{[\s\S]*?\n\}\n/,"").replace(/:root\[data-theme="dark"\][^\n]*\n/,"").replace(":root {",":host {").replace("html, body { margin: 0; }","").replace(/(^|\n)body \{/,"$1.app {")}
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
`}function u(){let m=new DOMParser().parseFromString(Ae,"text/html");return m.querySelectorAll("script").forEach(p=>p.remove()),m.body.innerHTML}async function i(){g||(g=!0,o=document.createElement("div"),o.id="fc27-sbc-host",n=o.attachShadow({mode:"open"}),n.innerHTML=`<style>${f()}</style>
      <button class="fab" id="fc27Fab" aria-label="Åbn SBC Solver">SBC</button>
      <div class="app closed" id="fc27App"><button class="close" id="fc27Close" aria-label="Luk">✕</button>${u()}</div>`,document.documentElement.appendChild(o),n.getElementById("fc27Fab").onclick=()=>x(!0),n.getElementById("fc27Close").onclick=()=>x(!1),S(n.getElementById("fc27Fab")),await Te(n,fe,{touch:!0}))}function S(m){let p=0,a=0,l=!1;try{let s=Number(localStorage.getItem("fc27sbc:fabBottom"));s>0&&(m.style.bottom=`${s}px`)}catch{}m.addEventListener("pointerdown",s=>{p=s.clientY,a=parseFloat(getComputedStyle(m).bottom),l=!1,m.setPointerCapture(s.pointerId)}),m.addEventListener("pointermove",s=>{if(!m.hasPointerCapture(s.pointerId))return;let B=p-s.clientY;Math.abs(B)>6&&(l=!0),l&&(m.style.bottom=`${Math.max(10,Math.min(window.innerHeight-70,a+B))}px`)}),m.addEventListener("pointerup",()=>{if(l){try{localStorage.setItem("fc27sbc:fabBottom",String(parseFloat(m.style.bottom)))}catch{}m.addEventListener("click",s=>s.stopImmediatePropagation(),{once:!0,capture:!0})}})}async function x(m){await i(),e=m,n.getElementById("fc27App").classList.toggle("closed",!e),n.getElementById("fc27Fab").classList.toggle("hide",e)}window.__fc27sbc={open:()=>x(!0),close:()=>x(!1),toggle:()=>x(!e)};let y=()=>window.__fc27sbcOpen?x(!0):i();document.body?y():document.addEventListener("DOMContentLoaded",y,{once:!0})})();})();
