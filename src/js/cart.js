import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';
console.log(123123)

let shop = cookie.get('shop');

shop = JSON.parse(shop);
//console.log(shop);

let idList = shop.map(el => el.id).join();

$.ajax({
  type: "get",
  url: "../interface/cart.php",
  data: { idList },
  dataType: "json",
}).then(res => {
  //console.log(res);
  let template = '';
  res.forEach((el, i) => {
    console.log(el);
    let pic = JSON.parse(el.picture);
    let current = shop.filter(elm => elm.id === el.id);
    console.log(current);
    template += `<div class="content-product">
            <div class="product-input">
              <input class="select" type="checkbox" />
            </div>
            <div class="content-img">
              <img src="./${pic[0].src}" alt="" class="img-qianbi" />
              <div class="qianbi-box-1">
                <div class="qianbi-link">
                 ${el.title}
                </div>
              </div>
            </div>
            <div class="apple-color-erji">
              <div class="color-erji-left">
                <span>颜色分类</span>
                <a href="" class="color-w">白色</a>
                <p>
                  <a href="" class="color-q">确定</a>
                  <a href="">取消</a>
                </p>
              </div>
              <div class="color-erji-img">
                <img src="./styles/css/cart/1.jpg" alt="" />
              </div>
            </div>

            <div class="price-line">￥<span class="one-prd-total">${el.price}</span></div>
            <div class="qianbi-num">
              <span class="del" href="">-</span>
              <input class="buy-num" type="number" value="${current[0].num}">
              <span class="add" href="">+</span>
            </div>

            <div class="qianbi-price">
              <p class="qianbi-price--">￥${el.price * current[0].num}</p>
              <!-- <p class="qianbi-price-text">进口税:商品最高全额包税</p> -->
            </div>

            <div class="qianbi-del">
              <a href="">移入收藏夹</a>
              <a href="" class="removeitem"  data-id="${el.id}">删除</a>
            </div>
          </div>`;
    //computeTotal();
  });

  $('.content-product-big').html(template);

  $('.content-product-big .removeitem').on('click', function () {
    let res = shop.filter(el => el.id != $(this).attr('data-id')); // 筛选被点击的元素
    console.log(res);
    cookie.set('shop', JSON.stringify(res)); // 剩余内容写回cookie
    location.reload();// 刷新页面



  });

  const domNum = $('.select').length
  //console.log(domNum);
  const totalDom = document.getElementsByClassName('top-text-num')
  let totalMoney = 0
  function computeTotal() {
    totalMoney = 0
    for (let i = 0; i < domNum; i++) {
      const { checked } = $('.select').eq(i)[0]
      const priceDom = Number(res[i].price)
      const numDom = $('.buy-num').eq(i)[0].value
      if (checked) {
        totalMoney += priceDom * numDom
      }
      [...totalDom].forEach(item => {
        item.innerHTML = totalMoney.toFixed(2)
      })
    }
  }
  for (let i = 0; i < domNum; i++) {
    $('.select').eq(i).on('change', (v) => {
      computeTotal()
    })
    $('.add').eq(i).on('click', (v) => {
      $('.buy-num').eq(i)[0].value++;
      $('.qianbi-price--').eq(i)[0].innerHTML = `¥${($('.buy-num').eq(i)[0].value * Number(res[i].price)).toFixed(2)}`
      computeTotal()
    })
    $('.del').eq(i).on('click', (v) => {
      $('.buy-num').eq(i)[0].value > 1 && $('.buy-num').eq(i)[0].value--;
      $('.qianbi-price--').eq(i)[0].innerHTML = `¥${($('.buy-num').eq(i)[0].value * Number(res[i].price)).toFixed(2)}`
      computeTotal()
    })
  }
  const checkAllLength = $('.check-all-input').length

  for (let i = 0; i < checkAllLength; i++) {
    $('.check-all-input').eq(i).on('change', (v) => {
      const { checked } = v.target
      handleAll(checked)
    })
  }
  function handleAll(value) {
    for (let i = 0; i < checkAllLength; i++) {
      $('.check-all-input').eq(i)[0].checked = value
    }
    for (let j = 0; j < domNum; j++) {
      $('.select').eq(j)[0].checked = value
    }
    computeTotal()
  }
  // 勾选店铺前的复选框;
  // content-md
  // console.log($('.content-product-big>.content-product>.product-input>.select'))
  // const shopLength = $('.content-md').length;
  // for(let i =0;i<shopLength;i++){
  //   $('.content-md').eq(i).on('change',(v)=>{
  //     const checked = v.target;
  //     // const checkboxLength = $('.content-product-big>.content-product>.product-input>.select').length;
  //     [...$('.content-product-big>.content-product>.product-input>.select').eq(i)].forEach(item => {
  //       console.log(a)
  //       item[0].checked = checked
  //     })
  //   })
  // }

}).catch(xhr => {
  console.log(xhr.status);
});