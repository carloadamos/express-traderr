import { LitElement, html, css } from 'lit-element';

import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-button';

export class CaadControls extends LitElement {
  static get properties() {
    return {
      /**
       * Disable stock code field.
       * @type {boolean}
       */
      _disableStockField: {
        type: Boolean,
      },

      /**
       * Disable to date field.
       * @type {boolean}
       */
      _disableToDatePicker: {
        type: Boolean,
      },

      /**
       * From date.
       * @type {string}
       */
      _fromDate: {
        type: String,
      },

      /**
       * Flag for disabling all textbox.
       * @type {boolean}
       */
      _isAllStockChecked: {
        type: Boolean,
      },

      /**
       * Flag for disabling all textbox.
       * @type {boolean}
       */
      _isSingleDate: {
        type: Boolean,
      },

      /**
       * Stock code.
       * @type {string}
       */
      _stockCode: {
        type: String,
      },

      /**
       * To date.
       * @type {string}
       */
      _toDate: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    this._disableStockField = false;
    this._disableToDatePicker = false;
    this._fromDate = '';
    this._isAllStockChecked = false;
    this._isSingleDate = false;
    this._stockCode = '';
    this._toDate = '';
  }

  static get styles() {
    return css`
      :host {
        padding: 0 0 12px 0;
        margin: 0;
      }

      .stock {
        display: inline-block;
      }

      vaadin-text-field {
        width: 80px;
      }

      h1 {
        font-size: 24px;
        padding: 12px 0 0 0;
        margin: 0;
      }
    `;
  }

  render() {
    return html`
      <h1>Stock's data</h1>
      <vaadin-text-field
        value="${this._stockCode}"
        .disabled=${this._isAllStockChecked}
        placeholder="XXX"
        label="Stock"
        @change="${this._updateStockCode}"
      >
      </vaadin-text-field>
      <vaadin-checkbox @change="${this._disableStockText}" ?checked=${this._disableStockField}>
      </vaadin-checkbox>

      <vaadin-date-picker
        value="${this._fromDate}"
        label="From date:"
        placeholder="Pick a date"
        @value-changed="${this._updateFromDate}"
      ></vaadin-date-picker>

      <vaadin-date-picker
        value="${this._toDate}"
        label="To date:"
        placeholder="Pick a date"
        .disabled=${this._isSingleDate}
        @value-changed="${this._updateToDate}"
      ></vaadin-date-picker>
      <vaadin-checkbox @change="${this._disableToDate}" ?checked=${this._disableToDatePicker}>
      </vaadin-checkbox>

      <vaadin-button theme="secondary" @click="${this._buttonClicked}">Save</vaadin-button>
    `;
  }

  /**
   * Disable stock code UI when selecting all stocks.
   */
  _disableStockText() {
    this._isAllStockChecked = !this._isAllStockChecked;
    this._disableStockField = !this._disableStockField;
  }

  /**
   * Disable `To Date` UI when using one date only.
   */
  _disableToDate() {
    this._isSingleDate = !this._isSingleDate;
    this._disableToDatePicker = !this._disableToDatePicker;
  }

  /**
   * Reset form fields.
   */
  _resetForm() {
    this._disableStockField = false;
    this._disableToDatePicker = false;
    this._fromDate = '';
    this._stockCode = '';
    this._toDate = '';
  }

  /**
   * Update property when textbox value changed.
   * @param {Event} e Event value.
   */
  _updateStockCode(e) {
    this._stockCode = e.target.value;
  }

  /**
   * Update `From Date` value.
   * @param {Event} e Event value
   */
  _updateFromDate(e) {
    this._fromDate = e.target.value;
  }

  /**
   * Update `To Date` value.
   * @param {Event} e Event value.
   */
  _updateToDate(e) {
    this._toDate = e.target.value;
  }
}

customElements.define('caad-controls', CaadControls);
