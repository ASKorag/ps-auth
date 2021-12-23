/**
 * @module DOM
 */

/**
 * Класс для создания DOM с фильтрами техники
 */
class VehiclesFilterDOM {
  /**
   * Метод для создания панели фильтров для техники.
   */
  static createVehiclesFilter() {
    const $itemFilter = document.createElement('div');
    $itemFilter.classList.add('item-filters');
    $itemFilter.innerHTML = `
      <div class="filter-container">
        <button class="filter-container-checkedBtn nations arrow" id="allNations" type="button">
        All nations
        </button>
        <ul class="filter-list nations-list">
          <li class="nations-btn filter-btn" data-nation="all">
            <button class="nations">All nations</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="china">
            <button class="china_btn">China</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="france">
            <button class="france_btn">France</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="germany">
            <button class="germany_btn">Germany</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="japan">
            <button class="japan_btn">Japan</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="uk">
            <button class="uk_btn">U.K.</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="usa">
            <button class="usa_btn">U.S.A.</button>
          </li>
          <li class="nations-btn filter-btn" data-nation="ussr">
            <button class="ussr_btn">U.S.S.R.</button>
          </li>
        </ul>
      </div>
      <div class="filter-container">
        <button class="filter-container-checkedBtn types arrow" id="allTypes" type="button">
        All types
        </button>
        <ul class="filter-list type-list">
          <li class="type-btn filter-btn" data-type="all">
            <button class="types">All types</button>
          </li>
          <li class="type-btn filter-btn" data-type="lightTank">
            <button class="light">Light Tanks</button>
          </li>
          <li class="type-btn filter-btn" data-type="mediumTank">
            <button class="medium">Medium Tanks</button>
          </li>
          <li class="type-btn filter-btn" data-type="heavyTank">
            <button class="heavy">Heavy Tanks</button>
          </li>
          <li class="type-btn filter-btn" data-type="AT-SPG">
            <button class="destroy">Tank Destroyers</button>
          </li>
          <li class="type-btn filter-btn" data-type="SPG">
            <button class="spg">SPGs</button>
          </li>
          <li class="type-btn filter-btn" data-type="all">
            <button class="multirole">Multirole fighter</button>
          </li>
        </ul>
      </div>
      <div class="filter-container">
        <button class="filter-container-checkedBtn tiers arrow" id="allTiers" type="button">
        All Tiers
        </button>
        <ul class="filter-list tiers-list">
          <li class="tires-btn filter-btn" data-tier="all">
            <button>&#8545;-&#8553;</button>
          </li>
          <li class="tires-btn filter-btn" data-tier="2">
            <button>&#8545;</button>
          </li>
          <li class="tires-btn filter-btn" data-tier="4">
            <button>&#8544;&#8548;</button>
          </li>
          <li class="tires-btn filter-btn" data-tier="5">
            <button>&#8548;</button>
          </li>
          <li class="tires-btn filter-btn" data-tier="7">
            <button>&#8548;&#8545;</button>
          </li>
          <li class="tires-btn filter-btn" data-tier="9">
            <button>&#8544;&#8553;</button>
          </li>
          <li class="tires-btn filter-btn" data-tier="10">
            <button>&#8553;</button>
          </li>
        </ul>
      </div>
      <button class="item-filters-btn" id="allVehicles">Show all vehicles</button>`;
    return $itemFilter;
  }
}

export default VehiclesFilterDOM;
