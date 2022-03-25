var Z=Object.defineProperty,J=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var O=(e,t,n)=>t in e?Z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,l=(e,t)=>{for(var n in t||(t={}))T.call(t,n)&&O(e,n,t[n]);if(A)for(var n of A(t))j.call(t,n)&&O(e,n,t[n]);return e},p=(e,t)=>J(e,W(t));var S=(e,t)=>{var n={};for(var s in e)T.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&A)for(var s of A(e))t.indexOf(s)<0&&j.call(e,s)&&(n[s]=e[s]);return n};import{a as d,j as I,m as G,u as q,b as k,c as X,R as M,d as F,e as C,T as ee,f as te}from"./vendor.fbd969e7.js";const ne=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}};ne();function w(e,t){const n=d(e);return d(o=>o(n),(o,a,c)=>{const f=typeof c=="function"?c(o(n)):c;a(n,f),t({get:o,set:a,nextValue:f})})}const L=()=>({loading:!0,error:null,data:null}),re="./",N=re,se=/dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)/i,oe=/dppm-(\d{1,3}\.\d{1,4}\.\d{1,5})_on_(\d\d\d\d\.\d\d\.\d\d)-(r)-(chrome|firefox|edge)/i;var g=(e=>(e.unknown="u",e.chrome="c",e.firefox="f",e.edge="e",e))(g||{});const ae=e=>e==="c"?"Chrome":e==="f"?"Firefox":e==="e"?"Microsoft Edge":"?",ie=e=>e==="dp"?"DP":e==="hp"?"HP":e==="de"?"Dell":"?";function ce(e,t){const n=e.match(se);t.version=n?n[1]:"",t.updated=n?n[2]:""}function D(e,t,n,s){return e.find(o=>o.browser===t&&o.brand===n&&o.qa===s)}function _(e,t,n,s){["dp","hp","de"].forEach(f=>{if(!e[f])return;let m=e[f],h={url:m.url,version:"",updated:"",brand:f,browser:t,qa:n};m.version&&m.updated?(h.version=m.version||"",h.updated=m.updated||""):ce(h.url,h),s.push(h)});let o=D(s,t,"dp",n);if(!o)throw new Error("Cannot get dp info");D(s,t,"hp",n)||s.push({url:o.url,version:o.version,updated:o.updated,brand:"hp",browser:o.browser,qa:o.qa}),D(s,t,"de",n)||s.push({url:o.url,version:o.version,updated:o.updated,brand:"de",browser:o.browser,qa:o.qa})}function le(e){let t=[],n=[],s=[],o=[];return _(e.browsers.firefox.qaUrl,"f",!0,t),_(e.browsers.firefox.extensionUrl,"f",!1,n),_(e.browsers.chrome.qaUrl,"c",!0,s),_(e.browsers.chrome.extensionUrl,"c",!1,o),{firefox:t[0],chrome:s[0],summary:[...t,...n,...s,...o]}}async function de(){console.log("Fetching: current config");const e=await fetch(`${N}config.json`,{cache:"no-cache"});if(!e.ok)throw new Error("No access to the HID server current configuration");return e}async function ue(){const t=await(await de()).json();return le(t)}async function fe(){console.log("Fetching: release notes:",`${N}history.md`);let t=await(await fetch(`${N}history.md`,{cache:"no-cache"})).text();if(!t)throw new Error("The result should not be empty");return t}var me="/page-qa2/assets/chrome.1b2e3662.svg",he="/page-qa2/assets/firefox.b35a1bc3.svg",pe="/page-qa2/assets/edge.fc63a188.svg";const r=I.exports.jsx,i=I.exports.jsxs,H=I.exports.Fragment;function xe(e){const s=e,{title:t}=s,n=S(s,["title"]);return i("svg",p(l({fill:"currentColor",viewBox:"0 0 125 33.4"},n),{children:[t&&r("title",{children:t}),r("path",{d:"M79.96 33.16V.25c10.24 0 20.24-.68 30.09.2a16.09 16.09 0 0 1 15 16.47c0 8.41-5.76 15.23-15.27 16.05-9.75.84-19.58.19-29.82.19ZM96.22 3.21v27.07c6.61 1.08 9.56-.46 10.37-6.29a51.35 51.35 0 0 0 .06-13.9c-.87-6.28-3.5-7.74-10.43-6.88ZM0 32.8V.29h15.89v13.92h12V.34h16.05V32.7H28.03V19.31H16.11V32.8ZM54.24 32.86V.39h15.65v32.47Z"})]}))}function ge(e){return r("img",l({src:me,alt:"Chrome logo"},e))}function ve(e){return r("img",l({src:he,alt:"Firefox logo"},e))}function be(e){return r("img",l({src:pe,alt:"Firefox logo"},e))}function ye(e){const t=e.match(oe);let n={};return n.fname=e,n.version=t?t[1]:"",n.updated=t?t[2]:"",n.release=t?t[3]==="r":!1,n.browser=t?t[4]:"",n}async function Ne(){console.log("Fetching: extensions on server");const e=await fetch(`${N}existing.json`,{cache:"no-cache"});if(!e.ok)throw new Error("No access to the HID server");let n=(await e.json()).map(s=>ye(s.name)).filter(s=>s.version);return n.push({fname:"../../maxz/traytools.zip.txt",version:"2.0.7234",updated:"2019.10.20",release:!1,browser:"maxz"}),n.sort((s,o)=>s.version<o.version?-1:s.version>o.version?1:0),n}function we(e,t=100){let n,s,o;return function(...a){o=this,s=a,!n&&(n=setTimeout(()=>{n=null,e.apply(o,s)},t))}}var u;(e=>{const t="react-page-qa2-01";e.initialData={open1:!1,open2:!1,open3:!1,open4:!1,open5:!1};function n(){const s=localStorage.getItem(t);if(s)try{let o=JSON.parse(s);e.initialData=l(l({},e.initialData),o)}catch{}}n(),e.save=we(function(o){let a={open1:o(P),open2:o(U),open3:o(B),open4:o(Y),open5:o(Q)};localStorage.setItem(t,JSON.stringify(a))},1e3)})(u||(u={}));const Ae=d({name:"Chrome",icon:r(ge,{className:"w-8 h-8"}),version:"3.4.430",url:"chrome"}),_e=d({name:"Firefox",icon:r(ve,{className:"w-8 h-8"}),version:"3.4.430",url:"chrome"});d({name:"Edge",icon:r(be,{className:"w-8 h-8"}),version:"3.4.430",url:"chrome"});const v=d(L()),V=d(e=>e(v),(e,t)=>{async function n(){t(v,s=>p(l({},s),{loading:!0}));try{const s=G(await fe());t(v,{loading:!1,error:null,data:s})}catch(s){t(v,{loading:!1,error:s,data:null})}}n()});V.onMount=e=>e();const Ce=d(e=>e(v).data||""),b=d(L()),$=d(e=>e(b),(e,t)=>{async function n(){t(b,s=>p(l({},s),{loading:!0}));try{const s=await ue();t(b,{loading:!1,error:null,data:s})}catch(s){t(b,{loading:!1,error:s,data:null})}}n()});$.onMount=e=>e();const y=d(L()),z=d(e=>e(y),(e,t)=>{async function n(){t(y,s=>p(l({},s),{loading:!0}));try{const s=await Ne();t(y,{loading:!1,error:null,data:s})}catch(s){t(y,{loading:!1,error:s,data:null})}}n()});z.onMount=e=>e();const P=w(u.initialData.open1,({get:e})=>u.save(e)),U=w(u.initialData.open2,({get:e})=>u.save(e)),B=w(u.initialData.open3,({get:e})=>u.save(e)),Y=w(u.initialData.open4,({get:e})=>u.save(e)),Q=w(u.initialData.open5,({get:e})=>u.save(e)),K={textShadow:"1px 1px 2px #000"};function Fe(){return i(H,{children:[r("div",{className:"px-6 py-5 flex items-center justify-between bg-[#003f82] shadow-sm cursor-default",children:i("div",{className:"flex items-center space-x-2",children:[r("div",{className:"w-20 py-2 flex items-center justify-center bg-white rounded-md",children:r(xe,{className:"px-2",fill:"#002f87"})}),r("div",{className:"pb-1 text-3xl tracking-tighter font-light text-slate-100 uppercase whitespace-nowrap",style:K,children:"QA Extensions"})]})}),r("div",{className:"h-1 bg-[#002f87]"})]})}function Se(o){var a=o,{className:e,children:t,open:n=!0}=a,s=S(a,["className","children","open"]);const c=q({open:n?1:0,config:{mass:.2,tension:492,clamp:!0}});return i("div",p(l({className:e||"px-2 py-1 bg-slate-500 text-stone-100 uppercase flex items-center justify-between select-none cursor-pointer font-ui"},s),{children:[t,r("svg",{className:"w-6 h-6 p-1 stroke-current stroke-[.6rem] fill-transparent",viewBox:"0 0 100 100",children:r(k.path,{d:c.open.to({range:[0,.3,1],output:["M 50 13 L 80 43 L 50 72","M 50 13 L 50 42 L 50 72","M 80 35 L 50 65 L 20 35"]})})})]}))}function De({toggle:e,children:t}){const[n,{height:s,top:o}]=X(),[a,c]=M.useState(!0),f=q({overflow:"hidden",height:e?s+o:0,config:a?{duration:0}:{mass:.2,tension:492,clamp:!0},onRest:()=>a&&c(!1)});return r("div",{children:r(k.div,{style:f,children:r("div",{ref:n,children:t})})})}function x({title:e,children:t,openAtom:n}){const[s,o]=F(n);return i("div",{children:[r(Se,{className:"pl-4 px-2 py-2 bg-[#003f82] text-stone-100 uppercase rounded flex items-center justify-between select-none cursor-pointer font-ui",style:K,open:s,onClick:()=>o(a=>!a),children:e}),r(De,{toggle:s,children:t})]})}var Ie="/page-qa2/assets/qa-header.c326e895.jpg";function Me(){return r("div",{className:"",children:r("img",{className:"h-full object-cover grayscale",src:Ie,alt:"hero"})})}const Le={boxShadow:"0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)"};function R({extensionAtom:e}){const[t]=F(e);return i("div",{className:"px-4 py-3 border",style:Le,children:[i("div",{className:"flex items-center space-x-3",children:[t.icon,i("div",{className:"",children:[i("div",{className:"font-bold scale-y-125 whitespace-nowrap",children:[t.name," QA extension"]}),r("div",{className:"text-sm",children:t.version})]})]}),i("div",{className:"flex items-center justify-end space-x-2 text-sm",children:[r("a",{className:"px-2 py-0.5 uppercase underline",href:"https://github.com/maxzz",target:"_blank",children:"Install"}),r("div",{className:"px-2 py-0.5 uppercase underline cursor-pointer",onClick:()=>{navigator.clipboard.writeText("here")},children:"Copy URL"})]})]})}function Oe(){return i("div",{className:"flex flex-col justify-center space-y-2",children:[r(R,{extensionAtom:Ae}),r(R,{extensionAtom:_e})]})}function Te(){return i("div",{className:"mt-4 grid grid-cols-[minmax(8rem,1fr),minmax(8rem,32rem)] gap-4",children:[r(Me,{}),r(Oe,{})]})}function je(){const e=C(Ce);return r("div",{className:"py-2",children:r("div",{className:"notes max-h-96 px-4 overflow-y-auto bg-slate-100",dangerouslySetInnerHTML:{__html:e}})})}function Re(e){return e.reduce((t,n)=>(n.browser&&n.brand&&(t[n.browser]||(t[n.browser]={}),t[n.browser][n.brand]||(t[n.browser][n.brand]={}),t[n.browser][n.brand][n.qa?"qa":"release"]=n),t),{})}function Ee(e){const t={};for(const[n,s]of Object.entries(e)){t[n]||(t[n]=[]);for(const[o,a]of Object.entries(s))t[n].push({brand:o,qa:a.qa,release:a.release})}return t}function E({browser:e,table:t=[]}){return i("div",{className:"cursor-default",children:[r("div",{className:"mb-1 text-sm font-bold",children:`${ae(e)} extensions`}),i("div",{className:"grid grid-cols-3",children:[r("div",{className:"border-b text-xs",children:"Brand"}),r("div",{className:"border-b text-xs",children:"QA"}),r("div",{className:"border-b text-xs",children:"Public"}),t.map((n,s)=>{var o,a,c,f,m,h;return i(M.Fragment,{children:[r("div",{className:`text-xs ${s?"opacity-25":""}`,children:ie(n.brand)}),r("div",{className:`text-xs ${s?"opacity-25":""}`,title:`${(o=n.qa)!=null&&o.updated?`Updated on ${(a=n.qa)==null?void 0:a.updated}`:""}`,children:(c=n.qa)==null?void 0:c.version}),r("div",{className:`text-xs ${s?"opacity-25":""}`,title:`${(f=n.release)!=null&&f.updated?`Updated on ${(m=n.release)==null?void 0:m.updated}`:""}`,children:(h=n.release)==null?void 0:h.version})]},s)})]})]})}function qe(){var s;const[e]=F(b),t=((s=e.data)==null?void 0:s.summary)||[],n=Ee(Re(t));return i("div",{className:"py-2 text-sm flex flex-col space-y-2",children:[r("p",{children:"Summary table of current extension versions."}),i("div",{className:"max-w-2xl grid grid-cols-2 gap-x-2",children:[r(E,{browser:g.firefox,table:n[g.firefox]}),r(E,{browser:g.chrome,table:n[g.chrome]})]}),i("div",{className:"text-xs",children:[r("p",{className:"mb-1",children:"Brand legend:"}),i("ul",{className:"ml-4 list-disc",children:[r("li",{children:"DP - extension for DigitalPersoane product"}),r("li",{children:"HP - extension for HP client secury product"}),r("li",{children:"DELL - extension for DELL privacy manager product"})]})]}),i("div",{className:"text-xs",children:[r("p",{className:"",children:"* HP and Dell extensions are still available for historical reasons. You don't need to test them."}),r("p",{className:"",children:"** The Mozilla Firefox extension is not currently updated due to issues on Moz://a's side."})]})]})}const ke="_iconCh_1rooh_1",He="_iconFf_1rooh_5",Ve="_iconMs_1rooh_9",$e="_iconTt_1rooh_13";var ze={iconCh:ke,iconFf:He,iconMs:Ve,iconTt:$e};function Pe(e){return`${N}${e}`}function Ue(e){return ze[{chrome:"iconCh",firefox:"iconFf",maxz:"iconTt"}[e.browser]||"iconMs"]}function Be(e){return{chrome:"Chrome",firefox:"Firefox",maxz:"DevTools"}[e.browser]||"Microsoft Edge"}function Ye(e){return`${Be(e)} extension released on ${e.date}`}function Qe(e){let t=0;const n={year:"numeric",month:"long",day:"numeric"};return e.map(s=>{const o=new Date(s.updated.replace(/\./g,"-")+"T00:00:00"),a=o.getFullYear();let c=a!==t;return t=a,p(l({},s),{yearChanged:c,year:a,cls:Ue(s),date:o.toLocaleDateString("en-US",n)})})}function Ke(e){const t={};return e.forEach(n=>{t[n.year]||(t[n.year]=[]),t[n.year].push(n)}),t}function Ze(){const[e]=F(y),t=Ke(Qe(e.data||[]));return i("div",{className:"py-2",children:[r("p",{className:"text-sm",children:"List of previously released extensions that are still available on the HID server. You can download any version for testing."}),r("div",{className:"mt-1 text-xs cursor-default",children:Object.entries(t).reverse().map(([n,s],o)=>i("div",{children:[r("div",{className:"mt-2 mb-1 border-b border-slate-200 font-bold",children:n}),r("div",{className:"columns-7",children:s.map((a,c)=>i("a",{className:"leading-5 flex items-center",href:Pe(a.fname),target:"_blank",title:Ye(a),children:[r("span",{className:`w-4 h-4 mr-1 ${a.cls} saturate-150`}),r("span",{children:a.version})]},c))})]},o))})]})}var Je="/page-qa2/assets/2022-03-01_19-09-50.b9956752.png";function We(){return i("div",{className:"py-2 text-sm flex flex-col space-y-2",children:[r("p",{children:"Here are some test web apps that you can use to test the various features of Password Manager."}),r("div",{children:r("img",{className:"m-auto bg-slate-300",src:Je,width:"200px",alt:"test applications preview"})}),i("ul",{className:"ml-4 list-disc",children:[r("li",{children:r("a",{className:"underline",href:"https://maxzz.github.io/test-pm-domain-logins/#",target:"_blank",children:"Test login and password change screens on the same domain"})}),r("li",{children:r("a",{className:"underline",href:"https://maxzz.github.io/test-pm-second",target:"_blank",children:"Simple login screen to test login transactions"})}),r("li",{children:r("a",{className:"underline",href:"https://maxzz.github.io/test-pm",target:"_blank",children:"Customizable login and password change screens"})})]})]})}function Ge(){return i("div",{className:"py-2",children:[r("p",{className:"font-semibold",children:"Browser extensions installation instructions"}),i("p",{children:["Additional documents are available on the ",r("a",{className:"underline",href:"https://crossmatch.atlassian.net/wiki/spaces/ALTUS/pages/103023073/Browser+extensions+installation",children:"HID Confluence website."})]}),r("div",{className:"mt-4 font-semibold",children:"Check for duplicate extensions"}),r("p",{children:"Only one DigitalPersona extension can run at the same time in the same browser. After completing (or before starting) the installation of the DigitalPersona extension, ensure that all previous versions of the extension are uninstalled."})]})}function Xe(){return r("div",{className:"py-4"})}function et(){return i("div",{className:"h-screen flex flex-col text-[#001845]",children:[r(Fe,{}),r("div",{className:"flex-1 overflow-y-auto",style:{overflow:"overlay"},children:i("div",{className:"m-auto max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4",children:[r(Te,{}),r(x,{openAtom:P,title:"Release Notes",children:r(je,{})}),r(x,{openAtom:U,title:"Current verions",children:r(qe,{})}),r(x,{openAtom:B,title:r("div",{title:"Previously released extensions",children:"Archive"}),children:r(Ze,{})}),r(x,{openAtom:Y,title:"Test Applications for QA",children:r(We,{})}),r(x,{openAtom:Q,title:"Final notes",children:r(Ge,{})}),r(Xe,{})]})})]})}function tt(){return r("div",{className:"toaser",children:r(ee,{position:"bottom-right",reverseOrder:!1,gutter:8,containerClassName:"",containerStyle:{},toastOptions:{className:"",duration:5e3,style:{background:"#363636",color:"#fff"},success:{duration:3e3,theme:{primary:"green",secondary:"black"}}}})})}function nt(){return C($),C(z),C(V),null}function rt(){return i(H,{children:[r(tt,{}),r(nt,{}),r("div",{className:"min-h-full overflow-hidden bg-slate-50",children:r(et,{})})]})}te.render(r(M.StrictMode,{children:r(rt,{})}),document.getElementById("root"));