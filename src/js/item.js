import $ from './lib/jquery.esm.js';
import cookie from './lib/cookie.js';

let id = location.search.split('=')[1];
// console.log(id);

$.ajax({
  type: "get",
  url: "../interface/getitem.php",
  data: { id },
  dataType: "json"
}).then(res => {
  //console.log(res.price);
  let pic = JSON.parse(res.picture);
  $('.title').html(res.title);
  $('.price').html(res.price);
  $('.bottom-picture').attr("src", pic[0].src);



  //点击购物车
  $('#additem').on('click', function () {
    console.log(1);
    addItem(res.id, $('#num').val());
  });


}).catch(xhr => {
  console.log(xhr.status);
})

function addItem(id, num) {
  let product = { id, num };
  console.log(product);

  let shop = cookie.get('shop'); //从cookie 获得数据

  if (shop) {  //判断是否获得导数据
    shop = JSON.parse(shop);

    //当商品id在数据中存在  是修改数据  而不是添加id
    if (shop.some(el => el.id == id)) {
      let index = shop.findIndex(elm => elm.id == id);  //获得当前对象在数组中的索引
      //console.log(index);
      let count = parseInt(shop[index].num);
      count += parseInt(num);
      shop[index].num = count;

    } else {
      shop.push(product);
    }


  } else {
    shop = [];
    shop.push(product);
  }

  cookie.set('shop', JSON.stringify(shop));
}