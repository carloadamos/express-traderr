import { LitElement, html, css } from 'lit-element';
import './ui-elements/caad-controls.js';
import './ui-elements/caad-list.js';

export class ExpressTraderr extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
      }

      main {
        flex-grow: 1;
      }

      .app-footer {
        position: fixed;
        bottom: 0;
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  render() {
    return html`
      <div>
        <caad-controls></caad-controls>
        <caad-list></caad-list>
      </div>
      <p class="app-footer">
        💀 Made with love by
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/carloadamos">carlo~</a
        >.
      </p>
    `;
  }
}
