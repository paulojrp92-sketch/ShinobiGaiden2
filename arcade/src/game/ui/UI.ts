export const ui=document.querySelector<HTMLDivElement>("#ui")!;
export function screen(markup:string):void{ui.innerHTML=markup;}
export function on(id:string,fn:()=>void):void{ui.querySelector<HTMLButtonElement>("#"+id)?.addEventListener("click",fn);}
export function button(id:string,label:string,cls=""):string{return '<button id="'+id+'" class="arcade-button '+cls+'">'+label+'</button>';}
export function heading(kicker:string,title:string):string{return '<header class="screen-heading"><p class="eyebrow">'+kicker+'</p><h2>'+title+'</h2></header>';}
