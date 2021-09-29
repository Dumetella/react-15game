import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from '../Style/Theme';

interface ThemeApplierProps {
    children: ReactNode;
}

const ThemeApplier = (props: ThemeApplierProps): JSX.Element => (
    <ThemeProvider theme={Theme}>
        {props.children}
    </ThemeProvider>
);

export default ThemeApplier;

