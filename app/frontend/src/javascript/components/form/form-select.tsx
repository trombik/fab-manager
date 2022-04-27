import React from 'react';
import Select from 'react-select';
import { Controller, Path } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { FieldPathValue, UnpackNestedValue } from 'react-hook-form/dist/types';
import { FormControlledComponent } from '../../models/form-component';
import { AbstractFormItem, AbstractFormItemProps } from './abstract-form-item';

interface FormSelectProps<TFieldValues, TContext extends object, TOptionValue> extends FormControlledComponent<TFieldValues, TContext>, AbstractFormItemProps<TFieldValues> {
  options: Array<selectOption<TOptionValue>>,
  valueDefault?: TOptionValue,
  onChange?: (value: TOptionValue) => void,
  placeholder?: string,
  clearable?: boolean,
}

/**
 * Option format, expected by react-select
 * @see https://github.com/JedWatson/react-select
 */
type selectOption<TOptionValue> = { value: TOptionValue, label: string };

/**
 * This component is a wrapper for react-select to use with react-hook-form
 */
export const FormSelect = <TFieldValues extends FieldValues, TContext extends object, TOptionValue>({ id, label, tooltip, className, control, placeholder, options, valueDefault, error, warning, rules, disabled, onChange, readOnly, clearable, formState }: FormSelectProps<TFieldValues, TContext, TOptionValue>) => {
  /**
   * The following callback will trigger the onChange callback, if it was passed to this component,
   * when the selected option changes.
   */
  const onChangeCb = (newValue: TOptionValue): void => {
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  return (
    <AbstractFormItem id={id} label={label} tooltip={tooltip}
                      className={`form-select ${className}`} formState={formState}
                      error={error} warning={warning} rules={rules}
                      disabled={disabled} readOnly={readOnly}>
      <Controller name={id as FieldPath<TFieldValues>}
                  control={control}
                  defaultValue={valueDefault as UnpackNestedValue<FieldPathValue<TFieldValues, Path<TFieldValues>>>}
                  render={({ field: { onChange, value, ref } }) =>
                    <Select ref={ref}
                            classNamePrefix="rs"
                            className="rs"
                            value={options.find(c => c.value === value)}
                            onChange={val => {
                              onChangeCb(val.value);
                              onChange(val.value);
                            }}
                            placeholder={placeholder}
                            isDisabled={readOnly}
                            isClearable={clearable}
                            options={options} />
                  } />
    </AbstractFormItem>
  );
};
