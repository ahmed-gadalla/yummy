// ****** nav

var body = $("html, body");

// **************scroll smooth

// $(".nav-item").on("click", function (e) {
//   let aHref = e.target.getAttribute("href");
//   console.log(aHref);

//   let sectionOffset = $(aHref).offset().top;
//   console.log(sectionOffset);
//   body.stop().animate({ scrollTop: sectionOffset }, 1500);
// });
// loading***********
$(".logo").on("click", function () {
  getMeals("");

  $("#home").addClass("show");
  $("#fullMeale").removeClass("show");
  $("#search").removeClass("show");
  $("#area").removeClass("show");
  $("#ingredients").removeClass("show");
});

$(function () {
  $(".loader").fadeOut(1500, function () {
    $(".loading").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
      $(".loading").remove();
    });
  });
});

// aside****************
let boxColor = $(".box-color");

$("#setIcon").on("click", function () {
  $(".siteBox").animate({ width: "toggle" }, 1000);
});

// home***********

meals = [];

async function getMeals(mealName) {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );

  var res = await url.json();

  meals = res;
  displayMailMeals();
}

getMeals("");

function displayMailMeals() {
  box = ``;

  for (var i = 0; i < meals.meals.length; i++) {
    box += `<div class="col-lg-3 col-md-4 col-sm-12" >
    <div class="meal-card position-relative rounded-3">
      <img src="${meals.meals[i].strMealThumb}" alt="" class="w-100" />
      <div class="layer rounded-3 " id="${meals.meals[i].idMeal}">
        <h3>${meals.meals[i].strMeal}</h3>

      </div>
    </div>
  </div>
    `;
  }

  document.getElementById("boxMeals").innerHTML = box;
}

$("#boxMeals").on("click", async function (e) {
  let curuntmeal = e.target;
  let mealeId = curuntmeal.getAttribute("id");
  console.log(mealeId);
  await getMealeDetails(mealeId);
  await displaymealeDetails();
  $("#home").removeClass("show");
  // $("#categories").removeClass("show");

  $("#fullMeale").addClass("show");
});

$(".fa-chevron-down").on("click", function () {
  $("#fullMeale").removeClass("show");
  $("#home").addClass("show");
  console.log("hiiiiiii");
});

mealeDetails = [];

async function getMealeDetails(mId) {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mId}`
  );

  var { meals: res } = await url.json();

  mealeDetails = res;
}

function displaymealeDetails() {
  document.getElementById(
    "fullDetails"
  ).innerHTML = `<div class="col-lg-4 col-md-12">
  <div class="p-3 shadow rounded-3">
    <img
      src="${mealeDetails[0].strMealThumb}"
      alt=""
      class="w-100 rounded-3"
    />
    <h4 class="pt-3">${mealeDetails[0].strMeal}</h4>
  </div>
</div>

<div class="col-lg-8 col-md-12">
  <div class="p-3 shadow rounded-3">
    <h3>Instructions</h3>
    <p class="py-3">
    ${mealeDetails[0].strInstructions}
    </p>
    <h3>Area : ${mealeDetails[0].strArea}</h3>
    <h3 class="py-3">Category : ${mealeDetails[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <div class="d-flex flex-wrap py-2">
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure1} ${mealeDetails[0].strIngredient1}</span>
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure2} ${mealeDetails[0].strIngredient2}</span>
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure3} ${mealeDetails[0].strIngredient3}</span>
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure4} ${mealeDetails[0].strIngredient4}</span>
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure5} ${mealeDetails[0].strIngredient5}</span>
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure6} ${mealeDetails[0].strIngredient6}</span>
      <span class="bg-warning p-2 m-1 rounded-3">${mealeDetails[0].strMeasure7} ${mealeDetails[0].strIngredient7}</span>
    </div>
    <h3>Tags :</h3>
    <div class="d-flex flex-wrap pt-2">
      <span class="bg-info p-2 m-1 rounded-3">${mealeDetails[0].strTags}</span>
      
    </div>
    <div class="pt-3">
      <a href="${mealeDetails[0].strSource}" class="btn btn-success m-1" target="_blank">source</a>
      <a href="${mealeDetails[0].strYoutube}" class="btn btn-danger m-1" target="_blank">youtube</a>
    </div>
  </div>
