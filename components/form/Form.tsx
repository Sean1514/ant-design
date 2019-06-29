import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import FieldForm, { FormInstance, useForm, List, FormProvider } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { ColProps } from '../grid/col';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { FormContext } from './context';
import { FormLabelAlign } from './interface';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

interface FormProps extends RcFormProps {
  prefixCls?: string;
  hideRequiredMark?: boolean;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

const InternalForm: React.FC<FormProps> = (props, ref) => {
  const { getPrefixCls }: ConfigConsumerProps = React.useContext(ConfigContext);

  const {
    colon,
    name,
    labelAlign,
    labelCol,
    wrapperCol,
    prefixCls: customizePrefixCls,
    hideRequiredMark,
    className = '',
    layout = 'horizontal',
  } = props;
  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
    },
    className,
  );

  const formProps = omit(props, [
    'prefixCls',
    'className',
    'layout',
    'hideRequiredMark',
    'wrapperCol',
    'labelAlign',
    'labelCol',
    'colon',
  ]);

  return (
    <FormContext.Provider
      value={{
        name,
        labelAlign,
        labelCol,
        wrapperCol,
        vertical: layout === 'vertical',
        colon,
      }}
    >
      <FieldForm id={name} {...formProps} ref={ref} className={formClassName} />
    </FormContext.Provider>
  );
};

const Form = React.forwardRef<FormInstance>(InternalForm);

export { useForm, List, FormInstance, FormProvider };

export default Form;
