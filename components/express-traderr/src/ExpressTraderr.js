import { LitElement, html, css } from 'lit-element';

export class ExpressTraderr extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
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

  constructor() {
    super();
    this.page = 'main';
  }

  render() {
    return html`
      <p class="app-footer">
        💀 Made with love by 
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/carloadamos">carlo~</a>.
      </p>
    `;
  }
}