</div>

  
  `;
}

// *******search
$("#searchLink").on("click", function () {
  // $("#home").removeClass("show");
  $("#fullMeale").removeClass("show");
  $("#home").addClass("show");
  $("#fullMeale").removeClass("show");
  $("#search").removeClass("show");
  $("#area").removeClass("show");
  $("#ingredients").removeClass("show");
  $("#contact").removeClass("show");

  $("#search").toggleClass("show");
});

let nameInput = document.getElementById("NameInput");
async function search() {
  var searchName = nameInput.value;

  await getMeals(searchName);
  await $("#home").addClass("show");
}

let firstLitterInput = document.getElementById("firstLitterInput");

async function searchLitter() {
  var searchlitter = firstLitterInput.value;
  if (searchlitter != "") {
    await getLitterMeals(searchlitter);
    await $("#home").addClass("show");
  }
}

async function getLitterMeals(mealeLitter) {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealeLitter}`
  );

  var res = await url.json();

  meals = res;
  displayMailMeals();
}

// ********* categories
$("#categoriesLink").on("click", async function () {
  $("#home").removeClass("show");
  $("#fullMeale").removeClass("show");
  $("#search").removeClass("show");
  $("#area").removeClass("show");
  $("#ingredients").removeClass("show");
  $("#contact").removeClass("show");

  $("#categories").addClass("show");

  await getCategoriesList();
  await displayCategoriesList();
});

categoriesList = [];

async function getCategoriesList() {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  var res = await url.json();

  categoriesList = res;
  console.log(categoriesList);
  displayMailMeals();
}

function displayCategoriesList() {
  box = ``;

  for (var i = 1; i < categoriesList.categories.length; i++) {
    box += `<div class=" col-lg-3 col-md-4 col-sm-12" >
    <div class="meal-card  position-relative rounded-3">
      <img src="${
        categoriesList.categories[i].strCategoryThumb
      }" alt="" class="w-100" />
      <div class="layer rounded-3 " cat="${
        categoriesList.categories[i].strCategory
      }">
        <h3>${categoriesList.categories[i].strCategory} </h3>
        <p>${categoriesList.categories[i].strCategoryDescription.slice(
          1,
          80
        )}  more ...</p>

      </div>
    </div>
  </div>
    `;
  }

  document.getElementById("ctegoriesList").innerHTML = box;
}

$("#ctegoriesList").on("click", async function (e) {
  let curuntcategory = e.target;
  let category = $(curuntcategory).attr("cat");
  console.log(category);
  await getMealsCategry(category);
  // await displaymealeDetails();
  $("#home").addClass("show");
  $("#fullMeale").removeClass("show");
  $("#categories").removeClass("show");
});

