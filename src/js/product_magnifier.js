class Magnifier{
  constructor(){
    this.img=document.querySelector(".p-top");
    this.focus=document.querySelector(".focus");
    this.big=document.querySelector(".big-picture");
    this.big_bg = document.querySelector(".big-picture img");       

    // 为了获取元素的移动距离，获取正确的focus位置
    this.mag=document.querySelector(".magnifier");

    this.c_off = {
       left : this.mag.offsetLeft,
       top : this.mag.offsetTop,
    }
    this.f_style = getComputedStyle(this.focus);
    this.i_style = getComputedStyle(this.img);
    this.boundary = {
            x :{
              min : 0,
              max : parseInt(this.i_style.width)-parseInt(this.f_style.width)
            },
             y :{
              min:0,
              max:parseInt(this.i_style.height)-parseInt(this.f_style.height)
            }
    }
    this.bindEvent();
  }
  getVaule( _style, attr ){
    return parseInt(_style[attr]);
  }

  bindEvent(){
    this.img.addEventListener(
      "mouseover",()=>{
       this.show();
      })
     this.img.addEventListener(
      "mouseout",()=>{
       this.hide();
      })
    this.img.addEventListener(
     "mousemove",(e)=>{
      this.move(e.clientX , e.clientY);
      })
  }
  show(){
     this.focus.style.display = "block";
     this.big.style.display = "block";
  }
  hide(){
      this.focus.style.display = "none";
      this.big.style.display = "none";
  }
  move(x,y){
    x = x - this.c_off.left - parseInt(this.f_style.width)/2;
    y = y - this.c_off.top - parseInt(this.f_style.height)/2;
    x = x <= this.boundary.x.min ? this.boundary.x.min : x;
    x = x >= this.boundary.x.max ? this.boundary.x.max : x;
    y = y <= this.boundary.y.min ? this.boundary.y.min : y;
    y = y >= this.boundary.y.max ? this.boundary.y.max : y;

   this.focus.style.left= x +"px";
   this.focus.style.top= y +"px";

   this.big_bg.style.left = - x * (800 /418) +"px";    
   this.big_bg.style.top = - y * (800 /418) +"px";  
  }
}
new Magnifier;


