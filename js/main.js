// const { data } = require("browserslist");
// const { region } = require("caniuse-lite");
// const { async } = require("regenerator-runtime");

const container = document.querySelector(".container");
const containerCountries = document.querySelector(".container__countries");

const header = document.querySelector(".header");
const headerLogo = document.querySelector(".header__logo");

const darkModeBtn = document.querySelector(".header__dark-mode");
const darkModeBtnIcon = document.querySelector(".header__btn-icon");

const filterBtn = document.querySelector(".ctas__select-btn");
const filterBtnIcon = document.querySelector(".ctas__select-btn-icon");
const filterBtnText = document.querySelector(".ctas__select-btn-text");
const filterOptionList = document.querySelector(".ctas__select-options");
const filterOptions = document.querySelectorAll(".ctas__select-option");

const searchBox = document.querySelector(".ctas__search-box");
const searchInput = document.querySelector(".ctas__search-input");
const searchBtnIcon = document.querySelector(".ctas__search-btn_icon");

const backBtn = document.querySelector(".ctas__btn");
const backBtnIcon = document.querySelector(".ctas__btn-icon");

const ctasForm = document.querySelector(".ctas__form");

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

filterBtnText.textContent = "All";

// Show Options list on click
filterBtn.addEventListener("click", function (e) {
  filterOptionList.classList.toggle("active");
});

// Insert clicked options on the button text and unshow the list of options
filterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    filterBtnText.textContent = option.textContent;
    filterOptionList.classList.toggle("active");
  });
});

// Toggle Dark mode class function

class Country {
  i = 0;

  constructor(data, markup) {
    this._markup = markup;
    this._data = data;
    darkModeBtn.addEventListener("click", this.addDarkModeStyle.bind(this));

    window.addEventListener("load", this.fetchData.bind(this, "all"));

    filterOptions.forEach((option) => {
      option.addEventListener(
        "click",
        this.addCountriesFromFilter.bind(this, option)
      );
    });

    backBtn.addEventListener("click", this.backToMainHandler.bind(this));

    searchInput.addEventListener("input", this.inputHandler.bind(this));
  }

  // HELPER FUNCTIONS
  removeDisplayNone(cta) {
    cta.classList.remove("disp-none");
  }
  addDisplayNone(cta) {
    cta.classList.add("disp-none");
  }

  toggleDarkModeClass(item) {
    item.classList.toggle("darkmode");
  }

  // Initialization
  async fetchData(region) {
    try {
      this.addDisplayNone(backBtn);
      this.createLoadingSpinner();

      this.i = 0;
      const resp = await fetch(`https://restcountries.com/v3.1/${region}`);
      this._data = await resp.json();
      containerCountries.innerHTML = "";
      this.addCountries();
    } catch (err) {
      this.createErrorMessage();
    }
  }

  // Creating markup functions

  createErrorMessage() {
    this._markup = `
    <div class="country__error">
      <h2 class="country__error-msg">Failed to load. Please Try again!</h2>
    </div>
    `;
    containerCountries.insertAdjacentHTML("afterbegin", this._markup);
  }

