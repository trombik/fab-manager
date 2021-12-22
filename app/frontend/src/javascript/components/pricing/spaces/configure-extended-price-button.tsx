import React, { ReactNode, useState } from 'react';
import { Price } from '../../../models/price';
import { useTranslation } from 'react-i18next';
import { FabPopover } from '../../base/fab-popover';
import { CreateExtendedPrice } from './create-extended-price';
import PriceAPI from '../../../api/price';
import FormatLib from '../../../lib/format';
import { EditExtendedPrice } from './edit-extended-price';
import { DeleteExtendedPrice } from './delete-extended-price';

interface ConfigureExtendedPriceButtonProps {
  prices: Array<Price>,
  onError: (message: string) => void,
  onSuccess: (message: string) => void,
  groupId: number,
  priceableId: number,
  priceableType: string,
}

/**
 * This component is a button that shows the list of extendedPrices.
 * It also triggers modal dialogs to configure (add/edit/remove) extendedPrices.
 */
export const ConfigureExtendedPriceButton: React.FC<ConfigureExtendedPriceButtonProps> = ({ prices, onError, onSuccess, groupId, priceableId, priceableType }) => {
  const { t } = useTranslation('admin');

  const [extendedPrices, setExtendedPrices] = useState<Array<Price>>(prices);
  const [showList, setShowList] = useState<boolean>(false);

  /**
   * Open/closes the popover listing the existing extended prices
   */
  const toggleShowList = (): void => {
    setShowList(!showList);
  };

  /**
   * Callback triggered when the extendedPrice was successfully created/deleted/updated.
   * We refresh the list of extendedPrices.
   */
  const handleSuccess = (message: string) => {
    onSuccess(message);
    PriceAPI.index({ group_id: groupId, priceable_id: priceableId, priceable_type: priceableType })
      .then(data => setExtendedPrices(data.filter(p => p.duration !== 60)))
      .catch(error => onError(error));
  };

  /**
   * Render the button used to trigger the "new extended price" modal
   */
  const renderAddButton = (): ReactNode => {
    return <CreateExtendedPrice onSuccess={handleSuccess}
      onError={onError}
      groupId={groupId}
      priceableId={priceableId}
      priceableType={priceableType} />;
  };

  return (
    <div className="configure-group">
      <button className="configure-group-button" onClick={toggleShowList}>
        <i className="fas fa-stopwatch" />
      </button>
      {showList && <FabPopover title={t('app.admin.configure_extendedPrices_button.extendedPrices')} headerButton={renderAddButton()} className="fab-popover__right">
        <ul>
          {extendedPrices?.map(extendedPrice =>
            <li key={extendedPrice.id}>
              {extendedPrice.duration} {t('app.admin.calendar.minutes')} - {FormatLib.price(extendedPrice.amount)}
              <span className="group-actions">
                <EditExtendedPrice onSuccess={handleSuccess} onError={onError} price={extendedPrice} />
                <DeleteExtendedPrice onSuccess={handleSuccess} onError={onError} price={extendedPrice} />
              </span>
            </li>)}
        </ul>
        {extendedPrices?.length === 0 && <span>{t('app.admin.configure_extendedPrices_button.no_extendedPrices')}</span>}
      </FabPopover>}
    </div>
  );
};
