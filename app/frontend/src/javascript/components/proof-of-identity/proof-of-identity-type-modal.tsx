import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FabModal } from '../base/fab-modal';
import { ProofOfIdentityType } from '../../models/proof-of-identity-type';
import { Group } from '../../models/group';
import ProofOfIdentityTypeAPI from '../../api/proof-of-identity-type';
import { ProofOfIdentityTypeForm } from './proof-of-identity-type-form';

interface ProofOfIdentityTypeModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  onSuccess: () => void,
  groups: Array<Group>,
  proofOfIdentityType?: ProofOfIdentityType,
}

export const ProofOfIdentityTypeModal: React.FC<ProofOfIdentityTypeModalProps> = ({ isOpen, toggleModal, onSuccess, proofOfIdentityType, groups }) => {
  const { t } = useTranslation('admin');

  const [data, setData] = useState<ProofOfIdentityType>({ id: proofOfIdentityType?.id, group_ids: proofOfIdentityType?.group_ids || [], name: proofOfIdentityType?.name || '' });

  useEffect(() => {
    setData({ id: proofOfIdentityType?.id, group_ids: proofOfIdentityType?.group_ids || [], name: proofOfIdentityType?.name || '' });
  }, [proofOfIdentityType]);

  const handleProofOfIdentityTypeChanged = (field: string, value: string | Array<number>) => {
    setData({
      ...data,
      [field]: value
    });
  };

  const handleSaveProofOfIdentityType = async (): Promise<void> => {
    try {
      if (proofOfIdentityType?.id) {
        await ProofOfIdentityTypeAPI.update(data);
      } else {
        await ProofOfIdentityTypeAPI.create(data);
      }
      onSuccess();
    } catch (e) {
    }
  };

  const isPreventSaveProofOfIdentityType = (): boolean => {
    return !data.name || data.group_ids.length === 0;
  };

  return (
    <FabModal title={t(`app.admin.settings.compte.${proofOfIdentityType ? 'edit' : 'new'}_proof_of_identity_type`)}
      isOpen={isOpen}
      toggleModal={toggleModal}
      closeButton={false}
      confirmButton={t(`app.admin.settings.compte.${proofOfIdentityType ? 'edit' : 'create'}`)}
      onConfirm={handleSaveProofOfIdentityType}
      preventConfirm={isPreventSaveProofOfIdentityType()}
      className="proof-of-identity-type-modal">
      <ProofOfIdentityTypeForm proofOfIdentityType={proofOfIdentityType} groups={groups} onChange={handleProofOfIdentityTypeChanged}/>
    </FabModal>
  );
};
