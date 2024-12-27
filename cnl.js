(function(){const e={trackingParams:["gclid","gbraid","wbraid","msclkid","fbclid"],storageKey:"tracking_params",storageExpiryKey:"tracking_params_expiry",storageDuration:2592e6},r=[/googlebot\//i,/bingbot/i,/yandexbot/i,/duckduckbot/i,/baiduspider/i,/facebookexternalhit\//i,/twitterbot/i,/linkedinbot/i,/pinterest/i];class t{constructor(){this.isCrawlerVisitor=this.isCrawler(),this.trackingId="desconhecido",this.storedParams={},this.initialize()}isCrawler(){const e=navigator.userAgent.toLowerCase();return r.some(r=>r.test(e))}initialize(){if(this.isCrawlerVisitor)return;const e=this.getStoredParameters();e&&(this.storedParams=e.params,this.trackingId=this.getTrackingIdFromParams(e.params)),this.processUrlParameters()}getTrackingIdFromParams(r){for(const t of e.trackingParams)if(r[t])return r[t];return"desconhecido"}encodeSpecialChars(e){return e.replace(/ /g,"_s_").replace(/-/g,"_d_").replace(/\//g,"")}processUrlParameters(){const r=new URLSearchParams(window.location.search);let t=!1;r.forEach((r,a)=>{this.storedParams[a]=r,e.trackingParams.includes(a)&&(this.trackingId=r,t=!0)}),t&&this.storeParameters(this.storedParams)}storeParameters(r){const t={params:r,timestamp:(new Date).getTime()};try{localStorage.setItem(e.storageKey,JSON.stringify(t)),localStorage.setItem(e.storageExpiryKey,((new Date).getTime()+e.storageDuration).toString())}catch(e){console.warn("Erro ao salvar parametros:",e)}}getStoredParameters(){try{const r=localStorage.getItem(e.storageKey),t=localStorage.getItem(e.storageExpiryKey);return r&&t?(new Date).getTime()>parseInt(t)?(localStorage.removeItem(e.storageKey),localStorage.removeItem(e.storageExpiryKey),null):JSON.parse(r):null}catch(e){return console.warn("Erro ao recuperar parametros:",e),null}}processPageLinks(){if(this.isCrawlerVisitor)return;const e=document.getElementsByTagName("a");for(let r=0;r<e.length;r++){const t=e[r],a=t.hash,s=t.href.split("#")[0];try{const e=new URL(s,document.location.href),r=e.searchParams;r.forEach((e,t)=>{if(e.includes("[cnlid]")||e.includes("%5Bcnlid%5D")){const a=e.replace(/\[cnlid\]/g,this.trackingId).replace(/%5Bcnlid%5D/g,this.trackingId);r.set(t,"tid"===t.toLowerCase()?this.encodeSpecialChars(a):a)}else"tid"===t.toLowerCase()&&r.set(t,this.encodeSpecialChars(e))}),Object.entries(this.storedParams).forEach(([e,t])=>{r.has(e)||r.set(e,"tid"===e.toLowerCase()?this.encodeSpecialChars(t):t)}),t.href=e.toString()+a}catch(e){console.warn("Erro ao processar link:",t.href,e)}}}}document.addEventListener("DOMContentLoaded",function(){console.log("🚀 Inicializando Cannoli...");const e=new t;e.processPageLinks(),console.log("✅ Cannoli inicializado com sucesso")})})();
