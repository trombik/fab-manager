json.title notification.notification_type
json.description t('.USER_s_subscription_will_expire_in_7_days',
                   USER: notification.attached_object.user&.profile&.full_name || t('api.notifications.deleted_user'))

