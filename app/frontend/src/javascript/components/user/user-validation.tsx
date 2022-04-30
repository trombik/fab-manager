import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { User } from '../../models/user';
import { IApplication } from '../../models/application';
import { react2angular } from 'react2angular';
import MemberAPI from '../../api/member';

declare const Application: IApplication;

interface UserValidationProps {
  member: User
  onSuccess: (user: User, message: string) => void,
  onError: (message: string) => void,
}

/**
 * This component allows to configure boolean value for a setting.
 */
export const UserValidation: React.FC<UserValidationProps> = ({ member, onSuccess, onError }) => {
  const { t } = useTranslation('admin');

  const [value, setValue] = useState<boolean>(!!(member?.validated_at));

  useEffect(() => {
    setValue(!!(member?.validated_at));
  }, [member]);

  /**
   * Callback triggered when the 'switch' is changed.
   */
  const handleChanged = (_value: boolean) => {
    setValue(_value);
    const _member = _.clone(member);
    if (_value) {
      _member.validated_at = new Date();
    } else {
      _member.validated_at = null;
    }
    MemberAPI.validate(_member)
      .then((user: User) => {
        onSuccess(user, t(`app.admin.members_edit.${_value ? 'validate' : 'invalidate'}_member_success`));
      }).catch(err => {
        setValue(!_value);
        onError(t(`app.admin.members_edit.${_value ? 'validate' : 'invalidate'}_member_error`));
      });
  };

  return (
    <div className="user-validation">
      <label htmlFor="user-validation-switch" className="control-label m-r">{t('app.admin.members_edit.validate_account')}</label>
      <Switch checked={value} id="user-validation-switch" onChange={handleChanged} className="v-middle"></Switch>
    </div>
  );
};

Application.Components.component('userValidation', react2angular(UserValidation, ['member', 'onSuccess', 'onError']));