  createLoadingSpinner() {
    this._markup = `
    <div class="container__countries-loader ${
      darkModeBtn.classList.contains("darkmode") ? "darkmode" : ""
    }"></div>`;

    containerCountries.insertAdjacentHTML("beforeend", this._markup);
  }
  createCountryMarkup(data) {
    this._markup = `
    <div class="country ${
      darkModeBtn.classList.contains("darkmode") ? "darkmode" : ""
    }">
      <button class="country__flag-btn">
        <img
        src="${data.flags.png}"
        alt="${data.name.common}-flag"
        class="country__flag"
        />
      </button>

      <div class="country__text ${
        darkModeBtn.classList.contains("darkmode") ? "darkmode" : ""
      }">
        <h2 class="country__name">${data.name.common}</h2>
        <ul class="country__details">
          <li class="country__detail">
            Population:
            <span class="country__population country__detail-thin"
              >${data.population}</span
            >
          </li>
          <li class="country__detail">
            Region:
            <span class="country__region country__detail-thin">${
              data.region
            }</span>
          </li>
          <li class="country__detail">
            Capital:
            <span class="country__capital country__detail-thin"
              >${data.capital ? data.capital[0] : ""}</span
            >
          </li>
        </ul>
      </div>
    </div>
    `;
  }
  createCountryDetailsMarkup(data) {
    this._markup = `
    <div class="country__details-box">
      <div class="country__details-img-box">
        <img
          src="${data.flags.svg}"
          alt=""
          class="country__details-flag"
        />
      </div>

      <div class="country__details-text-box ${
        darkModeBtn.classList.contains("darkmode") ? "darkmode" : ""
      }">
        <h2 class="country__details-name">${data.name.common}</h2>

        <div class="country__details-lists">
          <ul class="country__details-list ">
            <li class="country__details-info">
              Native name:
              <span class="country__details-native">${
                Object.entries(data.name.nativeName).at(-1)[1].common
              }</span>
            </li>
            <li class="country__details-info">
              Population:
              <span class="country__details-population">${data.population.toLocaleString(
                "en-US"
              )}</span>
            </li>
            <li class="country__details-info">
              Region: <span class="country__details-region">${
                data.region
              }</span>
            </li>
            <li class="country__details-info">
              Sub region:
              <span class="country__details-subre">${data.subregion}</span>
            </li>
            <li class="country__details-info">
              Capital:
              <span class="country__details-capital">${data.capital}</span>
            </li>
          </ul>

          <ul class="country__details-list">
            <li class="country__details-info">
              Top level domain:
              <span class="country__details-domain">${data.tld[0]}</span>
            </li>
            <li class="country__details-info">
              Currencies:
              <span class="country__details-currency">${
                Object.values(this._data.currencies)[0].name
              }</span>
            </li>
            <li class="country__details-info">
              Languages:
              <span class="country__details-languages"
                >${Object.values(data.languages).join(", ")}</span
              >
            </li>
          </ul>
        </div>

        <div class="country__details-borders ">
      

          <ul class="country__details-borders_list">
            <p class="country__details-info">Border countries:</p>
          </ul>
        </div>
      </div>
  </div>
    `;
  }
  createShowMoreBtn() {
    this._markup = `
    <button class="country__btn ${
      darkModeBtn.classList.contains("darkmode") ? "darkmode" : ""
    } ${
      this._data.length === document.querySelectorAll(".country").length
        ? "disp-none"
        : ""
    }">Show more</button>
    `;
    containerCountries.insertAdjacentHTML("beforeend", this._markup);
  }

  // DARK MODE STYLES

  addDarkModeStyle() {
    const countries = document.querySelectorAll(".country");
    const countryTexts = document.querySelectorAll(".country__text");

    const countryBtns = document.querySelectorAll(".country__btn");

    const loaders = document.querySelectorAll(".container__countries-loader");
    const loadersBefore = document.querySelectorAll(
      ".container__countries-loader::before"
    );
    const loadersAfter = document.querySelectorAll(
      ".container__countries-loader::after"
    );
    const countryDetailTextBox = document.querySelectorAll(
      ".country__details-text-box"
    );
    const countryDetailBorders = document.querySelectorAll(
      ".country__details-border"
    );
    this.toggleDarkModeClass(header);
    this.toggleDarkModeClass(headerLogo);
    this.toggleDarkModeClass(darkModeBtn);
    this.toggleDarkModeClass(darkModeBtnIcon);
    this.toggleDarkModeClass(container);
    this.toggleDarkModeClass(filterBtn);
    this.toggleDarkModeClass(filterBtnIcon);
    this.toggleDarkModeClass(filterBtnText);
    this.toggleDarkModeClass(filterOptionList);
    filterOptions.forEach((option) => this.toggleDarkModeClass(option));
    this.toggleDarkModeClass(searchBox);
    this.toggleDarkModeClass(searchBtnIcon);
    this.toggleDarkModeClass(searchInput);
    this.toggleDarkModeClass(backBtn);
    this.toggleDarkModeClass(backBtnIcon);
    countries.forEach((country) => this.toggleDarkModeClass(country));
    countryTexts.forEach((countryText) =>
      this.toggleDarkModeClass(countryText)
    );
    loaders.forEach((loader) => this.toggleDarkModeClass(loader));
    loadersBefore.forEach((loader) => this.toggleDarkModeClass(loader));
    loadersAfter.forEach((loader) => this.toggleDarkModeClass(loader));
    countryBtns.forEach((countryBtn) => this.toggleDarkModeClass(countryBtn));

    if (!document.querySelector(".country__details-box")) return;
    console.log("ZEBI");
    countryDetailTextBox.forEach((textbox) => {
      this.toggleDarkModeClass(textbox);
    });
    countryDetailBorders.forEach((border) => {
      this.toggleDarkModeClass(border);
    });
  }

