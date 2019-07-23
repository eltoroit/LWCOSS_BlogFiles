import utilElectron from 'util/electron';
import { buildCustomElementConstructor } from 'lwc';

customElements.define('util-electron', buildCustomElementConstructor(utilElectron));
