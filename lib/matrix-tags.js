
const standardStyle = `
  width: 150px;
  font-size: 26px;
  background: black;
  color: #0080ff;
  font-family: stormfaze;
  border-style: dotted;
  text-align: center;
  outline: none;
`;

export class MatrixLightComponent extends HTMLElement {

  constructor(...args) {
    super(...args);
    const shadowRoot = this.attachShadow({mode: 'open'});
    let inputElement = document.createElement('input');
    inputElement.setAttribute('id', this.getAttribute('id'));
    inputElement.setAttribute('type', this.getAttribute('type'));
    inputElement.setAttribute('value', this.getAttribute('value'));
    inputElement.setAttribute('max', this.getAttribute('max'));
    inputElement.setAttribute('min', this.getAttribute('min'));
    // need trick
    // inputElement.setAttribute('class', this.getAttribute('class'));
    // predefined
    inputElement.setAttribute('style', standardStyle);
    if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style'));

    inputElement.addEventListener('focus', () => {
      // console.log('focus on spot input');
    });

    inputElement.addEventListener('change', (e) => {
      console.log('color comp changed', e.path[0].value );
      this.setAttribute('value',e.path[0].value  )
    });

    shadowRoot.appendChild(inputElement);
  }
}

export class MatrixCameraController extends HTMLElement {
  constructor(...args) {
    super(...args);
    const shadowRoot = this.attachShadow({mode: 'open'});
    let inputElement = document.createElement('input');
    inputElement.setAttribute('id', this.getAttribute('id'));
    inputElement.setAttribute('type', this.getAttribute('type'));
    // inputElement.setAttribute('value', this.getAttribute('value'));
    inputElement.setAttribute('data-r', this.getAttribute('data-r'));
    inputElement.setAttribute('data-g', this.getAttribute('data-g'));
    inputElement.setAttribute('data-b', this.getAttribute('data-b'));
    shadowRoot.appendChild(inputElement);
  }
}

export class MatrixButton extends HTMLButtonElement {
  constructor(...args) {
    super(...args);

    // Attaches a shadow root to your custom element.
    const shadowRoot = this.attachShadow({mode: 'open'});
    // Defines the "real" input element.
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', this.getAttribute('type'));

    shadowRoot.appendChild(inputElement);
    
    this.addEventListener('focus', () => {
      console.log('Focus on matrix-engine-btn');
    });

  }
}
