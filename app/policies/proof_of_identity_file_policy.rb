class ProofOfIdentityFilePolicy < ApplicationPolicy

  def index?
    #user.admin? or record.user_id == user.id
    true
  end

  def create?
    #user.admin? or record.user_id == user.id
    true
  end

  def update?
    user.admin? or record.user_id == user.id
  end

  def download?
    user.admin? or record.user_id == user.id
  end
end
