﻿import { memo } from 'react';
import styled from 'styled-components';

type CheckboxProps = Readonly<{
  id?: string;
  name?: string;
  label?: string;
  checked: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onCheck: (checked: boolean) => void;
}>;

const Label = styled.span`
  padding-left: 1.5rem;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  user-select: none;
  position: relative;
`;

const Input = styled.input`
  top: 0.2em;
  z-index: 3;
  opacity: 0;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: absolute;

  :checked ~ i {
    border-color: rgba(9, 211, 172, 0.6);

    :after,
    :before {
      opacity: 1;
      transition: height 0.38s ease;
    }

    :after {
      height: 0.5rem;
    }

    :before {
      height: 1.2rem;
      transition-delay: 0.15s;
    }
  }
`;

const CheckIcon = styled.i`
  top: 0.2em;
  z-index: 0;
  width: 1rem;
  height: 1rem;
  color: #dbdbdb;
  position: absolute;
  box-sizing: border-box;
  border-radius: 0.0625rem;
  background-color: transparent;
  border: 0.125rem solid currentColor;
  transition: border-color 0.38s ease;

  :after,
  :before {
    height: 0;
    opacity: 0;
    content: "";
    width: 0.2rem;
    display: block;
    position: absolute;
    border-radius: 0.25rem;
    background-color: #09d3ac;
    transform-origin: left top;
    transition: opacity 0.38s ease, height 0s linear 0.38s;
  }

  :after {
    left: 0;
    top: 0.3rem;
    transform: rotate(-45deg);
  }

  :before {
    top: 0.65rem;
    left: 0.38rem;
    transform: rotate(-135deg);
  }
`;

const Checkbox = memo<CheckboxProps>(({
  id,
  name,
  label,
  onCheck,
  checked,
  disabled,
  readOnly
}) => (
  <CheckboxWrapper>
    <Input
      id={id}
      name={name}
      type='checkbox'
      checked={checked}
      readOnly={readOnly}
      disabled={disabled}
      onChange={(e) => onCheck(e.target.checked)}
    />
    <CheckIcon />
    {label && <Label>{label}</Label>}
  </CheckboxWrapper>
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;