async function getMealsCategry(mealCateg) {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCateg}`
  );

  var res = await url.json();

  meals = res;
  displayMailMeals();
}

// ******area
$("#areaLink").on("click", async function () {
  $("#home").removeClass("show");
  $("#fullMeale").removeClass("show");
  $("#search").removeClass("show");
  $("#ingredients").removeClass("show");
  $("#categories").removeClass("show");
  $("#contact").removeClass("show");

  $("#area").addClass("show");

  await getArea();
  // await displayCategoriesList();
});

area = [];

async function getArea() {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  var res = await url.json();

  area = res;
  displayArea();
}

function displayArea() {
  box = ``;

  for (var i = 1; i < area.meals.length; i++) {
    box += `
    <div class=" col-lg-2 col-md-3 col-sm-6 ">
    <div class="bg-white p-3 text-center text-capitalize rounded-3 shadow areaCard">
      <i class="fa-solid fa-magnifying-glass-location"></i>
      <h3 class="pt-2">${area.meals[i].strArea}</h3>
    </div>
  </div>

    `;
  }

  document.getElementById("areaList").innerHTML = box;
}

$("#areaList").on("click", async function (e) {
  let curuntArea = e.target;
  let Area = await $(curuntArea).text();
  console.log(Area);
  await getAreaMeale(Area);
  $("#home").addClass("show");
  $("#fullMeale").removeClass("show");
  $("#categories").removeClass("show");
  $("#area").removeClass("show");
});

async function getAreaMeale(area) {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  var res = await url.json();

  meals = res;
  displayMailMeals();
}

// ******Ingredients

$("#ingredientsLink").on("click", async function () {
  $("#home").removeClass("show");
  $("#fullMeale").removeClass("show");
  $("#search").removeClass("show");
  $("#categories").removeClass("show");
  $("#area").removeClass("show");
  $("#contact").removeClass("show");

  $("#ingredients").addClass("show");

  await getIngredients();
});

ingredients = [];

async function getIngredients() {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  var res = await url.json();

  ingredients = res;
  displayIngredients();
}

function displayIngredients() {
  box = ``;

  for (var i = 1; i < ingredients.meals.length; i++) {
    box += `
    <div class=" col-lg-2 col-md-3 col-sm-6 ">
            <div class="p-2 bg-white rounded-3 text-center shadow ingredientsList">
              <i class="fa-solid fa-bowl-food"></i>
              <h3 class="py-2">${ingredients.meals[i].strIngredient}</h3>
            </div>
        </div>

    `;
  }

  document.getElementById("ingredientsList").innerHTML = box;
}

$("#ingredientsList").on("click", async function (e) {
  let curuntArea = e.target;
  let ingredients = await $(curuntArea).text().replaceAll(" ", "_");
  // let ingredients =await res.toLowerCase()
  console.log(ingredients);
  await getIngredientsMeale(ingredients);
  $("#home").addClass("show");
  $("#fullMeale").removeClass("show");
  $("#categories").removeClass("show");
  $("#area").removeClass("show");
  $("#ingredients").removeClass("show");
});

async function getIngredientsMeale(i) {
  var url = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`
  );

  var res = await url.json();

  meals = res;
  console.log(meals);
  displayMailMeals();
}

// contact**********
$("#contactLink").on("click", async function () {
  $("#home").removeClass("show");
  $("#fullMeale").removeClass("show");
  $("#search").removeClass("show");
  $("#categories").removeClass("show");
  $("#area").removeClass("show");
  $("#ingredients").removeClass("show");
  $("#contact").addClass("show");
});

function nameLocate() {
  var name = document.getElementById("nameInput").value;
  var regexp = /\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+/gm;
  if (name != "") {
  }

  if (regexp.test(name)) {
    $("#nameAlert").removeClass("show");
    return true;
  } else {
    $("#nameAlert").addClass("show");
    return false;
  }
}

function emailLocate() {
  var email = document.getElementById("emailInput").value;
  var regexp =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email != "") {
  }

  if (regexp.test(email)) {
    $("#emailAlert").removeClass("show");

    return true;
  } else {
    $("#emailAlert").addClass("show");

    return false;
  }
}

function passwordLocate() {
  var password = document.getElementById("passInput").value;
  var regexp = /^[A-Z][A-Za-z]\w{6,}$/;
  if (password != "") {
  }

  if (regexp.test(password)) {
    $("#passAlert").removeClass("show");

    return true;
  } else {
    $("#passAlert").addClass("show");

    return false;
  }
}

function phoneLocate() {
  var phone = document.getElementById("PhoneInput").value;
  var regexp = /^01[0125][0-9]{8}$/;
  if (phone != "") {
  }

  if (regexp.test(phone)) {
    $("#PhoneAlert").removeClass("show");

    return true;
  } else {
    $("#PhoneAlert").addClass("show");

    return false;
  }
}

function ageLocate() {
  var age = document.getElementById("ageInput").value;
  var regexp = /^\d{1,2}$/;
  if (age != "") {
  }

  if (regexp.test(age)) {
    $("#ageAlert").removeClass("show");

    return true;
  } else {
    $("#ageAlert").addClass("show");

    return false;
  }
}

function repassLocate() {
  var repass = document.getElementById("repassInput").value;
  var pass = document.getElementById("passInput").value;

  if (repass != "") {
  }

  if (repass === pass) {
    $("#repassAlert").removeClass("show");

    return true;
  } else {
    $("#repassAlert").addClass("show");

    return false;
  }
}
