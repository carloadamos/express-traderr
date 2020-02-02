import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';

export class CaadList extends LitElement {
  static get properties() {
    return {
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

    this.stockList = [];
  }

  static get styles() {
    return css`
      vaadin-grid {
        margin-top: 24px;
      }

      vaadin-button {
        margin-top: 12px;
      }
    `;
  }

  render() {
    return html`
      ${this._initializeGridData()} ${this._initializeGrid()}
      <div>
        <vaadin-button theme="secondary success">Accept</vaadin-button>
      </div>
    `;
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
        <vaadin-grid-column path="date" header="Date"></vaadin-grid-column>
        <vaadin-grid-column path="code" header="Code"></vaadin-grid-column>
        <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
        <vaadin-grid-column path="price" header="Price"></vaadin-grid-column>
        <vaadin-grid-column path="percentage" header="Percentage"></vaadin-grid-column>
        <vaadin-grid-column path="volume" header="Volume"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

customElements.define('caad-list', CaadList);
