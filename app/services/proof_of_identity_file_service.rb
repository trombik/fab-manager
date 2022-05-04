# frozen_string_literal: true

# Provides methods for ProofOfIdentityFile
class ProofOfIdentityFileService
  def self.list(operator, filters = {})
    files = []
    if filters[:user_id].present?
      if operator.privileged? || filters[:user_id].to_i == operator.id
        files = ProofOfIdentityFile.where(user_id: filters[:user_id])
      end
    end
    files
  end
end
