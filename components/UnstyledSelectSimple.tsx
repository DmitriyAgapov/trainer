import * as React from 'react';
import SelectUnstyled, {
	SelectUnstyledProps,
	selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const blue = {
	100: '#DAECFF',
	200: '#99CCF3',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	900: '#003A75',
};

const grey = {
	100: '#E7EBF0',
	200: '#E0E3E7',
	300: '#CDD2D7',
	400: '#B2BAC2',
	500: '#A0AAB4',
	600: '#6F7E8C',
	700: '#3E5060',
	800: '#2D3843',
	900: '#1A2027',
};

const StyledButton = styled('button')(
	({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 3.75rem;
  min-width: 280px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};

  padding: 0 2rem;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : 'transparent'};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : '#62BB1D'};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : '#62BB1D'};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
	({ theme }) => `

  box-sizing: border-box;
  padding: 0px;

  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};

  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
	({ theme }) => `
  list-style: none;
  padding: 0.875rem 2rem;

  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    // background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    // color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  border-radius: 0.45em;
  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect<TValue>(
	props: SelectUnstyledProps<TValue>,
	ref: React.ForwardedRef<HTMLUListElement>,
) {
	const components: SelectUnstyledProps<TValue>['components'] = {
		Root: StyledButton,
		Listbox: StyledListbox,
		Popper: StyledPopper,
		...props.components,
	};

	return <SelectUnstyled {...props} ref={ref} components={components} />;
}) as <TValue>(
	props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLUListElement>,
) => JSX.Element;

export default function UnstyledSelectSimple({props}) {
	return (
		<CustomSelect defaultValue={props[0].value} className={'button-select'}>
				{props.map(item => <StyledOption key={item.id} value={item.title}>{item.title}</StyledOption>)}
		</CustomSelect>
	);
}