import styled from 'reshadow'; // otherwise imports below will be failed
import _dark from './dark.css';
import _light from './light.css';
export const dark = _dark; // because export foo from './foo.css'; -syntax isn't supported
export const light = _light;
