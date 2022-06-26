import $ from './lib/jquery.esm.js';

$.ajax({
  type: "get",
  url: "../interface/getitems.php",
  dataType: "json"
}).then(res => {

  let template = '';

  res.forEach(el => {
    let pic = JSON.parse(el.picture);
    console.log(pic);
    template += ` <a href="./product.html?id=${el.id}">
              <img src="${pic[0].src}" alt="" />
              <div class="description">
                ${el.title}
              </div>
              <span>${el.price}</span>
            </a>`;
  });


  $('.products').html(template);

}).catch(xhr => {
  console.log(xhr.status);
});