# frozen_string_literal: true

# Check the access policies for API::ProofOfIdentityRefusalsController
class ProofOfIdentityRefusalPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def create?
    user.admin?
  end

  def show?
    user.admin?
  end
end
