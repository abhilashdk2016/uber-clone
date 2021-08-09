// import original module declarations
import * as styledComponents from 'styled-components';
import { createGlobalStyle, ThemedStyledComponentsModule } from 'styled-components';

interface IThemeInterface {
    blueColor: string;
  }

const {
    default: styled,
    css,
    keyframes,
    ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;