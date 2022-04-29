# frozen_string_literal: true

# Provides methods for ProofOfIdentityRefusal
class ProofOfIdentityRefusalService
  def self.list(filters = {})
    refusals = []
    if filters[:user_id].present?
      files = ProofOfIdentityRefusal.where(user_id: filters[:user_id])
    end
    refusals
  end
end
