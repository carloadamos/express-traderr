import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';

export class CaadErrorList extends LitElement {
  static get properties() {
    return {
      /**
       * Selected stocks.
       * @type {Array}
       */
      _selectedStocks: {
        type: Array,
      },
      /**
       * Stock list.
       * @type {Array}
       */
      stockList: {
        type: Array,
      },
    };
  }

  constructor() {
    super();

    this._selectedStocks = [];
    this.stockList = [];
  }

  static get styles() {
    return css`
      vaadin-button {
        margin-top: 12px;
      }

      h1 {
        padding: 12px 0 12px 0;
        margin: 0;
      }
    `;
  }

  render() {
    console.log(this._selectedStocks);
    return html`
      <h1>Error List</h1>
      ${this._initializeGridData()} ${this._initializeGrid()}
      <div>
        <vaadin-button theme="secondary success" @click="${this._getSelected}"
          >Accept</vaadin-button
        >
      </div>
    `;
  }

  /**
   * Get selected items from grid.
   */
  _getSelected() {
    this._selectedStocks = this.shadowRoot.querySelector('vaadin-grid').selectedItems;
  }

  /**
   * Initialize grid data.
   */
  _initializeGridData() {
    this.stockList = [
      {
        date: '2019-03-19',
        code: 'WEB',
        name: 'PhilWeb',
        price: 15.6,
        percentage: 1.32,
        volume: 1230000,
      },
      {
        date: '2019-03-19',
        code: 'WEB',
        name: 'PhilWeb',
        price: 15.62,
        percentage: 1.53,
        volume: 1250000,
      },
    ];
  }

  /**
   * Initialize the actual grid.
   */
  _initializeGrid() {
    return html`
      <vaadin-grid items="${JSON.stringify(this.stockList)}">
        <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>
        <vaadin-grid-filter-column path="date" header="Date"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="code" header="Code"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="name" header="Name"></vaadin-grid-filter-column>
        <vaadin-grid-column path="price" header="Price"></vaadin-grid-column>
        <vaadin-grid-column path="percentage" header="Percentage"></vaadin-grid-column>
        <vaadin-grid-column path="volume" header="Volume"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

customElements.define('caad-error-list', CaadErrorList);
