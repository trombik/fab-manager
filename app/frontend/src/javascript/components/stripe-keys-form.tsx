import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { useTranslation } from 'react-i18next';
import SettingAPI from '../api/setting';
import { SettingName } from '../models/setting';
import { FabInput } from './fab-input';
import StripeAPI from '../api/stripe';
import { HtmlTranslate } from './html-translate';


interface StripeKeysFormProps {
  onValidKeys: (stripePublic: string, stripeSecret:string) => void
}

// initial request to the API
const stripeKeys = SettingAPI.query([SettingName.StripePublicKey, SettingName.StripeSecretKey]);

/**
 * Form to set the stripe's public and private keys
 */
const StripeKeysFormComponent: React.FC<StripeKeysFormProps> = ({ onValidKeys }) => {
  const { t } = useTranslation('admin');

  // used to prevent promises from resolving if the component was unmounted
  const mounted = useRef(false);

  // Stripe's public key
  const [publicKey, setPublicKey] = useState<string>('');
  // Icon of the input field for the Stripe's public key. Used to display if the key is valid.
  const [publicKeyAddOn, setPublicKeyAddOn] = useState<ReactNode>(null);
  // Style class for the add-on icon, for the public key
  const [publicKeyAddOnClassName, setPublicKeyAddOnClassName] = useState<'key-invalid' | 'key-valid' | ''>('');
  // Stripe's secret key
  const [secretKey, setSecretKey] = useState<string>('');
  // Icon of the input field for the Stripe's secret key. Used to display if the key is valid.
  const [secretKeyAddOn, setSecretKeyAddOn] = useState<ReactNode>(null);
  // Style class for the add-on icon, for the public key
  const [secretKeyAddOnClassName, setSecretKeyAddOnClassName] = useState<'key-invalid' | 'key-valid' | ''>('');

  /**
   * When the component loads for the first time:
   * - mark it as mounted
   * - initialize the keys with the values fetched from the API (if any)
   */
  useEffect(() => {
    mounted.current = true;
    const keys = stripeKeys.read();
    setPublicKey(keys.get(SettingName.StripePublicKey));
    setSecretKey(keys.get(SettingName.StripeSecretKey));

    // when the component unmounts, mark it as unmounted
    return () => {
      mounted.current = false;
    };
  }, []);

  /**
   * When the style class for the public and private key are updated, check if they indicate valid keys.
   * If both are valid, run the 'onValidKeys' callback
   */
  useEffect(() => {
    const validClassName = 'key-valid';
    if (publicKeyAddOnClassName === validClassName && secretKeyAddOnClassName === validClassName) {
      onValidKeys(publicKey, secretKey);
    }
  }, [publicKeyAddOnClassName, secretKeyAddOnClassName]);


  /**
   * Send a test call to the Stripe API to check if the inputted public key is valid
   */
  const testPublicKey = (key: string) => {
    if (!key.match(/^pk_/)) {
      setPublicKeyAddOn(<i className="fa fa-times" />);
      setPublicKeyAddOnClassName('key-invalid');
      return;
    }
    StripeAPI.createPIIToken(key, 'test').then(() => {
      if (!mounted.current) return;

      setPublicKey(key);
      setPublicKeyAddOn(<i className="fa fa-check" />);
      setPublicKeyAddOnClassName('key-valid');
    }, reason => {
      if (!mounted.current) return;

      if (reason.response.status === 401) {
        setPublicKeyAddOn(<i className="fa fa-times" />);
        setPublicKeyAddOnClassName('key-invalid');
      }
    });
  }

  /**
   * Send a test call to the Stripe API to check if the inputted secret key is valid
   */
  const testSecretKey = (key: string) => {
    if (!key.match(/^sk_/)) {
      setSecretKeyAddOn(<i className="fa fa-times" />);
      setSecretKeyAddOnClassName('key-invalid');
      return;
    }
    StripeAPI.listAllCharges(key).then(() => {
      if (!mounted.current) return;

      setSecretKey(key);
      setSecretKeyAddOn(<i className="fa fa-check" />);
      setSecretKeyAddOnClassName('key-valid');
    }, reason => {
      if (!mounted.current) return;

      if (reason.response.status === 401) {
        setSecretKeyAddOn(<i className="fa fa-times" />);
        setSecretKeyAddOnClassName('key-invalid');
      }
    });
  }

  return (
    <div className="stripe-keys-form">
      <div className="stripe-keys-info">
        <HtmlTranslate trKey="app.admin.invoices.payment.stripe_keys_info_html" />
      </div>
      <form name="stripeKeysForm">
        <div className="stripe-public-input">
          <label htmlFor="stripe_public_key">{ t('app.admin.invoices.payment.public_key') } *</label>
          <FabInput id="stripe_public_key"
                    icon={<i className="fa fa-info" />}
                    defaultValue={publicKey}
                    onChange={testPublicKey}
                    addOn={publicKeyAddOn}
                    addOnClassName={publicKeyAddOnClassName}
                    debounce={200}
                    required />
        </div>
        <div className="stripe-secret-input">
          <label htmlFor="stripe_secret_key">{ t('app.admin.invoices.payment.secret_key') } *</label>
          <FabInput id="stripe_secret_key"
                    icon={<i className="fa fa-key" />}
                    defaultValue={secretKey}
                    onChange={testSecretKey}
                    addOn={secretKeyAddOn}
                    addOnClassName={secretKeyAddOnClassName}
                    debounce={200}
                    required/>
        </div>
      </form>
    </div>
  );
}

export const StripeKeysForm: React.FC<StripeKeysFormProps> = ({ onValidKeys }) => {
  return (
    <Loader>
      <StripeKeysFormComponent onValidKeys={onValidKeys} />
    </Loader>
  );
}
