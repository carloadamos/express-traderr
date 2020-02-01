import { LitElement, html, css } from 'lit-element';

import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-button';

export class CaadControls extends LitElement {
  static get properties() {
    return {
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
    };
  }

  constructor() {
    super();

    this._isAllStockChecked = false;
    this._isSingleDate = false;
  }

  static get styles() {
    return css`
      :host {
        padding: 12px;
      }

      .stock {
        display: inline-block;
      }

      vaadin-text-field {
        width: 80px;
      }
    `;
  }

  render() {
    return html`
      <vaadin-text-field .disabled=${this._isAllStockChecked} placeholder="ABCDE" label="Stock">
      </vaadin-text-field>
      <vaadin-checkbox @change="${this._disableStockText}"> </vaadin-checkbox>

      <vaadin-date-picker label="From date:" placeholder="Pick a date"></vaadin-date-picker>
      <vaadin-date-picker
        label="To date:"
        placeholder="Pick a date"
        .disabled=${this._isSingleDate}
      ></vaadin-date-picker>
      <vaadin-checkbox @change="${this._disableToDate}"> </vaadin-checkbox>

      <vaadin-button theme="primary">Save</vaadin-button>
      <vaadin-button theme="error primary">Remove</vaadin-button>
    `;
  }

  _disableStockText() {
    this._isAllStockChecked = !this._isAllStockChecked;
  }

  _disableToDate() {
    this._isSingleDate = !this._isSingleDate;
  }
}

customElements.define('caad-controls', CaadControls);
