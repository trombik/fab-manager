import React from 'react';
import { useTranslation } from 'react-i18next';
import { FabModal } from '../base/fab-modal';
import ProofOfIdentityTypeAPI from '../../api/proof-of-identity-type';

interface DeleteProofOfIdentityTypeModalProps {
  isOpen: boolean,
  proofOfIdentityTypeId: number,
  toggleModal: () => void,
  onSuccess: () => void,
}

export const DeleteProofOfIdentityTypeModal: React.FC<DeleteProofOfIdentityTypeModalProps> = ({ isOpen, toggleModal, onSuccess, proofOfIdentityTypeId }) => {
  const { t } = useTranslation('admin');

  const handleDeleteProofOfIdentityType = async (): Promise<void> => {
    try {
      await ProofOfIdentityTypeAPI.destroy(proofOfIdentityTypeId);
      onSuccess();
    } catch (e) {
    }
  };

  return (
    <FabModal title={t('app.admin.settings.compte.confirmation_required')}
      isOpen={isOpen}
      toggleModal={toggleModal}
      closeButton={true}
      confirmButton={t('app.admin.settings.compte.confirm')}
      onConfirm={handleDeleteProofOfIdentityType}
      className="proof-of-identity-type-modal">
      <p>{t('app.admin.settings.compte.do_you_really_want_to_delete_this_proof_of_identity_type')}</p>
    </FabModal>
  );
};