  // Creating Countries
  addCountries() {
    const start = this.i * 8;
    const end = (this.i + 1) * 8;

    const data = this._data.slice(start, end);
    data
      .map((data) => {
        this.createCountryMarkup(data);
        containerCountries.insertAdjacentHTML("beforeend", this._markup);
      })
      .join("");

    this.createShowMoreBtn();

    document.querySelectorAll(".country__flag-btn").forEach((clicked) => {
      clicked.addEventListener(
        "click",
        this.clickOnCountryHandler.bind(this, clicked)
      );
    });

    document.querySelectorAll(".country__btn").forEach((btn) => {
      btn.addEventListener("click", this.showMoreHandler.bind(this, btn));
    });
  }

  // Filtering countries based on region
  async addCountriesFromFilter(option) {
    containerCountries.innerHTML = "";

    if (filterBtnText.textContent.toLowerCase() === "all")
      this.fetchData("all");

    if (filterBtnText.textContent.toLowerCase() !== "all")
      this.fetchData(`/region/${filterBtnText.textContent.toLowerCase()}`);

    document.querySelectorAll(".country__flag-btn").forEach((clicked) => {
      clicked.addEventListener(
        "click",
        this.clickOnCountryHandler.bind(this, clicked)
      );
    });
  }

  // Creating country details on click
  async showCountryDetails(clicked) {
    containerCountries.innerHTML = "";
    containerCountries.classList.add("container__countries-details");
    this.removeDisplayNone(backBtn);
    this.addDisplayNone(ctasForm);

    this.createLoadingSpinner();
    const resp = await fetch(`https://restcountries.com/v3.1/name/${clicked}`);
    this._data = (await resp.json())[0];

    this.createCountryDetailsMarkup(this._data);
    document
      .querySelectorAll(".container__countries-loader")
      .forEach((loader) => {
        this.addDisplayNone(loader);
      });

    containerCountries.insertAdjacentHTML("afterbegin", this._markup);

    const borderArr = this._data?.borders;
    if (!borderArr) return;
    borderArr
      .map((border) => {
        const borderName = border.toLowerCase();
        this.createCountryBorders(borderName);
      })
      .join("");
  }

  async createCountryBorders(border) {
    const resp = await fetch(`https://restcountries.com/v2/alpha/${border}`);

    this._data = await resp.json();
    console.log(this._data);
    this._markup = `
    <li class="country__details-border ${
      darkModeBtn.classList.contains("darkmode") ? "darkmode" : ""
    }">${this._data.name}</li>
    `;

    document
      .querySelector(".country__details-borders_list")
      .insertAdjacentHTML("beforeend", this._markup);
  }

  // HANDLER FUNCTIONS

  clickOnCountryHandler(clicked) {
    const countryclicked = clicked.children[0]
      .getAttribute("alt")
      .split("-")[0];
    this.showCountryDetails(countryclicked);
  }

  backToMainHandler() {
    this.addDisplayNone(backBtn);
    this.removeDisplayNone(ctasForm);

    containerCountries.classList.remove("container__countries-details");
    containerCountries.innerHTML = "";

    this.addCountriesFromFilter();
  }

  showMoreHandler(btn) {
    this.addDisplayNone(btn);
    this.i++;

    this.createLoadingSpinner();

    this.addCountries();
    document
      .querySelectorAll(".container__countries-loader")
      .forEach((loader) => {
        this.addDisplayNone(loader);
      });
  }

  inputHandler() {
    if (searchInput.value === "") this.fetchData("all");
    containerCountries.innerHTML = "";
    this._data.forEach((data) => {
      if (data.name.common.toLowerCase().startsWith(searchInput.value)) {
        this.createCountryMarkup(data);
        containerCountries.insertAdjacentHTML("beforeend", this._markup);
      }
    });
  }
}

const countryInitiate = new Country();
